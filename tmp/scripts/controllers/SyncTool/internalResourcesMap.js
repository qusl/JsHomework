
(function() {
    var tableName = "InternalResourcesMap";
    var resellerId;
    var sqlData;

    window.CmpTool.getInternalResourcesMap = function (scope, parentresellerId) {
        $('.button-custom-add').hide();
        $('.button-custom-edit').show();
        $('#btnFixNums').show();
        $('.button-custom-add').hide();
        $('.button-custom-edit').show();
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnOsa").show();
        }
        resellerId = parentresellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = "GetParentResellersForDropDown";
        scope.getServiceData(resellerTable, resellerMethod).then(function (resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            var permissionTable = CmpToolStatic.permissionTypeTableName;
            var permissionMethod = CmpToolStatic.permissionTypeGetMethod;
            scope.getServiceData(permissionTable, permissionMethod).then(function (permissionResponse) {
                scope.permissionTypeDropdown = permissionResponse.data;
                setDataSource(scope);
            });
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        scope.btnOsaClick = function () {
            $('.button-custom-edit').hide();
            $('.button-custom-delete').hide();
            $('#btnFixNums').hide();
            $("#btnOsa").hide();
            $("#btnSync").show();
            refreshGridFromOsa();
        }

        var fixNums = function () {
            CmpToolUtility.showLoadingPage();
            var fixNumsTable = 'ResourceNumAggregator';
            var fixNumsMethod = "UpdateDisabledResourceNum";
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            scope.getServiceData(fixNumsTable, fixNumsMethod, resellerId + '?userId=' + userId).then(function (fixNumsResponse) {
                CmpToolUtility.hideLoadingPage();
                var affectedRows = parseInt(fixNumsResponse.status);
                if (affectedRows === 200) {
                    Alert('Success! Please check AutomationApiLog table for detail information.');
                } else {
                    Alert('Failed, please try again.');
                }
            });
        }

        var strText = 'To synchronize ' + tableName + ' data from OSA to CMP for selected records(if no record is selected, will check the deleted rows)?';
        var syncData = function () {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'InternalResourcesMap';
            var syncMethod = "SyncDataByIds";
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            var resourceIdsArray = $("#gridContainer").data("dxDataGrid").getSelectedRowKeys();
            scope.getServiceData(syncTable, syncMethod, resellerId, userId, resourceIdsArray).then(function (syncResponse) {
                var affectedRows = parseInt(syncResponse.data);
                if (affectedRows > 0) {
                    Alert('Success! AffectedRows: ' + affectedRows);
                } else {
                    Alert('There is no difference between OSA and CMP. ');
                }
                refreshGrid();
                $('.button-custom-edit').show();
                $('.button-custom-delete').show();
                $('#btnFixNums').show();
                $("#btnOsa").show();
                $("#btnSync").hide();
            });
        }

        scope.btnFixNumsClick = function () {
            //var key = $("#gridContainer").data("dxDataGrid").getSelectedRowKeys()[0];
            //if (typeof (key) == "undefined") {
            //    CmpToolUtility.AlertError('Please select a row!');
            //}
            //var resourceId = key.ResourceID;
            var strFixNumsText = 'To Change ResourceNum to NULL for all Resources with IsActive = false?';
            CmpToolUtility.AlertConfirm(strFixNumsText, fixNums);
        }

        scope.btnSyncClick = function () {
            myGrid.selection = { mode: 'single' };
            CmpToolUtility.AlertConfirm(strText, syncData);
        }

        myGrid.onEditingStart = function (e) {
            // add this for permissionType dropdown
        }

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && editorElement.length > 0 && editorElement[0] != undefined) {
                // disable Account dropdonw:
                var currentAccountData = CmpToolUtility.searchDataTable(scope.parentResellerDropdown, resellerId, 'ResellerID');
                if (currentAccountData && currentAccountData.length > 0) {
                    var currentAccountDispName = currentAccountData[0].DispName;
                    editorElement[0].innerHTML = "<div><input class='dx-texteditor-input' style='color:gray' readonly value='" + currentAccountDispName + "'></div>";
                }
            }
        }

        var keyName = "ResourceID";
        var refreshGrid = function () {
            var getMethod = "GetInternalResourcesMapByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configInternalResourcesMapColumns(scope);
                sqlData = respRefresh.data;
                myGrid.dataSource = sqlData;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        var refreshGridFromOsa = function () {
            CmpToolUtility.showLoadingPage();
            myGrid.selection = { mode: 'multiple' };
            var getMethod = "GetInternalResourcesMapFromOsaByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configInternalResourcesMapColumnsOsa(scope);
                myGrid.dataSource = {
                    store: {
                        data: respRefresh.data,
                        type: 'array',
                        key: 'ResourceID'
                    }
                }
                var resourceIds = CmpToolUtility.getIdsArrayByColName(sqlData, 'ResourceID');
                
                // push new ids from SynMappingTable
                var controller = "SyncMappingTable";
                getMethod = "GetNotSyncedDataByResellerIdForSyncTool";
                var objType = 'BMResource';
                scope.getServiceData(controller, getMethod, resellerId, objType).then(function(respSync) {
                    var sync = respSync.data;
                    for (var i = 0; i < sync.length; i ++) {
                        var objId = sync[i].IntObjID;
                        resourceIds = CmpToolUtility.checkAndPush(objId, resourceIds);
                    }
                    myGrid.selectedRowKeys = resourceIds;
                    CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
                });
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        //myGrid.onRowInserted = function (e) {
        //if (!e.data.PermissionTypeId || e.data.PermissionTypeId == 0) {
        //    e.data.PermissionTypeId = 100;
        //}
        //scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
        //    refreshGrid();
        //}
        //    );
        //};

        myGrid.onRowRemoved = function (e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected).then(function() {
                refreshGrid();
            });
        };
        
        //myGrid.stateStoring.storageKey = "storage" + tableName;
        myGrid.stateStoring = {
            enabled: false
        }

        refreshGrid();
    }
})();
