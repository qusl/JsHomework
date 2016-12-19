
(function () {
    var tableName = "ResourceNumAggregator";
    var currentResourcesDropdown = '';
    var currentMasterResource = '';
    var selectedResourceId, selectedMasterNum, newResourceNum, resellerId, isBatchEditing;

    window.CmpTool.getResourceNumAggregator = function (scope, parentResellerId) {
        isBatchEditing = false;
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $('#btnFixNums').show();
            $('#batchEditingCheckBox').show();
        }
        resellerId = parentResellerId;
        if (resellerId != CmpToolStatic.devSrcResellerId && CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnSync").show();
        }
        var resourceTable = CmpToolStatic.internalResourcesMapTableName;
        var resourceMethod = CmpToolStatic.internalResourcesMapGetMethod;
        scope.getServiceData(resourceTable, resourceMethod, resellerId).then(function (resourceResponse) {
            scope.internalResourcesMapDropdown = resourceResponse.data;
            var masterTable = CmpToolStatic.masterResourceTableName;
            var masterMethod = CmpToolStatic.masterResourceGetMethod;
            scope.getServiceData(masterTable, masterMethod).then(function (masterResponse) {
                scope.masterResourcesDropdown = masterResponse.data;
                setDataSource(scope);
            });
        });

        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForResourceNumAggregator();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        var devSrcResellerId = CmpToolStatic.devSrcResellerId;
        var strFixNumsText = 'To Change ResourceNum in InternalResourcesMap table based on the configuration in ResourceNumAggregator table for ResellerId = ' + resellerId + '?';
        var strSyncText = 'To synchronize SyncMappingTable for ResellerId = ' + resellerId + ', and populate ResourceNumAggregator data from OSA SyncMapping table based on the ResourceNum configured ';
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

        var fixNums = function () {
            CmpToolUtility.showLoadingPage();
            var fixNumsTable = 'ResourceNumAggregator';
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
                    Alert('Success! Affected rows: ' + affectedRows + '. Please check ResourceNumChangeLog table for detail information.');
                } else {
                    Alert('Success, but no data has been updated ' + '<br>' + '(affected rows = 0).');
                }
            });
        }

        var syncData = function() {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'ResourceNumAggregator';
            var syncMethod = 'SyncDataFromSyncMappingTableByResellerId';
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            scope.getServiceData(syncTable, syncMethod, resellerId, CmpToolStatic.currentHub, CmpToolStatic.devSrcResellerId, userId).then(function (syncResponse) {
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

        myGrid.onEditorPrepared = function (e) {

            if (e.parentType == 'dataRow' && e.dataField == 'ResourceId') {
                e.editorElement.dxSelectBox('instance').option('onValueChanged', function (option) {
                    selectedResourceId = option.value;
                });
            }

            if (e.parentType == 'dataRow' && e.dataField == 'MasterNum') {
                e.editorElement.dxSelectBox('instance').option('onValueChanged', function (args) {
                    var masterNum = args.value;
                    var grid = $("#gridContainer").dxDataGrid("instance");
                    var index = e.row.rowIndex;
                    var resourceId = grid.getKeyByRowIndex(index);
                    if (grid.getKeyByRowIndex(index).ResourceId) {
                        resourceId = grid.getKeyByRowIndex(index).ResourceId;
                    }
                    if (scope.appIsInsert) {
                        selectedMasterNum = args.value;
                        if (selectedResourceId) {
                            populateResourceNum(selectedResourceId, selectedMasterNum);
                        }
                    } else {
                        if (resourceId) {
                            if (isBatchEditing) {
                                populateResourceNum(resourceId, masterNum, index);
                            } else {
                                populateResourceNum(resourceId, masterNum);
                            }
                        }
                    }
                });
            }
        }

        var populateResourceNum = function (resourceId, masterNum, index) {
            var aggregatorTable = 'ResourceNumAggregator';
            var aggregatorMethod = "GetResourceNumByResourceIdAndMasterNum";
            scope.getServiceData(aggregatorTable, aggregatorMethod, resourceId + '?userId=' + masterNum).then(function (aggregatorResponse) {
                var resourceNum = parseInt(aggregatorResponse.data[0]);
                newResourceNum = resourceNum;
                if (isBatchEditing) {
                    var grid = $("#gridContainer").dxDataGrid("instance");
                    grid.cellValue(index, "ResourceNum", resourceNum);
                    grid.cellValue(index, "MasterNum", masterNum);
                } else {
                    CmpToolUtility.setTextBoxReadOnly(resourceNum, "_ResourceNum");
                }
            });
        }

        scope.btnFixNumsClick = function () {
            CmpToolUtility.AlertConfirm(strFixNumsText, fixNums);
        }

        scope.btnSyncClick = function () {
            CmpToolUtility.AlertConfirm(strSyncText, syncData);
        }

        myGrid.onCellPrepared = function(e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentResourcesDropdown);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentMasterResource);
            }

            if (e.rowType != "data" || !isBatchEditing) {
                return;
            }
            if (e.column.dataField === 'ResourceId' || e.column.dataField === 'MasterNum') {
                e.column.allowEditing = false;
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentMasterResourceData = CmpToolUtility.searchDataTable(scope.masterResourcesDropdown, e.data.MasterNum, 'ResourceNum');
            currentMasterResource = '';
            if (currentMasterResourceData.length > 0) {
                currentMasterResource = currentMasterResourceData[0].DispName;
            } 

            var currentResourceData = CmpToolUtility.searchDataTable(scope.internalResourcesMapDropdown, e.data.ResourceId, 'ResourceID');
            currentResourcesDropdown = '';
            if (currentResourceData.length > 0) {
                currentResourcesDropdown = currentResourceData[0].DispName;
            } 
        }

        var keyName = "ResourceId";
        var refreshGrid = function () {
            var getMethod = "GetResourceNumAggregatorByResellerId";
            CmpToolUtility.showLoadingPage();
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configResourceNumAggregatorColumns(scope);
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

        myGrid.onRowInserted = function (e) {
            if (scope.appIsInsert) {
                e.data.ResourceId = selectedResourceId;
                e.data.MasterNum = selectedMasterNum;
                e.data.ResourceNum = newResourceNum;
            }
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var resourceId = e.data.ResourceId;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, resourceId, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();

