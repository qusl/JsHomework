-- How to hide the 'Edit' column:
    #gridContainer .dx-datagrid-save-button, #gridContainer .dx-command-edit {
        display: none;
    }

-- How to hide dxDataGrid header:
    var gridHeader = $(".dx-datagrid-header-panel");
    gridHeader.hide();

-- How to generate data again when we one field lose focus and the value disappear:

    myModule.setTextBox = function (value, endName) {
        ...
    //$('#' + elementid).focusout(function () {
    //    if (elementid.endsWith(endName)) {
    //        var id = $('#' + elementid).val();
    //        if (!id) {
    //            $('#' + elementid).val(value);
    //        }
    //    }
    //});


====================================================================================================================


        .service('Initial', [
        '$http', function ($http) {
            this.GetL1ResellersForHub = function () {
                var tableName = "Resellers";
                var getMethod = "GetParentResellersWithoutL0ForHub";
                var fullUrl = CmpToolStatic.apiUrl + "Api/" + tableName + "/" + getMethod + "/";
                return window.CmpTool.ServiceHelper.getItem($http, fullUrl);
            }
        }
        ])

        //initialService.GetL1ResellersForHub().then(
        //           function (pResellerResponse) {
        //               var pResellers = pResellerResponse.data;
        //               var marketplaces_dtx = CmpToolUtility.getMarketplacesByHubId(pResellers, 1);
        //               var marketplaces_sg = CmpToolUtility.getMarketplacesByHubId(pResellers, 2);
        //               var marketplaces_au = CmpToolUtility.getMarketplacesByHubId(pResellers, 3);
        //               var marketplaces_eu = CmpToolUtility.getMarketplacesByHubId(pResellers, 4);
        //               // ? var defaultMarketplaces = CmpToolUtility.getMarketplaces();
        //               //var selectedMarketplace = CmpToolUtility.getSelectedMarketplace();

        //               var resellerids_dtx = CmpToolUtility.getResellerIdsByHubId(pResellers, 1);
        //               var resellerids_sg = CmpToolUtility.getResellerIdsByHubId(pResellers, 2);
        //               var resellerids_au = CmpToolUtility.getResellerIdsByHubId(pResellers, 3);
        //               var resellerids_eu = CmpToolUtility.getResellerIdsByHubId(pResellers, 4);

        //               localStorage.setItem('marketplaces_dtx', marketplaces_dtx);
        //               localStorage.setItem('marketplaces_sg', marketplaces_sg);
        //               localStorage.setItem('marketplaces_au', marketplaces_au);
        //               localStorage.setItem('marketplaces_eu', marketplaces_eu);

        //               localStorage.setItem('resellerids_dtx', resellerids_dtx);
        //               localStorage.setItem('resellerids_sg', resellerids_sg);
        //               localStorage.setItem('resellerids_au', resellerids_au);
        //               localStorage.setItem('resellerids_eu', resellerids_eu);
        //           });


        //if (CmpToolStatic.isDeployed && (CmpToolStatic.currentHub === 'dev' || CmpToolStatic.currentHub === 'stg')) {
        //    var isRedirected = localStorage.getItem('IsRedirected');
        //    if (isRedirected === null || isRedirected !== 'true') {
        //        localStorage.setItem('IsRedirected', 'true');
        //        window.location = CmpToolStatic.apiUrl + 'Redirect.aspx';
        //        return;
        //    }
        //}

        >> Delete:

        IsRedirected

        handleHttpsForWS

        .redirect();

        Redirect.aspx

         
            var detailTable = 'Log';
        var detailMethod = 'GetFormattedMessageByHandlingInstanceId';
        localStorage.setItem('detailExceptionHtml', '');
        var fullUrlForDetail = CmpToolStatic.apiUrl + "Api/" + detailTable + "/" + detailMethod + "/" + handlingInstanceId + "/";
        window.CmpTool.ServiceHelper.getItem(myhttp, fullUrlForDetail).then(function (detailResponse) {
            var detailHtml = detailResponse.data[0].FormattedMessage;
            localStorage.setItem('detailExceptionHtml', detailHtml);
        });

    // retrieve formatted error data url in Automation API project:
    myInitial.errUrl = myInitial.apiUrl + 'ExceptionMsg.aspx?HandlingInstanceId='; 


        // retrieve encryped pwd:
    var pwdContrlName = 'Util';
        var pwdUrl = CmpToolUtility.getFullUrlForTable(pwdContrlName);
        var pwdGetMethod = 'GetEncrypedString';
        pwdUrl = pwdUrl + pwdGetMethod + '/1?str=' + encryptPassword + '&username=' + encryptUserName;
        $http.get(pwdUrl)
            .success(function (pwdResponse) {
                localStorage.setItem("encryptedPassword", pwdResponse);
            })
            .error(function (errResponse) {
                localStorage.setItem("encryptedPassword", '');
                console.log(errResponse);
            });



        -----------------------

        <!--<script src="https://l2.io/ip.js?var=userip"></script>  enable this when we use public IP (with Internet connection)-->

        -- change dxDatagrid header background color:
        <style>
        .dx-datagrid .dx-header-filter:before {
            content: "\f050 ";
            /*color: green;*/
        }

        /*.dx-datagrid .dx-datagrid-headers tr:first-child {
        background-color: red; 
        }*/
        </style>
        

        //if (e.rowType != "data" || !isBatchEditing) {
        //    return;
        //}
        //if (e.column.dataField === 'PlanID' || e.column.dataField === 'PADID') {
        //    e.column.allowEditing = false;
        //}




        onContentReady: function (e) {
            //var visibleRowsCount = e.component.totalCount();
            //var pageSize = e.component.pageSize();
            //if (visibleRowsCount > pageSize)
            //    visibleRowsCount = pageSize;
            ////var totalCount = e.component.option('dataSource').length;
            //e.component.option('pager.infoText', 'Displaying ' +visibleRowsCount + ' of ' +e.component.totalCount() + ' records');


//var detailTable = 'Log';
                    //var detailMethod = 'GetFormattedMessageByHandlingInstanceId';
                    //var handlingInstanceId = CmpToolUtility.getHandlingInstanceIdFromErrTxt(errText);
                    //$scope.getServiceData(detailTable, detailMethod, handlingInstanceId).then(function (detailResponse) {
                    //    var detailErrMsg = detailResponse.data[0].FormattedMessage;
                    //    localStorage.setItem("msgErrContent", detailErrMsg);
                    //    var url = CmpToolStatic.errUrl + handlingInstanceId;
                    //    window.open(url);
                    //});



            //// userId param is disabled in SP 'CmpToolGetSysMenuByUserId'
            //var userId = localStorage.getItem('username');
            //this.retrieveSubMenu = function(parentMenuId) {
            //    window.CmpTool.ServiceHelper.getSubMenu($http, userId, parentMenuId).then(getSysMenu);
            //    var menuResult = [];
            //    function getSysMenu(response) {
            //        var allMenu = response.data;
            //        for (var menu in allMenu) {
            //            menuResult.push(allMenu[menu].Name);
            //        }
            //    }
            //    return menuResult;
            //}



            //CmpToolStatic.selectedMarketplace = CmpToolStatic.marketplaces[0];
            //if (!CmpToolStatic.selectedMenuname) {
            //    CmpToolStatic.selectedMenuname = CmpToolStatic.signupmenu[0];
            //}
            //megaMenuService.marketplace = CmpToolStatic.selectedMarketplace;


        //service.getDataWithArray = function (tableName, getMethod, ids) {
        //    fullUrl = CmpToolUtility.getFullUrlForTable(tableName);
        //    if (getMethod != undefined && getMethod !== "") {
        //        fullUrl += getMethod + "/";
        //        if (id) {
        //            fullUrl += id + "/";
        //        }
        //    }
        //    return window.CmpTool.ServiceHelper.getItem(http, fullUrl);
        //};
        
window.Session = (function () {
    var win = window.top || window;
    var store = (win.name ? JSON.parse(win.name) : {});
    function save() {
        win.name = JSON.stringify(store);
    };
    if (window.addEventListener) window.addEventListener("unload", save, false);
    else if (window.attachEvent) window.attachEvent("onunload", save);
    else window.onunload = save;
    return {
        set: function (name, value) {
            store[name] = value;
        },
        get: function (name) {
            return (store[name] ? store[name] : undefined);
        },
        clear: function () { store = {}; },
        dump: function () { return JSON.stringify(store); }
    };
})();



        //myModule.loadjscssfile = function (filename, filetype) {
        //    var fileref;
        //    if (filetype == "js") { 
        //        fileref = document.createElement('script');
        //        fileref.setAttribute("type", "text/javascript");
        //        fileref.setAttribute("src", filename);
        //    }
        //    else if (filetype == "css") { 
        //        fileref = document.createElement("link");
        //        fileref.setAttribute("rel", "stylesheet");
        //        fileref.setAttribute("type", "text/css");
        //        fileref.setAttribute("href", filename);
        //    }
        //    if (typeof fileref != "undefined")
        //        document.getElementsByTagName("head")[0].appendChild(fileref);
        //}

    CREATE PROCEDURE [dbo].[CmpToolGetResellerNotInAggregatorForDropDown] 

        AS

        BEGIN

        SELECT ResellerID, CONVERT(varchar, ResellerID) + '. ' + ResellerName as DispName
        FROM dbo.Resellers 
        Where (IsActive = 1) AND (IsParent = 1) AND (ResellerID <> 1) AND ResellerID NOT IN 
        (
            SELECT ResellerId FROM ResellerAggregator
	)
	Order By SortOrder, ResellerID

END

    var vendorId = e.key.VendorId;
        var productId = e.key.ProductId;
        var url = generateFriendlyUrl(vendorId, productId, scope);
        e.key.URLRewrite = url;

        //function generateFriendlyUrl(vId, pId, scope) {
        //    var vendorName = getVendorNameById(vId, scope);
        //    var productName = getProductNameById(pId, scope);
        //    var url = "/en/products/" + vendorName + "/" + productName;
        //    return url;
        //}

        function getVendorNameById(vId, scope) {
            var data = scope.vendorNameSlugDropdown;
            if (data.length > 0) {
                for (var i = 0; i < data.length; i ++) {
                    var tmp = parseInt(data[i]["VendorId"]);
                    if (vId === tmp) {
                        return data[i]["VendorName"].toString();
                    }
                }
            }
            return "";
        }

        function getProductNameById(pId, scope) {
            var data = scope.productNameSlugDropdown;
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var tmp = parseInt(data[i]["ProductId"]);
                    if (pId === tmp) {
                        return data[i]["ProductName"].toString();
                    }
                }
            }
            return "";
        }

   
    //myInitial.parentmenu = {};
    //myInitial.parentmenu.signup = 'b60ee7e5a1729146';
    //myInitial.parentmenu.plangroup = '150106002';
    //myInitial.parentmenu.reseller = 'b60ee20140121146';
    //myInitial.parentmenu.upsell = 'c60ee7e5a1729157';
    //myInitial.parentmenu.termsandconditions = '160215';
    //myInitial.parentmenu.netterms = 'b561e7e521929a36';
    //myInitial.parentmenu.navigation = '150510001';
    //myInitial.parentmenu.multilanguage = '0090';

                            //if (parseInt(this.value) > parseInt(maxId)) {
                            //    $('#' + elementid).val(maxId);
                            //}

    // displayPlans.js:

                    //$('.dx-texteditor-input').each(function (i, obj) {
                    //    try {
                    //        var elementid = obj.attributes.id.nodeValue;
                    //        if (elementid.startsWith("dx_") && elementid.endsWith("_PlanNum")) {
                    //            $('#' + elementid).val(planNum);
                    //            $('#' + elementid).attr('disabled', true);
                    //        }
                    //    } catch (err) {
                    //    }
                    //});



        //myGrid.onEditingStart = function (e) {
        //    scope.appIsInsert = false;
            
        //}

    // 2016.08.04: DisplayCategory, how to generate URLRewrite field (cannot save)

        //myGrid.onEditorPrepared = function (e) {
        //    if (e.parentType == 'dataRow' && (e.dataField == 'VendorId')) {
        //        e.editorElement.dxSelectBox('instance').option('onValueChanged', function (option) {
        //            vendorId = option.itemData.VendorId;
        //            $('.dx-texteditor-input').each(function (i, obj) {
        //                try {
        //                    var elementid = obj.attributes.id.nodeValue;
        //                    if (elementid.startsWith("dx_") && elementid.endsWith("_ProductId")) {
        //                        productId = $('#' + elementid).val();
        //                        var pos = productId.indexOf('.');
        //                        productId = parseInt(productId.substring(0, pos));
        //                    }
        //                } catch (err) {
        //                }
        //            });

        //            var url = generateFriendlyUrl(vendorId, productId, scope);
        //            $('.dx-texteditor-input').each(function (i, obj) {
        //                try {
        //                    var elementid = obj.attributes.id.nodeValue;
        //                    if (elementid.startsWith("dx_") && elementid.endsWith("_URLRewrite")) {
        //                        $('#' + elementid).val(url);
        //                        $('#' + elementid).attr('disabled', true);
        //                    }
        //                } catch (err) {
        //                }
        //            });
        //        });
        //    }

        //    if (e.parentType == 'dataRow' && (e.dataField == 'ProductId')) {
        //        e.editorElement.dxSelectBox('instance').option('onValueChanged', function (option) {
        //            productId = option.itemData.ProductId;
        //            $('.dx-texteditor-input').each(function (i, obj) {
        //                try {
        //                    var elementid = obj.attributes.id.nodeValue;
        //                    if (elementid.startsWith("dx_") && elementid.endsWith("_VendorId")) {
        //                        vendorId = $('#' + elementid).val();
        //                        var pos = vendorId.indexOf('.');
        //                        vendorId = parseInt(vendorId.substring(0, pos));
        //                    }
        //                } catch (err) {
        //                }
        //            });

        //            var url = generateFriendlyUrl(vendorId, productId, scope);
        //            $('.dx-texteditor-input').each(function (i, obj) {
        //                try {
        //                    var elementid = obj.attributes.id.nodeValue;
        //                    if (elementid.startsWith("dx_") && elementid.endsWith("_URLRewrite")) {
        //                        $('#' + elementid).val(url);
        //                        $('#' + elementid).attr('disabled', true);
        //                    }
        //                } catch (err) {
        //                }
        //            });
        //        });
        //    }
        //}


    var srcPath = '/scripts/controllers/initialController.js';
    var isNew = typeof (window.CmpTool.initialViewController) == 'undefined';
    CmpToolUtility.loadJsFile(isNew, srcPath);
    if (isNew) {
        CmpToolStatic.selectedMarketplace = CmpToolStatic.marketplaces[0];
        setTimeout(function () {
            window.CmpTool.initialViewController(scope, megaMenuService, subMenuService);
        }, 200);
    }

