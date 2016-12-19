
(function() {
    var tableName = "SkuMap";
    var currentPlanDispName = '';
    //var currentAccountDispName = '';
    var resellerId, isBatchEditing;

    window.CmpTool.getSkuMap = function (scope, parentResellerId) {
        isBatchEditing = false;
        $('#batchEditingCheckBox').show();
        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForSkuMap();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
        resellerId = parentResellerId;
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        //var resellerTable = CmpToolStatic.resellerTableName;
        //var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        //scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function (resellerResponse) {
        //    scope.parentResellerDropdown = resellerResponse.data;
            var planTable = CmpToolStatic.internalPlansWithPlanNumTableName;
            var planMethod = CmpToolStatic.internalPlansWithPlanNumGetMethod;
            scope.getServiceData(planTable, planMethod, resellerId).then(function(planResponse) {
                scope.internalPlansWithPlanNumDropdown = planResponse.data;
                var resourceTable = CmpToolStatic.internalResourcesWithNumTableName;
                var resourceMethod = CmpToolStatic.internalResourcesWithNumGetMethod;
                scope.getServiceData(resourceTable, resourceMethod, resellerId).then(function(resourceResponse) {
                    scope.internalResourcesWithNumDropdown = resourceResponse.data;
                    setDataSource(scope);
                });
            });
        //});
    }

    function setDataSource(scope) {
        var maxIdTableName = "SkuMap";
        var maxIdGetMethod = "GetMaxSkuMapId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        //myGrid.onCellPrepared = function(e) {
        //    var cellElement = e.cellElement,
        //        editorElement = cellElement.find(".dx-selectbox");
        //    // Disable reseller dropdown for selected country(not for AllCountries):
        //    if (e.rowType === "detail" && resellerId != 0 && currentAccountDispName) {
        //        CmpToolUtility.setReadOnlyValue(editorElement, 0, currentAccountDispName);
        //    }
        //}

        myGrid.onEditingStart = function (e) {
            if (!scope.appIsInsert) {
                var pNum = e.data.PlanNum;
                var allPans = scope.internalPlansWithPlanNumDropdown;
                currentPlanDispName = CmpToolUtility.getDispNameByPlanNum(allPans, pNum);
                var skuId = e.data.SkuID;
                CmpToolUtility.setTextBoxReadOnly(skuId, "_SkuID");
            } 
        }

        // if it's insert, populate ID:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'SkuID') {
                //guid = CmpToolUtility.guid();
                //CmpToolUtility.setTextBox(guid, "_SkuID");
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_ID");
                });
            }
        }

        var keyName = "ID";
        var refreshGrid = function () {
            var getMethod = "GetSkuMapByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                //currentAccountDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configSkuMapColumns(scope);
                if (isBatchEditing) {
                    myGrid.dataSource = CmpToolUtility.dataSourceForBatchEditing(scope, respRefresh.data, tableName, keyName, setDataSource);
                } else {
                    myGrid.dataSource = respRefresh.data;
                }
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid, isBatchEditing);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
            //e.data.SkuID = guid;
            e.data.AccountID = resellerId;
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function() {
                    refreshGrid();
                }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();
