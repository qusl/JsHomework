
window.CmpTool.configPlanFeaturesBaseMLColumns = function (scope) {
    var result = [
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
        { dataField: "FeatureName", caption: "FeatureName", width: 280 },
        { dataField: "Description", caption: "Description", width: 480 },
        { dataField: "UnitOfMeasure", caption: "UnitOfMeasure", width: 220 },
        { dataField: "Prefix", caption: "Prefix", width: 220 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 }
        
    ];
    return result;
}