
window.CmpTool.configDisplayPlanCategoryColumns = function (scope) {
    var result = [
        {
            dataField: "CategoryID",
            caption: "Category",
            lookup: {
                dataSource: scope.displayCategoriesDropdown,
                valueExpr: 'CategoryID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 400
        },
        {
            dataField: "DisplayPlanID",
            caption: "Plan",
            lookup: {
                dataSource: scope.displayPlansDropdown,
                valueExpr: 'PlanID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo"}
    ];
    return result;
}