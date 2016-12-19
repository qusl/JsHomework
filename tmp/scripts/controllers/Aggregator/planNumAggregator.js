
(function () {
    var tableName = "PlanNumAggregator";
    var currentPlanDispName = '';
    var currentMasterPlan = '';
    var selectedPlanId, selectedMasterNum, newPlanNum, resellerId, isBatchEditing;

    window.CmpTool.getPlanNumAggregator = function (scope, categoryId) {
        isBatchEditing = false;
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $('#btnFixNums').show();
            $('#batchEditingCheckBox').show();
        }
        resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        if (resellerId != CmpToolStatic.devSrcResellerId && CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnSync").show();
        } 
        var planTable = CmpToolStatic.internalPlansTableName;
        var planMethod = CmpToolStatic.internalPlansGetMethod;
        scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
            scope.internalPlansDropdown = planResponse.data;
            var masterTable = CmpToolStatic.masterPlanTableName;
            var masterMethod = CmpToolStatic.masterPlanGetMethod;
            scope.getServiceData(masterTable, masterMethod).then(function (masterResponse) {
                scope.masterPlansDropdown = masterResponse.data;
                setDataSource(scope, categoryId);
            });
        });

        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForPlanNumAggregator();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
    }

    function setDataSource(scope, categoryId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        var devSrcResellerId = CmpToolStatic.devSrcResellerId;
        var strNumText = 'To Change PlanNum in InternalPlans table based on the configuration in PlanNumAggregator table for ResellerId = ' + resellerId + '?';
        var strSyncText = 'To synchronize SyncMappingTable for ResellerId = ' + resellerId + ', and populate PlanNumAggregator data from OSA SyncMapping table based on the PlanNum configured ';
        if (CmpToolStatic.currentHub === 'dev') {
            strSyncText += ' for devSrcResellerId(' + devSrcResellerId + ')?';
            strSyncText += ' on Dev?';
        }
        if (CmpToolStatic.currentHub === 'stg') {
            strSyncText += ' on Staging?';
        }
        if (CmpToolStatic.currentHub != 'dev' && CmpToolStatic.currentHub != 'stg') {
            strSyncText += ' on Production?';
        }

        var fixNums = function() {
            CmpToolUtility.showLoadingPage();
            var fixNumsTable = 'PlanNumAggregator';
            var fixNumsMethod = "FixNumsByResellerId";
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            scope.getServiceData(fixNumsTable, fixNumsMethod, resellerId + '?userId=' + userId).then(function (fixNumsResponse) {
                CmpToolUtility.hideLoadingPage();
                var affectedRows = parseInt(fixNumsResponse.data);
                if (affectedRows > 0) {
                    //refreshGrid();
                    Alert('Success! Affected rows: ' + affectedRows + '. Please check PlanNumChangeLog table for detail information.');
                } else {
                    Alert('Success, but no data has been updated ' + '<br>' + '(affected rows = 0).');
                }
            });
        }

        var syncData = function() {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'PlanNumAggregator';
            var syncMethod = "SyncDataFromSyncMappingTableByResellerId";
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            scope.getServiceData(syncTable, syncMethod, resellerId, CmpToolStatic.currentHub, devSrcResellerId, userId).then(function (syncResponse) {
                var affectedRows = parseInt(syncResponse.data);
                if (affectedRows > 0) {
                    var today = CmpToolUtility.getToday();
                    refreshGrid();
                    Alert('Success! Changed Memo value to ' + '\'Sync_' + today + '\'' + '<br>' + 'Affected rows: ' + affectedRows + '.');
                } else {
                    Alert('Success, but no data has been updated ' + '<br>' + '(affected rows = 0).');
                    CmpToolUtility.hideLoadingPage();
                }
            });
        }

        scope.btnFixNumsClick = function () {
            CmpToolUtility.AlertConfirm(strNumText, fixNums);
        }

        scope.btnSyncClick = function () {
            CmpToolUtility.AlertConfirm(strSyncText, syncData);
        }

        myGrid.onCellPrepared = function(e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentMasterPlan);
            }

            if (e.rowType != "data" || !isBatchEditing) {
                return;
            }
            if (e.column.dataField === 'PlanId' || e.column.dataField === 'MasterNum') {
                e.column.allowEditing = false;
            }
        }

        myGrid.onEditorPrepared = function (e) {

            if (e.parentType == 'dataRow' && e.dataField == 'PlanId') {
                e.editorElement.dxSelectBox('instance').option('onValueChanged', function (option) {
                    selectedPlanId = option.value;
                });
            }

            if (e.parentType == 'dataRow' && e.dataField == 'MasterNum') {
                e.editorElement.dxSelectBox('instance').option('onValueChanged', function (args) {
                    var masterNum = args.value;
                    var grid = $("#gridContainer").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var planId = grid.getKeyByRowIndex(index);
                    if (grid.getKeyByRowIndex(index).PlanId) {
                        planId = grid.getKeyByRowIndex(index).PlanId;
                    }
                    if (scope.appIsInsert) {
                        selectedMasterNum = args.value;
                        if (selectedPlanId) {
                            populatePlanNum(selectedPlanId, selectedMasterNum);
                        }
                    } else {
                        if (planId) {
                            if (isBatchEditing) {
                                populatePlanNum(planId, masterNum, index);
                            } else {
                                populatePlanNum(planId, masterNum);
                            }
                        }
                    }
                });
            }
        }

        var populatePlanNum = function (planId, masterNum, index) {
            var aggregatorTable = 'PlanNumAggregator';
            var aggregatorMethod = "GetPlanNumByPlanIdAndMasterNum";
            scope.getServiceData(aggregatorTable, aggregatorMethod, planId + '?userId=' + masterNum).then(function (aggregatorResponse) {
                var planNum = parseInt(aggregatorResponse.data[0]);
                newPlanNum = planNum;
                if (isBatchEditing) {
                    var grid = $("#gridContainer").dxDataGrid("instance");
                    grid.cellValue(index, "PlanNum", planNum);
                    grid.cellValue(index, "MasterNum", masterNum);
                } else {
                    CmpToolUtility.setTextBoxReadOnly(planNum, "_PlanNum");
                }
            });
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentMasterPlanData = CmpToolUtility.searchDataTable(scope.masterPlansDropdown, e.data.MasterNum, 'PlanNum');
            currentMasterPlan = '';
            if (currentMasterPlanData.length > 0) {
                currentMasterPlan = currentMasterPlanData[0].DispName;
            } 

            var currentPlanData = CmpToolUtility.searchDataTable(scope.internalPlansDropdown, e.data.PlanId, 'PlanID');
            currentPlanDispName = '';
            if (currentPlanData.length > 0) {
                currentPlanDispName = currentPlanData[0].DispName;
            } 
        }

        var keyName = "PlanId";
        var refreshGrid = function () {
            var getMethod = "GetPlanNumAggregatorByCategoryId";
            CmpToolUtility.showLoadingPage();
            var id = categoryId;
            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetPlanNumAggregatorByResellerId";
                id = resellerId;
            }
            scope.getServiceData(tableName, getMethod, id).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configPlanNumAggregatorColumns(scope);
                if (isBatchEditing) {
                    myGrid.dataSource = CmpToolUtility.dataSourceForBatchEditing(scope, respRefresh.data, tableName, keyName, setDataSource);
                } else {
                    myGrid.dataSource = respRefresh.data;
                }
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid, isBatchEditing);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
            if (scope.appIsInsert) {
                e.data.PlanId = selectedPlanId;
                e.data.MasterNum = selectedMasterNum;
                e.data.PlanNum = newPlanNum;
            }
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function() {
                    refreshGrid();
                }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var planId = e.data.PlanId;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, planId, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();

