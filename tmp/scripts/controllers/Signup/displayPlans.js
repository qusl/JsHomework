
(function() {
    var tableName = "DisplayPlans";
    var currentPlanDispName = '';
    var currentAccountDispName = '';
    var planId, planNum, resellerId, isBatchEditing, catId;

    window.CmpTool.getDisplayPlans = function (scope, categoryId) {
        isBatchEditing = false;
        catId = categoryId;
        $("#btnEditHtml1").show();
        $("#btnEditHtml2").show();
        $('#batchEditingCheckBox').show();
        resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }

        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function (resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            var planTable = CmpToolStatic.internalPlansWithPlanNumTableName;
            var planMethod = CmpToolStatic.internalPlansWithPlanNumGetMethod;
            scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
                scope.internalPlansWithPlanNumDropdown = planResponse.data;
                var emptyRow = {
                    DispName: '',
                    PlanID: 0
                }
                planResponse.data.push(emptyRow);
                scope.internalPlansWithPlanNumDropdownWithEmptyRow = planResponse.data;
                var permissionTable = CmpToolStatic.permissionTypeTableName;
                var permissionMethod = CmpToolStatic.permissionTypeGetMethod;
                scope.getServiceData(permissionTable, permissionMethod).then(function (permissionResponse) {
                    scope.permissionTypeDropdown = permissionResponse.data;
                    setDataSource(scope, categoryId);
                });
            });
        });

        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForDisplayPlans();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope, catId);
        }
    }

    var setDataSource = function(scope, categoryId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function(e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentAccountDispName && !isBatchEditing) {
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentAccountDispName);
            }

            // removed this:  '&& !isBatchEditing'
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanDispName);
            }

            if (e.rowType != "data" || !isBatchEditing) {
                return;
            }
            if (e.column.dataField === 'PlanID' || e.column.dataField === 'PermissionTypeId' || e.column.dataField === 'ParentPlanId') {
                e.column.allowEditing = false;
            }
        }

        myGrid.onEditingStart = function (e) {
            if (!scope.appIsInsert) {
                var pId = e.data.PlanID;
                var allPans = scope.internalPlansWithPlanNumDropdown;
                currentPlanDispName = CmpToolUtility.getDispNameByPlanId(allPans, pId);
            }
        }

        myGrid.onEditorPrepared = function (e) {
            if (e.parentType == 'dataRow' && e.dataField == 'PlanID') {
                e.editorElement.dxSelectBox('instance').option('onValueChanged', function (option) {
                    planId = option.value;
                    var allPans = scope.internalPlansWithPlanNumDropdown;
                    planNum = CmpToolUtility.getPlanNumByPlanId(allPans, planId);
                    var index = e.row.rowIndex;
                    if (isBatchEditing) {
                        var grid = $("#gridContainer").dxDataGrid("instance");
                        grid.cellValue(index, "PlanNum", planNum);
                        grid.cellValue(index, "PlanID", planId);
                    } else {
                        CmpToolUtility.setTextBoxReadOnly(planNum, "_PlanNum");
                    }
                });
            }
        }

        var keyName = "PlanID";
        var refreshGrid = function () {
            var getMethod = "GetDisplayPlansByCategoryId";
            var id = categoryId;
            CmpToolUtility.showLoadingPage();

            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetDisplayPlansByResellerId";
                id = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            }
            scope.getServiceData(tableName, getMethod, id).then(function (respRefresh) {
                currentAccountDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configDisplayPlanColumns(scope);
                if (isBatchEditing) {
                    myGrid.dataSource = CmpToolUtility.dataSourceForBatchEditing(scope, respRefresh.data, tableName, keyName, setDataSource);
                } else {
                    myGrid.dataSource = respRefresh.data;
                }
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid, isBatchEditing);
                CmpToolUtility.hideLoadingPage();
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
            e.data.PlanID = planId;
            e.data.PlanNum = planNum;
            e.data.AccountID = resellerId;
            if (!e.data.PermissionTypeId || e.data.PermissionTypeId == 0) {
                e.data.PermissionTypeId = 100;
            }
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;
        
        myGrid.stateStoring.storageKey = "storage" + tableName;
        
        refreshGrid();
    }

})();
