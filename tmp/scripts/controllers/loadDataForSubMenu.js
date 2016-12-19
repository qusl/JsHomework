
window.CmpTool = window.CmpTool || {};

window.CmpTool.loadDataForSubmenu = function (scope, menuname, categoryId, resellerId) {

    var isLoggedin = localStorage.getItem('isLoggedin');
    if ((typeof (isLoggedin) === "undefined" || isLoggedin === "false") &&
    (typeof (localStorage.getItem('keepmelogin')) === "undefined" || localStorage.getItem('keepmelogin') === "false")) {
        //if (CmpToolStatic.isDeployed && (CmpToolStatic.currentHub === 'dev' || CmpToolStatic.currentHub === 'stg')) {
        //    CmpToolUtility.handleHttpsForWS();
        //}
        //window.location = '/login.html';
        CmpToolUtility.redirectToLoginPage();
        return;
    }
    loadForm(scope, menuname, categoryId, resellerId);
    CmpToolStatic.isInitialForm = false;
    localStorage.setItem("selectedMenunameForFirstLoad", null);
    localStorage.setItem("topMenuNameFirstLoad", null);
}


var loadForm = function (scope, menuname, categoryId, resellerId) {
    CmpToolUtility.showLoadingPage();
    CmpToolUtility.initialForm(scope);
    $("#home").hide();
    $("#main").show();
    switch (menuname) {
        // 1. Aggregator:
    case CmpToolStatic.aggregatormenu[0]:
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getResellerAggregator(scope, resellerId);
        break;
    case CmpToolStatic.aggregatormenu[1]:
        window.CmpTool.getAllMasterPlans(scope, resellerId);
        break;
    case CmpToolStatic.aggregatormenu[2]:
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getPlanNumAggregator(scope, categoryId);
        break;
    case CmpToolStatic.aggregatormenu[3]: //MasterResources
        window.CmpTool.getAllMasterResources(scope, resellerId);
        break;
    case CmpToolStatic.aggregatormenu[4]:
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getResourceNumAggregator(scope, resellerId);
        break;

    // 2. Signup Manager
    case CmpToolStatic.signupmenu[0]:
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getDisplayPlans(scope, categoryId);
        break;
    case CmpToolStatic.signupmenu[1]:
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getDisplayCategory(scope, categoryId);
        break;
    case CmpToolStatic.signupmenu[2]:
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getDisplayPlanCategory(scope, categoryId);
        break;
    case CmpToolStatic.signupmenu[3]:
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getDisplayCategoryMap(scope, categoryId);
        break;
    case CmpToolStatic.signupmenu[4]:
        window.CmpTool.getPlanAttributeDetails(scope);
        break;
    case CmpToolStatic.signupmenu[5]:
        window.CmpTool.getPlanAttributes(scope);
        break;
    case CmpToolStatic.signupmenu[6]:
        window.CmpTool.getPayTools(scope, resellerId);
        break;
    case CmpToolStatic.signupmenu[7]:
        window.CmpTool.getSkuMap(scope, resellerId);
        break;

    // 3. PlanGroup:
    case CmpToolStatic.plangroupmenu[0]: // PlanGroup
        window.CmpTool.getPlanGroups(scope, resellerId);
        break;
    case CmpToolStatic.plangroupmenu[1]: // PlanGroupDependencies
        window.CmpTool.getPlanGroupDependencies(scope, resellerId);
        break;
    case CmpToolStatic.plangroupmenu[2]: // PlanGroupExclusions
        window.CmpTool.getPlanGroupExclusions(scope, resellerId);
        break;
    case CmpToolStatic.plangroupmenu[3]: // PlanGroupCategoryMap
        window.CmpTool.getPlanGroupCategoryMap(scope, resellerId);
        break;
    case CmpToolStatic.plangroupmenu[4]: // PlanGroupMap
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getPlanGroupMap(scope, categoryId);
        break;
    case CmpToolStatic.plangroupmenu[5]: // PlanGroupSubscriptionPeriods
        window.CmpTool.getPlanGroupSubscriptionPeriods(scope, resellerId);
        break;
    case CmpToolStatic.plangroupmenu[6]: // PlanSuggestion
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getPlanSuggestions(scope, categoryId);
        break;
    case CmpToolStatic.plangroupmenu[7]: // MasterPlanSuggestion
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getMasterPlanSuggestions(scope, categoryId);
        break;

    // 4. Reseller Manager
    case CmpToolStatic.resellermenu[0]: // Resellers
        window.CmpTool.getResellersByParentId(scope, resellerId);
        break;
    case CmpToolStatic.resellermenu[1]: // ResellerAlias
        window.CmpTool.getResellersAlias(scope, resellerId);
        break;
    case CmpToolStatic.resellermenu[2]: // ResellerHostname
        window.CmpTool.getResellerHostname(scope, resellerId);
        break;
    case CmpToolStatic.resellermenu[3]: // ResellerAttributes
        window.CmpTool.getResellerAttributes(scope, resellerId);
        break;
    case CmpToolStatic.resellermenu[4]: // AttributeDetails
        window.CmpTool.getResellerAttributeDetails(scope, resellerId);
        break;
    case CmpToolStatic.resellermenu[5]: // IMStaffUsers
        window.CmpTool.getIMStaffUsers(scope, resellerId);
        break;
    case CmpToolStatic.resellermenu[6]: // ResellerLanguages
        window.CmpTool.getResellerLanguages(scope, resellerId);
        break;
    case CmpToolStatic.resellermenu[7]: // ResellerContent
        window.CmpTool.getResellerContent(scope, resellerId);
        break;
    case CmpToolStatic.resellermenu[8]: // ResellerContentValue
        window.CmpTool.getResellerContentValue(scope, resellerId);
        break;

    // 5. Upsell Manager
    case CmpToolStatic.upsellmenu[0]: // Upsells
        window.CmpTool.getUpsells(scope, resellerId);
        break;
    case CmpToolStatic.upsellmenu[1]: // UpsellMap
        window.CmpTool.getUpsellMap(scope, resellerId);
        break;

    // 6. TermsAndConditions
    case CmpToolStatic.termsandconditionmuenu[0]: // TermsAndConditions
        window.CmpTool.getTermsAndConditionsByResellerId(scope, resellerId);
        break;
    case CmpToolStatic.termsandconditionmuenu[1]: // TermsAndConditionsML
        window.CmpTool.getTermsAndConditionsML(scope, resellerId);
        break;
    case CmpToolStatic.termsandconditionmuenu[2]: // TermsAndConditionsGroup
        window.CmpTool.getAllTermsAndConditionsGroup(scope);
        break;
    case CmpToolStatic.termsandconditionmuenu[3]: // TermsAndConditionsGroupML
        window.CmpTool.getAllTermsAndConditionsGroupML(scope);
        break;
    case CmpToolStatic.termsandconditionmuenu[4]: // TermsAndConditionsPayToolMap
        window.CmpTool.getTermsAndConditionsPayToolMap(scope, resellerId);
        break;
    case CmpToolStatic.termsandconditionmuenu[5]: // TermsAndConditionsPlanMap
        window.CmpTool.getTermsAndConditionsPlanMap(scope, resellerId);
        break;
    case CmpToolStatic.termsandconditionmuenu[6]: // TermsAndConditionsRateMap
        window.CmpTool.getTermsAndConditionsRateMap(scope, resellerId);
        break;

    // 7. NetTerms:
    case CmpToolStatic.nettermsmenu[0]: // BillingTerms
        window.CmpTool.getBillingTerms(scope, resellerId);
        break;
    case CmpToolStatic.nettermsmenu[1]: // PaymentMethods
        window.CmpTool.getAllPaymentMethods(scope);
        break;
    case CmpToolStatic.nettermsmenu[2]: // BillingTermPaymentMethodMap
        window.CmpTool.getBillingTermPaymentMethodMap(scope, resellerId);
        break;
    case CmpToolStatic.nettermsmenu[3]: // BillingTermDescription
        window.CmpTool.getBillingTermDescription(scope);
        break;
    case CmpToolStatic.nettermsmenu[4]: // BillingTermDescriptionMap
        window.CmpTool.getBillingTermDescriptionMap(scope, resellerId);
        break;

    // 8. Navigation
    case CmpToolStatic.navigationmenu[0]: // VendorNameSlug
        window.CmpTool.getAllVendorNameSlug(scope);
        break;
    case CmpToolStatic.navigationmenu[1]: // ProductNameSlug
        window.CmpTool.getAllProductNameSlug(scope);
        break;
    case CmpToolStatic.navigationmenu[2]: // PlanFeatureBase
        window.CmpTool.getAllPlanFeaturesBase(scope);
        break;
    //PlanFeatures
    case CmpToolStatic.navigationmenu[3]: // PlanFeatures
        window.CmpTool.getPlanFeatures(scope, categoryId);
        break;

    // 9. MultiLanguage
    case CmpToolStatic.multilanguagemenu[0]: // DisplayCategoryML
        window.CmpTool.getAllDisplayCategoryML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[1]: // DisplayPlansML
        window.CmpTool.getDisplayPlansML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[2]: // UpsellsML
        CmpToolUtility.showMegaMenu(resellerId);
        window.CmpTool.getUpsellsML(scope, categoryId);
        break;
    case CmpToolStatic.multilanguagemenu[3]: // SecurityQuestionsML
        window.CmpTool.getAllSecurityQuestionsML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[4]: // BillingTermsML
        window.CmpTool.getAllBillingTermsML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[5]: // PaymentMethodML
        window.CmpTool.getAllPaymentMethodML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[6]: // ResellerAttributeML
        window.CmpTool.getResellerAttributeML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[7]: // PlanFeaturesBaseML
        window.CmpTool.getAllPlanFeaturesBaseML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[8]: // PlanFeaturesML
        window.CmpTool.getAllPlanFeaturesML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[9]: // PlanAttributeML
        window.CmpTool.getAllPlanAttributeML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[10]: // PlanGroupML
        window.CmpTool.getAllPlanGroupML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[11]: // PlanGroupSubscriptionPeriodsML
        window.CmpTool.getAllPlanGroupSubscriptionPeriodsML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[12]: // PlanSuggestionML
        window.CmpTool.getPlanSuggestionML(scope, resellerId);
        break;
    case CmpToolStatic.multilanguagemenu[13]: // MasterPlanSuggestionML
        window.CmpTool.getMasterPlanSuggestionMLByResellerId(scope, resellerId);
        break;

    // 10. SysConfig:
    case CmpToolStatic.sysconfigmenu[0]: // ResxDetail
        window.CmpTool.getAllResxDetail(scope);
        break;
    case CmpToolStatic.sysconfigmenu[1]: // ResxLanguageCategory
        window.CmpTool.getResxLanguageCategory(scope);
        break;
    case CmpToolStatic.sysconfigmenu[2]: // ResxLanguageCategoryMap
        window.CmpTool.getResxLanguageCategoryMap(scope);
        break;
    case CmpToolStatic.sysconfigmenu[3]: // ResxValue
        window.CmpTool.getAllResxValue(scope);
        break;
    case CmpToolStatic.sysconfigmenu[4]: // ResxValueExt
        window.CmpTool.getAllResxValueExt(scope);
        break;
    case CmpToolStatic.sysconfigmenu[5]: // Security Questions
        window.CmpTool.getAllSecurityQuestions(scope);
        break;
    case CmpToolStatic.sysconfigmenu[6]: // Login Test Account
        window.CmpTool.getAllLoginTestAccount(scope);
        break;
    case CmpToolStatic.sysconfigmenu[7]: // Languages
        window.CmpTool.getAllLanguages(scope);
        break;
    case CmpToolStatic.sysconfigmenu[8]: // IpPattern
        window.CmpTool.getAllIpPattern(scope);
        break;

    // 11. SyncTool (1)
    case CmpToolStatic.synctoolmenu[0]:
        window.CmpTool.getInternalPlans(scope, resellerId);
        break;
    case CmpToolStatic.synctoolmenu[1]:
        window.CmpTool.getInternalPlansML(scope, categoryId);
        break;
    case CmpToolStatic.synctoolmenu[2]:
        window.CmpTool.getInternalResourcesMap(scope, resellerId);
        break;
    case CmpToolStatic.synctoolmenu[3]: // InternalResourcesMapML
        window.CmpTool.getAllInternalResourcesMapML(scope, resellerId);
        break;
    case CmpToolStatic.synctoolmenu[4]:
        window.CmpTool.getPlanPeriod(scope, resellerId);
        break;
    case CmpToolStatic.synctoolmenu[5]:
        window.CmpTool.getPlanPeriodML(scope, resellerId);
        break;
    case CmpToolStatic.synctoolmenu[6]:
        window.CmpTool.getPlanRate(scope, resellerId);
        break;
    case CmpToolStatic.synctoolmenu[7]:
        window.CmpTool.getPlanRatePeriod(scope, resellerId);
        break;
        case CmpToolStatic.synctoolmenu[8]:
            window.CmpTool.getResourceCategory(scope);
            break;

    // 11. SyncToolOtherTables (2)
        case CmpToolStatic.synctoolOtherTablesmenu[0]:
        window.CmpTool.getCountry(scope);
        break;
        case CmpToolStatic.synctoolOtherTablesmenu[1]:
        window.CmpTool.getStateBook(scope);
        break;
        case CmpToolStatic.synctoolOtherTablesmenu[2]:
        window.CmpTool.getMeasurementUnit(scope);
        break;
        case CmpToolStatic.synctoolOtherTablesmenu[3]:
        window.CmpTool.getCountryRules(scope);
        break;
    }
}
   
