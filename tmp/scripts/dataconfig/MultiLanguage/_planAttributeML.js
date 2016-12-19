
window.CmpTool.configPlanAttributeMLColumns = function (scope) {
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
            dataField: "PADID",
            caption: "Attribute",
            lookup: {
                dataSource: scope.planAttributeDetailDropdown,
                valueExpr: 'PADID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 300
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
        { dataField: "DispValue", caption: "Value", width: 490 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 }

    ];
    return result;
}