
window.CmpTool = window.CmpTool || {};

var CmpToolStatic = (function(myInitial) {

    myInitial.isDeployed = false;

    myInitial.hubName = {};
    myInitial.hubName.dev = 'dev';
    myInitial.hubName.stg = 'stg';
    myInitial.hubName.dtx = 'dtx';
    myInitial.hubName.sg = 'sg';
    myInitial.hubName.au = 'au';
    myInitial.hubName.eu = 'eu';

    myInitial.currentHub = myInitial.hubName.dev;
    //myInitial.currentHub = myInitial.hubName.stg';
    //myInitial.currentHub = myInitial.hubName.dtx;
    //myInitial.currentHub = myInitial.hubName.sg;
    //myInitial.currentHub = myInitial.hubName.au;
    //myInitial.currentHub = myInitial.hubName.eu;

    myInitial.checkTimeout = null;
    myInitial.isSessionExpired = false;
    myInitial.appShowLoadingImage = true;
   
    /* 
       use devSrcResellerId as the source reseller to populate PlanNum/ResourceNum for other resellers on Dev:
       configure US on Dev, then populate Nums for other resellers based on the Nums of this reseller 
    */
    myInitial.devSrcResellerId = 1000004;  
        
    // if isRetrievingData = true, continue to show Loading page for 500 ms
    myInitial.isRetrievingData = true;
    myInitial.topMenu = ['Aggregator', 'Signup', 'PlanGroup', 'Reseller', 'Upsell', 'T&C', 'NetTerms', 'Navigation', 'MLTables', 'SysConfig', 'SyncTool'];

    myInitial.provider = 'Provider';
    myInitial.allCountries = 'AllCountries';

    myInitial.marketplaces_dtx = '';
    myInitial.marketplaces_sg = '';
    myInitial.marketplaces_au = '';
    myInitial.marketplaces_eu = '';
    myInitial.defaultMarketplaces = '';
    myInitial.selectedMarketplace = '';

    myInitial.resellerids_dtx = '';
    myInitial.resellerids_sg = '';
    myInitial.resellerids_au = '';
    myInitial.resellerids_eu = '';
    myInitial.defaultResellerIds = '';

    myInitial.aggregatormenu =['ResellerAggregator', 'MasterPlans', 'PlanNumAggregator', 'MasterResources', 'ResourceNumAggregator', 'MasterTermsAndConditions', 'TermNumAggregator'];
    myInitial.signupmenu = ['Display Plans', 'Display Category', 'Display Plan Category', 'Display Category Map', 'PlanAttributeDetails', 'PlanAttributes', 'Pay Tools', 'SkuMap'];
    myInitial.plangroupmenu = ['PlanGroup', 'PlanGroupDependencies', 'PlanGroupExclusions', 'PlanGroupCategoryMap', 'PlanGroupMap', 'PlanGroupSubscriptionPeriods', 'PlanSuggestion', 'MasterPlanSuggestion'];
    myInitial.resellermenu = ['Resellers', 'Reseller Alias', 'Reseller Hostname', 'Reseller Attributes', 'Attribute Details', 'IMStaffUsers', 'ResellerLanguages', 'ResellerContent', 'ResellerContentValue'];
    myInitial.upsellmenu = ['Upsells', 'UpsellMap'];
    myInitial.termsandconditionmuenu = ['TermsAndConditions(OSA)', 'TermsAndConditionsML(OSA)', 'TermsAndConditionsGroup', 'TermsAndConditionsGroupML', 'TermsAndConditionsPaytoolMap', 'TermsAndConditionsPlanMap(OSA)', 'TermsAndConditionsRateMap(OSA)'];
    myInitial.nettermsmenu = ['BillingTerms', 'PaymentMethods', 'BillingTermPaymentMethodMap', 'BillingTermDescription', 'BillingTermDescriptionMap'];
    myInitial.navigationmenu = ['VendorNameSlug', 'ProductNameSlug', 'PlanFeatureBase', 'PlanFeatures'];
    myInitial.multilanguagemenu = ['DisplayCategoryML', 'DisplayPlansML', 'UpsellsML', 'SecurityQuestionsML', 'BillingTermsML', 'PaymentMethodML', 'ResellerAttributeML', 'PlanFeaturesBaseML', 'PlanFeaturesML', 'PlanAttributeML', 'PlanGroupML', 'PlanGroupSubscriptionPeriodsML', 'PlanSuggestionML', 'MasterPlanSuggestionML'];
    myInitial.sysconfigmenu = ['ResxDetail', 'ResxLanguageCategory', 'ResxLanguageCategoryMap', 'ResxValue', 'ResxValueExt', 'SecurityQuestions', 'LoginTestAccount', 'Languages', 'IpPattern'];
    myInitial.synctoolmenu = ['InternalPlans', 'InternalPlansML', 'InternalResourcesMap', 'InternalResourcesMapML', 'PlanPeriod', 'PlanPeriodML', 'PlanRate', 'PlanRatePeriod', 'ResourceCategory(Map)'];
    myInitial.synctoolOtherTablesmenu = ['Country(ML)', 'StateBook', 'MeasurementUnit', 'CountryRules'];
    myInitial.selectedMenuname = '';
    myInitial.allResellers = 'All Resellers';

    // Set Url for webservices (UrlRewrite)
    if (myInitial.isDeployed) {
        switch (myInitial.currentHub) {
            case myInitial.hubName.dev:
                myInitial.wsUrl = 'https://cmptool.dev.internal.cloud.im/';      // https://209.41.154.49/ (10.4.7.41)
                break;
            case myInitial.hubName.stg:
                myInitial.wsUrl = 'http://10.7.7.41/';      // https://???/
                break;
            case myInitial.hubName.dtx:
                myInitial.wsUrl = 'http://10.2.7.41/';      // https://???/
                break;
            case myInitial.hubName.sg:
                myInitial.wsUrl = 'http://10.12.7.41/';      // https://???/
                break;
            case myInitial.hubName.au:
                myInitial.wsUrl = 'http://10.11.7.41/';      // https://???/
                break;
            case myInitial.hubName.eu:
                myInitial.wsUrl = 'http://10.8.7.41/';      // https://???/
                break;
        }
    } else {
        myInitial.wsUrl = 'http://localhost:1592/';
    }

    myInitial.apiUrl = myInitial.wsUrl; 
    if (myInitial.isDeployed) {
        myInitial.apiUrl = myInitial.wsUrl + 'AutomationApi/';  
    }
    myInitial.errLocalUrl = '/views/otherPages/message.html';
    myInitial.isInitialForm = true;
    
    myInitial.htmlContenUrl = 'http://us.dev.cloud.im/';
    if (myInitial.isDeployed) {
        if (myInitial.currentHub === 'stg') {
            myInitial.htmlContenUrl = 'http://us.stg.cloud.im/';
        } else {
            myInitial.htmlContenUrl = 'http://us.cloud.im/';
        }
    }
    myInitial.Message = {};
    myInitial.Message.msgErr = 'Detail Error Information';
    myInitial.Message.msgErrContent = '';
    myInitial.Message.nullResponseErr = 'Cannot get response from this webservice call:';
    myInitial.Message.retrieveDataErr = 'Retrieve Data Failed! Click this link for detail informaion:';
    myInitial.Message.retrieveSubMenuErr = 'Retrieve SubMenu Failed! Click this link for detail informaion:';
    myInitial.Message.saveFailedErr = 'Save Failed! Click this link for detail informaion:';
    myInitial.Message.megamenuMessage = 'Real-time Ordering, Provisioning, Managing and Invoicing';
    myInitial.Message.retrieveFailedErr = 'Retrieve Data Failed! Click this link for detail informaion:';
    myInitial.Message.more = 'more ...';
    myInitial.Message.alertTitle = 'Session Expired';

    // scope.masterPlansDropdown:
    myInitial.masterPlanTableName = "MasterPlans";
    myInitial.masterPlanGetMethod = "GetMasterPlansForDropDown";
    // scope.masterResourcesDropdown:
    myInitial.masterResourceTableName = "MasterResources";
    myInitial.masterResourceGetMethod = "GetMasterResourcesForDropDown";
    myInitial.resellerTableName = "Resellers";
    myInitial.parentResellerGetMethod = "GetParentResellersWithoutL0ForDropDown";
    myInitial.childResellerGetMethod = "GetChildResellersForDropDown";
    myInitial.internalResourcesMapTableName = "InternalResourcesMap";
    myInitial.internalResourcesMapGetMethod = "GetInternalResourcesMapByResellerIdForDropDown";
    myInitial.internalResourcesWithNumTableName = "InternalResourcesMap";
    myInitial.internalResourcesWithNumGetMethod = "GetInternalResourcesWithNumByResellerIdForDropDown";
    myInitial.internalPlansTableName = "InternalPlans";
    myInitial.internalPlansGetMethod = "GetInternalPlansByResellerIdForDropDown";
    myInitial.internalPlansWithPlanNumTableName = "InternalPlans";
    myInitial.internalPlansWithPlanNumGetMethod = "GetInternalPlansWithPlanNumByResellerIdForDropDown";
    myInitial.displayPlansTableName = "DisplayPlans";
    myInitial.displayPlansGetMethod = "GetDisplayPlansByResellerIdForDropDown";
    myInitial.displayCategoriesTableName = "DisplayCategory";
    myInitial.displayCategoriesGetMethod = "GetDisplayCategoriesByResellerIdForDropDown";
    myInitial.displayParentCategoriesTableName = "DisplayCategory";
    myInitial.displayParentCategoriesGetMethod = "GetParentDisplayCategoriesByResellerIdForDropDown";
    myInitial.permissionTypeTableName = "PermissionType";
    myInitial.permissionTypeGetMethod = "GetPermissionTypeForDropDown";
    myInitial.activedResellerFoldersTableName = "ResellerFolder";
    myInitial.activedResellerFoldersGetMethod = "GetResellerFolderForDropDown";
    myInitial.vendorNameSlugTableName = "VendorNameSlug";
    myInitial.vendorNameSlugGetMethod = "GetVendorNameSlugForDropDown";
    myInitial.productNameSlugTableName = "ProductNameSlug";
    myInitial.productNameSlugGetMethod = "GetProductNameSlugForDropDown";
    myInitial.planAttributeDetailTableName = "PlanAttributeDetails";
    myInitial.planAttributeDetailGetMethod = "GetPlanAttributeDetailsForDropDown";
    myInitial.upsellTableName = "Upsells";
    myInitial.upsellGetMethod = "GetUpsellsByResellerIdForDropDown";
    myInitial.billingTermTypeTableName = "BillingTermType";
    myInitial.billingTermTypeGetMethod = "GetBillingTermTypeForDropDown";
    myInitial.billingTermDisplayTypeTableName = "BillingTermDisplayType";
    myInitial.billingTermDisplayTypeGetMethod = "GetBillingTermDisplayTypeForDropDown";
    myInitial.billingTermsTableName = "BillingTerms";
    myInitial.billingTermsGetMethod = "GetBillingTermsByResellerIdForDropDown";
    myInitial.paymentMethodsTableName = "PaymentMethods";
    myInitial.paymentMethodsGetMethod = "GetPaymentMethodsForDropDown";
    myInitial.billingTermDescriptionTableName = "BillingTermDescription";
    myInitial.billingTermDescriptionGetMethod = "GetBillingTermDescriptionForDropDown";
    myInitial.parentPlanGroupTableName = "PlanGroup";
    myInitial.parentPlanGroupGetMethod = "GetParentPlanGroupByResellerIdForDropDown";
    myInitial.childPlanGroupTableName = "PlanGroup";
    myInitial.childPlanGroupGetMethod = "GetChildPlanGroupByResellerIdForDropDown";
    myInitial.allPlanGroupTableName = "PlanGroup";
    myInitial.allPlanGroupGetMethod = "GetAllPlanGroupByResellerIdForDropDown";
    myInitial.resellerAttributeTableName = "ResellerAttributeDetails";
    myInitial.resellerAttributeGetMethod = "GetResellerAttributeDetailsForDropDown";
    myInitial.activeLanguagesTableName = "Languages";
    myInitial.activeLanguagesGetMethod = "GetLanguagesForDropDown";
    myInitial.allLanguagesTableName = "Languages";
    myInitial.allLanguagesGetMethod = "GetAllLanguagesForDropDown";
    myInitial.resellerContentTableName = "ResellerContent";
    myInitial.resellerContentGetMethod = "GetResellerContentForDropDown";
    myInitial.termsAndConditionsTableName = "TermsAndConditions";
    myInitial.termsAndConditionsGetMethod = "GetTermsAndConditionsByResellerIdForDropDown";
    myInitial.termsAndConditionsGroupTableName = "TermsAndConditionsGroup";
    myInitial.termsAndConditionsGroupGetMethod = "GetTermsAndConditionsGroupForDropDown";
    myInitial.payToolsTableName = "PayTools";
    myInitial.payToolsGetMethod = "GetPayToolsByResellerIdForDropDown";
    myInitial.planFeaturesBaseTableName = "PlanFeaturesBase";
    myInitial.planFeaturesBaseGetMethod = "GetPlanFeaturesBaseForDropDown";
    myInitial.resxDetailTableName = "ResxDetail";
    myInitial.resxDetailGetMethod = "GetResxDetailForDropDown";

    return myInitial;

})(CmpToolStatic || {});


