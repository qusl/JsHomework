
(function () {
    var tableName = "MasterPlanSuggestionML";
    var currentPlanSrcDispName = '';
    var currentPlanDestDispName = '';
    var currentLangDispName = '';
    var resellerId;

    window.CmpTool.getMasterPlanSuggestionMLByResellerId = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        var planTable = CmpToolStatic.internalPlansTableName;
        var planMethod = CmpToolStatic.internalPlansWithPlanNumGetMethod;
        scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
            scope.internalPlansWithPlanNumDropdown = planResponse.data;
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
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanSrcDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentPlanDestDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 2, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentPlanSrcData = CmpToolUtility.searchDataTable(scope.internalPlansWithPlanNumDropdown, e.data.SourcePlanNum, 'PlanNum');
            if (currentPlanSrcData.length > 0) {
                currentPlanSrcDispName = currentPlanSrcData[0].DispName;
            } else {
                currentPlanSrcDispName = '';
            }
            var currentPlanDestData = CmpToolUtility.searchDataTable(scope.internalPlansWithPlanNumDropdown, e.data.SuggestedPlanNum, 'PlanNum');
            if (currentPlanDestData.length > 0) {
                currentPlanDestDispName = currentPlanDestData[0].DispName;
            } else {
                currentPlanDestDispName = '';
            }
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "SourcePlanNum";
        var refreshGrid = function () {
            var getMethod = "GetMasterPlanSuggestionMLByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configMasterPlanSuggestionMLColumns(scope);
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
            var id = e.data.SourcePlanNum;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();