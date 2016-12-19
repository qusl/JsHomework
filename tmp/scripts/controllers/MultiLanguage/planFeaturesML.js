
(function () {
    var tableName = "PlanFeaturesML";
    var currentPlanDispName = '';
    var currentFeatureDispName = "";
    var currentLangDispName = '';
    var resellerId;

    window.CmpTool.getAllPlanFeaturesML = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        var featureTable = CmpToolStatic.planFeaturesBaseTableName;
        var featureMethod = CmpToolStatic.planFeaturesBaseGetMethod;
        scope.getServiceData(featureTable, featureMethod).then(function (featureResponse) {
            scope.planFeaturesBaseDropdown = featureResponse.data;
            var planTable = CmpToolStatic.internalPlansTableName;
            var planMethod = CmpToolStatic.internalPlansGetMethod;
            scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
                scope.internalPlansDropdown = planResponse.data;
                var langTable = CmpToolStatic.activeLanguagesTableName;
                var langMethod = CmpToolStatic.activeLanguagesGetMethod;
                scope.getServiceData(langTable, langMethod).then(function (activeLangResponse) {
                    scope.activeLanguagesDropdown = activeLangResponse.data;
                    setDataSource(scope);
                });
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
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentFeatureDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 2, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var pId = e.data.PlanId;
            currentPlanDispName = CmpToolUtility.getDispNameByPlanId(scope.internalPlansDropdown, pId);
            var currentData = CmpToolUtility.searchDataTable(scope.planFeaturesBaseDropdown, e.data.FeatureId, 'FeatureId');
            if (currentData.length > 0) {
                currentFeatureDispName = currentData[0].DispName;
            } else {
                currentFeatureDispName = '';
            }
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "FeatureId";
        var refreshGrid = function () {
            var getMethod = "GetPlanFeaturesMLByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configPlanFeaturesMLColumns(scope);
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