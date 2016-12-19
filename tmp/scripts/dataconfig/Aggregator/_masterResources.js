
window.CmpTool.configMasterResourcesColumns = function (scope) {
    var result = [
        { dataField: "ResourceNum", caption: "Resource", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "ResourceName", caption: "ResourceName", width: 420 },
        { dataField: "SortOrder", caption: "SortOrder", width: 150 },
        { dataField: "IsActive", caption: "IsActive", width: 150 },
        { dataField: "Memo", caption: "Memo" }
    ];
    return result;
}