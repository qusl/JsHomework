
window.CmpTool.configPlanFeaturesMLColumns = function (scope) {
    var result = [
        {
            dataField: "PlanId",
            caption: "Plan",
            lookup: {
                dataSource: scope.internalPlansDropdown,
                valueExpr: 'PlanID',
                displayExpr: 'DispName'
            },
            width: 580
        },
        {
            dataField: "FeatureId",
            caption: "Feature",
            lookup: {
                dataSource: scope.planFeaturesBaseDropdown,
                valueExpr: 'FeatureId',
                displayExpr: 'DispName'
            },
            width: 380
        },
        {
            dataField: "Language",
            caption: "Language",
            lookup: {
                dataSource: scope.activeLanguagesDropdown,
                valueExpr: 'LCName',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 190
        },
        { dataField: "FeatureName", caption: "FeatureName", width: 290 },
        { dataField: "Description", caption: "Description", width: 690 },
        { dataField: "Prefix", caption: "Prefix", width: 290 },
        { dataField: "Value", caption: "Value", width: 490 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 }
        
    ];
    return result;
}