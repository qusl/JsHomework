
window.CmpTool.configPlanAttributeDetailColumns = function (scope) {
    var result = [
        { dataField: "PADID", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "DetailName", width: 280 },
        { dataField: "Description", width: 380 },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo" }
    ];
    return result;
}