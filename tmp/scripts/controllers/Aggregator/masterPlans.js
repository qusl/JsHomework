
(function() {
    var tableName = "MasterPlans";
    var isBatchEditing;

    window.CmpTool.getAllMasterPlans = function (scope) {
        isBatchEditing = false;
        $('#batchEditingCheckBox').show();
        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForMasterPlans();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
        setDataSource(scope);
    }

    var setDataSource = function(scope) {
        var maxIdTableName = "MasterPlans";
        var maxIdGetMethod = "GetMasterPlansMaxId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        // if it's insert, populate PlanNum:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'PlanNum') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function (respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_PlanNum");
                }); 
            }
        }

        var keyName = "PlanNum";
        var refreshGrid = function () {
            var getMethod = "GetMasterPlans";
            CmpToolUtility.showLoadingPage();
            scope.getServiceData(tableName, getMethod).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configMasterPlansColumns(scope);
                if (isBatchEditing) {
                    myGrid.dataSource = CmpToolUtility.dataSourceForBatchEditing(scope, respRefresh.data, tableName, keyName, setDataSource);
                } else {
                    myGrid.dataSource = respRefresh.data;
                }
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid, isBatchEditing);
            });
        };

        myGrid.onRowUpdated = function(e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            });
        };

        myGrid.onRowRemoved = function(e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };

        myGrid.stateStoring = {
            enabled: true,
            storageKey: "storage" + tableName,
            type: "custom",
            customLoad: function () {
                var state = localStorage.getItem(this.storageKey);
                if (state) {
                    state = JSON.parse(state);
                    for (var i = 0; i < state.columns.length; i++) {
                        state.columns[i].filterValue = null;
                    }
                }
                return state;
            },
            customSave: function (state) {
                localStorage.setItem(this.storageKey, JSON.stringify(state));
            },
        };

        refreshGrid();
    }
})();
