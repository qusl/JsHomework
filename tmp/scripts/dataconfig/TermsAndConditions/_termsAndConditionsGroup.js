
window.CmpTool.configTermsAndConditionsGroupColumns = function (scope) {
    var result = [
        { dataField: "TermGroupID", caption: "TermGroupID", allowEditing: false, cssClass: 'gray', width: 160 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Memo", caption: "Memo" }
    ];
    return result;
}