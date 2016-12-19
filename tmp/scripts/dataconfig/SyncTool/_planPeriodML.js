
window.CmpTool.configPlanPeriodMLColumns = function (scope) {
    var result = [
        { dataField: "PlanPeriodId", allowEditing: false, cssClass: 'gray', width: 180 },
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
        { dataField: "FeeText", allowEditing: false, cssClass: 'gray' },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray' }
    ];
    return result;
}