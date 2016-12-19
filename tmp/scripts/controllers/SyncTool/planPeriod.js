
(function() {
    var tableName = "PlanPeriodSync";
    var resellerId;

    window.CmpTool.getPlanPeriod = function(scope, parentresellerId) {
        $('.button-custom-add').hide();
        $('.button-custom-edit').hide();
        $('.button-custom-delete').hide();
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnSync").show();
        }
        resellerId = parentresellerId;
        setDataSource(scope);
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        var strText = 'To synchronize PlanPeriod data from OSA to CMP based on InternalPlans for ResellerId = ' + resellerId + '?';
        var syncData = function () {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'PlanPeriodSync';
            var syncMethod = "SyncDataFromSyncMappingTableByResellerId";
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            scope.getServiceData(syncTable, syncMethod, resellerId + '?userId=' + userId).then(function (syncResponse) {
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
            myGrid.selection = { mode: 'single' };
            CmpToolUtility.AlertConfirm(strText, syncData);
        }

        var refreshGrid = function () {
            var getMethod = "GetPlanPeriodByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configPlanPeriodColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();


//var refreshGridFromOsa = function () {
//    CmpToolUtility.showLoadingPage();
//    myGrid.selection = { mode: 'multiple' };
//    var getMethod = "GetPlanPeriodFromOsaByResellerId";
//    scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
//        myGrid.columns = window.CmpTool.configPlanPeriodColumns(scope);
//        myGrid.dataSource = {
//            store: {
//                data: respRefresh.data,
//                type: 'array',
//                key: 'PlanPeriodId'
//            }
//        }
//        var ids = CmpToolUtility.getIdsArrayByColName(sqlData, 'PlanPeriodId');

//        // push new ids from SynMappingTable
//        var controller = "SyncMappingTable";
//        getMethod = "GetNotSyncedDataByResellerIdForSyncTool";
//        var objType = 'PlanPeriod';
//        scope.getServiceData(controller, getMethod, resellerId, objType).then(function (respSync) {
//            var sync = respSync.data;
//            for (var i = 0; i < sync.length; i++) {
//                var objId = sync[i].IntObjID;
//                ids = CmpToolUtility.checkAndPush(objId, ids);
//            }
//            myGrid.selectedRowKeys = ids;
//            CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
//        });
//    });
//};