
(function () {
    var tableName = "BillingTerms";
    var currentAccountDispName = '';
    var resellerId;

    window.CmpTool.getBillingTerms = function (scope, parentResellerId) {
        resellerId = parentResellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function(resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            var billingTable = CmpToolStatic.billingTermDisplayTypeTableName;
            var billingMethod = CmpToolStatic.billingTermDisplayTypeGetMethod;
            scope.getServiceData(billingTable, billingMethod).then(function(billingResponse) {
                scope.billingTermDisplayTypeDropdown = billingResponse.data;
                var typeTable = CmpToolStatic.billingTermTypeTableName;
                var typeMethod = CmpToolStatic.billingTermTypeGetMethod;
                scope.getServiceData(typeTable, typeMethod).then(function(typeResponse) {
                    scope.billingTermTypeDropdown = typeResponse.data;
                    setDataSource(scope);
                });
            });
        });
    }

    function setDataSource(scope) {
        var maxIdTableName = "BillingTerms";
        var maxIdGetMethod = "GetMaxId";
        

        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        
        myGrid.onCellPrepared = function(e) {
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentAccountDispName) {
                var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentAccountDispName);
            } 
        }

        // if it's insert, populate Id:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'Id') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_Id");
                });
            }
        }

        var keyName = "Id";
        var refreshGrid = function () {
            var getMethod = "GetBillingTermsByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                currentAccountDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configBillingTermsColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
            e.data.AccountId = resellerId;
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var id = e.data.Id;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();

