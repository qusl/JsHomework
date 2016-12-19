

(function () {
    var tableName = "PlanGroup";
    var currentAccountDispName = '';
    var resellerId, isBatchEditing;

    window.CmpTool.getPlanGroups = function (scope, parentResellerId) {
        isBatchEditing = false;
        $('#batchEditingCheckBox').show();

        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForPlanGroup();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }

        resellerId = parentResellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod).then(function (resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            setDataSource(scope);
        });
    }

    function setDataSource(scope) {
        var maxIdTableName = "PlanGroup";
        var maxIdGetMethod = "GetMaxId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentAccountDispName) {
                var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentAccountDispName);
            }
        }

        // if it's insert, populate PlanGroupID:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'PlanGroupID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_PlanGroupID");
                });
            }
        }

        var keyName = "PlanGroupID";
        var refreshGrid = function () {
            var getMethod = "GetPlanGroupsByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                currentAccountDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configPlanGroupColumns(scope);
                myGrid.dataSource = respRefresh.data;

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
            e.data.ResellerID = resellerId;
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        }

        myGrid.onRowRemoved = function (e) {
            var id = e.data.PlanGroupID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();