===

angular.element(document).ready(function () {
    CmpToolUtility.addTopMenuName($scope, CmpToolStatic);
});

//app.run(function($rootScope) {
//    $rootScope.rootCategoryId = 0;
//});

//myModule.logVariable = function(variable) {
//    switch (variable) {
//    case 'marketplace':
//        console.log('window.CmpTool.Globalvalue.marketplace: ' + window.CmpTool.Globalvalue.marketplace);
//        break;
//    case 'menuname':
//        console.log('window.CmpTool.Globalvalue.menuname: ' + window.CmpTool.Globalvalue.menuname);                      
//        break;
//    case 'categoryId':
//        console.log('window.CmpTool.Globalvalue.categoryId: ' + window.CmpTool.Globalvalue.categoryId);
//        break;
//    }
//}

>> 2016.06.23:


myGrid.onEditorPreparing = function(e) {
    if (e.parentType == 'dataRow' && e.dataField == 'Icon') {
        e.editorOptions.itemTemplate = function(itemData, itemIndex, itemElement) {
            $("<div/>").text("Name: " + itemData.username).appendTo(itemElement);
            $("<div/>").text(itemData.phone).appendTo(itemElement);
            $("<div/>").text(itemData.email).appendTo(itemElement);
        }
    }
}

>> 2016.06.22:

