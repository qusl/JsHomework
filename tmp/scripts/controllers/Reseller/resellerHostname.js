
(function () {
    var tableName = "ResellerHostname";
    var currentParentDispName = '';
    var resellerId;

    window.CmpTool.getResellerHostname = function (scope, parrentResellerId) {
        resellerId = parrentResellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function(resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            setDataSource(scope);
        });
    }

    function setDataSource(scope) {
        var maxIdTableName = "ResellerHostname";
        var maxIdGetMethod = "GetmaxResellerHostnameId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function(e) {
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentParentDispName) {
                var cellElement = e.cellElement,
                    editorElement = cellElement.find(".dx-selectbox");
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentParentDispName);
            }
        }

        // if it's insert, populate RHID:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'RHID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_RHID");
                });
            }
        }

        var keyName = "RHID";
        var refreshGrid = function () {
            var getMethod = "GetResellerHostnameByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                currentParentDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configResellerHostnameColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function(e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        }

        myGrid.onRowRemoved = function(e) {
            var id = e.data.RHID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();

    }
})();