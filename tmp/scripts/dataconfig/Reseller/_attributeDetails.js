
window.CmpTool.configAttributeDetailsColumns = function (scope) {
    var result = [
        { dataField: "RADID", caption: "RADID", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "DetailName", caption: "DetailName", width: 260 },
        { dataField: "Description", caption: "Description", width: 320 },
        { dataField: "Pattern", caption: "Pattern", width: 190 },

        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Memo", caption: "Memo" }
        //,
        //{ dataField: "IsLocked", caption: "IsLocked", allowEditing: false, cssClass: 'gray', width: 120 }

    ];
    return result;
}