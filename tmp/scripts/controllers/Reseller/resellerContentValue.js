
(function () {
    var tableName = "ResellerContentValue";
    var currentContentDispName = '';
    var currentParentDispName = '';
    var currentLanguageDispName = '';
    var resellerId, valueIndex;

    window.CmpTool.getResellerContentValue = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod, resellerId).then(function (resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            var contentTable = CmpToolStatic.resellerContentTableName;
            var contentMethod = CmpToolStatic.resellerContentGetMethod;
            scope.getServiceData(contentTable, contentMethod).then(function (contentResponse) {
                scope.resellerContentDropdown = contentResponse.data;
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

        myGrid.onEditingStart = function (e) {
            if (!scope.appIsInsert) {
                var contentId = e.data.ContentId;
                currentContentDispName = CmpToolUtility.getDispNameByContentId(scope.resellerContentDropdown, contentId);
                var language = e.data.Language;
                currentLanguageDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
                valueIndex = e.data.ValueIndex;
            }
        }

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentParentDispName) {
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentParentDispName);
            }
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentContentDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 2, currentLanguageDispName);
                CmpToolUtility.setTextBoxReadOnly(valueIndex, "_ValueIndex");
            }
        }

        var keyName = "ContentId";
        var refreshGrid = function () {
            var getMethod = "GetResellerContentValueByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                currentParentDispName = CmpToolUtility.getCurrentResellerDispName(scope.parentResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configResellerContentValueColumns(scope);
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
            var id = e.data.ContentId;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();