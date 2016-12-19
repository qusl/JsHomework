
(function() {
    var tableName = "MasterTerms";
    var isBatchEditing;

    window.CmpTool.getAllMasterTerms = function (scope) {
        isBatchEditing = false;
        $('#batchEditingCheckBox').show();
        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showNormalBtns();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
        setDataSource(scope);
    }

    var setDataSource = function(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        // if it's insert, populate PlanNum:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'TermNum') {
                var maxIdGetMethod = "GetMaxId";
                scope.getServiceData(tableName, maxIdGetMethod).then(function (respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_TermNum");
                }); 
            }
        }

        var keyName = "TermNum";
        var refreshGrid = function () {
            var getMethod = "GetList";
            CmpToolUtility.showLoadingPage();
            scope.getServiceData(tableName, getMethod).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configMasterTermsAndConditionsColumns(scope);
                if (isBatchEditing) {
                    myGrid.dataSource = CmpToolUtility.dataSourceForBatchEditing(scope, respRefresh.data, tableName, keyName, setDataSource);
                } else {
                    myGrid.dataSource = respRefresh.data;
                }
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid, isBatchEditing);
            });
        };

        myGrid.onRowUpdated = function(e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            });
        };

        myGrid.onRowRemoved = function(e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };

        refreshGrid();
    }
})();
