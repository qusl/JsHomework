
(function() {
    var tableName = "BillingTermDescriptionMap";
    var currentBillingTermDispName = "";
    var currentDescriptionDispName = '';
    var resellerId;

    window.CmpTool.getBillingTermDescriptionMap = function (scope, parentResellerId) {
        resellerId = parentResellerId;
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        var billingTable = CmpToolStatic.billingTermsTableName;
        var billingMethod = CmpToolStatic.billingTermsGetMethod;
        scope.getServiceData(billingTable, billingMethod, resellerId).then(function (billingResponse) {
            scope.billingTermsDropdown = billingResponse.data;
            var descTable = CmpToolStatic.billingTermDescriptionTableName;
            var descMethod = CmpToolStatic.billingTermDescriptionGetMethod;
            scope.getServiceData(descTable, descMethod).then(function (descResponse) {
                scope.billingTermDescriptionDropdown = descResponse.data;
                setDataSource(scope);
            });
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function(e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentBillingTermDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentDescriptionDispName);
            }
        }
        
        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentBillingtermData = CmpToolUtility.searchDataTable(scope.billingTermsDropdown, e.data.BillingTermId, 'Id');
            if (currentBillingtermData.length > 0) {
                currentBillingTermDispName = currentBillingtermData[0].DispName;
            } else {
                currentBillingTermDispName = '';
            }

            var currentDescriptionData = CmpToolUtility.searchDataTable(scope.billingTermDescriptionDropdown, e.data.BillingTermDescriptionId, 'Id');
            if (currentDescriptionData.length > 0) {
                currentDescriptionDispName = currentDescriptionData[0].DispName;
            } else {
                currentDescriptionDispName = '';
            }
        }

        var keyName = "BillingTermId";
        var refreshGrid = function () {
            var getMethod = "GetBillingTermDescriptionMapByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configBillingTermDescriptionMapColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function() {
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
