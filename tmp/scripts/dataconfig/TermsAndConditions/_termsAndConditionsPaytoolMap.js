
window.CmpTool.configTermsAndConditionsPaytoolMapColumns = function (scope) {
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
            width: 390
        },
        {
            dataField: "PayToolID",
            caption: "PayTool",
            lookup: {
                dataSource: scope.payToolsDropdown,
                valueExpr: 'PayToolID',
                displayExpr: 'DispName'
            },
            width: 390
        },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "IsActive", caption: "IsActive", width: 120 }
    ];
    return result;
}