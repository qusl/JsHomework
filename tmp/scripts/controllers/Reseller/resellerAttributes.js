
(function () {
    var tableName = "ResellerAttributes";
    var currentResellerDispName = '';
    var resellerId;

    window.CmpTool.getResellerAttributes = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function (resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            var attributeTable = CmpToolStatic.resellerAttributeTableName;
            var attributeMethod = CmpToolStatic.resellerAttributeGetMethod;
            scope.getServiceData(attributeTable, attributeMethod).then(function(attributeResponse) {
                scope.resellerAttributeDropdown = attributeResponse.data;
                setDataSource(scope);
            });
        });
    }

    function setDataSource(scope) {
        var maxIdTableName = "ResellerAttributes";
        var maxIdGetMethod = "GetMaxRabId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentResellerDispName) {
                var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentResellerDispName);
            }
        }

        // if it's insert, populate RABID:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'RABID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                    var maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_RABID");
                });
            }
        }

        var keyName = "RABID";
        var refreshGrid = function () {
            var getMethod = "GetResellerAttributesByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                currentResellerDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configResellerAttributesColumns(scope);
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
        }

        myGrid.onRowRemoved = function (e) {
            var id = e.data.RABID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();