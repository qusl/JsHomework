﻿
(function () {
    var tableName = "TermsAndConditionsRateMap";
    var currentGroupDispName = "";
    var currentTermDispName = "";

    window.CmpTool.getTermsAndConditionsRateMap = function (scope, resellerId) {
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnSync").show();
        }
        var groupTable = CmpToolStatic.termsAndConditionsGroupTableName;
        var groupMethod = CmpToolStatic.termsAndConditionsGroupGetMethod;
        scope.getServiceData(groupTable, groupMethod).then(function (groupResponse) {
            scope.termsAndConditionsGroupDropdown = groupResponse.data;
            var tcTable = CmpToolStatic.termsAndConditionsTableName;
            var tcMethod = CmpToolStatic.termsAndConditionsGetMethod;
            scope.getServiceData(tcTable, tcMethod, resellerId).then(function (tcResponse) {
                scope.termsAndConditionsDropdown = tcResponse.data;
                setDataSource(scope, resellerId);
            });
        });
    }

    function setDataSource(scope, resellerId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        var strText = 'To synchronize ' + tableName + ' data from OSA to CMP for ResellerId = ' + resellerId + '?';
        var syncData = function () {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'TermsAndConditionsRateMap';
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
            CmpToolUtility.AlertConfirm(strText, syncData);
        }

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentGroupDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentTermDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentGroupData = CmpToolUtility.searchDataTable(scope.termsAndConditionsGroupDropdown, e.data.TermGroupID, 'TermGroupID');
            if (currentGroupData.length > 0) {
                currentGroupDispName = currentGroupData[0].DispName;
            } else {
                currentGroupDispName = '';
            }

            var currentTermsData = CmpToolUtility.searchDataTable(scope.termsAndConditionsDropdown, e.data.TermID, 'TermID');
            if (currentTermsData.length > 0) {
                currentTermDispName = currentTermsData[0].DispName;
            } else {
                currentTermDispName = '';
            }
        }

        var keyName = "TermGroupID";
        var refreshGrid = function () {
            var getMethod = "GetTermsAndConditionsRateMapByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configTermsAndConditionsRateMapColumns(scope);
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
            var id = e.data.TermGroupID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();