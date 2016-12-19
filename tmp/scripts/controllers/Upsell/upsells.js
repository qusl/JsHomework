
(function() {
    var tableName = "Upsells";
    var isBatchEditing;

    window.CmpTool.getUpsells = function (scope, parentResellerId) {
        scope.resellerId = parentResellerId;
        isBatchEditing = false;
        $('#batchEditingCheckBox').show();
        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForUpsells();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
        if (parseInt(scope.resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }

        var planTable = CmpToolStatic.internalPlansWithPlanNumTableName;
        var planMethod = CmpToolStatic.internalPlansWithPlanNumGetMethod;
        scope.getServiceData(planTable, planMethod, scope.resellerId).then(function (planResponse) {
            scope.internalPlansWithPlanNumDropdown = planResponse.data;
            var resourceTable = CmpToolStatic.internalResourcesWithNumTableName;
            var resourceMethod = CmpToolStatic.internalResourcesWithNumGetMethod;
            scope.getServiceData(resourceTable, resourceMethod, scope.resellerId).then(function (resourceResponse) {
                scope.internalResourcesWithNumDropdown = resourceResponse.data;
                var typeTable = CmpToolStatic.permissionTypeTableName;
                var typeMethod = CmpToolStatic.permissionTypeGetMethod;
                scope.getServiceData(typeTable, typeMethod).then(function (typeResponse) {
                    scope.permissionTypeDropdown = typeResponse.data;
                    setDataSource(scope);
                });
            });
        });
    }

    function setDataSource(scope) {
        var maxIdTableName = "Upsells";
        var maxIdGetMethod = "GetUpsellsMaxId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        // if it's insert, populate maxId:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'UpsellId') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function (respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_UpsellId");
                });
            }
        }

        var keyName = "UpsellId";
        var refreshGrid = function () {
            var getMethod = "GetUpsellsByResellerId";
            scope.getServiceData(tableName, getMethod, scope.resellerId).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configUpsellsColumns(scope);
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
            if (!e.data.PermissionTypeId || e.data.PermissionTypeId == 0) {
                e.data.PermissionTypeId = 100;
            }
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function() {
                    refreshGrid();
                }
            );
        }

        myGrid.onRowRemoved = function (e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();
