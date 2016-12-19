
window.CmpTool.configTermsAndConditionsPlanMapColumns = function (scope) {
    var result = [
        {
            dataField: "TermGroupID",
            caption: "TermGroup",
            lookup: {
                dataSource: scope.termsAndConditionsGroupDropdown,
                valueExpr: 'TermGroupID',
                displayExpr: 'DispName'
            },
            width: 690
        },
        {
            dataField: "TermID",
            caption: "Term",
            lookup: {
                dataSource: scope.termsAndConditionsDropdown,
                valueExpr: 'TermID',
                displayExpr: 'DispName'
            },
            width: 420
        },
        {
            dataField: "PlanID",
            caption: "Plan",
            lookup: {
                dataSource: scope.internalPlansDropdown,
                valueExpr: 'PlanID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 220 }
        //,
        //{ dataField: "IsActive", caption: "IsActive", width: 120 }
    ];
    return result;
}