
(function () {
    var tableName = "ResellerAlias";
    var currentAliasDispName = '';
    var resellerId;

    window.CmpTool.getResellersAlias = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function(resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            var childTable = CmpToolStatic.resellerTableName;
            var childMethod = CmpToolStatic.childResellerGetMethod;
            scope.getServiceData(childTable, childMethod, resellerId).then(function(childResponse) {
                scope.childResellerDropdown = childResponse.data;
                setDataSource(scope);
            });
        });
    }

    function setDataSource(scope) {
        var maxIdTableName = "ResellerAlias";
        var maxIdGetMethod = "GetmaxResellerAliasId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (resellerId != 0 && currentAliasDispName) {
                var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentAliasDispName);
            }
        }

        // if it's insert, populate RAID:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'RAID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_RAID");
                });
            }
        }

        var keyName = "RAID";
        var refreshGrid = function () {
            var getMethod = "GetResellerAliasByAliasId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                currentAliasDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configResellerAliasColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
            e.data.AliasID = resellerId;
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var id = e.data.RAID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();