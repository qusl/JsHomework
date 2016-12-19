
(function () {
    var tableName = "MasterPlanSuggestion";
    var currentPlanSrcDispName = '';
    var currentPlanDestDispName = '';

    window.CmpTool.getMasterPlanSuggestions = function (scope, categoryId) {
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var planTable = CmpToolStatic.internalPlansTableName;
        var planMethod = CmpToolStatic.internalPlansWithPlanNumGetMethod;
        scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
            scope.internalPlansWithPlanNumDropdown = planResponse.data;
            setDataSource(scope, categoryId);
        });
    }

    function setDataSource(scope, categoryId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanSrcDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentPlanDestDispName);
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
        }

        var keyName = "SourcePlanNum";
        var refreshGrid = function () {
            var getMethod = "GetMasterPlanSuggestionByCategoryId";
            var id = categoryId;
            var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetMasterMasterPlanSuggestionByResellerId";
                id = resellerId;
            }
            if (parseInt(resellerId) === 0) {
                $('.button-custom-add').hide();
            } else {
                $('.button-custom-add').show();
            }
            scope.getServiceData(tableName, getMethod, id).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configMasterPlanSuggestionColumns(scope);
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
            var planNum = e.data.SourcePlanNum;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, planNum, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();