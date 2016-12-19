
(function () {
    var tableName = "PlanFeature";
    var currentPlanDispName = '';
    var currentPlanFeatureDispName = "";
    var isBatchEditing;

    window.CmpTool.getPlanFeatures = function (scope, categoryId) {
        isBatchEditing = false;
        $('#batchEditingCheckBox').show();
        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForPlanFeature();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var planTable = CmpToolStatic.internalPlansTableName;
        var planMethod = CmpToolStatic.internalPlansGetMethod;
        scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
            scope.internalPlansDropdown = planResponse.data;
            var featureTable = CmpToolStatic.planFeaturesBaseTableName;
            var featureMethod = CmpToolStatic.planFeaturesBaseGetMethod;
            scope.getServiceData(featureTable, featureMethod).then(function (featureResponse) {
                scope.planFeaturesBaseDropdown = featureResponse.data;
                setDataSource(scope, categoryId);
            });
        });
    }

    function setDataSource(scope, categoryId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert && !isBatchEditing) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentPlanFeatureDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentPlanData = CmpToolUtility.searchDataTable(scope.internalPlansDropdown, e.data.PlanId, 'PlanID');
            if (currentPlanData.length > 0) {
                currentPlanDispName = currentPlanData[0].DispName;
            } else {
                currentPlanDispName = '';
            }

            var currentPlanFeatureData = CmpToolUtility.searchDataTable(scope.planFeaturesBaseDropdown, e.data.FeatureId, 'FeatureId');
            if (currentPlanFeatureData.length > 0) {
                currentPlanFeatureDispName = currentPlanFeatureData[0].DispName;
            } else {
                currentPlanFeatureDispName = '';
            }
        }

        var keyName = "FeatureId";
        var refreshGrid = function () {
            var getMethod = "GetPlanFeaturesByCategoryId";
            var id = categoryId;
            var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetPlanFeaturesByResellerId";
                id = resellerId;
            }
            if (parseInt(resellerId) === 0) {
                $('.button-custom-add').hide();
            } else {
                $('.button-custom-add').show();
            }
            scope.getServiceData(tableName, getMethod, id).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configPlanFeaturesColumns(scope);
                if (isBatchEditing) {
                    myGrid.dataSource = CmpToolUtility.dataSourceForBatchEditing(scope, respRefresh.data, tableName, keyName, setDataSource);
                } else {
                    myGrid.dataSource = respRefresh.data;
                }
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid, isBatchEditing);
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
