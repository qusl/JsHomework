
(function() {
    var tableName = "TermsAndConditionsGroup";

    window.CmpTool.getAllTermsAndConditionsGroup = function (scope) {
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var maxIdTableName = "TermsAndConditionsGroup";
        var maxIdGetMethod = "GetMaxTermsAndConditionsGroupId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        // if it's insert, populate TermGroupID:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'TermGroupID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_TermGroupID");
                });
            }
        }

        var keyName = "TermGroupID";
        var refreshGrid = function () {
            var getMethod = "GetAllTermsAndConditionsGroup";
            scope.getServiceData(tableName, getMethod).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configTermsAndConditionsGroupColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
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

        refreshGrid();
    }
})();
