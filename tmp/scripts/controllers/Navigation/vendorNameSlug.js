
(function() {
    var tableName = "VendorNameSlug";

    window.CmpTool.getAllVendorNameSlug = function (scope) {
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var maxIdTableName = "VendorNameSlug";
        var maxIdGetMethod = "GetVendorNameSlugMaxId";

        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        // if it's insert, populate VendorId:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'VendorId') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function (respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_VendorId");
                });
            }
        }

        var keyName = "VendorId";
        var refreshGrid = function () {
            var getMethod = "GetVendorNameSlugs";
            scope.getServiceData(tableName, getMethod).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configVendorNameSlugColumns(scope);
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
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();
