
window.CmpTool.configInternalPlansMLColumns = function (scope) {
    var result = [
        { dataField: "ID", caption: "ID", allowEditing: false, cssClass: 'gray', width: 120 },
        //{ dataField: "AccountID", caption: "AccountID" },
        {
            dataField: "PlanID",
            caption: "Plan",
            lookup: {
                dataSource: scope.internalPlansDropdown,
                valueExpr: 'PlanID',
                displayExpr: 'DispName'
            },
            width: 580
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
        { dataField: "PlanName", caption: "PlanName", width: 280 },
        { dataField: "PlanDesc", caption: "PlanDesc", width: 280 },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 220 }
    ];
    return result;
}