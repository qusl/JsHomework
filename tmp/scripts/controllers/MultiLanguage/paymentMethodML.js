
(function () {
    var tableName = "PaymentMethodML";
    var currentPaymentMethodDispName = "";
    var currentLangDispName = '';
    var resellerId;

    window.CmpTool.getAllPaymentMethodML = function (scope, parentResellerId) {
        resellerId = parentResellerId;
        var payTable = CmpToolStatic.paymentMethodsTableName;
        var payMethod = CmpToolStatic.paymentMethodsGetMethod;
        scope.getServiceData(payTable, payMethod).then(function (payResponse) {
            scope.paymentMethodsDropdown = payResponse.data;
            var langTable = CmpToolStatic.activeLanguagesTableName;
            var langMethod = CmpToolStatic.activeLanguagesGetMethod;
            scope.getServiceData(langTable, langMethod).then(function (activeLangResponse) {
                scope.activeLanguagesDropdown = activeLangResponse.data;
                setDataSource(scope);
            });
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPaymentMethodDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentData = CmpToolUtility.searchDataTable(scope.paymentMethodsDropdown, e.data.PaymentMethodId, 'Id');
            if (currentData.length > 0) {
                currentPaymentMethodDispName = currentData[0].DispName;
            } else {
                currentPaymentMethodDispName = '';
            }
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "PaymentMethodId";
        var refreshGrid = function () {
            var getMethod = "GetAllPaymentMethodML";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configPaymentMethodMLColumns(scope);
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