
window.CmpTool.configUpsellMapColumns = function(scope) {
    var result = [
        {
            dataField: "ParentId",
            caption: "Parent Upsell",
            lookup: {
                dataSource: scope.upsellDropdown,
                valueExpr: 'UpsellId',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        {
            dataField: "ChildId",
            caption: "Child Upsell",
            lookup: {
                dataSource: scope.upsellDropdown,
                valueExpr: 'UpsellId',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 }
    ];
    return result;
}