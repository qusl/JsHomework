
window.CmpTool.configPlanFeaturesColumns = function (scope) {
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
            width: 580
        },
        { dataField: "FeatureName", caption: "FeatureName", width: 230 },
        { dataField: "Description", caption: "Description", width: 530 },
        { dataField: "UnitOfMeasure", caption: "UnitOfMeasure", width: 130 },
        { dataField: "Prefix", caption: "Prefix", width: 130 },
        { dataField: "SortableValue", caption: "SortableValue", width: 130 },
        { dataField: "IsActive", caption: "IsActive", width: 130 },
        { dataField: "Memo", caption: "Memo", width: 130 }
    ];
    return result;
}