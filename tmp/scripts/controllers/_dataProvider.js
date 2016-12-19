
window.CmpTool = window.CmpTool || {};

window.CmpTool.DataProvider = (function (dataModule) {

    dataModule.dataService = function (http) {
        var service = {};
        var fullUrl = '';

        service.getData = function (tableName, getMethod, id, param1, param2, param3) {
            fullUrl = CmpToolUtility.getFullUrlForTable(tableName);
            if (CmpToolUtility.validateMethodName(getMethod)) {
                
                if (fullUrl.indexOf('.aspx') > -1 || getMethod.indexOf('?') === -1) {
                    fullUrl += getMethod + "/";
                } else {
                    fullUrl += getMethod;
                }

                if (param2 && param2.constructor === Array) {
                    fullUrl = CmpToolUtility.getUrlByArray(fullUrl, id, param1, param2);
                    return window.CmpTool.ServiceHelper.getItem(http, fullUrl);
                }

                if (id) {
                    fullUrl += id + "/";
                }
            }
            if (CmpToolUtility.validateMethodName(param1)) {
                fullUrl += param1 + "/";
            }
            if (CmpToolUtility.validateMethodName(param2)) {
                fullUrl += param2 + "/";
            }
            if (CmpToolUtility.validateMethodName(param3)) {
                fullUrl += param3 + "/";
            }
            if (fullUrl.includes('?') && fullUrl.endsWith("/")) {
                fullUrl = fullUrl.substring(0, fullUrl.length - 1);
            }
            return window.CmpTool.ServiceHelper.getItem(http, fullUrl);
        };

        service.updateData = function (tableName, keyName, selected) {
            fullUrl = CmpToolUtility.getFullUrlForTable(tableName);
            return window.CmpTool.ServiceHelper.updateItem(http, fullUrl + "UpdateApi/", selected, keyName);
        };

        service.insertData = function (tableName, selected) {
            fullUrl = CmpToolUtility.getFullUrlForTable(tableName);
            return window.CmpTool.ServiceHelper.insertItem(http, fullUrl + "InsertApi/", selected);
        };

        service.deleteData = function (tableName, id, selected) {
            fullUrl = CmpToolUtility.getFullUrlForTable(tableName);
            return window.CmpTool.ServiceHelper.deleteItem(http, fullUrl + "DeleteApi/", id, selected);
        };

        return service;
    }

    // 1. MegaMenu 
    dataModule.retrieveMegamenu = function (scope, megaMenuService, resellerName) {
        var resellerId = CmpToolUtility.getResellerIdByName(resellerName);
        megaMenuService.getMegaMenu(resellerId).then(function (response) {
            var json = JSON.parse(response.data);
            megaMenuService.marketplace = resellerName;
            megaMenuService.displayCategories = json.DisplayCategories;
            megaMenuService.externalSites = json.ExternalSites;
            dataModule.showLabelForallCategories(scope);
            megaMenuService.loadFromMegamenu = function (categoryId, categoryName) {
                if (!CmpToolUtility.refreshSession()) {
                    return;
                }
                dataModule.loadDataFromMegamenu(scope, categoryId, categoryName);
            };
            //CmpToolUtility.cleanDropdown(scope);
        });
    }

    dataModule.loadDataFromMegamenu = function (scope, categoryId, categoryName) {
        scope.appCategoryId = categoryId;
        scope.categoryName = categoryName;
        console.log('Selected CategoryID: ' + categoryId);
        scope.appMarketplace = CmpToolStatic.selectedMarketplace;
        scope.appMenuname = CmpToolStatic.selectedMenuname;
        dataModule.retrieveData(scope);
        if (categoryName != undefined && categoryName != '') {
            dataModule.showLableForSelectedCategory(categoryId, categoryName);
        } else {
            dataModule.showLabelForallCategories(scope);
        }
    }

    // 2. SubMenu (left menu)
    dataModule.loadDataFromSubMenu = function (scope) {
        $("#btnEditHtml1").hide();
        //$("#" + CmpToolStatic.selectedMenuname).addClass('selected');
        console.log('Selected Menu Name: ' + CmpToolStatic.selectedMenuname);
        $("#myGridView").html('');
        dataModule.retrieveData(scope);
    }

    dataModule.retrieveData = function (scope) {
        var menuname = CmpToolStatic.selectedMenuname;
        if (typeof (menuname) != "string" || menuname == '') {
            //myModule.Alert('menuname is not valid in retrieveData function.' + '<br>' + '(menuName="' + menuname + '")');
            CmpToolUtility.hideLoadingPage();
            return;
        }
        var categoryId = scope.appCategoryId;
        var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
        window.CmpTool.loadDataForSubmenu(scope, menuname, categoryId, resellerId);
    }

    dataModule.showLabelForallCategories = function (scope) {
        $("#categoryname").html(CmpToolStatic.Message.megamenuMessage);
        var categoryId = 0;
        scope.appCategoryId = categoryId;
        //window.CmpTool.DataProvider.retrieveData(scope);
        $("#categoryid").hide();
        $("#showall").hide();
        $("#SelectedCategory").hide();
        //CmpToolUtility.hideLoadingPage();
    }

    dataModule.showLableForSelectedCategory = function (categoryId, categoryName) {
        var catShort = categoryName;
        if (categoryName.length > 40) {
            catShort = categoryName.substring(0, 40);
            catShort += '...';
        }
        $("#categoryname").html('Selected: ' + catShort);
        $("#categoryid").html(' (' + categoryId + ')');
        $("#categoryid").show();
        $("#showall").show();

        $("#SelectedCategory").show();
        $('#SelectedCategoryId').text(' - ' + categoryName);
    }
    return dataModule;

})(window.CmpTool.DataProvider || {});