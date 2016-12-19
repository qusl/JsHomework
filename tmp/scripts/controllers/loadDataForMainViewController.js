
window.CmpTool = window.CmpTool || {};

window.CmpTool.loadDataForMainController = function (scope, megaMenuService, subMenuService) {

    scope.loadAggregator = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[0];
        controllerManager(scope, megaMenuService, subMenuService);
        scope.submenu = CmpToolStatic.aggregatormenu;
    }

    scope.loadSignup = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[1];
        controllerManager(scope, megaMenuService, subMenuService);
        scope.submenu = CmpToolStatic.signupmenu;
    }

    scope.loadPlanGroup = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[2];
        controllerManager(scope, megaMenuService, subMenuService);
        scope.submenu = CmpToolStatic.plangroupmenu;
    }

    scope.loadReseller = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[3];
        controllerManager(scope, megaMenuService, subMenuService);
        scope.submenu = CmpToolStatic.resellermenu;
    }

    scope.loadUpsell = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[4];
        controllerManager(scope, megaMenuService, subMenuService);
        scope.submenu = CmpToolStatic.upsellmenu;
    }

    scope.loadTermsAndConditions = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[5];
        controllerManager(scope, megaMenuService, subMenuService);
        scope.submenu = CmpToolStatic.termsandconditionmuenu;
    }

    scope.loadNetTerms = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[6];
        controllerManager(scope, megaMenuService, subMenuService);
        scope.submenu = CmpToolStatic.nettermsmenu;
    }

    scope.loadNavigation = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[7];
        controllerManager(scope, megaMenuService, subMenuService);
        scope.submenu = CmpToolStatic.navigationmenu;
    }

    scope.loadMultiLanguage = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[8];
        controllerManager(scope, megaMenuService, subMenuService);
        scope.submenu = CmpToolStatic.multilanguagemenu;
    }

    scope.loadSysConfig = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[9];
        scope.submenu = CmpToolStatic.sysconfigmenu;
        controllerManager(scope, megaMenuService, subMenuService);
    }

    scope.loadSyncTool = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = CmpToolStatic.topMenu[10];
        scope.submenu = CmpToolStatic.synctoolmenu;
        controllerManager(scope, megaMenuService, subMenuService);
        showDropdownForSyncTool(scope);
    }

    scope.loadHome = function () {
        if (!CmpToolUtility.refreshSession()) {
            return;
        }
        scope.appActiveTopMenu = null;
        scope.submenu = null;
        $('#main').hide();
        $('#home').show();
    }

    var controllerManager = function ($scope, $megaMenuService, $subMenuService) {
        $('#main').show();
        $('#home').hide();
        $("#syncOtherTables").hide();
        //$scope.appActiveLeftMenu = '';
        CmpToolUtility.generateMainmenu($scope, $megaMenuService);
        CmpToolUtility.initialButtons();
        $scope.appMarketplace = CmpToolStatic.selectedMarketplace;
        $scope.appMenuname = 'Please Select Menu';

        if (typeof ($scope.loadFromSubMenu) == 'undefined') {
            window.CmpTool.initialViewController($scope, $megaMenuService, $subMenuService);
        }
        CmpToolUtility.cleanupGrid();

        //setTimeout(function () {
            window.CmpTool.ctrlCommon($scope, $megaMenuService);
        //}, 200);
        // retrieve sub menu from database:
        ////$scope.submenu = $subMenuService.retrieveSubMenu($parentMenuId);

        CmpToolUtility.addScopeService($scope, $subMenuService);
    }

    var showDropdownForSyncTool = function (myscope) {
        $("#syncOtherTables").show();
        $("#syncOtherTables").dxLookup({
            items: CmpToolStatic.synctoolOtherTablesmenu,
            cancelButtonText: "Close",
            popupHeight: 160,
            popupWidth: 180,
            searchEnabled: false,
            showCancelButton: false,
            showPopupTitle: false,
            animation: {
                show: {
                    type: "fade",
                    duration: 400,
                    from: 0.1,
                    to: 1
                },
                hide: {
                    type: "fade",
                    duration: 400,
                    from: 1,
                    to: 0.1
                }
            },
            placeholder: "Sync More Tables",
            onValueChanged: function (data) {
                var menuname = data.value;
                myscope.loadFromSubMenu(null, menuname);
            }
        });
    }
}
   
