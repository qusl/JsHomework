
(function() {
    var tableName = "BillingTermPaymentMethodMap";
    var currentBillingTermDispName = "";
    var currentPaymentMethodDispName = '';
    var resellerId;

    window.CmpTool.getBillingTermPaymentMethodMap = function (scope, parentResellerId) {
        resellerId = parentResellerId;
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        var billingTable = CmpToolStatic.billingTermsTableName;
        var billingMethod = CmpToolStatic.billingTermsGetMethod;
        scope.getServiceData(billingTable, billingMethod, resellerId).then(function(billingResponse) {
            scope.billingTermsDropdown = billingResponse.data;
            var payTable = CmpToolStatic.paymentMethodsTableName;
            var payMethod = CmpToolStatic.paymentMethodsGetMethod;
            scope.getServiceData(payTable, payMethod).then(function(payResponse) {
                scope.paymentMethodsDropdown = payResponse.data;
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
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentPaymentMethodDispName);
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

            var currentPaymentmethodData = CmpToolUtility.searchDataTable(scope.paymentMethodsDropdown, e.data.PaymentMethodId, 'Id');
            if (currentPaymentmethodData.length > 0) {
                currentPaymentMethodDispName = currentPaymentmethodData[0].DispName;
            } else {
                currentPaymentMethodDispName = '';
            }
        }

        var keyName = "BillingTermId";
        var refreshGrid = function () {
            var getMethod = "GetBillingTermPaymentMethodMapByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configBillingTermPaymentMethodMapColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
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
