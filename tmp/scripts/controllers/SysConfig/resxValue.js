
(function () {
    var tableName = "ResxValue";
    var currentDetailDispName = '';
    var currentLangDispName = '';
    
    window.CmpTool.getAllResxValue = function (scope) {
        var detailTable = CmpToolStatic.resxDetailTableName;
        var detailMethod = CmpToolStatic.resxDetailGetMethod;
        scope.getServiceData(detailTable, detailMethod).then(function (detailResponse) {
            scope.resxDetailDropdown = detailResponse.data;
            var langTable = CmpToolStatic.activeLanguagesTableName;
            var langMethod = CmpToolStatic.activeLanguagesGetMethod;
            scope.getServiceData(langTable, langMethod).then(function (langResponse) {
                scope.activeLanguagesDropdown = langResponse.data;
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
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentDetailDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
            }
        }

        myGrid.onEditingStart = function (e) {
            scope.appIsInsert = false;
            var currentCatData = CmpToolUtility.searchDataTable(scope.resxDetailDropdown, e.data.ResxID, 'ResxID');
            if (currentCatData.length > 0) {
                currentDetailDispName = currentCatData[0].DispName;
            } else {
                currentDetailDispName = '';
            }
            var language = e.data.LCName;
            currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
        }

        var keyName = "ResxID";
        var refreshGrid = function () {
            var getMethod = "GetAllResxValue";
            scope.getServiceData(tableName, getMethod).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configResxValueColumns(scope);
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