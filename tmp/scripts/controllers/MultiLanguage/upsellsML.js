
(function () {
    var tableName = "UpsellsML";
    var currentUpsellDispName = '';
    var currentLangDispName = '';

    window.CmpTool.getUpsellsML = function (scope, categoryId) {
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var upsellTable = CmpToolStatic.upsellTableName;
        var upsellMethod = CmpToolStatic.upsellGetMethod;
        scope.getServiceData(upsellTable, upsellMethod, resellerId).then(function (upsellResponse) {
            scope.upsellDropdown = upsellResponse.data;
            var langTable = CmpToolStatic.activeLanguagesTableName;
            var langMethod = CmpToolStatic.activeLanguagesGetMethod;
            scope.getServiceData(langTable, langMethod).then(function (activeLangResponse) {
                scope.activeLanguagesDropdown = activeLangResponse.data;
                setDataSource(scope, categoryId);
            });
        });
    }

    function setDataSource(scope, categoryId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentUpsellDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentUpsellData = CmpToolUtility.searchDataTable(scope.upsellDropdown, e.data.UpsellID, 'UpsellId');
            if (currentUpsellData.length > 0) {
                currentUpsellDispName = currentUpsellData[0].DispName;
            } else {
                currentUpsellDispName = '';
            }
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "UpsellID";
        var refreshGrid = function () {
            var getMethod = "GetUpsellsMLByCategoryId";
            var id = categoryId;
            var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetUpsellsMLByResellerId";
                id = resellerId;
            }
            scope.getServiceData(tableName, getMethod, id).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configUpsellsMLColumns(scope);
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