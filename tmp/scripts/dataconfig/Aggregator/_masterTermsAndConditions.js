
window.CmpTool.configMasterTermsAndConditionsColumns = function (scope) {
    var result = [
        { dataField: "TermNum", caption: "TermNum", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "TermName", caption: "TermName", width: 420 },
        { dataField: "SortOrder", caption: "SortOrder", width: 150 },
        { dataField: "IsActive", caption: "IsActive", width: 150 },
        { dataField: "Memo", caption: "Memo" }
    ];
    return result;
}