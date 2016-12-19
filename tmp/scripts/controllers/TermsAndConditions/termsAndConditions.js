
(function () {
    var tableName = "TermsAndConditions";
    var currentAccountDispName = '';
    var resellerId;

    window.CmpTool.getTermsAndConditionsByResellerId = function (scope, parentResellerId) {
        $('.button-custom-add').hide();
        $('.button-custom-delete').hide();
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnSync").show();
        }
        resellerId = parentResellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function (resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            setDataSource(scope);
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        var strText = 'To synchronize ' + tableName + '(ML) data from OSA to CMP for ResellerId = ' + resellerId + '?';
        var syncData = function () {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'TermsAndConditions';
            var syncMethod = "SyncDataFromSyncMappingTableByResellerId";
            var userId = CmpToolUtility.getUserId();
            if (userId === '') {
                return;
            }
            scope.getServiceData(syncTable, syncMethod, resellerId, userId).then(function (syncResponse) {
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
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentAccountDispName) {
                var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentAccountDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            resellerId = e.data.AccountID;
        }

        var keyName = "TermID";
        var refreshGrid = function () {
            var getMethod = "GetTermsAndConditionsByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                currentAccountDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configTermsAndConditionsColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        //myGrid.onRowInserted = function (e) {
        //    e.data.AccountID = resellerId;
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