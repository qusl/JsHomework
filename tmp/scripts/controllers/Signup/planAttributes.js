
(function () {
    var tableName = "PlanAttributes";
    var currentPlanDispName = '';
    var currentAttrDetail = '';
    var isBatchEditing;

    window.CmpTool.getPlanAttributes = function (scope, categoryId) {
        isBatchEditing = false;
        $('#batchEditingCheckBox').show();
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        var planTable = CmpToolStatic.displayPlansTableName;
        var planMethod = CmpToolStatic.displayPlansGetMethod;
        scope.getServiceData(planTable, planMethod, resellerId).then(function (planResponse) {
            scope.displayPlansDropdown = planResponse.data;
            var attributeTable = CmpToolStatic.planAttributeDetailTableName;
            var attributeMethod = CmpToolStatic.planAttributeDetailGetMethod;
            scope.getServiceData(attributeTable, attributeMethod).then(function (attributeResponse) {
                scope.planAttributeDetailDropdown = attributeResponse.data;
                setDataSource(scope, categoryId);
            });
        });

        scope.batchEditingValueChanged = function (e) {
            if (CmpToolStatic.isInitialForm) {
                return;
            }
            if (isBatchEditing) {
                isBatchEditing = false;
                CmpToolUtility.showButtonsForPlanAttributes();
            } else {
                isBatchEditing = true;
                CmpToolUtility.hideAllButtons();
            }
            setDataSource(scope);
        }
    }

    function setDataSource(scope, categoryId) {
        var maxIdTableName = "PlanAttributes";
        var maxIdGetMethod = "GetPlanAttributeMaxId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function(e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert && !isBatchEditing) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentAttrDetail);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentPlanDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentAttributeData = CmpToolUtility.searchDataTable(scope.planAttributeDetailDropdown, e.data.PADID, 'PADID');
            currentAttrDetail = '';
            if (currentAttributeData.length > 0) {
                currentAttrDetail = currentAttributeData[0].DispName;
            } 

            var currentPlanData = CmpToolUtility.searchDataTable(scope.displayPlansDropdown, e.data.PlanID, 'PlanID');
            currentPlanDispName = '';
            if (currentPlanData.length > 0) {
                currentPlanDispName = currentPlanData[0].DispName;
            } 
        }

        // if it's insert, populate PABID:
        myGrid.onEditorPrepared = function(e) {
            if (scope.appIsInsert && e.dataField == 'PABID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_PABID");
                });
            }
        }

        var keyName = "PABID";
        var refreshGrid = function () {
            CmpToolUtility.showLoadingPage();
            var getMethod = "GetPlanAttributesByCategoryId";
            var id = categoryId;
            if (typeof (categoryId) === "undefined" || categoryId === 0) {
                getMethod = "GetPlanAttributesByResellerId";
                id = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
            }
            scope.getServiceData(tableName, getMethod, id).then(function (respRefresh) {
                myGrid = CmpToolUtility.changeEditingProperties(myGrid, isBatchEditing);
                myGrid.columns = window.CmpTool.configPlanAttributesColumns(scope);
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

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function(e) {
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var pabId = e.data.PABID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, pabId, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();

