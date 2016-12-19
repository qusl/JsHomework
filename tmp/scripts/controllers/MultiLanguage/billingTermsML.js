
(function () {
    var tableName = "BillingTermsML";
    var currentBillingTermDispName = "";
    var currentLangDispName = '';
    var resellerId;

    window.CmpTool.getAllBillingTermsML = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        var billingTable = CmpToolStatic.billingTermsTableName;
        var billingMethod = CmpToolStatic.billingTermsGetMethod;
        scope.getServiceData(billingTable, billingMethod, resellerId).then(function (billingResponse) {
            scope.billingTermsDropdown = billingResponse.data;
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
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentBillingTermDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
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
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "BillingTermId";
        var refreshGrid = function () {
            var getMethod = "GetBillingTermsMLByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configBillingTermsMLColumns(scope);
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