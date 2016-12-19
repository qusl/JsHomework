
(function() {
    var tableName = "DisplayCategory";
    var resellerId, isBatchEditing;

    window.CmpTool.getDisplayCategory = function (scope, categoryId) {
        isBatchEditing = false;
        $('#batchEditingCheckBox').show();
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function(resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            var vendorTable = CmpToolStatic.vendorNameSlugTableName;
            var vendorMethod = CmpToolStatic.vendorNameSlugGetMethod;
            scope.getServiceData(vendorTable, vendorMethod, resellerId).then(function(vendorResponse) {
                scope.vendorNameSlugDropdown = vendorResponse.data;
                var productTable = CmpToolStatic.productNameSlugTableName;
                var productMethod = CmpToolStatic.productNameSlugGetMethod;
                scope.getServiceData(productTable, productMethod).then(function(productResponse) {
                    scope.productNameSlugDropdown = productResponse.data;
                    var permissionTable = CmpToolStatic.permissionTypeTableName;
                    var permissionMethod = CmpToolStatic.permissionTypeGetMethod;
                    scope.getServiceData(permissionTable, permissionMethod).then(function(permissionResponse) {
                        scope.permissionTypeDropdown = permissionResponse.data;
                        setDataSource(scope, categoryId);
                    });
                });
            });
        });

        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForDisplayCategory();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
    }

    function setDataSource(scope, categoryId) {
        var maxIdTableName = "DisplayCategory";
        var maxIdGetMethod = "GetDisplayCategoryMaxId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        //myGrid.onEditingStart = function(e) {
        //    accountId = e.data.AccountID;
        //}

        myGrid.onCellPrepared = function(e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (editorElement.length > 0 && editorElement[0] != undefined) {
                // only disable Account dropdonw for selected country(not for AllCountries):
                if (e.rowType === "detail" && resellerId != 0 && !isBatchEditing) {
                    var currentAccountData = CmpToolUtility.searchDataTable(scope.parentResellerDropdown, resellerId, 'ResellerID');
                    var currentAccountDispName = currentAccountData[0].DispName;
                    editorElement[0].innerHTML = "<div><input class='dx-texteditor-input' style='color:gray' readonly value='" + currentAccountDispName + "'></div>";
                }
            }

            if (e.rowType != "data" || !isBatchEditing) {
                return;
            }
            if (e.column.dataField === 'AccountID') {
                e.column.allowEditing = false;
            }
        }

        // if it's insert, populate CategoryID:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'CategoryID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_CategoryID");
                });
            }
        }

        var keyName = "CategoryID";
        var refreshGrid = function () {
            CmpToolUtility.showLoadingPage();
            var getMethod = "GetDisplayCategoryByCategoryId";
            if (!isBatchEditing) {
                $("#btnEditHtml1").show();
            }
            resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            var id = categoryId;
            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetDisplayCategoryByResellerId";
                id = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            }
            scope.getServiceData(tableName, getMethod, id).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configDisplayCategoryColumns(scope);
                if (isBatchEditing) {
                    // config the BatchEditing properties in dataSourceForBatchEditing function:
                    myGrid.dataSource = CmpToolUtility.dataSourceForBatchEditing(scope, respRefresh.data, tableName, keyName, setDataSource);
                } else {
                    myGrid.dataSource = respRefresh.data;
                }
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid, isBatchEditing);
                CmpToolUtility.hideLoadingPage();
            });
        };

        myGrid.onRowUpdated = function(e) {
            e.key.AccountID = resellerId;
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
            if (!e.data.PermissionTypeId || e.data.PermissionTypeId == 0) {
                e.data.PermissionTypeId = 100;
            }
            e.data.AccountID = resellerId;
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function() {
                    refreshGrid();
                }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data.CategoryID, selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();
