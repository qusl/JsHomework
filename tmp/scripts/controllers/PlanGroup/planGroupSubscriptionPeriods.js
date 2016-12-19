

(function () {
    var tableName = "PlanGroupSubscriptionPeriods";
    var currentPlanGroupDispName = "";
    var currentPeriod = 0;
    var currentPeriodType = 0;
    var resellerId;

    window.CmpTool.getPlanGroupSubscriptionPeriods = function (scope, parentResellerId) {
        resellerId = parentResellerId;
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }

        var groupTable = CmpToolStatic.parentPlanGroupTableName;
        var groupMethod = CmpToolStatic.parentPlanGroupGetMethod;
        scope.getServiceData(groupTable, groupMethod, resellerId).then(function (groupResponse) {
            scope.parentPlanGroupDropdown = groupResponse.data;
            setDataSource(scope);
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanGroupDispName);
                CmpToolUtility.setTextBoxReadOnly(currentPeriod, '_SubscriptionPeriod');
                CmpToolUtility.setTextBoxReadOnly(currentPeriodType, '_SubscriptionPeriodType');
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentPlanGroupData = CmpToolUtility.searchDataTable(scope.parentPlanGroupDropdown, e.data.PlanGroupID, 'PlanGroupID');
            if (currentPlanGroupData.length > 0) {
                currentPlanGroupDispName = currentPlanGroupData[0].DispName;
            } else {
                currentPlanGroupDispName = '';
            }
            currentPeriod = currentPlanGroupData[0].SubscriptionPeriod;
            currentPeriodType = currentPlanGroupData[0].SubscriptionPeriodType;
        }

        var keyName = "PlanGroupID";
        var refreshGrid = function () {
            var getMethod = "GetPlanGroupSubscriptionPeriodsByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configPlanGroupSubscriptionPeriodsColumns(scope);
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