
(function() {
    var tableName = "SecurityQuestionsML";
    var currentLangDispName = '';


    window.CmpTool.getAllSecurityQuestionsML = function (scope) {
        var langTable = CmpToolStatic.activeLanguagesTableName;
        var langMethod = CmpToolStatic.activeLanguagesGetMethod;
        scope.getServiceData(langTable, langMethod).then(function(activeLangResponse) {
            scope.activeLanguagesDropdown = activeLangResponse.data;
            setDataSource(scope);
        });
    }

    function setDataSource(scope) {
        var myGrid = angular.copy(window.CmpTool.myGridConfig);

        myGrid.onCellPrepared = function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
            if (e.rowType === "detail" && !scope.appIsInsert) {
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var language = e.data.Language;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "QuestionID";
        var refreshGrid = function () {
            var getMethod = "GetAllSecurityQuestionsML";
            scope.getServiceData(tableName, getMethod).then(function (respRefresh) {
                myGrid.columns = window.CmpTool.configSecurityQuestionsMLColumns(scope);
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
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, e.data[keyName], selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }
})();
