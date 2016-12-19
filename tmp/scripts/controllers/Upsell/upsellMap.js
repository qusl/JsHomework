
(function() {
    var tableName = "UpsellMap";
    var currentParentUpsellDispName = "";
    var currentChildUpsellDispName = '';

    window.CmpTool.getUpsellMap = function (scope, resellerId) {
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }

        var upsellTable = CmpToolStatic.upsellTableName;
        var upsellMethod = CmpToolStatic.upsellGetMethod;
        scope.getServiceData(upsellTable, upsellMethod, resellerId).then(function (upsellResponse) {
            scope.upsellDropdown = upsellResponse.data;
            setDataSource(scope, resellerId);
        });
    }

    function setDataSource(scope, resellerId) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function(e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentParentUpsellDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentChildUpsellDispName);
            }
        }
        
        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentParentData = CmpToolUtility.searchDataTable(scope.upsellDropdown, e.data.ParentId, 'UpsellId');
            if (currentParentData.length > 0) {
                currentParentUpsellDispName = currentParentData[0].DispName;
            } else {
                currentParentUpsellDispName = '';
            }

            var currentChildData = CmpToolUtility.searchDataTable(scope.upsellDropdown, e.data.ChildId, 'UpsellId');
            if (currentChildData.length > 0) {
                currentChildUpsellDispName = currentChildData[0].DispName;
            } else {
                currentChildUpsellDispName = '';
            }
        }

        var keyName = "ChildId";
        var refreshGrid = function () {
            var getMethod = "GetUpsellMapByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configUpsellMapColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function() {
                    refreshGrid();
                }
            );
        };

        myGrid.onRowRemoved = function (e) {
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };

        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();
