
(function () {
    var tableName = "PlanPeriodML";
    var resellerId;

    window.CmpTool.getPlanPeriodML = function (scope, parentResellerId) {
        $('.button-custom-add').hide();
        $('.button-custom-edit').hide();
        $('.button-custom-delete').hide();
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnSync").show();
        }
        resellerId = parentResellerId;
            var langTable = CmpToolStatic.activeLanguagesTableName;
            var langMethod = CmpToolStatic.activeLanguagesGetMethod;
        scope.getServiceData(langTable, langMethod).then(function(activeLangResponse) {
            scope.activeLanguagesDropdown = activeLangResponse.data;
            setDataSource(scope);
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        var strText = 'To synchronize ' + tableName + ' data from OSA to CMP for ResellerId = ' + resellerId + '?';
        var syncData = function () {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'PlanPeriodML';
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

        //myGrid.onCellPrepared = function (e) {
        //    var cellElement = e.cellElement,
        //        editorElement = cellElement.find(".dx-selectbox");
        //    if (e.rowType === "detail" && !scope.appIsInsert) {
        //        CmpToolUtility.setReadOnlyValue(editorElement, 0, currentResourceDispName);
        //        CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
        //    }
        //}

        //myGrid.onEditingStart = function (e) {
        //    scope.appIsInsert = false;
        //    var currentData = CmpToolUtility.searchDataTable(scope.internalResourcesMapDropdown, e.data.ResourceID, 'ResourceID');
        //    if (currentData.length > 0) {
        //        currentResourceDispName = currentData[0].DispName;
        //    } else {
        //        currentResourceDispName = '';
        //    }
        //    var language = e.data.Language;
        //    currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        //}

        //var keyName = "ResourceID";
        var refreshGrid = function () {
            var getMethod = "GetPlanPeriodMLByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configPlanPeriodMLColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        //myGrid.onRowUpdated = function (e) {
        //    var selected = JSON.stringify(e.key);
        //    scope.updateServiceData(tableName, keyName, selected);
        //};

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