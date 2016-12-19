
(function () {
    var tableName = "ResourceCategory";
    var resellerId;

    window.CmpTool.getResourceCategory = function (scope) {
        $('.button-custom-add').hide();
        $('.button-custom-edit').hide();
        $('.button-custom-delete').hide();
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnSync").show();
        }
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var strText = 'To synchronize ' + tableName + '(Map) data from OSA to CMP for ResellerId = ' + resellerId + '?';
        
        var syncData = function () {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'ResourceCategory';
            var syncMethod = "SyncDataForResourceCategoryTable";
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            scope.getServiceData(syncTable, syncMethod + '?resellerId=' + resellerId + '&userId=' + userId).then(function (syncResponse) {
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
            var getMethod = "GetResourceCategory";
            scope.getServiceData(tableName, getMethod + '?resellerId=' + resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configResourceCategoryColumns(scope);
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