myGrid.onInitialized = function () {
    var gridHeader = $(".dx-datagrid-header-panel");
    gridHeader.hide();
};

var resellerId = e.data.AccountID;
var currentAccountData = CmpToolUtility.searchReseller(allParentResellers, resellerId);
currentAccountDispName = currentAccountData[0].DispName;

//var resellerId = CmpToolUtility.getResellerIdByName(window.CmpTool.Globalvalue.marketplace);
//if (resellerId != '0') {
//    var currentAccountData = CmpToolUtility.searchReseller(allParentResellers, resellerId);
//    currentAccountDispName = currentAccountData[0].DispName;
//}

>> 2016.06.21: 

//dd(e.editorElement, planNum);

//var planNumContainer = myGrid.getCellElement(1, '');
//planNumContainer.html(planNum);


Row number: http://jsfiddle.net/ChartJS/vzLqqskb/27/
    {
        caption: "Row number",
        customizeText: function () {
            return ++i;
        }
    },

>> 2016.06.20:


myModule.generateFormattedMsg = function(myhttp, myUrl, handlingInstanceId) {
    var result;
    var fullUrl = CmpToolStatic.apiUrl + "api/Log/GetFormattedMessageByHandlingInstanceId/" +handlingInstanceId + "/";
    //try {
    //    result = myhttp.get(fullUrl);
    //} catch (err) {
    //    result = 'Cannot retrieve exception message by HandlingInstanceId: ' + handlingInstanceId;
    //}
    //return result;
    return myhttp.get(fullUrl);
}


