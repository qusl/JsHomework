
(function () {
    var tableName = "ResellerContent";

    window.CmpTool.getResellerContent = function (scope) {
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var maxIdTableName = "ResellerContent";
        var maxIdGetMethod = "GetMaxResellerContentId";

        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        // if it's insert, populate ContentId:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'ContentId') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_ContentId");
                });
            }
        }

        var keyName = "ContentId";
        var refreshGrid = function () {
            var getMethod = "GetResellerContent";
            scope.getServiceData(tableName, getMethod).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configResellerContentColumns(scope);
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
            var id = e.data.ContentId;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();