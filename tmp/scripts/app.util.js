
var CmpToolUtility = (function(myModule) {

    myModule.Alert = function(value) {
        (typeof (sweetAlert) === 'undefined') ? alert(value) :
            sweetAlert(
                'Success',
                value,
                'success'
            );
    }

    myModule.AlertStop = function(value) {
        (typeof (sweetAlert) === 'undefined') ? alert(value) :
            sweetAlert(
                'Failed',
                value,
                'error'
            );
    }

    myModule.AlertError = function(value, handlingInstanceId) {
        if (handlingInstanceId) {
            var url = '/exceptionDetail.html?HandlingInstanceId=' + handlingInstanceId;
            value += '<br>';
            value += 'HandlingInstanceId: ';
            value += '<br>';
            value += "<a href=" + url + " target='_blank'>" + handlingInstanceId + "</a>";
        }
        typeof (sweetAlert) === 'undefined' ? alert(value) :
            sweetAlert(
                'Oops...',
                value,
                'error'
            );
    }

    myModule.AlertErrorText = function(value, errLinkTxt) {
        value += '<br>';
        value += "<a style='margin-left: 30px' href=" + CmpToolStatic.errLocalUrl + " target='_blank'>" + errLinkTxt + "</a>";
        typeof (sweetAlert) === 'undefined' ? alert(value) :
            sweetAlert(
                'Oops...',
                value,
                'error'
            );
    }

    myModule.AlertConfirm = function (strText, action, strTitle, strBtnText) {
        if (typeof (strTitle) === "undefined") {
            strTitle = 'Are you sure';
        }
        if (typeof (strBtnText) === "undefined") {
            strBtnText = 'Continue';
        }
        
        typeof (sweetAlert) === 'undefined' ? action() :
            swal({
                title: strTitle,
                text: strText,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: strBtnText
            }).then(action)
            .done();
    }

    myModule.cleanDropdown = function(scope) {
        scope.parentResellerDropdown = null;
        scope.childResellerDropdown = null;
        scope.internalResourcesMapDropdown = null;
        scope.internalResourcesWithNumDropdown = null;
        scope.internalPlansDropdown = null;
        scope.internalPlansWithPlanNumDropdown = null;
        scope.displayPlansDropdown = null;
        scope.displayCategoriesDropdown = null;
        scope.displayParentCategoriesDropdown = null;
        scope.permissionTypeDropdown = null;
        scope.activedResellerFoldersDropdown = null;
        scope.vendorNameSlugDropdown = null;
        scope.productNameSlugDropdown = null;
        scope.planAttributeDetailDropdown = null;
        scope.upsellDropdown = null;
        scope.billingTermTypeDropdown = null;
        scope.billingTermDisplayTypeDropdown = null;
        scope.billingTermsDropdown = null;
        scope.paymentMethodsDropdown = null;
        scope.billingTermDescriptionDropdown = null;
        scope.parentPlanGroupDropdown = null;
        scope.childPlanGroupDropdown = null;
        scope.allPlanGroupDropdown = null;
        scope.resellerAttributeDropdown = null;
        scope.activeLanguagesDropdown = null;
        scope.allLanguagesDropdown = null;
        scope.resellerContentDropdown = null;
        scope.termsAndConditionsDropdown = null;
        scope.termsAndConditionsGroupDropdown = null;
        scope.payToolsDropdown = null;
        scope.planFeaturesBaseDropdown = null;
        scope.resxDetailDropdown = null;
    }

    myModule.generateMainmenu = function(scope, megaMenuService) {
        var marketplaces = myModule.getMarketplaces();
        console.log('Selected Hub marketplaces: ' + marketplaces);
        var mainMenuId = $(".main-menu").attr("id");
        if (!mainMenuId) return;
        if (mainMenuId === "MainMenu") {
            mainMenuId = CmpToolStatic.selectedMarketplace;
            if (!mainMenuId) return;
        }
        var mainMenuItems = [
            {
                iconSrc: "/images/logo-" + mainMenuId.toLowerCase() + ".png",
                items: []
            }
        ];

        $.each(marketplaces, function(i) {
            mainMenuItems[0].items.push({
                text: marketplaces[i]
            });
        });

        $.each(mainMenuItems[0].items, function(i, item) {
            item.selected = item.text == mainMenuId;
        });

        window.CmpTool.DataProvider.retrieveMegamenu(scope, megaMenuService, CmpToolStatic.selectedMarketplace);

        $(".main-menu").dxMenu({
            items: mainMenuItems,
            //showFirstSubmenuMode: "onHover",
            selectionMode: "single",
            selectByClick: true,
            cssClass: "main-menu-items",
            height: 30,
            onItemClick: function(e) {
                myModule.cleanDropdown(scope);
                if (!e.itemData.items) {
                    var resellerName = e.itemData.text;
                    CmpToolStatic.selectedMarketplace = resellerName;
                    console.log('Selected Marketplace: ' + CmpToolStatic.selectedMarketplace);
                    //scope.marketplace = '- ' + resellerName;
                    scope.appMarketplace = '- ' + resellerName;
                    var imagepath = "/images/logo-" + resellerName.toLowerCase() + ".png";
                    $('#MainMenu img').attr("src", imagepath);
                    $("#megamenutopbar").show();
                    window.CmpTool.DataProvider.showLabelForallCategories(scope);
                    $('.button-custom-add').show();
                    if (resellerName === CmpToolStatic.allCountries) {
                        $("#megamenutopbar").hide();
                        $('.button-custom-add').hide();
                        scope.appCategoryId = 0;
                    }
                    //myModule.cleanupGrid();
                    //} else {
                    window.CmpTool.DataProvider.retrieveMegamenu(scope, megaMenuService, resellerName);
                    window.CmpTool.DataProvider.retrieveData(scope);
                    //}
                }
            }
        }).data("dxMenu");
        //myModule.hideLoadingPage();
    }

    //myModule.handleHttpsForWS = function (forceUpdate) {
    //    if (typeof (forceUpdate) === "undefined") {
    //        var isRedirected = localStorage.getItem('IsRedirected');
    //        if (isRedirected === null || isRedirected !== 'true') {
    //            myModule.redirect();
    //        }
    //    } else {
    //        myModule.redirect();
    //    }
    //}

    //myModule.redirect = function() {
    //    //setTimeout(function () {
    //        var isRedirected = localStorage.getItem('IsRedirected');
    //        if (isRedirected === null || isRedirected !== 'true') {
    //            localStorage.setItem('IsRedirected', 'true');
    //            window.location = CmpToolStatic.apiUrl + 'Redirect.aspx';
    //        }
    //    //}, 1000);
    //}

    //myModule.handleHttpsForCMP = function() {
    //    var isRedirected = localStorage.getItem('IsRedirectedCMP');
    //    if (isRedirected === null || isRedirected !== 'true') {
    //        localStorage.setItem('IsRedirectedCMP', 'true');
    //        myModule.openNewTab(CmpToolStatic.htmlContenUrl);
    //        return true;
    //    }
    //    return false;
    //}

    myModule.handleErr = function(response, msgText, myUrl) {
        if (response) {
            var handlingInstanceId = myModule.getHandlingInstantId(response);
            if (handlingInstanceId && handlingInstanceId != '') {
                myModule.AlertError(msgText, handlingInstanceId);
            } else {
                var errLinkTxt = CmpToolStatic.Message.msgErr;
                var detailErrMsg = myModule.formatMsg(response, myUrl);
                CmpToolStatic.Message.msgErrContent = detailErrMsg;
                localStorage.setItem("msgErrContent", detailErrMsg);
                myModule.AlertErrorText(msgText, errLinkTxt);
            }
        } else {
            myModule.AlertError(CmpToolStatic.Message.nullResponseErr + '<br>' + '<p>' + myUrl + '</P>');
            //if (CmpToolStatic.isDeployed && (CmpToolStatic.currentHub === 'dev' || CmpToolStatic.currentHub === 'stg')) {
            //    myModule.handleHttpsForWS();
            //}
        }
        myModule.hideLoadingPage();
    }

    myModule.showLoadingPage = function() {
        if (CmpToolStatic.appShowLoadingImage) {
            $("#loading").removeClass('hide');
        }
    }

    myModule.hideLoadingPage = function() {
        $("#loading").addClass('hide');
    }

    myModule.loadJsFile = function(notLoaded, srcPath) {
        if (notLoaded) {
            var j = document.createElement('script');
            j.type = 'text/javascript';
            j.src = srcPath;
            document.getElementsByTagName('head')[0].appendChild(j);
        }
    }

    myModule.getMarketplaces = function() {
        var strMarketplaces = window.selected_marketplaces;
        if (!strMarketplaces) {
            strMarketplaces = CmpToolStatic.defaultMarketplaces;
            window.selected_marketplaces = strMarketplaces;
        }
        return strMarketplaces.toString().split(',');
    }

    myModule.getResellerIds = function() {
        var strResellerIds = window.selected_resellerIds;
        if (!strResellerIds || strResellerIds.length === 0) {
            strResellerIds = CmpToolStatic.defaultResellerIds;
        }
        return strResellerIds.toString().split(',');
    }

    myModule.addTopMenuName = function(scope, cmpToolStatic) {
        scope.appTopmenuAggregator = cmpToolStatic.topMenu[0];
        scope.appTopmenuSignup = cmpToolStatic.topMenu[1];
        scope.appTopmenuPlanGroup = cmpToolStatic.topMenu[2];
        scope.appTopmenuReseller = cmpToolStatic.topMenu[3];
        scope.appTopmenuUpsell = cmpToolStatic.topMenu[4];
        scope.appTopmenuTermcondition = cmpToolStatic.topMenu[5];
        scope.appTopmenuNetTerms = cmpToolStatic.topMenu[6];
        scope.appTopmenuNavigation = cmpToolStatic.topMenu[7];
        scope.appTopmenuMultilanguage = cmpToolStatic.topMenu[8];
        scope.appTopmenuSysConfig = cmpToolStatic.topMenu[9];
        scope.appTopmenuSyncTool = cmpToolStatic.topMenu[10];
        return scope;
    }

    myModule.getEncryptText = function (sourcetext) {
        var encryptedText = encodeURIComponent(sourcetext);
        return encryptedText;
    }

    myModule.getFullUrlForMegaMenu = function(resellerId) {
        var megamenuApi = "api/MegaMenu/GetMegamenu/";
        var fullUrl = CmpToolStatic.apiUrl + megamenuApi + resellerId + "/";
        return fullUrl;
    }

    myModule.getFullUrlForSubMenu = function(userId, parentMenuId) {
        var menuApi = "api/SysMenu/GetSysMenuByUserId/";
        var submenuUrl = CmpToolStatic.apiUrl + menuApi;
        var fullUrl = submenuUrl + userId + "/" + parentMenuId + "/";
        return fullUrl;
    }

    myModule.getFullUrlForTable = function(tableName) {
        var fullUrl = CmpToolStatic.apiUrl + "api/" + tableName + "/";
        return fullUrl;
    }

    myModule.getResellerIdByName = function(resellerName) {
        var result = 0;
        var index = -1;
        var marketplaces = myModule.getMarketplaces();
        var resellerIds = myModule.getResellerIds();
        marketplaces.forEach(function(name) {
            index += 1;
            if (resellerName === name)
                result = resellerIds[index];
        });
        return result;
    }

    myModule.getErrMsg = function(response) {
        var errMsg = "Save Failed!";
        errMsg += "\n";
        errMsg += "\n";
        errMsg += "Error Message: ";
        errMsg += "\n";
        errMsg += response;
        errMsg += "\n";
        return errMsg;
    }

    myModule.getHandlingInstantId = function(response) {
        var keyStart = '<HandlingInstanceId>';
        var keyEnd = '</HandlingInstanceId>';
        var srcText = response.toString();
        var posStart = srcText.indexOf(keyStart);
        if (posStart < 0) {
            return '';
        }
        posStart += 20;
        var posEnd = srcText.indexOf(keyEnd);
        if (posEnd < 0) {
            return '';
        }
        var result = srcText.substring(posStart, posEnd);
        return result;
    }

    myModule.getMarcketplace = function(accountId) {
        var marketplaces = myModule.getMarketplaces();
        var pos = marketplaces.indexOf(accountId.toString());
        return marketplaces[pos];
    }

    myModule.searchDataTable = function(myArray, id, colName) {
        var result = $.grep(myArray, function(e) {
            return e[colName] == id;
        });
        return result;
    }

    myModule.refreshDataGrid = function(grid, gridConfig, isBatchEditingFlag) {
        grid.html('');
        var container = $("<div id='gridContainer' dx-data-grid='gridSettings'></div>").dxDataGrid(gridConfig);
        container.appendTo(grid);

        // disable the loading panel('Loading Data' popup image):
        var gridInstance = $('#gridContainer').dxDataGrid('instance');
        gridInstance.option('loadPanel.enabled', false);
        gridInstance.refresh();


        if (isBatchEditingFlag) {
            myModule.showGirdHeader();
        } else {
            myModule.hideGirdHeader();
        }
    }

    myModule.formatMsg = function(response, myUrl) {
        var detailErrMsg = '';
        detailErrMsg += addMessage('ExceptionMessage', response.ExceptionMessage);
        detailErrMsg += addMessage('Message', response.Message);
        detailErrMsg += addMessage('StackTrace', response.StackTrace);
        detailErrMsg += addMessage('Url', myUrl);
        return detailErrMsg;
    }

    var addMessage = function(title, message) {
        if (!message || message == '') {
            return '';
        }
        var result = '';
        result += '<b>[' + title + ']</b>';
        result += "<br>";
        result += message;
        result += "<br>";
        result += "<br>";
        return result;
    }

    myModule.openNewTab = function(url) {
        var form = document.createElement("form");
        form.method = "GET";
        form.action = url;
        form.target = "_blank";
        document.body.appendChild(form);
        form.submit();
    }

    myModule.addScopeService = function(scope, serviceName) {
        scope.getServiceData = serviceName.getServiceData;
        scope.updateServiceData = serviceName.updateServiceData;
        scope.insertServiceData = serviceName.insertServiceData;
        scope.deleteServiceData = serviceName.deleteServiceData;
    }

    myModule.setReadOnlyValue = function(editorElement, index, currentDispName) {
        if (editorElement.length > index && editorElement[index] != undefined) {
            editorElement[index].innerHTML = "<div><input class='dx-texteditor-input' style='color:gray' readonly value='" + currentDispName + "'></div>";
        }
    }

    myModule.getMaxId = function(respMaxId) {
        var data = respMaxId.data;
        var result = 0;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var tmp = parseInt(data[i]);
                if (result < tmp) {
                    result = tmp;
                }
            }
        }
        return result;
    }

    myModule.getSkuId = function(respMaxId) {
        var data = respMaxId.data;
        var result = 0;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var tmp = parseInt(data[i]["MaxID"]);
                if (result < tmp) {
                    result = tmp;
                }
            }
        }
        return result;
    }

    myModule.setTextBox = function(value, endName) {
        try {
            var leng = $('.dx-texteditor-input').length;
            for (var i = 0; i < leng; i++) {
                var elementid = $('.dx-texteditor-input')[i].id;
                if (endName && elementid.startsWith("dx_") && elementid.endsWith(endName)) {
                    if (value) {
                        $('#' + elementid).val(value);
                    }
                    $('#' + elementid).attr('disabled', false);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    myModule.setTextBoxReadOnly = function(value, endName) {
        try {
            var leng = $('.dx-texteditor-input').length;
            for (var i = 0; i < leng; i++) {
                var elementid = $('.dx-texteditor-input')[i].id;
                if (elementid.startsWith("dx_") && elementid.endsWith(endName)) {
                    if (value) {
                        $('#' + elementid).val(value);
                    }
                    $('#' + elementid).attr('disabled', true);
                    $('#' + elementid).attr('readonly', true);
                    $('#' + elementid).prop("readonly", true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    myModule.guid = function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    myModule.showMegaMenu = function(resellerId) {
        if (resellerId != 0) {
            $("#megamenutopbar").show();
        }
    }

    // internal:
    myModule.getDispName = function(dataObj) {
        var result = "";
        if (dataObj.length > 0) {
            result = dataObj[0].DispName;
        }
        return result;
    }

    // internal:
    myModule.getPlanNum = function(dataObj) {
        var result = "";
        if (dataObj.length > 0) {
            result = dataObj[0].PlanNum;
        }
        return result;
    }

    myModule.getDispNameByPlanId = function(allPans, pId) {
        var currentData = myModule.searchDataTable(allPans, pId, 'PlanID');
        return myModule.getDispName(currentData);
    }

    myModule.getDispNameByPlanNum = function(allPans, pNum) {
        var currentData = myModule.searchDataTable(allPans, pNum, 'PlanNum');
        return myModule.getDispName(currentData);
    }

    myModule.getCurrentResellerDispName = function(allParentResellers, resellerId) {
        var currentData = myModule.searchDataTable(allParentResellers, resellerId, 'ResellerID');
        return myModule.getDispName(currentData);
    }

    myModule.getPlanNumByPlanId = function(allPans, pId) {
        var currentData = myModule.searchDataTable(allPans, pId, 'PlanID');
        return myModule.getPlanNum(currentData);
    }

    myModule.getDispNameByLcName = function(activeLangs, lcName) {
        var currentData = myModule.searchDataTable(activeLangs, lcName, 'LCName');
        return myModule.getDispName(currentData);
    }

    myModule.getDispNameByContentId = function(activeContent, contentId) {
        var currentData = myModule.searchDataTable(activeContent, contentId, 'ContentId');
        return myModule.getDispName(currentData);
    }

    myModule.getDispNameByTermId = function(allData, termId) {
        var currentData = myModule.searchDataTable(allData, termId, 'TermID');
        return myModule.getDispName(currentData);
    }

    myModule.setDispalyCatHtmlEditor = function(itemId, itemName, htmlValue) {
        localStorage.setItem("displayCategory_categoryId", itemId);
        localStorage.setItem("displayCategory_categoryName", itemName);
        localStorage.setItem("displayCategory_categoryHtml", htmlValue);
    }

    myModule.setMlDispalyCatHtmlEditor = function(itemId, lang, itemName, htmlValue) {
        localStorage.setItem("displayCategoryMl_categoryId", itemId);
        localStorage.setItem("displayCategoryMl_categoryHtml_lang", lang);
        localStorage.setItem("displayCategoryMl_categoryName", itemName);
        localStorage.setItem("displayCategoryMl_categoryHtml", htmlValue);
    }

    myModule.setShortDescriptionHtmlEditor = function(itemId, itemName, htmlValue) {
        localStorage.setItem("displayPlans_shortDesc_planId", itemId);
        localStorage.setItem("displayPlans_shortDesc_planName", itemName);
        localStorage.setItem("displayPlans_shortDescription", htmlValue);
    }

    myModule.setMlShortDescriptionHtmlEditor = function(itemId, lang, itemName, htmlValue) {
        localStorage.setItem("displayPlansMl_shortDesc_planId", itemId);
        localStorage.setItem("displayPlansMl_shortDesc_lang", lang);
        localStorage.setItem("displayPlansMl_shortDesc_planName", itemName);
        localStorage.setItem("displayPlansMl_shortDescription", htmlValue);
    }

    myModule.setMlLongDescriptionHtmlEditor = function(itemId, lang, itemName, htmlValue) {
        localStorage.setItem("displayPlansMl_longDesc_planId", itemId);
        localStorage.setItem("displayPlansMl_longDesc_lang", lang);
        localStorage.setItem("displayPlansMl_longDesc_planName", itemName);
        localStorage.setItem("displayPlansMl_longDescription", htmlValue);
    }

    myModule.setTermsConditionsHtmlEditor = function(itemId, lang, itemName, htmlValue) {
        localStorage.setItem("termsAndConditionsML_termId", itemId);
        localStorage.setItem("termsAndConditionsML_language", lang);
        localStorage.setItem("termsAndConditionsML_termName", itemName);
        localStorage.setItem("termsAndConditionsML_blobText", htmlValue);
    }

    myModule.setLongDescriptionHtmlEditor = function(itemId, itemName, htmlValue) {
        localStorage.setItem("displayPlans_LongDesc_planId", itemId);
        localStorage.setItem("displayPlans_LongDesc_planName", itemName);
        localStorage.setItem("displayPlans_longDescription", htmlValue);
    }

    myModule.isRowSelected = function(containerObj) {
        var key = containerObj.data("dxDataGrid").getSelectedRowKeys()[0];
        if (typeof (key) == "undefined") {
            myModule.AlertError('Please select a row!');
        }
        return key;
    }

    myModule.getToday = function() {
        var d = new Date();
        var yyyy = d.getFullYear();
        var mm = d.getUTCMonth() + 1;
        var dd = d.getUTCDate();
        return yyyy + '-' + mm + '-' + dd;
    }

    myModule.cleanupGrid = function() {
        $('#megamenutopbar').hide();
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        myModule.refreshDataGrid($('#myGridView'), myGrid);
        var gridHeader = $('.dx-datagrid-header-panel');
        gridHeader.hide();
    }

    myModule.getUrlByArray = function(fullUrl, id, param1, param2) {
        fullUrl += '?';
        fullUrl += 'id=' + id;
        fullUrl += '&userId=' + param1;
        var ids = '';
        for (var i = 0; i < param2.length; i++) {
            ids += '&ids=' + param2[i];
        }
        fullUrl += ids + '&ids/';
        return fullUrl;
    }

    myModule.getIdsArrayByColName = function(sqlData, colName) {
        var ids = [];
        for (var i = 0; i < sqlData.length; i ++) {
            ids.push(sqlData[i][colName]);
        }
        return ids;
    }

    myModule.checkAndPush = function(id, ids) {
        var leng = ids.length;
        if (leng == 0) {
            return ids.push(id);
        }
        for (var i = 0; i < leng; i ++) {
            if (ids[i] === id) return ids;
        }
        ids.push(id);
        return ids;
    }

    myModule.logout = function() {
        //localStorage.setItem('isLoggedin', false);
        ////localStorage.setItem('username', '');
        //localStorage.setItem('IsRedirected', false);
        //localStorage.setItem('IsRedirectedCMP', false);
        //localStorage.setItem('keepmelogin', false);
        //localStorage.setItem("selectedMenunameForFirstLoad", null);
        //localStorage.setItem("currentHubForFirstLoad", null);
        //localStorage.setItem("selected_marketplacesForFirstLoad", null);
        //localStorage.setItem("selected_resellerIdsForFirstLoad", null);
        //localStorage.setItem("selectedMarketplaceForFirstLoad", null);
        //localStorage.setItem("encryptedPassword", '');

        var user = localStorage.getItem('username');
        var pwd = localStorage.getItem("encryptedPassword");
        var rememberMe = localStorage.getItem('keepmelogin');
        
        localStorage.clear();
        localStorage.setItem('username', user);

        if (rememberMe !== null && rememberMe === 'true') {
            localStorage.setItem("encryptedPassword", pwd);
            localStorage.setItem('keepmelogin', true);
        }

        try {
            var grid = $("#gridContainer").dxDataGrid("instance");
            // clear the stateStoring
            grid.state({});
        } catch (err) {
            console.log(err);
        }

        myModule.redirectToLoginPage();
    }

    myModule.initialBatchEditingCheckbox = function(scope) {
        $("#batchEditingCheckBox").dxCheckBox({
            text: 'Batch Editing',
            value: false,
            onValueChanged: function (e) {
                if (!myModule.refreshSession()) {
                    return;
                }
                myModule.showLoadingPage();
                scope.batchEditingValueChanged();
            }
        });
    }

    myModule.initialForm = function(scope) {
        myModule.showLoadingPage();
        CmpToolStatic.isInitialForm = true;
        myModule.initialButtons();
        myModule.initialBatchEditingCheckbox(scope);
        window.CmpTool.DataProvider.showLabelForallCategories(scope);
    }

    myModule.initialButtons = function () {
        $("#btnChooser").show();
        $("#btnExport").show();
        $("#btnFixNums").hide();
        $("#btnHealthCheck").hide();
        $("#btnEditHtml1").hide();
        $("#btnEditHtml2").hide();
        $("#btnSync").hide();
        $('.button-custom-add').show();
        $('.button-custom-edit').show();
        //$('.button-custom-delete').hide();
        myModule.handleDelBtn();
        $("#btnSync").hide();
        $("#btnOsa").hide();
        $("#btnPopulate").hide();
        $('#batchEditingCheckBox').hide();
        $("#megamenutopbar").hide();
        $('#mainSearch').val('');
        $('.search-box').show();
    }

    myModule.hideButtons = function () {
        $("#btnChooser").hide();
        $("#btnExport").hide();
        $("#btnFixNums").hide();
        $("#btnHealthCheck").hide();
        $("#btnEditHtml1").hide();
        $("#btnEditHtml2").hide();
        $("#btnSync").hide();
        $('.button-custom-add').hide();
        $('.button-custom-edit').hide();
        $('.button-custom-delete').hide();
        $("#btnSync").hide();
        $("#btnOsa").hide();
        $("#btnPopulate").hide();
        $('#batchEditingCheckBox').hide();
        $("#megamenutopbar").hide();
        $('#mainSearch').val('');
    }

    myModule.hideGirdHeader = function() {
        var gridHeader = $(".dx-datagrid-header-panel");
        gridHeader.hide();
    }

    myModule.showGirdHeader = function() {
        var gridHeader = $(".dx-datagrid-header-panel");
        gridHeader.show();
    }

    //myModule.hideGirdPager = function() {
    //    var gridPager = $(".dx-datagrid-pager");
    //    gridPager.hide();
    //}

    //myModule.showGirdPager = function() {
    //    var gridPager = $(".dx-datagrid-pager");
    //    gridPager.hide();
    //}

    myModule.changeEditingProperties = function(myGrid, isBatchEditingFlag) {
        if (isBatchEditingFlag) {
            myGrid.editing = {
                mode: 'batch',
                editEnabled: true,
                allowUpdating: true,
                allowEditing: true,
                allowAdding: false,
                allowDeleting: false
            };
            myGrid.paging = {
                pageSize: 1600,
                pageIndex: 0
            };
            myGrid.pager = {
                showInfo: false
            };
            myGrid.headerFilter = {
                visible: false
            };
            myGrid.filterRow = {
                visible: false
            };
            myGrid.sorting = {
                mode: "none"
            };
        } else {
            myGrid.editing = {
                mode: 'form',
                allowUpdating: true,
                allowEditing: true,
                allowAdding: true,
                allowDeleting: false
            };
            myGrid.paging = {
                pageSize: 16,
                pageIndex: 0
            };
            myGrid.pager = {
                showInfo: true,
                infoText: 'Page {0}. Total: {1} ({2} items)',
                showPageSizeSelector: true,
                allowedPageSizes: [10, 16, 26, 50, 100, 500]
            };
            myGrid.headerFilter = {
                visible: true
            };
            myGrid.filterRow = {
                visible: true
            };
            myGrid.sorting = {
                mode: "multiple"
            };
        }
        return myGrid;
    }

    myModule.getTopMenuBySubMenu = function(subMenuName) {
        if ($.inArray(subMenuName, CmpToolStatic.aggregatormenu) > -1) {
            return CmpToolStatic.topMenu[0];
        }
        if ($.inArray(subMenuName, CmpToolStatic.signupmenu) > - 1) {
            return CmpToolStatic.topMenu[1];
        }
        if ($.inArray(subMenuName, CmpToolStatic.plangroupmenu) > -1) {
            return CmpToolStatic.topMenu[2];
        }
        if ($.inArray(subMenuName, CmpToolStatic.resellermenu) > -1) {
            return CmpToolStatic.topMenu[3];
        }
        if ($.inArray(subMenuName, CmpToolStatic.upsellmenu) > -1) {
            return CmpToolStatic.topMenu[4];
        }
        if ($.inArray(subMenuName, CmpToolStatic.termsandconditionmuenu) > -1) {
            return CmpToolStatic.topMenu[5];
        }
        if ($.inArray(subMenuName, CmpToolStatic.nettermsmenu) > -1) {
            return CmpToolStatic.topMenu[6];
        }
        if ($.inArray(subMenuName, CmpToolStatic.navigationmenu) > -1) {
            return CmpToolStatic.topMenu[7];
        }
        if ($.inArray(subMenuName, CmpToolStatic.multilanguagemenu) > -1) {
            return CmpToolStatic.topMenu[8];
        }
        if ($.inArray(subMenuName, CmpToolStatic.sysconfigmenu) > -1) {
            return CmpToolStatic.topMenu[9];
        }
        if ($.inArray(subMenuName, CmpToolStatic.synctoolmenu) > -1) {
            return CmpToolStatic.topMenu[10];
        }
        return '';
    }

    myModule.loadTopMenuByMenuName = function(scope, topMenuNameFirstLoad) {
        var aggregatormenu = CmpToolStatic.topMenu[0];
        var signupmenu = CmpToolStatic.topMenu[1];
        var plangroupmenu = CmpToolStatic.topMenu[2];
        var resellermenu = CmpToolStatic.topMenu[3];
        var upsellmenu = CmpToolStatic.topMenu[4];
        var termsandconditionmuenu = CmpToolStatic.topMenu[5];
        var nettermsmenu = CmpToolStatic.topMenu[6];
        var navigationmenu = CmpToolStatic.topMenu[7];
        var multilanguagemenu = CmpToolStatic.topMenu[8];
        var sysconfigmenu = CmpToolStatic.topMenu[9];
        var synctoolmenu = CmpToolStatic.topMenu[10];
        switch (topMenuNameFirstLoad) {
        case aggregatormenu:
            scope.loadAggregator();
            break;
        case signupmenu:
            scope.loadSignup();
            break;
        case plangroupmenu:
            scope.loadPlanGroup();
            break;
        case resellermenu:
            scope.loadReseller();
            break;
        case upsellmenu:
            scope.loadUpsell();
            break;
        case termsandconditionmuenu:
            scope.loadTermsAndConditions();
            break;
        case nettermsmenu:
            scope.loadNetTerms();
            break;
        case navigationmenu:
            scope.loadNavigation();
            break;
        case multilanguagemenu:
            scope.loadMultiLanguage();
            break;
        case sysconfigmenu:
            scope.loadSysConfig();
            break;
        case synctoolmenu:
            scope.loadSyncTool();
            break;
        }
    }

    myModule.removeTopMenuClass = function() {
        $('#aggregator').removeClass('selected');
        $('#signup').removeClass('selected');
        $('#plangroup').removeClass('selected');
        $('#reseller').removeClass('selected');
        $('#upsell').removeClass('selected');
        $('#termsandconditions').removeClass('selected');
        $('#netterms').removeClass('selected');
        $('#navigation').removeClass('selected');
        $('#multilanguage').removeClass('selected');
        $('#sysconfig').removeClass('selected');
        $('#synctool').removeClass('selected');
    }

    myModule.getStrArrByResponseData = function(responseData) {
        var arr = [];
        for (var i = 0; i < responseData.length; i ++) {
            arr.push(responseData[i].Errors);
        }
        arr.push(CmpToolStatic.Message.more);
        return arr;
    }

    myModule.selectDtx = function() {
        CmpToolStatic.selectedMarketplace = CmpToolStatic.marketplaces_dtx[0];
        window.selected_marketplaces = CmpToolStatic.marketplaces_dtx;
        window.selected_resellerIds = CmpToolStatic.resellerids_dtx;
        toastr.clear();
        myModule.changeHubReminding('DTX');
    }

    myModule.dtxSelect = function ($scope) {
        myModule.cleanDropdown($scope);
        myModule.selectDtx();
    }

    myModule.selectSg = function() {
        CmpToolStatic.selectedMarketplace = CmpToolStatic.marketplaces_sg[0];
        window.selected_marketplaces = CmpToolStatic.marketplaces_sg;
        window.selected_resellerIds = CmpToolStatic.resellerids_sg;
        toastr.clear();
        myModule.changeHubReminding('SG');
    }

    myModule.sgSelect = function ($scope) {
        myModule.cleanDropdown($scope);
        myModule.selectSg();
    }

    myModule.selectAu = function() {
        CmpToolStatic.selectedMarketplace = CmpToolStatic.marketplaces_au[0];
        window.selected_marketplaces = CmpToolStatic.marketplaces_au;
        window.selected_resellerIds = CmpToolStatic.resellerids_au;
        toastr.clear();
        myModule.changeHubReminding('AU');
    }

    myModule.auSelect = function ($scope) {
        myModule.cleanDropdown($scope);
        myModule.selectAu();
    }

    myModule.selectEu = function() {
        CmpToolStatic.selectedMarketplace = CmpToolStatic.marketplaces_eu[0];
        window.selected_marketplaces = CmpToolStatic.marketplaces_eu;
        window.selected_resellerIds = CmpToolStatic.resellerids_eu;
        toastr.clear();
        myModule.changeHubReminding('EU');
    }

    myModule.euSelect = function ($scope) {
        myModule.cleanDropdown($scope);
        myModule.selectEu();
    }

    myModule.changeHubReminding = function (hub) {
        setTimeout(function () {
            var msg = 'Connected to ' + hub + ' Hub';
            myModule.showToastrMessage(msg);
        }, 1000)
    };

    // errText: 20161014 10:33 - 55d5a0fa-7157-4852-8a1e-b0f727a16ea7
    myModule.getHandlingInstanceIdFromErrTxt = function (errText) {
        if (typeof (errText) === "undefined" || errText === null) {
            return '';
        }
        var pos = errText.indexOf(' - ');
        if (pos < 3) {
            return '';
        }
        var handlingInstanceId = errText.substring(pos + 3);
        return handlingInstanceId;
    }

    myModule.hideAllButtons = function () {
        $('.search-box').hide();
        $("#btnChooser").hide();
        $("#btnExport").hide();
        $("#btnFixNums").hide();
        $("#btnEditHtml1").hide();
        $("#btnEditHtml2").hide();
        $("#btnSync").hide();
        $('.button-custom-add').hide();
        $('.button-custom-edit').hide();
        $('.button-custom-delete').hide();
        $("#btnSync").hide();
        $("#btnOsa").hide();
        $("#btnPopulate").hide();
        //$("#megamenutopbar").hide();
        $('#batchEditingCheckBox').show();
    }

    myModule.showButtonsForDisplayPlans = function () {
        myModule.showNormalBtns();
        $("#btnEditHtml1").show();
        $("#btnEditHtml2").show();
        $("#megamenutopbar").show();
    }

    myModule.showButtonsForMasterPlans = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForSkuMap = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForUpsells = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForPlanSuggestion = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForPlanFeature = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForPlanGroup = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForPlanFeaturesBase = function () {
    myModule.showNormalBtns();
    }

    myModule.showButtonsForMasterResources = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForPlanNumAggregator = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForResourceNumAggregator = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForResellerAggregator = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForInternalPlans = function () {
        myModule.showNormalBtns();
        $("#btnFixNums").show();
    }

    myModule.showButtonsForInternalResourcesMap = function () {
        myModule.showNormalBtns();
        $("#btnFixNums").show();
    }

    myModule.showButtonsForPlanAttributes = function () {
        myModule.showNormalBtns();
    }

    myModule.showButtonsForDisplayCategory = function () {
        myModule.showNormalBtns();
        $("#btnEditHtml1").show();
    }

    myModule.showNormalBtns = function () {
        $('.search-box').show();
        $("#btnChooser").show();
        $("#btnExport").show();
        $("#btnFixNums").hide();
        $('.button-custom-add').show();
        $('.button-custom-edit').show();
        myModule.handleDelBtn();
        $("#btnSync").hide();
        $("#btnOsa").hide();
        $("#btnPopulate").hide();
        $('#batchEditingCheckBox').show();
    }

    myModule.handleDelBtn = function() {
        var isSysAdmin = localStorage.getItem('isSysAdmin');
        if (typeof (isSysAdmin) === "undefined" || isSysAdmin === "false") {
            $('.button-custom-delete').hide();
        } else {
            //$('.button-custom-delete').show();
            $('.button-custom-delete').hide();
        }
    }

    //myModule.removeDataWithNullValue = function(sourceData, colName) {
    //    var resultArr = [];
    //    if (sourceData.length > 0) {
    //        for (var i = 0; i < sourceData.length; i ++) {
    //            var value = sourceData[i][colName];
    //            if (typeof(value) != "undefined" && value != null && value != 0) {
    //                resultArr.push(sourceData[i]);
    //            }
    //        }
    //    }
    //    return resultArr;
    //}

    myModule.getUserId = function(currentIsLoginPage) {
        var userId = localStorage.getItem('username');
        var isLoggedin = localStorage.getItem('isLoggedin');
        if (isLoggedin === null || typeof (isLoggedin) === "undefined" || isLoggedin === 'false') {
            if (currentIsLoginPage === '1') {
                return '';
            } else {
                myModule.redirectToLoginPage();
                return '';
            }
        }
        return userId;
    }

    myModule.validateMethodName = function (getMethod) {
        if (getMethod != undefined && getMethod !== "") {
            return true;
        }
        return false;
    }

    myModule.expireSession = function () {
        CmpToolStatic.isSessionExpired = true;
    }

    myModule.redirectToLoginPage = function() {
        //localStorage.setItem('IsRedirected', false);
        window.location = '/login.html';
    }

    myModule.refreshSession = function () {
        if (CmpToolStatic.isSessionExpired) {
            var strText = "Redirect to login page?";
            var strTitle = CmpToolStatic.Message.alertTitle;
            var strBtnText = "Redirect to login page";
            myModule.AlertConfirm(strText, myModule.redirectToLoginPage, strTitle, strBtnText);
            setTimeout(function() { myModule.hideButtons(); }, 1000);
            return false;
        } else {
            clearTimeout(CmpToolStatic.checkTimeout);
            CmpToolStatic.checkTimeout = setTimeout(function() {
                myModule.expireSession();
            }, 1200000);       // 20 minutes
            return true;
        }
    }

    myModule.showToastrMessage = function (msg) {
        if (typeof(toastr) === "undefined") {
            alert(msg);
        } else {
            toastr.options = {
                "positionClass": "toast-bottom-left"
            }
            toastr.success(msg);
        }
    }

    myModule.dataSourceForBatchEditing = function (scope, sqlDataSource, tableName, keyName, setDataSource) {
        var timeOut = null,
            updateTasks = [];
        var timerCallback = function () {
            var changesArr = [];
            $.each(updateTasks, function (index, task) {
                //task.deferred.resolve();
                task.values[keyName] = task.key;
                task.values['ModifiedBy'] = myModule.getUserId();
                task.values['ClientIp'] = localStorage.getItem('clientIp');
                task.values['EncryptedPassword'] = localStorage.getItem('encryptedPassword');
                var selected = JSON.stringify(task.values);
                changesArr.push(selected);
            });
            scope.updateServiceData(tableName, keyName, changesArr);
            updateTasks = [];
            timeOut = null;
            setTimeout(function () {
                setDataSource(scope);  
            }, 1000);
        };
        var settings = {
            //key: keyName, -- nedd to disable this line for Composite key table, like PlanFeature
            load: function (loadOptions) {
                var d = $.Deferred();
                d.resolve(sqlDataSource, { totalCount: sqlDataSource.length });
                return d.promise();
            },
            update: function (key, values) {
                if (!timeOut) {
                    timeOut = setTimeout(timerCallback, 100);
                }
                var d = new $.Deferred();
                updateTasks.push({
                    key: key,
                    values: values,
                    deferred: d
                });
                return d.promise();
            }
        };
        return new DevExpress.data.DataSource(settings);
    }

    myModule.selectHub = function() {
        switch (CmpToolStatic.currentHub) {
        case CmpToolStatic.hubName.dev:
            myModule.selectDtx();
            break;
        case CmpToolStatic.hubName.stg:
            myModule.selectDtx();
            break;
        case CmpToolStatic.hubName.dtx:
            myModule.selectDtx();
            break;
        case CmpToolStatic.hubName.sg:
            myModule.selectSg();
            break;
        case CmpToolStatic.hubName.au:
            myModule.selectAu();
            break;
        case CmpToolStatic.hubName.eu:
            myModule.selectEu();
            break;
        }
    }

    //myModule.getMarketplacesByHub = function (currentHub) {
    //    var result = '';
    //    switch (currentHub) {
    //        case CmpToolStatic.hubName.dev:
    //            result = CmpToolStatic.marketplaces_dtx[0];
    //            break;
    //        case CmpToolStatic.hubName.stg:
    //            result = CmpToolStatic.marketplaces_dtx[0];
    //            break;
    //        case CmpToolStatic.hubName.dtx:
    //            result = CmpToolStatic.marketplaces_dtx[0];
    //            break;
    //        case CmpToolStatic.hubName.sg:
    //            result = CmpToolStatic.marketplaces_sg[0];
    //            break;
    //        case CmpToolStatic.hubName.au:
    //            result = CmpToolStatic.marketplaces_au[0];
    //            break;
    //        case CmpToolStatic.hubName.eu:
    //            result = CmpToolStatic.marketplaces_eu[0];
    //            break;
    //    }
    //    return result;
    //}

    myModule.changeFilterStyle = function (e, filterIcon, gridHeader) {
        try {
            var filter = e.component.getCombinedFilter();
            if (filter) {
                //Filter is applied
                gridHeader.css('background-color', 'yellowgreen');
                var index = 0;
                if (filter.columnIndex) {
                    index = filter.columnIndex;
                    $(filterIcon[index]).css('color', 'red');
                }
                if (filter.length > 0) {
                    for (var i = 0; i < filter.length; i++) {
                        if (filter[i].columnIndex) {
                            index = filter[i].columnIndex;
                        }
                        if (filter[i].length > 0 && filter[i][0] && filter[i][0].columnIndex) {
                            index = filter[i][0].columnIndex;
                        }
                        $(filterIcon[index]).css('color', 'red');
                    }
                }
            } else {
                //Filter is not applied
                gridHeader.css('background-color', '#ECF1F7');
                filterIcon.css('color', 'gray');
            }
        } catch (err) {
            console.log(err);
        }
    }

    //myModule.customLoad = function (storageKey) {
    //    var state = localStorage.getItem(storageKey);
    //    if (state) {
    //        state = JSON.parse(state);
    //        for (var i = 0; i < state.columns.length; i++) {
    //            state.columns[i].filterValue = null;
    //        }
    //    }
    //    return state;
    //}

    //myModule.stateStoring = function (tableName) {
    //    var result = {
    //        enabled: true,
    //        storageKey: "storage" + tableName,
    //        type: "custom",
    //        customLoad: function() {
    //            myModule.customLoad(this.storageKey);
    //        },
    //        customSave: function(state) {
    //            localStorage.setItem(this.storageKey, JSON.stringify(state));
    //        },
    //    };
    //    return result;
    //}

    myModule.getClientIp = function() {
        "use strict";
        try {
            var findIp = new Promise(function(r) {
                var w = window,
                    a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }),
                    b = function b() {};
                a.createDataChannel("");
                a.createOffer(function(c) {
                    return a.setLocalDescription(c, b, b);
                }, b);
                a.onicecandidate = function(c) {
                    try {
                        c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r);
                    } catch (e) {
                    }
                };
            });
            return findIp;
        } catch (err) {
            console.log(err);
            return 'Internal IP';
        }
    }

    //myModule.populateEncryptedPwd = function ($http, userName, pwd) {
    //    if (typeof(pwd) === "undefined") {
    //        localStorage.setItem("encryptedPassword", '');
    //        return;
    //    }
    //    var pwdContrlName = 'Util';
    //    var pwdUrl = myModule.getFullUrlForTable(pwdContrlName);
    //    var pwdGetMethod = 'GetEncrypedString';
    //    pwdUrl = pwdUrl + pwdGetMethod + '/1?str=' + pwd + '&username=' + userName;
    //    $http.get(pwdUrl)
    //        .success(function (pwdResponse) {
    //            localStorage.setItem("encryptedPassword", pwdResponse);
    //            //localStorage.setItem('password', '');
    //        })
    //        .error(function (errResponse) {
    //            localStorage.setItem("encryptedPassword", '');
    //            console.log(errResponse);
    //        });
    //}

    myModule.setMarketplacesByHubId = function (pResellers, hubId) {
        var result = [];
        var cnt = pResellers.length;
        if (cnt === 0) return '';
        for (var i = 0; i < cnt; i++) {
            var hubIdTmp = pResellers[i].HubId;
            if (hubIdTmp && hubIdTmp === hubId) {
                var marketplaceName = pResellers[i].MarketplaceName;
                result.push(marketplaceName);
            }
        }
        result.push(CmpToolStatic.provider);      // Provider
        result.push(CmpToolStatic.allCountries);  // All Countries
        switch (hubId) {
            case 1:
                localStorage.setItem('marketplaces_dtx', result);
                break;
            case 2:
                localStorage.setItem('marketplaces_sg', result);
                break;
            case 3:
                localStorage.setItem('marketplaces_au', result);
                break;
            case 4:
                localStorage.setItem('marketplaces_eu', result);
                break;
        }
    }

    myModule.getMarketplaces = function () {
        if (window.selected_marketplaces) {
            return window.selected_marketplaces.toString().split(',');
        }
        return CmpToolStatic.marketplaces_dtx;
    }

    myModule.getSelectedMarketplace = function () {
        var selectedMarketplace = '';
        var strMarketplaces = window.selected_marketplaces;
        if (!strMarketplaces) {
            selectedMarketplace = CmpToolStatic.defaultMarketplaces[0];
        } else {
            selectedMarketplace = strMarketplaces.toString().split(',')[0];
        }
        return selectedMarketplace;
    }

    myModule.setResellerIdsByHubId = function (pResellers, hubId) {
        var result = [];
        var cnt = pResellers.length;
        if (cnt === 0) return '';
        for (var i = 0; i < cnt; i++) {
            var hubIdTmp = pResellers[i].HubId;
            if (hubIdTmp && hubIdTmp === hubId) {
                var resellerId = pResellers[i].ResellerID;
                result.push(resellerId);
            }
        }
        result.push('1');  // Provider
        result.push('0');  // All Countries
        switch (hubId) {
            case 1:
                localStorage.setItem('resellerids_dtx', result);
                break;
            case 2:
                localStorage.setItem('resellerids_sg', result);
                break;
            case 3:
                localStorage.setItem('resellerids_au', result);
                break;
            case 4:
                localStorage.setItem('resellerids_eu', result);
                break;
        }
    }

    myModule.getDefaultResellerIds = function () {
        var resellerIds = CmpToolStatic.resellerids_dtx;
        if (CmpToolStatic.currentHub === 'sg') resellerIds = CmpToolStatic.resellerids_sg;
        if (CmpToolStatic.currentHub === 'au') resellerIds = CmpToolStatic.resellerids_au;
        if (CmpToolStatic.currentHub === 'eu') resellerIds = CmpToolStatic.resellerids_eu;
        return resellerIds;
    }

    myModule.setMarketplaces = function () {
        var marketplaces_dtx = localStorage.getItem('marketplaces_dtx');
        if (marketplaces_dtx) {
            CmpToolStatic.marketplaces_dtx = marketplaces_dtx.split(',');
        }
        var marketplaces_sg = localStorage.getItem('marketplaces_sg');
        if (marketplaces_sg) {
            CmpToolStatic.marketplaces_sg = marketplaces_sg.split(',');
        }
        var marketplaces_au = localStorage.getItem('marketplaces_au');
        if (marketplaces_au) {
            CmpToolStatic.marketplaces_au = marketplaces_au.split(',');
        }
        var marketplaces_eu = localStorage.getItem('marketplaces_eu');
        if (marketplaces_eu) {
            CmpToolStatic.marketplaces_eu = marketplaces_eu.split(',');
        }
        CmpToolStatic.defaultMarketplaces = CmpToolStatic.marketplaces_dtx;
        CmpToolStatic.selectedMarketplace = myModule.getSelectedMarketplace();
        if (!window.selected_marketplaces) {
            window.selected_marketplaces = marketplaces_dtx;
        }
        return window.selected_marketplaces.toString();
    }

    myModule.setResellerIds = function () {
        var resellerids_dtx = localStorage.getItem('resellerids_dtx');
        var resellerids_sg = localStorage.getItem('resellerids_sg');
        var resellerids_au = localStorage.getItem('resellerids_au');
        var resellerids_eu = localStorage.getItem('resellerids_eu');
        var defaultResellerIds = resellerids_dtx;

        CmpToolStatic.resellerids_dtx = JSON.parse("[" + resellerids_dtx + "]");
        CmpToolStatic.resellerids_sg = JSON.parse("[" + resellerids_sg + "]");
        CmpToolStatic.resellerids_au = JSON.parse("[" + resellerids_au  + "]");
        CmpToolStatic.resellerids_eu = JSON.parse("[" + resellerids_eu + "]");
        CmpToolStatic.defaultResellerIds = CmpToolStatic.resellerids_dtx;
    }

    myModule.getAndSaveMarketplaces = function (pResellers) {
        myModule.setMarketplacesByHubId(pResellers, 1);
        myModule.setMarketplacesByHubId(pResellers, 2);
        myModule.setMarketplacesByHubId(pResellers, 3);
        myModule.setMarketplacesByHubId(pResellers, 4);
    }

    myModule.getAndSaveResellerIds = function (pResellers) {
        myModule.setResellerIdsByHubId(pResellers, 1);
        myModule.setResellerIdsByHubId(pResellers, 2);
        myModule.setResellerIdsByHubId(pResellers, 3);
        myModule.setResellerIdsByHubId(pResellers, 4);

        
    }

    myModule.checkHubCheckbox = function() {
        if (CmpToolStatic.currentHub === 'dev' || CmpToolStatic.currentHub === 'stg') {
            var marketplaces = window.selected_marketplaces;
            document.getElementById('radioDtx').checked = true;
            switch (marketplaces) {
                case CmpToolStatic.marketplaces_dtx.toString():
                    document.getElementById('radioDtx').checked = true;
                    break;
                case CmpToolStatic.marketplaces_sg.toString():
                    document.getElementById('radioSg').checked = true;
                    break;
                case CmpToolStatic.marketplaces_au.toString():
                    document.getElementById('radioAu').checked = true;
                    break;
                case CmpToolStatic.marketplaces_eu.toString():
                    document.getElementById('radioEu').checked = true;
                    break;
            }
        }
    }

    myModule.disabeProdHubChkbox = function () {
        switch (CmpToolStatic.currentHub) {
            case CmpToolStatic.hubName.dtx:
                document.getElementById('radioDtx').checked = true;
                $('#radioSg').attr("disabled", "disabled");
                $('#radioAu').attr("disabled", "disabled");
                $('#radioEu').attr("disabled", "disabled");
                break;
            case CmpToolStatic.hubName.sg:
                document.getElementById('radioSg').checked = true;
                $('#radioDtx').attr("disabled", "disabled");
                $('#radioAu').attr("disabled", "disabled");
                $('#radioEu').attr("disabled", "disabled");
                break;
            case CmpToolStatic.hubName.au:
                document.getElementById('radioAu').checked = true;
                $('#radioDtx').attr("disabled", "disabled");
                $('#radioSg').attr("disabled", "disabled");
                $('#radioEu').attr("disabled", "disabled");
                break;
            case CmpToolStatic.hubName.eu:
                document.getElementById('radioEu').checked = true;
                $('#radioDtx').attr("disabled", "disabled");
                $('#radioAu').attr("disabled", "disabled");
                $('#radioSg').attr("disabled", "disabled");
                break;
        }
    }

    return myModule;


})(CmpToolUtility || {});



window.Alert = function (value) {
    myModule.Alert(value);
}

window.AlertStop = function (value) {
    myModule.AlertStop(value);
}

window.AlertError = function(value, handlingInstanceId) {
    myModule.AlertErrorText(value, handlingInstanceId);
}

window.AlertErrorText = function (value, errLinkTxt) {
    myModule.AlertError(value, errLinkTxt);
}

// Polyfill:
if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}