﻿
(function() {
    var tableName = "PaymentMethods";

    window.CmpTool.getAllPaymentMethods = function (scope) {
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var maxIdTableName = "PaymentMethods";
        var maxIdGetMethod = "GetMaxId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        // if it's insert, populate Id:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'Id') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_Id");
                });
            }
        }

        var keyName = "Id";
        var refreshGrid = function () {
            var getMethod = "GetAllPaymentMethods";
            scope.getServiceData(tableName, getMethod).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configPaymentMethodsColumns(scope);
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
