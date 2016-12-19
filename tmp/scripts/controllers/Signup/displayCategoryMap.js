
(function () {
    var tableName = "DisplayCategoryMap";
    var currentCategoryDispName = "";
    var currentParentCategoryDispName = '';

    window.CmpTool.getDisplayCategoryMap = function (scope, categoryId) {
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var catTable = CmpToolStatic.displayCategoriesTableName;
        var catMethod = CmpToolStatic.displayCategoriesGetMethod;
        scope.getServiceData(catTable, catMethod, resellerId).then(function (catResponse) {
            scope.displayCategoriesDropdown = catResponse.data;
            var parentTable = CmpToolStatic.displayParentCategoriesTableName;
            var parentMethod = CmpToolStatic.displayParentCategoriesGetMethod;
            scope.getServiceData(parentTable, parentMethod, resellerId).then(function(parentResponse) {
                scope.displayParentCategoriesDropdown = parentResponse.data;
                setDataSource(scope, categoryId);
            });
        });
    }

    function setDataSource(scope, categoryId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        var allCategories = scope.displayCategoriesDropdown;
        var allParentCategories = scope.displayParentCategoriesDropdown;

        myGrid.onCellPrepared = function(e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentCategoryDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentParentCategoryDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentCategoryData = CmpToolUtility.searchDataTable(allCategories, e.data.CategoryID, 'CategoryID');
            if (currentCategoryData.length > 0) {
                currentCategoryDispName = currentCategoryData[0].DispName;
            } else {
                currentCategoryDispName = '';
            }

            var currentParentCategoryData = CmpToolUtility.searchDataTable(allParentCategories, e.data.ParentCategoryID, 'CategoryID');
            if (currentParentCategoryData.length > 0) {
                currentParentCategoryDispName = currentParentCategoryData[0].DispName;
            } else {
                currentParentCategoryDispName = '';
            }
        }

        var keyName = "CategoryID";
        var refreshGrid = function () {
            var getMethod = "GetDisplayCategoryMapByCategoryId";
            var id = categoryId;
            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetDisplayCategoryMapByResellerId";
                id = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            }
            scope.getServiceData(tableName, getMethod, id).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configDisplayCategoryMapColumns(scope);
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
            var idfind = e.data.CategoryID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, idfind, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();
