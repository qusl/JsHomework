
(function () {
    var tableName = "TermsAndConditionsPaytoolMap";
    var currentGroupDispName = "";
    var currentTermDispName = "";
    var currentPayToolDispName = '';

    window.CmpTool.getTermsAndConditionsPayToolMap = function (scope, resellerId) {
        var groupTable = CmpToolStatic.termsAndConditionsGroupTableName;
        var groupMethod = CmpToolStatic.termsAndConditionsGroupGetMethod;
        scope.getServiceData(groupTable, groupMethod).then(function (groupResponse) {
            scope.termsAndConditionsGroupDropdown = groupResponse.data;
            var tcTable = CmpToolStatic.termsAndConditionsTableName;
            var tcMethod = CmpToolStatic.termsAndConditionsGetMethod;
            scope.getServiceData(tcTable, tcMethod, resellerId).then(function (tcResponse) {
                scope.termsAndConditionsDropdown = tcResponse.data;
                var payTable = CmpToolStatic.payToolsTableName;
                var payMethod = CmpToolStatic.payToolsGetMethod;
                scope.getServiceData(payTable, payMethod, resellerId).then(function (payResponse) {
                    scope.payToolsDropdown = payResponse.data;
                    setDataSource(scope, resellerId);
                });
            });
        });
    }

    function setDataSource(scope, resellerId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentGroupDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentTermDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 2, currentPayToolDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentGroupData = CmpToolUtility.searchDataTable(scope.termsAndConditionsGroupDropdown, e.data.TermGroupID, 'TermGroupID');
            if (currentGroupData.length > 0) {
                currentGroupDispName = currentGroupData[0].DispName;
            } else {
                currentGroupDispName = '';
            }

            var currentTermsData = CmpToolUtility.searchDataTable(scope.termsAndConditionsDropdown, e.data.TermID, 'TermID');
            if (currentTermsData.length > 0) {
                currentTermDispName = currentTermsData[0].DispName;
            } else {
                currentTermDispName = '';
            }

            var currentPayToolData = CmpToolUtility.searchDataTable(scope.payToolsDropdown, e.data.PayToolID, 'PayToolID');
            if (currentPayToolData.length > 0) {
                currentPayToolDispName = currentPayToolData[0].DispName;
            } else {
                currentPayToolDispName = '';
            }
        }

        var keyName = "TermGroupID";
        var refreshGrid = function () {
            var getMethod = "GetTermsAndConditionsPaytoolMapByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configTermsAndConditionsPaytoolMapColumns(scope);
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
            var id = e.data.TermGroupID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();