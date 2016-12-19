
(function () {
    var tableName = "PayTools";
    var currentAccountDispName = '';
    var resellerId;

    window.CmpTool.getPayTools = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod).then(function (resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            setDataSource(scope);
        });
    }

    function setDataSource(scope) {
        var maxIdTableName = "PayTools";
        var maxIdGetMethod = "GetMaxPayToolId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        
        myGrid.onCellPrepared = function(e) {
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentAccountDispName) {
                var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentAccountDispName);
            } 
        }

        // if it's insert, populate PayToolID:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'PayToolID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_PayToolID");
                });
            }
        }

        var keyName = "PayToolID";
        var refreshGrid = function () {
            var getMethod = "GetPayToolsByResellerId";
            var parentResellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            scope.getServiceData(tableName, getMethod, parentResellerId).then(function (respRefresh) {
                currentAccountDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, parentResellerId);
                myGrid.columns = window.CmpTool.configPayToolsColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
            e.data.AccountID = resellerId;
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var id = e.data.PayToolID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();

