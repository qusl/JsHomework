
window.CmpTool.configIpPatternColumns = function (scope) {
    var result = [
        { dataField: "IpPattern", caption: "IpPattern", width: 120 },
        { dataField: "IpGroupId", caption: "IpGroupId", width: 320 },
        { dataField: "Description", caption: "Description", width: 120 },
        { dataField: "IsActive", caption: "IsActive" },
        { dataField: "SortOrder", caption: "SortOrder" }
    ];
    return result;
}