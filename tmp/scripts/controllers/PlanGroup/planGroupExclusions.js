
(function () {
    var tableName = "PlanGroupExclusions";
    var currentPlanGroupDispName = "";
    var currentExclusivePlanGroupDispName = '';

    window.CmpTool.getPlanGroupExclusions = function (scope, resellerId) {
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        $('.button-custom-edit').hide();
        var groupTable = CmpToolStatic.allPlanGroupTableName;
        var groupMethod = CmpToolStatic.allPlanGroupGetMethod;
        scope.getServiceData(groupTable, groupMethod, resellerId).then(function (groupResponse) {
            scope.allPlanGroupDropdown = groupResponse.data;
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
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentExclusivePlanGroupDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentPlanGroupData = CmpToolUtility.searchDataTable(scope.allPlanGroupDropdown, e.data.PlanGroupId, 'PlanGroupID');
            if (currentPlanGroupData.length > 0) {
                currentPlanGroupDispName = currentPlanGroupData[0].DispName;
            } else {
                currentPlanGroupDispName = '';
            }

            var currentExclusiveData = CmpToolUtility.searchDataTable(scope.allPlanGroupDropdown, e.data.ExclusivePlanGroupId, 'PlanGroupID');
            if (currentExclusiveData.length > 0) {
                currentExclusivePlanGroupDispName = currentExclusiveData[0].DispName;
            } else {
                currentExclusivePlanGroupDispName = '';
            }
        }

        var keyName = "PlanGroupId";
        var refreshGrid = function () {
            var getMethod = "GetPlanGroupExclusionsByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configExclusivePlanGroupIdColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        //myGrid.onRowUpdated = function (e) {
        //    var selected = JSON.stringify(e.key);
        //    scope.updateServiceData(tableName, keyName, selected);
        //};

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