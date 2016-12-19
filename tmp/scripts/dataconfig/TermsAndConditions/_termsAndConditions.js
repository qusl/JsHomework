
window.CmpTool.configTermsAndConditionsColumns = function(scope) {
    var result = [
        { dataField: "TermID", caption: "TermID", allowEditing: false, cssClass: 'gray', width: 120 },
        {
            dataField: "AccountID",
            caption: "L1 Reseler",
            lookup: {
                dataSource: scope.parentResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390,
            allowEditing: false
        },
        { dataField: "AcceptType", caption: "AcceptType", allowEditing: false, cssClass: 'gray', width: 140 },
        { dataField: "Version", caption: "Version", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "IsAdditionalCheckBox", caption: "IsAdditionalCheckBox", width: 220 },
        { dataField: "Memo", caption: "Memo" },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 220 }
    ];
    return result;
}