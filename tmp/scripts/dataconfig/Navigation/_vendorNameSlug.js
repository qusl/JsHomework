
window.CmpTool.configVendorNameSlugColumns = function (scope) {
    var result = [
        { dataField: "VendorId", caption: "VendorId", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "VendorName", caption: "VendorName", width: 420 },
        { dataField: "SortOrder", caption: "SortOrder", width: 150 },
        { dataField: "IsActive", caption: "IsActive", width: 150 },
        { dataField: "Memo", caption: "Memo" }
    ];
    return result;
}