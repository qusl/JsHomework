
window.CmpTool.configTermsAndConditionsGroupMLColumns = function (scope) {
    var result = [
        {
            dataField: "TermGroupID",
            caption: "TermGroup",
            lookup: {
                dataSource: scope.termsAndConditionsGroupDropdown,
                valueExpr: 'TermGroupID',
                displayExpr: 'DispName'
            },
            width: 590
        },
        {
            dataField: "Language",
            caption: "Language",
            lookup: {
                dataSource: scope.activeLanguagesDropdown,
                valueExpr: 'LCName',
                displayExpr: 'DispName'
            },
            width: 190
        },
        { dataField: "Template", caption: "Template", width: 1990 }
    ];
    return result;
}