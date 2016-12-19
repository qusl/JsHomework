
(function () {
    var tableName = "PlanGroupDependency";
    var currentPlanGroupDispName = "";
    var currentDependencyPlanGroupDispName = '';

    window.CmpTool.getPlanGroupDependencies = function (scope, resellerId) {
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        var childTable = CmpToolStatic.childPlanGroupTableName;
        var childMethod = CmpToolStatic.childPlanGroupGetMethod;
        scope.getServiceData(childTable, childMethod, resellerId).then(function (childResponse) {
            scope.childPlanGroupDropdown = childResponse.data;
            setDataSource(scope, resellerId);
        });
    }

    function setDataSource(scope, resellerId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanGroupDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentDependencyPlanGroupDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentPlanGroupData = CmpToolUtility.searchDataTable(scope.childPlanGroupDropdown, e.data.PlanGroupId, 'PlanGroupID');
            if (currentPlanGroupData.length > 0) {
                currentPlanGroupDispName = currentPlanGroupData[0].DispName;
            } else {
                currentPlanGroupDispName = '';
            }

            var currentDependencyData = CmpToolUtility.searchDataTable(scope.childPlanGroupDropdown, e.data.DependencyPlanGroupId, 'PlanGroupID');
            if (currentDependencyData.length > 0) {
                currentDependencyPlanGroupDispName = currentDependencyData[0].DispName;
            } else {
                currentDependencyPlanGroupDispName = '';
            }
        }

        var keyName = "PlanGroupId";
        var refreshGrid = function () {
            var getMethod = "GetPlanGroupDependenciesByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configPlanGroupDependenciesColumns(scope);
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