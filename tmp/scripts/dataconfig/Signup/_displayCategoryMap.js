
window.CmpTool.configDisplayCategoryMapColumns = function (scope) {
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
            dataField: "ParentCategoryID",
            caption: "ParentCategory",
            lookup: {
                dataSource: scope.displayParentCategoriesDropdown,
                valueExpr: 'CategoryID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 450
        },
        { dataField: "IsActive", width: 120 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo"}
    ];
    return result;
}