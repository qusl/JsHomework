
'use strict';

require.config({
    baseUrl: 'scripts/',
    paths: {
        'angular': '/lib/angular/angular.min',
        'angular-route': '/lib/angular/angular-route.min',
        'ngSanitize': '/lib/angular/angular-sanitize.min',
        'bootstrap': '/lib/bootstrap/js/bootstrap.min',
        'apputil': '/scripts/app.util',
        'servicehelper': '/scripts/app.service.helper',
        'dx': '/lib/devextreme/dx.web',
        'gridconfig': '/scripts/devextreme/mygridconfig',
        'dataProvider': '/scripts/controllers/_dataProvider',
        'ctrlcommon': '/scripts/controllers/_controllerCommon',
        'editorBtn1': '/scripts/controllers/_HtmlEditor/HtmlEditorBtn1',
        'editorBtn2': '/scripts/controllers/_HtmlEditor/HtmlEditorBtn2',
        'loadForController': '/scripts/controllers/loadDataForMainViewController',
        'loadForSubmenu': '/scripts/controllers/loadDataForSubMenu',
        'initialCtrl': '/scripts/controllers/initialController'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route', 'ngSanitize', 'bootstrap', 'apputil', 'servicehelper', 'dx', 'gridconfig', 'ctrlcommon']
        },
        'ctrlcommon': { deps: ['dx', 'dataProvider', 'initialCtrl', 'loadForController', 'loadForSubmenu', 'gridconfig', 'editorBtn1', 'editorBtn2'] },
        'ngSanitize': { exports: 'ngSanitize', deps: ['angular'] },
        'angular-route': { deps: ['angular', 'gridconfig'] }
    }
});

require(['app'], function (app) {
        angular.bootstrap(document, ['app']);
    }
);

define(['app'], function(app) {

    app.service('MegaMenuService', [
        '$http', function($http) {
            this.getMegaMenu = function(resellerId) {
                if (!resellerId || resellerId == 0) {
                    resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
                }
                var fullUrl = CmpToolUtility.getFullUrlForMegaMenu(resellerId);
                return window.CmpTool.ServiceHelper.getItem($http, fullUrl);
            }
        }
    ]);

    app.service('SubMenuService', [
        '$http', function($http) {
            this.getServiceData = window.CmpTool.DataProvider.dataService($http).getData;
            this.updateServiceData = window.CmpTool.DataProvider.dataService($http).updateData;
            this.insertServiceData = window.CmpTool.DataProvider.dataService($http).insertData;
            this.deleteServiceData = window.CmpTool.DataProvider.dataService($http).deleteData;
        }
    ]);

    app.service('homeService', [
        '$http', function($http) {
            this.getServiceData = window.CmpTool.DataProvider.dataService($http).getData;
            this.updateServiceData = window.CmpTool.DataProvider.dataService($http).updateData;
            this.insertServiceData = window.CmpTool.DataProvider.dataService($http).insertData;
            this.deleteServiceData = window.CmpTool.DataProvider.dataService($http).deleteData;
        }
    ]);

    app.controller('megamenuController', [
        '$scope', 'MegaMenuService', 'SubMenuService', function($scope, megaMenuService, subMenuService) {
            $scope.myservice = megaMenuService;
            CmpToolUtility.addScopeService($scope, subMenuService);
            $scope.showall = function () {
                window.CmpTool.DataProvider.showLabelForallCategories($scope);
                window.CmpTool.DataProvider.retrieveData($scope);
            }
        }
    ]);

    app.controller('mainViewController', [
        '$http', '$scope', '$location', 'MegaMenuService', 'SubMenuService', function ($http, $scope, $location, megaMenuService, subMenuService) {
            var userName = localStorage.getItem('username');
            var pwd = localStorage.getItem('encryptedPassword');
            if (pwd === null || typeof (pwd) === "undefined" || pwd === '') {
                CmpToolUtility.redirectToLoginPage();
            }
            //CmpToolUtility.populateEncryptedPwd($http, userName, pwd);

            $scope.expandMainContent = function () {
                var top = $(".navbar.navbar-inverse.navbar-fixed-top");
                var content = $(".container-fluid");
                var nav = $(".layout-navigation");
                var cont = $(".layout-content");
                var width = 300;
                if (nav.width() === width) {
                    if (content.css("padding-top") === "10px") {
                        cont.css("padding-top", "0");
                    }
                    top.css("display", "none");
                    content.css("padding-top", "10px");
                    nav.css("width", "0");
                    nav.css("display", "none");
                    cont.css("margin-left", "0");
                    $(".expand-image").attr("src", "images/collapse.png");

                } else {
                    cont.css("padding-top", "80px");
                    nav.css("padding-top", "80px");
                    top.css("display", "block");
                    nav.css("width", width);
                    nav.css("display", "block");
                    cont.css("margin-left", width);
                    $(".expand-image").attr("src", "images/misc_expand.png");
                }
            }
            CmpToolStatic.checkTimeout = setTimeout(CmpToolUtility.checkSession, 900000);
            CmpToolUtility.selectHub();

            CmpToolUtility.addTopMenuName($scope, CmpToolStatic);
            $scope.appActiveTopMenu = '';
            $scope.logout = CmpToolUtility.logout;
            window.CmpTool.loadDataForMainController($scope, megaMenuService, subMenuService);
            $location.path('/');
            var isLoggedin = localStorage.getItem('isLoggedin');
            if ((typeof (isLoggedin) === "undefined" || isLoggedin === "false") &&
            (typeof (localStorage.getItem('keepmelogin')) === "undefined" || localStorage.getItem('keepmelogin') === "false" || localStorage.getItem('keepmelogin') === null)) {
                //if (CmpToolStatic.isDeployed && (CmpToolStatic.currentHub === 'dev' || CmpToolStatic.currentHub === 'stg')) {
                //    CmpToolUtility.handleHttpsForWS();
                //}
                //window.location = '/login.html';
                CmpToolUtility.redirectToLoginPage();
                return;
            }

            // if it's popup window by clicking 'Ctrl + leftMenu':
             var selectedMenuNameFirstLoad = localStorage.getItem("selectedMenunameForFirstLoad");
            if (selectedMenuNameFirstLoad != 'null' && selectedMenuNameFirstLoad != null) {
                window.selected_marketplaces = localStorage.getItem("selected_marketplacesForFirstLoad");
                window.selected_resellerIds = localStorage.getItem("selected_resellerIdsForFirstLoad");
                CmpToolStatic.selectedMarketplace = localStorage.getItem("selectedMarketplaceForFirstLoad");
                
                window.CmpTool.initialViewController($scope, megaMenuService, subMenuService);
                var topMenuNameFirstLoad = CmpToolUtility.getTopMenuBySubMenu(selectedMenuNameFirstLoad);
                CmpToolUtility.loadTopMenuByMenuName($scope, topMenuNameFirstLoad);
                CmpToolStatic.selectedMenuname = selectedMenuNameFirstLoad;
                $scope.appMenuname = CmpToolStatic.selectedMenuname;
                $scope.appActiveLeftMenu = CmpToolStatic.selectedMenuname;
                setTimeout(function () {
                    var categoryId = 0;
                    var resellerId = CmpToolUtility.getResellerIdByName(CmpToolStatic.selectedMarketplace);
                    window.CmpTool.loadDataForSubmenu($scope, CmpToolStatic.selectedMenuname, categoryId, resellerId);
                }, 500);
            }
        }
    ]);

    $('#navigation').css('display', 'inline-block');

});