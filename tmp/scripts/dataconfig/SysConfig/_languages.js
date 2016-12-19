
window.CmpTool.configLanguagesColumns = function (scope) {
    var result = [
        { dataField: "LCID", caption: "LCID", width: 120 },
        { dataField: "LCName", caption: "LCName", width: 320 },
        { dataField: "EnglishName", caption: "EnglishName", width: 120 },
        { dataField: "NativeName", caption: "NativeName" },
        { dataField: "IsActive", caption: "IsActive" }
    ];
    return result;
}