
(function () {
    var tableName = "DisplayPlansML";
    var currentPlanDispName = '';
    var currentLangDispName = '';
    var resellerId;

    window.CmpTool.getDisplayPlansML = function (scope, parentResellerId) {
        resellerId = parentResellerId;
        $("#btnEditHtml1").show();
        $("#btnEditHtml2").show();
        var planTable = CmpToolStatic.displayPlansTableName;
        var planMethod = CmpToolStatic.displayPlansGetMethod;
        scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
            scope.displayPlansDropdown = planResponse.data;
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
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentCatData = CmpToolUtility.searchDataTable(scope.displayPlansDropdown, e.data.PlanID, 'PlanID');
            if (currentCatData.length > 0) {
                currentPlanDispName = currentCatData[0].DispName;
            } else {
                currentPlanDispName = '';
            }
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "PlanID";
        var refreshGrid = function () {
            var getMethod = "GetDisplayPlansMLByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configDisplayPlansMLColumns(scope);
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
            e.data.AccountID = resellerId;
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