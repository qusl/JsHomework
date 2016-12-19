
window.CmpTool = window.CmpTool || {};

window.CmpTool.initialViewController = function (scope, megaMenuService, subMenuService) {
    $("#megamenutopbar").show();
    scope.appCategoryId = 0;
    scope.appActiveLeftMenu = '';
    CmpToolUtility.addScopeService(scope, subMenuService);
    scope.loadFromSubMenu = function (event, menuname) {
        if (event && event.ctrlKey) {
            localStorage.setItem("selectedMenunameForFirstLoad", menuname);
            var topMenuNameFirstLoad = CmpToolUtility.getTopMenuBySubMenu(menuname);
            localStorage.setItem("topMenuNameFirstLoad", topMenuNameFirstLoad);
            localStorage.setItem("selected_marketplacesForFirstLoad", window.selected_marketplaces);
            localStorage.setItem("selected_resellerIdsForFirstLoad", window.selected_resellerIds);
            localStorage.setItem("selectedMarketplaceForFirstLoad", CmpToolStatic.selectedMarketplace);
            return null;
        } else {
            if (!CmpToolUtility.refreshSession()) {
                return null;
            }
            CmpToolStatic.selectedMenuname = menuname;
            scope.appActiveLeftMenu = menuname;
            scope.appMenuname = menuname;
            return window.CmpTool.DataProvider.loadDataFromSubMenu(scope);
        }
    };
    
    var resellerName = CmpToolStatic.selectedMarketplace;
    window.CmpTool.DataProvider.retrieveMegamenu(scope, megaMenuService, resellerName);
}