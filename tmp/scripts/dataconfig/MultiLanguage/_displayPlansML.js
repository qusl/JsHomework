
window.CmpTool.configDisplayPlansMLColumns = function (scope) {
    var result = [
        //{ dataField: "ID", caption: "ID", allowEditing: false, cssClass: 'gray' },
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
        //{ dataField: "AccountID", caption: "AccountID" },
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
        { dataField: "Title", caption: "Title", width: 280 },
        { dataField: "Pricing", caption: "Pricing", width: 220 },
        //{ dataField: "ShortDescription", caption: "ShortDescription", width: 520 },
        //{ dataField: "LongDescription", caption: "LongDescription" },
        { dataField: "Icon", caption: "Icon", width: 420 },
        { dataField: "LearnMore", caption: "LearnMore", width: 120 },
        { dataField: "PeriodName", caption: "PeriodName", width: 150 }
    ];
    return result;
}