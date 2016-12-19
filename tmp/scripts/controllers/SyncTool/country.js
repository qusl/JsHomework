
(function () {
    var tableName = "Country";

    window.CmpTool.getCountry = function (scope) {
        $('.button-custom-add').hide();
        $('.button-custom-delete').hide();
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnSync").show();
        }
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        var strText = 'To synchronize ' + tableName + '(ML) data from OSA to CMP?';
        var syncData = function () {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'Country';
            var syncMethod = "SyncDataForCountryTable";
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            scope.getServiceData(syncTable, syncMethod + '?userId=' + userId).then(function (syncResponse) {
                var affectedRows = parseInt(syncResponse.data);
                if (affectedRows > 0) {
                    Alert('Success! AffectedRows: ' + affectedRows);
                } else {
                    Alert('There is no difference between OSA and CMP. ');
                }
                refreshGrid();
            });
        }

        scope.btnSyncClick = function () {
            CmpToolUtility.AlertConfirm(strText, syncData);
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
        }

        var keyName = "TermID";
        var refreshGrid = function () {
            var getMethod = "GetCountry";
            scope.getServiceData(tableName, getMethod).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configCountryColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        //myGrid.onRowInserted = function (e) {
        //    scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
        //        refreshGrid();
        //    }
        //    );
        //};

        //myGrid.onRowRemoved = function (e) {
        //    var selected = JSON.stringify(e.key);
        //    scope.deleteServiceData(tableName, e.data[keyName], selected);
        //};
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();