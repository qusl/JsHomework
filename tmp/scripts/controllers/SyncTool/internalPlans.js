
(function() {
    var tableName = "InternalPlans";
    var resellerId, sqlData, isBatchEditing;

    window.CmpTool.getInternalPlans = function (scope, parentresellerId) {
        $('#btnFixNums').show();
        isBatchEditing = false;
        $('.button-custom-add').hide();
        $('.button-custom-edit').show();
        //$('#batchEditingCheckBox').show();
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnOsa").show();
        }
        resellerId = parentresellerId;
        var parentTable = CmpToolStatic.resellerTableName;
        var parentMethod = "GetParentResellersForDropDown";
        scope.getServiceData(parentTable, parentMethod).then(function (parentResponse) {
            scope.parentResellerDropdown = parentResponse.data;
            var permissionTable = CmpToolStatic.permissionTypeTableName;
            var permissionMethod = CmpToolStatic.permissionTypeGetMethod;
            scope.getServiceData(permissionTable, permissionMethod).then(function (permissionResponse) {
                scope.permissionTypeDropdown = permissionResponse.data;
                setDataSource(scope);
            });
        });

        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForInternalPlans();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        scope.btnOsaClick = function () {
            $('.button-custom-edit').hide();
            $('.button-custom-delete').hide();
            $('#batchEditingCheckBox').hide();
            $('#btnFixNums').hide();
            $("#btnOsa").hide();
            $("#btnSync").show();
            refreshGridFromOsa();
        }

        var fixNums = function () {
            CmpToolUtility.showLoadingPage();
            var fixNumsTable = 'PlanNumAggregator';
            var fixNumsMethod = "UpdateDisabledPlanNum";
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

        var syncData = function () {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'InternalPlans';
            var syncMethod = "SyncDataByIds";
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            var planIdsArray = $("#gridContainer").data("dxDataGrid").getSelectedRowKeys();
            scope.getServiceData(syncTable, syncMethod, resellerId, userId, planIdsArray).then(function (syncResponse) {
                var affectedRows = parseInt(syncResponse.data);
                if (affectedRows > 0) {
                    Alert('Success! AffectedRows: ' + affectedRows);
                } else {
                    Alert('There is no difference between OSA and CMP. ');
                }
                refreshGrid();
                $('.button-custom-edit').show();
                $('.button-custom-delete').show();
                //$('#batchEditingCheckBox').show();
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
            //var planId = key.PlanID;
            var strFixNumsText = 'To Change PlanNum to NULL for all plans with IsActive = false?';
            CmpToolUtility.AlertConfirm(strFixNumsText, fixNums);
        }

        scope.btnSyncClick = function () {
            myGrid.selection = { mode: 'single' };
            var strSyncText = 'To synchronize ' + tableName + ' data from OSA to CMP for selected records(if no record is selected, will check the deleted rows)?';
            CmpToolUtility.AlertConfirm(strSyncText, syncData);
        }

        myGrid.onEditingStart = function (e) {
            // add this for permissionType dropdown
        }

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && editorElement.length > 0 && editorElement[0] != undefined && !isBatchEditing) {
                // disable Account dropdonw:
                var currentAccountData = CmpToolUtility.searchDataTable(scope.parentResellerDropdown, resellerId, 'ResellerID');
                var currentAccountDispName = "";
                if (currentAccountData.length > 0) {
                    currentAccountDispName = currentAccountData[0].DispName;
                    editorElement[0].innerHTML = "<div><input class='dx-texteditor-input' style='color:gray' readonly value='" + currentAccountDispName + "'></div>";
                }
            }
        }

        var keyName = "PlanID";
        var refreshGrid = function () {
            CmpToolUtility.showLoadingPage();
            var getMethod = "GetInternalPlansByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configInternalPlanColumns(scope);
                sqlData = respRefresh.data;
                if (isBatchEditing) {
                    // config the BatchEditing properties in dataSourceForBatchEditing function:
                    myGrid.dataSource = CmpToolUtility.dataSourceForBatchEditing(scope, sqlData, tableName, keyName, setDataSource);
                } else {
                    myGrid.dataSource = sqlData;
                }
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid, isBatchEditing);
                CmpToolUtility.hideLoadingPage();
            });
        };

        var refreshGridFromOsa = function () {
            CmpToolUtility.showLoadingPage();
            CmpToolUtility.hideGirdHeader();
            myGrid.selection = { mode: 'multiple' };
            var getMethod = "GetInternalPlansFromOsaByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configInternalPlanColumnsOsa(scope);
                myGrid.dataSource = {
                    store: {
                        data: respRefresh.data,
                        type: 'array',
                        key: 'PlanID'
                    }
                }
                var planIds = CmpToolUtility.getIdsArrayByColName(sqlData, 'PlanID');

                // push new ids from SynMappingTable
                var controller = "SyncMappingTable";
                getMethod = "GetNotSyncedDataByResellerIdForSyncTool";
                var objType = 'Plan';
                scope.getServiceData(controller, getMethod, resellerId, objType).then(function (respSync) {
                    var sync = respSync.data;
                    for (var i = 0; i < sync.length; i++) {
                        var objId = sync[i].IntObjID;
                        planIds = CmpToolUtility.checkAndPush(objId, planIds);
                    }
                    myGrid.selectedRowKeys = planIds;
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
        //     );
        //};

        myGrid.onRowRemoved = function (e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };
        
        //myGrid.stateStoring.storageKey = "storage" + tableName;
        myGrid.stateStoring = {
            enabled: false
        }

        refreshGrid();

        //var getDataSource = function (sqlDataSource) {
        //    var timeOut = null,
        //        updateTasks = [];
        //    var timerCallback = function () {
        //        //Send data to the REST service from updateTasks
        //        $.each(updateTasks, function (index, task) {
        //            task.deferred.resolve();
        //        });
        //        updateTasks = [];
        //        timeOut = null;
        //    };
        //    var settings = {
        //        key: 'PlanID',
        //        load: function (loadOptions) {
        //            var d = $.Deferred();
        //            d.resolve(sqlDataSource, { totalCount: sqlDataSource.length });
        //            return d.promise();
        //        },
        //        update: function (key, values) {
        //            debugger;
        //            if (!timeOut) {
        //                timeOut = setTimeout(timerCallback, 100);
        //            }
        //            var d = new $.Deferred();
        //            updateTasks.push({
        //                key: key,
        //                values: values,
        //                deferred: d
        //            });
        //            return d.promise();
        //        }
        //    };
        //    return new DevExpress.data.DataSource(settings);
        //}

    }
})();
