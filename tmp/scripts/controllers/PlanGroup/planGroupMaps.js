
(function () {
    var tableName = "PlanGroupMap";
    var currentPlanGroupDispName = "";
    var currentPlanDispName = '';

    window.CmpTool.getPlanGroupMap = function (scope, categoryId) {
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var childTable = CmpToolStatic.childPlanGroupTableName;
        var childMethod = CmpToolStatic.childPlanGroupGetMethod;
        scope.getServiceData(childTable, childMethod, resellerId).then(function (childResponse) {
            scope.childPlanGroupDropdown = childResponse.data;
            var planTable = CmpToolStatic.internalPlansWithPlanNumTableName;
            var planMethod = CmpToolStatic.internalPlansWithPlanNumGetMethod;
            scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
                scope.internalPlansWithPlanNumDropdown = planResponse.data;
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
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanGroupDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentPlanDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentPlanGroupData = CmpToolUtility.searchDataTable(scope.childPlanGroupDropdown, e.data.PlanGroupID, 'PlanGroupID');
            if (currentPlanGroupData.length > 0) {
                currentPlanGroupDispName = currentPlanGroupData[0].DispName;
            } else {
                currentPlanGroupDispName = '';
            }

            var currentParentData = CmpToolUtility.searchDataTable(scope.internalPlansWithPlanNumDropdown, e.data.PlanNum, 'PlanNum');
            if (currentParentData.length > 0) {
                currentPlanDispName = currentParentData[0].DispName;
            } else {
                currentPlanDispName = '';
            }
        }

        var keyName = "PlanGroupID";
        var refreshGrid = function () {
            var getMethod = "GetPlanGroupMapByCategoryId";
            var id = categoryId;
            var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetPlanGroupMapsByResellerId";
                id = resellerId;
            }
            if (parseInt(resellerId) === 0) {
                $('.button-custom-add').hide();
            } else {
                $('.button-custom-add').show();
            }
            scope.getServiceData(tableName, getMethod, id).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configPlanGroupMapsColumns(scope);
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