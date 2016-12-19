
(function() {
    var tableName = "InternalPlansML";

    window.CmpTool.getInternalPlansML = function (scope, categoryId) {
        $('.button-custom-add').hide();
        $('.button-custom-edit').hide();
        $('.button-custom-delete').hide();
        if (CmpToolStatic.selectedMarketplace != CmpToolStatic.allCountries) {
            $("#btnSync").show();
        }
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var planTable = CmpToolStatic.internalPlansTableName;
        var planMethod = CmpToolStatic.internalPlansGetMethod;
        scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
            scope.internalPlansDropdown = planResponse.data;
            var langTable = CmpToolStatic.activeLanguagesTableName;
            var langMethod = CmpToolStatic.activeLanguagesGetMethod;
            scope.getServiceData(langTable, langMethod).then(function (activeLangResponse) {
                scope.activeLanguagesDropdown = activeLangResponse.data;
                setDataSource(scope, categoryId);
            });
        });
    }

    function setDataSource(scope, categoryId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var strText = 'To synchronize ' + tableName + ' data from OSA to CMP for ResellerId = ' + resellerId + '?';
        var syncData = function () {
            CmpToolUtility.showLoadingPage();
            var syncTable = 'InternalPlansMl';
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
        //        CmpToolUtility.setReadOnlyValue(editorElement, 0, currentPlanDispName);
        //        CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
        //    }
        //}

        //myGrid.onEditingStart = function (e) {
        //    scope.appIsInsert = false;
        //    var currentPlanData = CmpToolUtility.searchDataTable(scope.internalPlansDropdown, e.data.PlanID, 'PlanID');
        //    if (currentPlanData.length > 0) {
        //        currentPlanDispName = currentPlanData[0].DispName;
        //    } else {
        //        currentPlanDispName = '';
        //    }
        //    var language = e.data.Language;
        //    currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        //}

        //var keyName = "ID";
        var refreshGrid = function () {
            //var getMethod = "GetInternalPlansMLByCategoryId";
            //var id = categoryId;
            ////var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            //if (typeof (categoryId) === "undefined" || categoryId === 0) {
            //    getMethod = "GetInternalPlansMLByResellerId";
            //    id = resellerId;
            //}
            var getMethod = "GetInternalPlansMLByResellerId";
            var id = resellerId;
            scope.getServiceData(tableName, getMethod, id).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configInternalPlansMLColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        //myGrid.onRowUpdated = function (e) {
        //    var selected = JSON.stringify(e.key);
        //    scope.updateServiceData(tableName, keyName, selected);
        //};

        //myGrid.onRowInserted = function (e) {
        //   scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function() {
        //    refreshGrid();
        //}
        //);
        //};

        //myGrid.onRowRemoved = function (e) {
        //    var selected = JSON.stringify(e.key);
        //    scope.deleteServiceData(tableName, e.data[keyName], selected);
        //};

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();
