
(function() {
    var tableName = "Resellers";
    var currentResellerId = "";
    var resellerId;

    window.CmpTool.getResellersByParentId = function(scope, parentResellerId) {
        resellerId = parentResellerId;

        var resellerfolderTable = CmpToolStatic.activedResellerFoldersTableName;
        var resellerfolderMethod = CmpToolStatic.activedResellerFoldersGetMethod;
        scope.getServiceData(resellerfolderTable, resellerfolderMethod, resellerId).then(function (resellerfolderResponse) {
            scope.activedResellerFoldersDropdown = resellerfolderResponse.data;
            setDataSource(scope);
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function(e) {
            if (!scope.appIsInsert) {
                CmpToolUtility.setTextBoxReadOnly(currentResellerId, "_ResellerID");
            }
        }

        myGrid.onEditingStart = function(e) {
            scope.appIsInsert = false;
            currentResellerId = e.data.ResellerID;
        }

        var keyName = "ResellerID";
        var refreshGrid = function () {
            var getMethod = "GetResellersByParentResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configResellerColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function(e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
            if (!e.data.RFId || e.data.RFId == 0) {
                e.data.RFId = 1;
            }
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
