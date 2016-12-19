
(function () {
    var tableName = "ResellerLanguages";
    var currentParentDispName = '';
    var resellerId;

    window.CmpTool.getResellerLanguages = function(scope, parentresellerId) {
        resellerId = parentresellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function(resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            var allLanguagesTable = CmpToolStatic.allLanguagesTableName;
            var allLangMethod = CmpToolStatic.allLanguagesGetMethod;
            scope.getServiceData(allLanguagesTable, allLangMethod).then(function(allLangResponse) {
                scope.allLanguagesDropdown = allLangResponse.data;
                var langTable = CmpToolStatic.activeLanguagesTableName;
                var langMethod = CmpToolStatic.activeLanguagesGetMethod;
                scope.getServiceData(langTable, langMethod).then(function(activeLangResponse) {
                    scope.activeLanguagesDropdown = activeLangResponse.data;
                    setDataSource(scope);
                });
            });
        });
    }

    function setDataSource(scope) {
        var maxIdTableName = "ResellerLanguages";
        var maxIdGetMethod = "GetMaxResellerLanguagesId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentParentDispName) {
                var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentParentDispName);
            }
        }

        // if it's insert, populate ID:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'ID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_ID");
                });
            }
        }

        var keyName = "ID";
        var refreshGrid = function () {
            var getMethod = "GetAllResellerLanguagesByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                currentParentDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configResellerLanguagesColumns(scope);
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
            var id = e.data.ID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();