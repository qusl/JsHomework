
window.CmpTool.configResxLanguageCategoryColumns = function (scope) {
    var result = [
        { dataField: "CategoryID", caption: "CategoryID", allowEditing: false, cssClass: 'gray' },
        { dataField: "CategoryName", caption: "CategoryName" },
        { dataField: "IsActive", caption: "IsActive" }
    ];
    return result;
}