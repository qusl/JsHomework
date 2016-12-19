
window.CmpTool.configTermsAndConditionsMLColumns = function (scope) {
    var result = [
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
        { dataField: "TermName", caption: "TermName" },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 220 }
    ];
    return result;
}