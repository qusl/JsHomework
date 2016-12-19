
var btnEditHtml1ClickFunc = function(scope) {

    var key = CmpToolUtility.isRowSelected($("#gridContainer"));
    if (!key) return;

    //if (CmpToolStatic.isDeployed && (CmpToolStatic.currentHub === 'dev' || CmpToolStatic.currentHub === 'stg')) {
    //    //CmpToolUtility.handleHttpsForWS();
    //    if (CmpToolUtility.handleHttpsForCMP()) return;
    //}

    var rowIndex = $("#gridContainer").data("dxDataGrid").getRowIndexByKey(key);
    var search = 'src="/content/images/';
    var replacement = 'src="' + CmpToolStatic.htmlContenUrl + 'content/images/';
    var currentMenu = CmpToolStatic.selectedMenuname;
    var keyName, colName, url, tableName, getMethod, keyObject, itemId, itemName;
    var allData = {}, result = {};

    var showCategoryHtmlEditor = function () {
        keyName = 'CategoryID';
        colName = 'CategoryHTML';
        tableName = "DisplayCategory";
        getMethod = "GetDisplayCategoryByCategoryId";
        CmpToolUtility.setDispalyCatHtmlEditor('', '', '');

        keyObject = $("#gridContainer").data("dxDataGrid").getCellElement(rowIndex, keyName);
        itemId = keyObject[0].innerText;

        scope.getServiceData(tableName, getMethod, itemId).then(function (response) {
            allData = response.data;
            result = CmpToolUtility.searchDataTable(allData, itemId, 'CategoryID');
            var htmlValue = result[0][colName];
            itemName = result[0]["CategoryName"];
            if (htmlValue) {
                htmlValue = htmlValue.replaceAll(search, replacement);
            }
            CmpToolUtility.setDispalyCatHtmlEditor(itemId, itemName, htmlValue);
        });
        url = "/views/htmlEditor/displayCategory-categoryHtml.html";
        CmpToolUtility.openNewTab(url);
    }

    var showMlCategoryHtmlEditor = function () {
        keyName = 'CategoryID';
        colName = 'CategoryHTML';
        tableName = "DisplayCategoryML";
        getMethod = "GetDisplayCategoryMLByResellerId";
        CmpToolUtility.setMlDispalyCatHtmlEditor('', '', '', '');

        keyObject = $("#gridContainer").data("dxDataGrid").getCellElement(rowIndex, keyName);
        itemId = keyObject[0].innerText;
        itemId = itemId.substring(0, itemId.indexOf('.'));

        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        scope.getServiceData(tableName, getMethod, resellerId).then(function (response) {
            var keyObjectLang = $("#gridContainer").data("dxDataGrid").getCellElement(rowIndex, "Language");
            var lang = keyObjectLang[0].innerText;
            lang = lang.substring(lang.indexOf('.') + 1, lang.indexOf('('));
            lang = lang.trim();
            allData = response.data;
            result = CmpToolUtility.searchDataTable(allData, itemId, 'CategoryID');
            var htmlValue = result[0][colName];
            itemName = result[0]["CategoryName"];
            if (htmlValue) {
                htmlValue = htmlValue.replaceAll(search, replacement);
            }
            CmpToolUtility.setMlDispalyCatHtmlEditor(itemId, lang, itemName, htmlValue);
        });
        url = "/views/htmlEditor/displayCategoryML-categoryHtml.html";
        CmpToolUtility.openNewTab(url);
    }

    var showShortDescEditor = function() {
        keyName = 'PlanID';
        colName = 'ShortDescription';
        tableName = "DisplayPlans";
        getMethod = "GetDisplayPlansByPlanId";
        CmpToolUtility.setShortDescriptionHtmlEditor('', '', '');

        keyObject = $("#gridContainer").data("dxDataGrid").getCellElement(rowIndex, keyName);
        itemId = keyObject[0].innerText;
        itemId = itemId.substring(0, itemId.indexOf('.'));
        scope.getServiceData(tableName, getMethod, itemId).then(function(response) {
            result = response.data;
            var htmlValue = result[0][colName];
            itemName = result[0]["Title"];
            if (htmlValue) {
                htmlValue = htmlValue.replaceAll(search, replacement);
            }
            CmpToolUtility.setShortDescriptionHtmlEditor(itemId, itemName, htmlValue);
        });
        url = "/views/htmlEditor/displayPlans-shortDescription.html";
        CmpToolUtility.openNewTab(url);
    }

    var showMlShortDescEditor = function () {
        keyName = 'PlanID';
        colName = 'ShortDescription';
        tableName = "DisplayPlansML";
        getMethod = "GetDisplayPlansMlByPlanIdAndLang";
        CmpToolUtility.setMlShortDescriptionHtmlEditor('', '', '', '');

        keyObject = $("#gridContainer").data("dxDataGrid").getCellElement(rowIndex, keyName);
        itemId = keyObject[0].innerText;
        itemId = itemId.substring(0, itemId.indexOf('.'));

        var keyObjectLang = $("#gridContainer").data("dxDataGrid").getCellElement(rowIndex, 'Language');
        var lang = keyObjectLang[0].innerText;
        lang = lang.substring(lang.indexOf('.') + 1, lang.indexOf('('));
        lang = lang.trim();
        
        scope.getServiceData(tableName, getMethod, itemId, lang).then(function (response) {
            result = response.data;
            var htmlValue = result[0][colName];
            itemName = result[0]["Title"];
            if (htmlValue) {
                htmlValue = htmlValue.replaceAll(search, replacement);
            }
            CmpToolUtility.setMlShortDescriptionHtmlEditor(itemId, lang, itemName, htmlValue);
        });
        url = "/views/htmlEditor/displayPlansMl-shortDescription.html";
        CmpToolUtility.openNewTab(url);
    }

    var showBlobTextEditor = function() {
        keyName = 'TermID';
        colName = 'BlobText';
        tableName = "TermsAndConditionsML";
        getMethod = "GetTermsAndConditionsByTermId";
        CmpToolUtility.setTermsConditionsHtmlEditor('', '', '', '');

        keyObject = $("#gridContainer").data("dxDataGrid").getCellElement(rowIndex, keyName);
        itemId = keyObject[0].innerText;
        itemId = itemId.substring(0, itemId.indexOf('.'));
        scope.getServiceData(tableName, getMethod, itemId).then(function(response) {
            allData = response.data;
            var keyObjectLang = $("#gridContainer").data("dxDataGrid").getCellElement(rowIndex, "Language");
            var lang = keyObjectLang[0].innerText;
            lang = lang.substring(lang.indexOf('.') + 1, lang.indexOf('('));
            lang = lang.trim();
            var keyObjectTermName = $("#gridContainer").data("dxDataGrid").getCellElement(rowIndex, "TermName");
            itemName = keyObjectTermName[0].innerText;
            result = CmpToolUtility.searchDataTable(allData, lang, 'Language');
            var htmlValue = result[0][colName];
            if (htmlValue) {
                htmlValue = htmlValue.replaceAll(search, replacement);
            }
            CmpToolUtility.setTermsConditionsHtmlEditor(itemId, lang, itemName, htmlValue);
        });
        url = "/views/htmlEditor/termsAndConditions-blobText.html";
        CmpToolUtility.openNewTab(url);
    }

    switch (currentMenu) {
        case CmpToolStatic.signupmenu[1]:                  // 1. Display Category -> CategoryHtml
            showCategoryHtmlEditor();
            break;
        case CmpToolStatic.signupmenu[0]:                  // 2. Display Plans - shortDescription
            showShortDescEditor();
            break;
        case CmpToolStatic.multilanguagemenu[1]:           // 3. DisplayPlansML - shortDescription
            showMlShortDescEditor();
            break;
        case CmpToolStatic.termsandconditionmuenu[1]:      // 4. TermsAndConditionsML - BlobText
            showBlobTextEditor();
            break;
        case CmpToolStatic.multilanguagemenu[0]:           // 5. DisplayCategoryML - CategoryHtml
            showMlCategoryHtmlEditor();
            break;
    }
}