﻿
(function() {
    var tableName = "IpPattern";

    window.CmpTool.getAllIpPattern = function (scope) {
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        var keyName = "IpPattern";
        var refreshGrid = function () {
            var getMethod = "GetAllIpPattern";
            scope.getServiceData(tableName, getMethod).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configIpPatternColumns(scope);
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
