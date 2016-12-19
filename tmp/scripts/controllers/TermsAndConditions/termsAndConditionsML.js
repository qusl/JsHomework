
(function () {
    var tableName = "TermsAndConditionsML";
    var currentTermDispName = '';
    var currentLangDispName = '';
    var resellerId;

    window.CmpTool.getTermsAndConditionsML = function (scope, parentresellerId) {
        $('.button-custom-add').hide();
        $('.button-custom-edit').hide();
        $("#btnEditHtml1").show();
        resellerId = parentresellerId;
        var termTable = CmpToolStatic.termsAndConditionsTableName;
        var termMethod = CmpToolStatic.termsAndConditionsGetMethod;
        scope.getServiceData(termTable, termMethod, resellerId).then(function (termResponse) {
            scope.termsAndConditionsDropdown = termResponse.data;
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

        myGrid.onEditingStart = function (e) {
            if (!scope.appIsInsert) {
                var contentId = e.data.TermID;
                currentTermDispName = CmpToolUtility.getDispNameByTermId(scope.termsAndConditionsDropdown, contentId);
                var language = e.data.Language;
                currentLangDispName = CmpToolUtility.getDispNameByLcName(scope.activeLanguagesDropdown, language);
            }
        }

        myGrid.onCellPrepared = function (e) {
            // Disable reseller dropdown for selected country(not for AllCountries):
            if (e.rowType === "detail" && resellerId != 0 && currentTermDispName) {
                var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox");
                CmpToolUtility.setReadOnlyValue(editorElement, 0, currentTermDispName);
                CmpToolUtility.setReadOnlyValue(editorElement, 1, currentLangDispName);
            }
        }

        var keyName = "TermID";
        var refreshGrid = function () {
            var getMethod = "GetTermsAndConditionsMLByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                myGrid.columns = window.CmpTool.configTermsAndConditionsMLColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        //myGrid.onRowInserted = function (e) {
        //scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
        //    refreshGrid();
        //}
        //    );
        //};

        myGrid.onRowRemoved = function (e) {
            var id = e.data.TermID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();