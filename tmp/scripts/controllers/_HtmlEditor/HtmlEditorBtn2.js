
var btnEditHtml2ClickFunc = function (scope) {

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
    var result = {};

    var showLongDescEditor = function() {
        keyName = 'PlanID';
        colName = 'LongDescription';
        tableName = "DisplayPlans";
        getMethod = "GetDisplayPlansByPlanId";
        CmpToolUtility.setLongDescriptionHtmlEditor('', '', '');

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
            CmpToolUtility.setLongDescriptionHtmlEditor(itemId, itemName, htmlValue);
        });
        url = "/views/htmlEditor/displayPlans-longDescription.html";
        CmpToolUtility.openNewTab(url);
    }


    var showMlLongDescEditor = function () {
        keyName = 'PlanID';
        colName = 'LongDescription';
        tableName = "DisplayPlansML";
        getMethod = "GetDisplayPlansMlByPlanIdAndLang";
        CmpToolUtility.setMlLongDescriptionHtmlEditor('', '', '', '');

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
            CmpToolUtility.setMlLongDescriptionHtmlEditor(itemId, lang, itemName, htmlValue);
        });
        url = "/views/htmlEditor/displayPlansMl-longDescription.html";
        CmpToolUtility.openNewTab(url);
    }

    switch (currentMenu) {
        case CmpToolStatic.signupmenu[0]:                 // 1. Display Plans - LongDescription
            showLongDescEditor();
            break;
        case CmpToolStatic.multilanguagemenu[1]:           // 2. DisplayPlansML - longDescription
            showMlLongDescEditor();
            break;
    }
}