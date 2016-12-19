
(function() {
    var tableName = "MasterResources";
    var isBatchEditing;

    window.CmpTool.getAllMasterResources = function (scope) {
        isBatchEditing = false;
        $('#batchEditingCheckBox').show();
        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForMasterResources();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var maxIdTableName = "MasterResources";
        var maxIdGetMethod = "GetMasterResourcesMaxId";

        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        // if it's insert, populate ResourceNum:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'ResourceNum') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function (respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_ResourceNum");
                });
            }
        }

        var keyName = "ResourceNum";
        var refreshGrid = function () {
            var getMethod = "GetMasterResources";
            CmpToolUtility.showLoadingPage();
            scope.getServiceData(tableName, getMethod).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configMasterResourcesColumns(scope);
                myGrid.dataSource = respRefresh.data;
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
            }
            );
        };

        myGrid.onRowRemoved = function(e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();
