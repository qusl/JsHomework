
(function () {
    var tableName = "TermsAndConditionsGroupML";
    var currentGroupDispName = "";
    var currentLanguageDispName = '';

    window.CmpTool.getAllTermsAndConditionsGroupML = function (scope) {
        var termTable = CmpToolStatic.termsAndConditionsGroupTableName;
        var termMethod = CmpToolStatic.termsAndConditionsGroupGetMethod;
        scope.getServiceData(termTable, termMethod).then(function (termResponse) {
            scope.termsAndConditionsGroupDropdown = termResponse.data;
            var langTable = CmpToolStatic.activeLanguagesTableName;
            var langMethod = CmpToolStatic.activeLanguagesGetMethod;
            scope.getServiceData(langTable, langMethod).then(function (activeLangResponse) {
                scope.activeLanguagesDropdown = activeLangResponse.data;
                setDataSource(scope);
            });
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentGroupDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLanguageDispName);
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

            var currentLanguageData = CmpToolUtility.searchDataTable(scope.activeLanguagesDropdown, e.data.Language, 'LCName');
            if (currentLanguageData.length > 0) {
                currentLanguageDispName = currentLanguageData[0].DispName;
            } else {
                currentLanguageDispName = '';
            }
        }

        var keyName = "TermGroupID";
        var refreshGrid = function () {
            var getMethod = "GetAllTermsAndConditionsGroupML";
            scope.getServiceData(tableName, getMethod).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configTermsAndConditionsGroupMLColumns(scope);
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
