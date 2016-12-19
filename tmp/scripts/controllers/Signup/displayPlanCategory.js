
(function () {
    var tableName = "DisplayPlanCategory";
    var currentCategoryDispName = "";
    var currentPlanDispName = '';

    window.CmpTool.getDisplayPlanCategory = function (scope, categoryId) {
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var planTable = CmpToolStatic.displayPlansTableName;
        var planMethod = CmpToolStatic.displayPlansGetMethod;
        scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
            scope.displayPlansDropdown = planResponse.data;
            var catTable = CmpToolStatic.displayCategoriesTableName;
            var catMethod = CmpToolStatic.displayCategoriesGetMethod;
            scope.getServiceData(catTable, catMethod, resellerId).then(function (catResponse) {
                scope.displayCategoriesDropdown = catResponse.data;
                setDataSource(scope, categoryId);
            });
        });
    }

    function setDataSource(scope, categoryId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function(e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentCategoryDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentPlanDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentCategoryData = CmpToolUtility.searchDataTable(scope.displayCategoriesDropdown, e.data.CategoryID, 'CategoryID');
            if (currentCategoryData.length > 0) {
                currentCategoryDispName = currentCategoryData[0].DispName;
            } else {
                currentCategoryDispName = '';
            }

            var currentPlanData = CmpToolUtility.searchDataTable(scope.displayPlansDropdown, e.data.DisplayPlanID, 'PlanID');
            if (currentPlanData.length > 0) {
                currentPlanDispName = currentPlanData[0].DispName;
            } else {
                currentPlanDispName = '';
            }
        }

        var keyName = "CategoryID";
        var refreshGrid = function () {
            var getMethod = "GetDisplayPlanCategoryByCategoryId";
            var id = categoryId;
            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetDisplayPlanCategoryByResellerId";
                id = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            }
            scope.getServiceData(tableName, getMethod, id).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configDisplayPlanCategoryColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var catid = e.data.CategoryID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, catid, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        myGrid.stateStoring.storageKey = "storage" + tableName;
        
        refreshGrid();
    }
})();