>> 16.06.19

//return myhttp.get(myUrl).then(function(resp) {
//    var result = resp.data;
//    if (result.success) {
//        return result.contacts;
//    } else {
//        var errMsg = CmpToolUtility.getErrMsg(response);
//        Alert(" \n" + errMsg);
//    }
//});


//var url = 'http://localhost:1592/api/PermissionType/GetPermissionTypes/';
//var win = window.open(url, '_blank');
//win.focus();

>> 160616:

myGrid.onEditorPrepared = function (options) {
    if (options.parentType == 'dataRow' && options.dataField == 'AccountID') {
        options.editorElement.dxSelectBox('instance').option('onValueChanged', function (e) {
            var selectedAccountId = e.value;
            console.log(selectedAccountId);
            var newDataSource = CmpToolUtility.searchAccount(window.CmpTool.SignupServices.plandata, selectedAccountId);
            console.log(JSON.stringify(newDataSource));
        });
    }
}


>> 16.06.14: -controllerCommon.js

//scope.myservice = megaMenuService;
//var mename = window.CmpTool.Globalvalue.menuname;
//var caId = window.CmpTool.Globalvalue.categoryId;
//var resId = CmpToolUtility.getResellerIdByName(resellerName);
//CmpToolUtility.retrieveData(mename, caId, resId);

