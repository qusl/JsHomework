
(function () {
    var tableName = "ResellerAttributeDetails";

    window.CmpTool.getResellerAttributeDetails = function (scope) {
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var maxIdTableName = "ResellerAttributeDetails";
        var maxIdGetMethod = "GetMaxRadId";

        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        // if it's insert, populate RADID:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'RADID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_RADID");
                });
            }
        }

        var keyName = "RADID";
        var refreshGrid = function () {
            var getMethod = "GetAllResellerAttributeDetails";
            scope.getServiceData(tableName, getMethod).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configAttributeDetailsColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
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
            var id = e.data.RADID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();