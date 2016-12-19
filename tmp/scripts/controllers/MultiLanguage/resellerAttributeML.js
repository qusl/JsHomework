
(function () {
    var tableName = "ResellerAttributeML";
    var currentParentDispName = "";
    var currentAttributeDispName = "";
    var currentLangDispName = '';
    var resellerId;

    window.CmpTool.getResellerAttributeML = function(scope, parrentResellerId) {
        resellerId = parrentResellerId;
        if (parseInt(resellerId) === 0) {
            $('.button-custom-add').hide();
        } else {
            $('.button-custom-add').show();
        }
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function(resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            currentParentDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
            var attributeTable = CmpToolStatic.resellerAttributeTableName;
            var attributeMethod = CmpToolStatic.resellerAttributeGetMethod;
            scope.getServiceData(attributeTable, attributeMethod, resellerId).then(function(attributeResponse) {
                scope.resellerAttributeDropdown = attributeResponse.data;
                var langTable = CmpToolStatic.activeLanguagesTableName;
                var langMethod = CmpToolStatic.activeLanguagesGetMethod;
                scope.getServiceData(langTable, langMethod).then(function (activeLangResponse) {
                    scope.activeLanguagesDropdown = activeLangResponse.data;
                    setDataSource(scope);
                });
            });
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentParentDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentAttributeDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 2, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentData = CmpToolUtility.searchDataTable(scope.resellerAttributeDropdown, e.data.RADID, 'RADID');
            if (currentData.length > 0) {
                currentAttributeDispName = currentData[0].DispName;
            } else {
                currentAttributeDispName = '';
            }
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "RADID";
        var refreshGrid = function () {
            var getMethod = "GetResellerAttributeMLByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configResellerAttributeMLColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
            e.data.ResellerId = resellerId;
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
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