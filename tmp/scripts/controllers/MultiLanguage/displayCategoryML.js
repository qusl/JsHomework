
(function () {
    var tableName = "DisplayCategoryML";
    var currentCategoryDispName = '';
    var currentLangDispName = '';
    var resellerId;

    window.CmpTool.getAllDisplayCategoryML = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        $("#btnEditHtml1").show();
        var catTable = CmpToolStatic.displayCategoriesTableName;
        var catMethod = CmpToolStatic.displayCategoriesGetMethod;
        scope.getServiceData(catTable, catMethod, resellerId).then(function (catResponse) {
            scope.displayCategoriesDropdown = catResponse.data;
            var langTable = CmpToolStatic.activeLanguagesTableName;
            var langMethod = CmpToolStatic.activeLanguagesGetMethod;
            scope.getServiceData(langTable, langMethod).then(function (activeLangResponse) {
                scope.activeLanguagesDropdown = activeLangResponse.data;
                setDataSource(scope);
            });
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentCategoryDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentCatData = CmpToolUtility.searchDataTable(scope.displayCategoriesDropdown, e.data.CategoryID, 'CategoryID');
            if (currentCatData.length > 0) {
                currentCategoryDispName = currentCatData[0].DispName;
            } else {
                currentCategoryDispName = '';
            }
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "CategoryID";
        var refreshGrid = function () {
            var getMethod = "GetDisplayCategoryMLByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configDisplayCategoryMLColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
            if (!e.data.CategoryHTML) {
                e.data.CategoryHTML = '';
            }
            if (!e.data.CategoryDescription) {
                e.data.CategoryDescription = '';
            }
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