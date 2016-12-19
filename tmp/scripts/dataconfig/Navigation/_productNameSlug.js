
window.CmpTool.configProductNameSlugColumns = function (scope) {
    var result = [
        { dataField: "ProductId", caption: "ProductId", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "ProductName", caption: "ProductName", width: 420 },
        { dataField: "SortOrder", caption: "SortOrder", width: 150 },
        { dataField: "IsActive", caption: "IsActive", width: 150 },
        { dataField: "Memo", caption: "Memo" }
    ];
    return result;
}