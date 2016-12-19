
(function () {
    var tableName = "PlanGroupML";
    var currentPlanGroupDispName = "";
    var currentLangDispName = '';
    var resellerId;

    window.CmpTool.getAllPlanGroupML = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        var planGroupTable = CmpToolStatic.allPlanGroupTableName;
        var planGroupMethod = CmpToolStatic.allPlanGroupGetMethod;
        scope.getServiceData(planGroupTable, planGroupMethod, resellerId).then(function (panGroupResponse) {
            scope.allPlanGroupDropdown = panGroupResponse.data;
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
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanGroupDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentData = CmpToolUtility.searchDataTable(scope.allPlanGroupDropdown, e.data.PlanGroupID, 'PlanGroupID');
            if (currentData.length > 0) {
                currentPlanGroupDispName = currentData[0].DispName;
            } else {
                currentPlanGroupDispName = '';
            }
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "PlanGroupID";
        var refreshGrid = function () {
            var getMethod = "GetPlanGroupMLByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configPlanGroupMLColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
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