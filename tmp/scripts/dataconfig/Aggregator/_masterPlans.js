
window.CmpTool.configMasterPlansColumns = function (scope) {
    var result = [
        { dataField: "PlanNum", caption: "PlanNum", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "PlanName", caption: "PlanName", width: 420 },
        { dataField: "SortOrder", caption: "SortOrder", width: 150 },
        { dataField: "IsActive", caption: "IsActive", width: 150 },
        { dataField: "Memo", caption: "Memo" }
    ];
    return result;
}