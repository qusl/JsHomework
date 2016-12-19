
window.CmpTool.configResellerContentColumns = function (scope) {
    var result = [
        { dataField: "ContentId", caption: "ContentId", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "ContentName", caption: "ContentName", width: 190 },
        { dataField: "UsagePattern", caption: "UsagePattern", width: 160 },
        { dataField: "Description", caption: "Description", width: 320 },
        { dataField: "IsArray", caption: "IsArray", width: 120 },
        { dataField: "IsDictionary", caption: "IsDictionary", width: 160 },
        { dataField: "IsActive", caption: "IsActive" }
        //,
        //{ dataField: "IsLocked", caption: "IsLocked" }

    ];
    return result;
}