
window.CmpTool.configTermsAndConditionsPlanMapForHealthCheckColumns = function (scope) {
    var result = [
        {
            dataField: "TermID",
            caption: "Term",
            lookup: {
                dataSource: scope.termsAndConditionsDropdown,
                valueExpr: 'TermID',
                displayExpr: scope.termsAndConditionsDropdown.DispName === null ? "TermID" : 'DispName'
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
        { dataField: "TermID", caption: "TermID", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "PlanID", caption: "PlanID", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "ResellerID", caption: "ResellerID", allowEditing: false, cssClass: 'gray', width: 120 }
        ,
        {
            dataField: "ResellerID",
            caption: "L1 Reseler",
            lookup: {
                dataSource: scope.parentResellersDropdownContainsResellerID,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390,
            allowEditing: false
        }
    ];
    return result;
}