>> 16.06.13:


//var resellerId = window.CmpTool.resellerId;
//if (categoryId === 0) {
//    retrieveData(menuname, categoryId, re);
//}
//else {
//    retrieveData(menuname, resellerId, 1);
//}


-- 16.06.12: - displayPlans.js

//myGrid.onEditorPreparing = function(e) {
//    if (e.parentType == 'dataRow' && (e.dataField === 'AccountID' || e.dataField === 'PlanID')) {
//        if (e.dataField === 'AccountID' && window.CmpTool.resellerId !== '0') {
//            //e.cancel = true;
//        }
//        if (!window.CmpTool.isInsert) {
//            //e.cancel = true;
//        } else if (e.dataField == 'PlanID') {
//            window.CmpTool.isInsert = false;
//        }
//    }
//}

//myGrid.onContextMenuPreparing = function(e) {
//    if (e.row.rowType === "data") {
//        e.items = [
//            {
//                text: "edit",
//                onItemClick: function() {
//                    //$("#gridContainer").dxDataGrid("instance").editRow(e.row.rowIndex);
//                    window.CmpTool.isInsert = false;
//                }
//            }
//        ];
//    }
//}

myGrid.onCellPrepared = function(e) {
    var cellElement = e.cellElement;
    if (e.rowType === "data") {
        if (e.column.dataField === "AccountID") {
            //var selectBox = cellElement.find(".dx-selectbox").data("dxSelectBox");

            var selectBox = cellElement[0].data("dxSelectBox");

            //selectBox && selectBox.on("valueChanged", function(args) {
            //    var cell = e.component.getCellElement(e.rowIndex, "Product"),
            //        selectBox = cell.find(".dx-selectbox").data("dxSelectBox");
            //    if (selectBox) {
            //        var items = selectBox.option("dataSource.store") || selectBox.option("items");
            //        selectBox.option("dataSource", {
            //            store: items,
            //            filter: [["CategoryID", "=", args.value]]
            //        });
            //    }
            //});
            selectBox.readOnly = true;
        }
    }
}

