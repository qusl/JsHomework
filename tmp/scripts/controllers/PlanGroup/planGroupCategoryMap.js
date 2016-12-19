
(function () {
    var tableName = "PlanGroupCategoryMap";
    var currentPlanGroupDispName = "";
    var currentParentPlanGroupDispName = '';

    window.CmpTool.getPlanGroupCategoryMap = function (scope, resellerId) {
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        var childTable = CmpToolStatic.childPlanGroupTableName;
        var childMethod = CmpToolStatic.childPlanGroupGetMethod;
        scope.getServiceData(childTable, childMethod, resellerId).then(function (childResponse) {
            scope.childPlanGroupDropdown = childResponse.data;
            var parentTable = CmpToolStatic.parentPlanGroupTableName;
            var parentMethod = CmpToolStatic.parentPlanGroupGetMethod;
            scope.getServiceData(parentTable, parentMethod, resellerId).then(function (parentResponse) {
                scope.parentPlanGroupDropdown = parentResponse.data;
                setDataSource(scope, resellerId);
            });
        });
    }

    function setDataSource(scope, resellerId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanGroupDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentParentPlanGroupDispName);
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

            var currentParentData = CmpToolUtility.searchDataTable(scope.parentPlanGroupDropdown, e.data.ParentPlanGroupID, 'PlanGroupID');
            if (currentParentData.length > 0) {
                currentParentPlanGroupDispName = currentParentData[0].DispName;
            } else {
                currentParentPlanGroupDispName = '';
            }
        }

        var keyName = "PlanGroupID";
        var refreshGrid = function () {
            var getMethod = "GetPlanGroupCategoryMapByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configPlanGroupCategoryMapColumns(scope);
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