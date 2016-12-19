
window.CmpTool.configPlanAttributesColumns = function (scope) {
    var result = [
        { dataField: "PABID", allowEditing: false, cssClass: 'gray', width: 100 },
        {
            dataField: "PlanID",
            caption: "Plan",
            lookup: {
                dataSource: scope.displayPlansDropdown,
                valueExpr: 'PlanID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
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
        { dataField: "Value", width: 300 },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 120}
    ];
    return result;
}