//myGrid.onInitialized = function (e) {
//    //console.log(JSON.stringify(e));

//    //if (e.parentType == 'dataRow' && (e.dataField === 'AccountID' || e.dataField === 'PlanID')) {
//    //    console.log('test ok');
//    //}

//var gridInstance = e.component;
//gridInstance.beginCustomLoading();
//}

>> 16.06.10:

,
cssClass: 'gray'

e.editorOptions.itemTemplate = function (itemData, itemIndex, itemElement) {
    $("<div/>").text("PlanId:" + itemData.PlanID).appendTo(itemElement);
    $("<div/>").text("PlanNum: " + itemData.PlanNum).appendTo(itemElement);
    $("<div/>").text("PlanName: " + itemData.PlanName).appendTo(itemElement);
    $("<div/>").text("ResellerId: " + itemData.AccountID).appendTo(itemElement);
    $("<div/>").text("Marketplace: " + itemData.Memo).appendTo(itemElement);
}


>> displayPlans.js - dxdatagrid lookup

myGrid.onEditorPreparing = function(e) {
    if (e.parentType == 'dataRow' && e.dataField == 'PlanID') {
        if (!window.CmpTool.isInsert) {

            //var itemsEmpty = {
            //    PlanID: 0,
            //    DispName: ''


            //};

            //e.lookup.dataSource = itemsEmpty;
            //e.editorOptions.itemTemplate = function (itemData, itemIndex, itemElement) {
            ////    //.dx-item-content-placeholder
            ////    itemElement.visible = false;
            // $("<div style='color:red; height:0;'></div>").text("Please don't change PlanID when you edit.").appendTo(itemElement);
            // }

            e.cancel = true;
            //e.showEditorAlways = false;
            //e.visible = false;
            //e.allowEditing = false;
            //e.lookup.dataSource = itemsEmpty;
            //e.lookup.disabled = true;


        } else {

            // e.lookup.dataSource = items;


            //e.editorOptions.dataSource = contacts;
            e.editorOptions.itemTemplate = function(itemData, itemIndex, itemElement) {
                $("<div/>").text("PlanId:" + itemData.PlanID).appendTo(itemElement);
                $("<div/>").text("PlanNum: " + itemData.PlanNum).appendTo(itemElement);
                $("<div/>").text("PlanName: " + itemData.PlanName).appendTo(itemElement);
                $("<div/>").text("ResellerId: " + itemData.AccountID).appendTo(itemElement);
                $("<div/>").text("Marketplace: " + itemData.Memo).appendTo(itemElement);
            }
            window.CmpTool.isInsert = false;
        }
    }

    //if (e.parentType === 'dataRow' && e.dataField === 'PlanID') {
    //    e.editorElement.dxAutocomplete({
    //            dataSource: items,
    //        value: e.value,
    //        onValueChanged: function(ea) { e.setValue(ea.value); }
    //    });
    //    e.cancel = true;
    //}
}

//myGrid.onCellPrepared = function(e) {
//    //if (e.column.command === 'edit') {
//    //    console.log('edit 160608');
//    //    }
//    //        if (e.column.command === 'insert') {
//    //    console.log('insert 160608');
//    //    }

//             if(e.column.command === 'detail') {
//                 if(e.data.PlanID !== undefined && e.data.PlanID !== '')
//        console.log('detail for planid is not null 160608');
//                 //myGrid.columns[1].allowEditing = false;
//                 var aa = myGrid.columns[1];
//                 aa.allowEditing = false;
//                 aa.enabled = false;
//             }

//        //    if(e.column.command === 'details') {
//        //console.log('details 160608');
//        //}

//        //element.on('dxclick', '.dx-link', function() {
//        //    if ($(this).text() === 'Cancel') onCancel();
//        //});
//}

//myGrid.onEditorPrepared = function(info) {
//    if (info.caption === "PlanID and Name") {
//        info.allowEditing = false;
//        info.readOnly = true;
//        info.visible = false;
//    }

