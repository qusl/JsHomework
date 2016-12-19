
window.CmpTool.configDisplayCategoryMLColumns = function (scope) {
    var result = [
        //{ dataField: "ID", caption: "ID", allowEditing: false, cssClass: 'gray' },
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
        { dataField: "CategoryName", caption: "CategoryName", width: 320 },
        { dataField: "CategoryDescription", caption: "CategoryDescription", width: 420 }
        //,
        //{ dataField: "CategoryHTML", caption: "CategoryHTML" },
        //{ dataField: "PromoText", caption: "PromoText" }
    ];
    return result;
}