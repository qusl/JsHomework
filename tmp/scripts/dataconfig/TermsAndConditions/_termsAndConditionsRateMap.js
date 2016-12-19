
window.CmpTool.configTermsAndConditionsRateMapColumns = function (scope) {
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
        { dataField: "RateID", caption: "RateID", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 220 }
        //,
        //{ dataField: "IsActive", caption: "IsActive", width: 120 }
    ];
    return result;
}