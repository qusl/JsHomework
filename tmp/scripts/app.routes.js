
define([], function() {

    var selectedMenuNameFirstLoad = localStorage.getItem("selectedMenunameForFirstLoad");
    var topMenuNameFirstLoad = CmpToolUtility.getTopMenuBySubMenu(selectedMenuNameFirstLoad);

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

    var aggregatormenuDependency = [
        'controllers/Aggregator/resellerAggregator',
        'controllers/Aggregator/masterPlans',
        'controllers/Aggregator/planNumAggregator',
        'controllers/Aggregator/resourceNumAggregator',
        'controllers/Aggregator/masterResources',
        'controllers/Aggregator/masterTermsAndConditions',
        'controllers/Aggregator/termNumAggregator',
        'dataconfig/Aggregator/_resellerAggregator',
        'dataconfig/Aggregator/_masterPlans',
        'dataconfig/Aggregator/_planNumAggregator',
        'dataconfig/Aggregator/_resourceNumAggregator',
        'dataconfig/Aggregator/_masterResources',
        'dataconfig/Aggregator/_masterTermsAndConditions',
        'dataconfig/Aggregator/_termNumAggregator'
    ];

    var signupmenuDependency = [
        'controllers/Signup/displayPlans',
        'controllers/Signup/displayCategory',
        'controllers/Signup/displayPlanCategory',
        'controllers/Signup/displayCategoryMap',
        'controllers/Signup/planAttributeDetails',
        'controllers/Signup/planAttributes',
        'controllers/Signup/payTools',
        'controllers/Signup/skuMap',
        'dataconfig/Signup/_displayPlans',
        'dataconfig/Signup/_displayCategory',
        'dataconfig/Signup/_displayPlanCategory',
        'dataconfig/Signup/_displayCategoryMap',
        'dataconfig/Signup/_planAttributeDetails',
        'dataconfig/Signup/_planAttributes',
        'dataconfig/Signup/_payTools',
        'dataconfig/Signup/_skuMap'
    ];

    var plangroupmenuDependency = [
        'controllers/PlanGroup/planGroup',
        'controllers/PlanGroup/planGroupDependencies',
        'controllers/PlanGroup/planGroupExclusions',
        'controllers/PlanGroup/planGroupCategoryMap',
        'controllers/PlanGroup/planGroupMaps',
        'controllers/PlanGroup/planGroupSubscriptionPeriods',
        'controllers/PlanGroup/planSuggestions',
        'controllers/PlanGroup/masterPlanSuggestion',
        'dataconfig/PlanGroup/_planGroup',
        'dataconfig/PlanGroup/_planGroupDependencies',
        'dataconfig/PlanGroup/_planGroupExclusions',
        'dataconfig/PlanGroup/_planGroupCategoryMap',
        'dataconfig/PlanGroup/_planGroupMaps',
        'dataconfig/PlanGroup/_planGroupSubscriptionPeriods',
        'dataconfig/PlanGroup/_planSuggestions',
        'dataconfig/PlanGroup/_masterPlanSuggestion'
    ];

    var resellermenuDependency =
    [
        'controllers/Reseller/resellers',
        'dataconfig/Reseller/_resellers',
        'controllers/Reseller/resellerAlias',
        'dataconfig/Reseller/_resellerAlias',
        'controllers/Reseller/resellerHostname',
        'dataconfig/Reseller/_resellerHostname',
        'controllers/Reseller/resellerAttributes',
        'dataconfig/Reseller/_resellerAttributes',
        'controllers/Reseller/attributeDetails',
        'dataconfig/Reseller/_attributeDetails',
        'controllers/Reseller/imStaffUsers',
        'dataconfig/Reseller/_imStaffUsers',
        'controllers/Reseller/resellerLanguages',
        'dataconfig/Reseller/_resellerLanguages',
        'controllers/Reseller/resellerContent',
        'dataconfig/Reseller/_resellerContent',
        'controllers/Reseller/resellerContentValue',
        'dataconfig/Reseller/_resellerContentValue'
    ];

    var upsellmenuDependency = [
        'controllers/Upsell/upsells',
        'controllers/Upsell/upsellMap',
        'dataconfig/Upsell/_upsells',
        'dataconfig/Upsell/_upsellMap'
    ];

    var termsandconditionsmenuDependency = [
        'controllers/TermsAndConditions/termsAndConditions',
        'controllers/TermsAndConditions/termsAndConditionsML',
        'controllers/TermsAndConditions/termsAndConditionsGroup',
        'controllers/TermsAndConditions/termsAndConditionsGroupML',
        'controllers/TermsAndConditions/termsAndConditionsPaytoolMap',
        'controllers/TermsAndConditions/termsAndConditionsPlanMap',
        'controllers/TermsAndConditions/termsAndConditionsRateMap',
        'dataconfig/TermsAndConditions/_termsAndConditions',
        'dataconfig/TermsAndConditions/_termsAndConditionsML',
        'dataconfig/TermsAndConditions/_termsAndConditionsGroup',
        'dataconfig/TermsAndConditions/_termsAndConditionsGroupML',
        'dataconfig/TermsAndConditions/_termsAndConditionsPaytoolMap',
        'dataconfig/TermsAndConditions/_termsAndConditionsPlanMap',
        'dataconfig/TermsAndConditions/_termsAndConditionsRateMap'
    ];

    var nettermsmenuDependency = [
        'controllers/NetTerm/billingTerms',
        'controllers/NetTerm/paymentMethods',
        'controllers/NetTerm/billingTermPaymentMethodMap',
        'controllers/NetTerm/billingTermDescription',
        'controllers/NetTerm/billingTermDescriptionMap',
        'dataconfig/NetTerm/_billingTerms',
        'dataconfig/NetTerm/_paymentMethods',
        'dataconfig/NetTerm/_billingTermPaymentMethodMap',
        'dataconfig/NetTerm/_billingTermDescription',
        'dataconfig/NetTerm/_billingTermDescriptionMap'
    ];

    var navigationmenuDependency = [
        'controllers/Navigation/vendorNameSlug',
        'controllers/Navigation/productNameSlug',
        'controllers/Navigation/planFeatureBase',
        'controllers/Navigation/planFeatures',
        'dataconfig/Navigation/_vendorNameSlug',
        'dataconfig/Navigation/_productNameSlug',
        'dataconfig/Navigation/_planFeatureBases',
        'dataconfig/Navigation/_planFeatures'
    ];

    var multilanguagemenuDependency = [
        'controllers/MultiLanguage/billingTermsML',
        'controllers/MultiLanguage/displayCategoryML',
        'controllers/MultiLanguage/displayPlansML',
        'controllers/MultiLanguage/masterPlanSuggestionML',
        'controllers/MultiLanguage/paymentMethodML',
        'controllers/MultiLanguage/planAttributeML',
        'controllers/MultiLanguage/planFeaturesBaseML',
        'controllers/MultiLanguage/planFeaturesML',
        'controllers/MultiLanguage/planGroupML',
        'controllers/MultiLanguage/planGroupSubscriptionPeriodsML',
        'controllers/MultiLanguage/planSuggestionML',
        'controllers/MultiLanguage/resellerAttributeML',
        'controllers/MultiLanguage/securityQuestionsML',
        'controllers/MultiLanguage/upsellsML',
        'dataconfig/MultiLanguage/_billingTermsML',
        'dataconfig/MultiLanguage/_displayCategoryML',
        'dataconfig/MultiLanguage/_displayPlansML',
        'dataconfig/MultiLanguage/_masterPlanSuggestionML',
        'dataconfig/MultiLanguage/_paymentMethodML',
        'dataconfig/MultiLanguage/_planAttributeML',
        'dataconfig/MultiLanguage/_planFeaturesBaseML',
        'dataconfig/MultiLanguage/_planFeaturesML',
        'dataconfig/MultiLanguage/_planGroupML',
        'dataconfig/MultiLanguage/_planGroupSubscriptionPeriodsML',
        'dataconfig/MultiLanguage/_planSuggestionML',
        'dataconfig/MultiLanguage/_resellerAttributeML',
        'dataconfig/MultiLanguage/_securityQuestionsML',
        'dataconfig/MultiLanguage/_upsellsML'
    ];

    var sysconfigmenuDependency = [
        'controllers/SysConfig/resxDetail',
        'controllers/SysConfig/resxLanguageCategory',
        'controllers/SysConfig/resxLanguageCategoryMap',
        'controllers/SysConfig/resxValue',
        'controllers/SysConfig/resxValueExt',
        'controllers/SysConfig/securityQuestions',
        'controllers/SysConfig/loginTestAccount',
        'controllers/SysConfig/languages',
        'controllers/SysConfig/ipPattern',
        'dataconfig/SysConfig/_resxDetail',
        'dataconfig/SysConfig/_resxLanguageCategory',
        'dataconfig/SysConfig/_resxLanguageCategoryMap',
        'dataconfig/SysConfig/_resxValue',
        'dataconfig/SysConfig/_resxValueExt',
        'dataconfig/SysConfig/_securityQuestions',
        'dataconfig/SysConfig/_loginTestAccount',
        'dataconfig/SysConfig/_languages',
        'dataconfig/SysConfig/_ipPattern'
    ];

    var synctoolmenuDependency = [
        'controllers/SyncTool/internalPlans',
        'controllers/SyncTool/internalPlansML',
        'controllers/SyncTool/internalResourcesMap',
        'controllers/SyncTool/internalResourcesMapML',
        'controllers/SyncTool/planPeriod',
        'controllers/SyncTool/planRate',
        'controllers/SyncTool/planRatePeriod',
        'controllers/SyncTool/planPeriodML',
        'controllers/SyncTool/country',
        'controllers/SyncTool/stateBook',
        'controllers/SyncTool/measurementUnit',
        'controllers/SyncTool/countryRules',
        'controllers/SyncTool/resourceCategory',

        'dataconfig/SyncTool/_internalPlans',
        'dataconfig/SyncTool/_internalPlansOsa',
        'dataconfig/SyncTool/_internalPlansML',
        'dataconfig/SyncTool/_internalResourcesMap',
        'dataconfig/SyncTool/_internalResourcesMapOsa',
        'dataconfig/SyncTool/_internalResourcesMapML',
        'dataconfig/SyncTool/_planPeriod',
        'dataconfig/SyncTool/_planRate',
        'dataconfig/SyncTool/_planRatePeriod',
        'dataconfig/SyncTool/_planPeriodML',
        'dataconfig/SyncTool/_country',
        'dataconfig/SyncTool/_stateBook',
        'dataconfig/SyncTool/_measurementUnit',
        'dataconfig/SyncTool/_countryRules',
        'dataconfig/SyncTool/_resourceCategory'
    ];

    var homePageRoute = {
        templateUrl: '/views/home.html',
        dependencies: [
            'controllers/homeViewController'
        ]
    };

    switch (topMenuNameFirstLoad) {
    case aggregatormenu:
        homePageRoute = {
            templateUrl: '/views/aggregator.html',
            dependencies: aggregatormenuDependency
        }
        break;
    case signupmenu:
        homePageRoute = {
            templateUrl: '/views/signup.html',
            dependencies: signupmenuDependency
        }
        break;
    case plangroupmenu:
        homePageRoute = {
            templateUrl: '/views/plangroup.html',
            dependencies: plangroupmenuDependency
        }
        break;
    case resellermenu:
        homePageRoute = {
            templateUrl: '/views/reseller.html',
            dependencies: resellermenuDependency
        }
        break;
    case upsellmenu:
        homePageRoute = {
            templateUrl: '/views/upsell.html',
            dependencies: upsellmenuDependency
        }
        break;
    case termsandconditionmuenu:
        homePageRoute = {
            templateUrl: '/views/termsandconditions.html',
            dependencies: termsandconditionsmenuDependency
        }
        break;
    case nettermsmenu:
        homePageRoute = {
            templateUrl: '/views/netterms.html',
            dependencies: nettermsmenuDependency
        }
        break;
    case navigationmenu:
        homePageRoute = {
            templateUrl: '/views/navigation.html',
            dependencies: navigationmenuDependency
        }
        break;
    case multilanguagemenu:
        homePageRoute = {
            templateUrl: '/views/multilanguage.html',
            dependencies: multilanguagemenuDependency
        }
        break;
    case sysconfigmenu:
        homePageRoute = {
            templateUrl: '/views/sysconfig.html',
            dependencies: sysconfigmenuDependency
        }
        break;
    case synctoolmenu:
        homePageRoute = {
            templateUrl: '/views/synctool.html',
            dependencies: synctoolmenuDependency
        }
        break;
    }

    return {
        defaultRoutePath: '/scripts/',
        routes: {
            '/': homePageRoute,

            '/home': {
                templateUrl: '/views/home.html',
                dependencies: [
                    'controllers/homeViewController'
                ]
            },

            '/aggregator': {
                templateUrl: '/views/aggregator.html',
                dependencies: aggregatormenuDependency
            },

            '/signup': {
                templateUrl: '/views/signup.html',
                dependencies: signupmenuDependency
            },

            '/plangroup': {
                templateUrl: '/views/plangroup.html',
                dependencies: plangroupmenuDependency
            },

            '/reseller': {
                templateUrl: '/views/reseller.html',
                dependencies: resellermenuDependency
            },

            '/upsell': {
                templateUrl: '/views/upsell.html',
                dependencies: upsellmenuDependency
            },

            '/termsandconditions': {
                templateUrl: '/views/termsandconditions.html',
                dependencies: termsandconditionsmenuDependency
            },

            '/netterms': {
                templateUrl: '/views/netterms.html',
                dependencies: nettermsmenuDependency
            },

            '/navigation': {
                templateUrl: '/views/navigation.html',
                dependencies: navigationmenuDependency
            },

            '/multilanguage': {
                templateUrl: '/views/multilanguage.html',
                dependencies: multilanguagemenuDependency
            },

            '/sysconfig': {
                templateUrl: '/views/sysconfig.html',
                dependencies: sysconfigmenuDependency
            },

            '/synctool': {
                templateUrl: '/views/synctool.html',
                dependencies: synctoolmenuDependency
            }
        }
    };
});