//    //if (info.parentType == 'filterRow' && info.dataField == "state" && info.editorName == "dxSelectBox") {
//    //    info.trueText = "S";
//    //    info.falseText = "N";

//    //}
//}

-=--------------------------------------------------
app.util.js L66:

//if (allMenu.length > 0) {
//    window.CmpTool.Globalvalue.menuname = allMenu[0].Name;
//}

//- 2016.06.06:  - signup.html

-- left menu directive:
<!--<div class="left-menu">
    <div class="menu-header" ng-bind="page.heading"></div>
    <ul>
        <li ng-repeat="menuname in submenu"><a href="#" ng-click="loadFromSubMenu(menuname)" ng-bind="menuname"></a></li>
    </ul>
    <div class="leftmenu-msgkey-first" ng-bind="page.heading"></div>
    <div id="labelmarketplace" class="leftmenu-markepplace" ng-bind="'- ' + (marketplace)"></div>
    <div id="labelmenuname" class="leftmenu-menuname" ng-bind="'- ' + (menuname)"></div>
</div>-->

<!--<div class="search-box">
    <div class="search dx-texteditor dx-texteditor-empty dx-widget" style="width: 220px; height: 30px;">
        <div class="dx-texteditor-container">
            <input class="dx-texteditor-input" autocomplete="off" type="text" spellcheck="false" role="textbox" ng-change="search(searchText)" ng-model="searchText">
            <div class="dx-texteditor-buttons-container"></div>
        </div>
    </div>
    <div class="icon-find"></div>
</div>-->

<!--<div class="buttons" style="float:left; margin-right:10px">
        <div class="button-chooser dx-widget dx-button-has-icon dx-button" title="Choose grid columns" aria-label="column-chooser">
            <div class="dx-button-content" ng-click="btnChooserClick()">
                <i class="dx-icon dx-icon-column-chooser"></i>
            </div>
        </div>
        <div class="button-custom-add dx-widget dx-button-has-icon dx-button" title="Add New Row" aria-label="custom-add">
            <div class="dx-button-content">
                <i class="dx-icon dx-icon-custom-add" ng-click="btnAddClick()"></i>
            </div>
        </div>
        <div class="button-custom-delete dx-widget dx-button-has-icon dx-button" title="Delete" aria-label="custom-delete">
            <div class="dx-button-content">
                <i class="dx-icon dx-icon-custom-delete" ng-click="btnDeleteClick()"></i>
            </div>
        </div>
        <div class="button-export dx-widget dx-button-has-icon dx-button" title="Export" aria-label="export">
            <div class="dx-button-content">
                <i class="dx-icon dx-icon-export" ng-click="btnExportClick()"></i>
            </div>
        </div>
    </div>-->


// in app.js File:

//define([], function () {
//    var app = angular.module('app', ['ngRoute']);
//    app.config(function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
//        app.controllerProvider = $controllerProvider;
//        app.compileProvider = $compileProvider;
//        app.routeProvider = $routeProvider;
//        app.filterProvider = $filterProvider;
//        app.provide = $provide;

//        $routeProvider.when('/', {
//            templateUrl: '/views/home.html',
//            resolve: {
//                deps: function ($q, $rootScope) {
//                    var deferred = $q.defer();
//                    var dependencies =
//                    [
//                        'controllers/HomeViewController.js'
//                    ];

//                    $script(dependencies, function () {
//                        $rootScope.$apply(function () {
//                            deferred.resolve();
//                        });
//                    });
//                    return deferred.promise;
//                }
//            }
//        });

//        $routeProvider.when('/signup', {
//            templateUrl: '/views/signup.html',
//            resolve: {
//                deps: function ($q, $rootScope) {
//                    var deferred = $q.defer();
//                    var dependencies =
//                    [
//                        'controllers/SignupViewController',
//                        'controllers/Signup/displayPlans',
//                        'controllers/Signup/displayCategory',
//                        'controllers/Signup/displayPlanCategory'
//                    ];

//                    $script(dependencies, function () {
//                        $rootScope.$apply(function () {
//                            deferred.resolve();
//                        });
//                    });
//                    return deferred.promise;
//                }
//            }
//        });
//    });
//});