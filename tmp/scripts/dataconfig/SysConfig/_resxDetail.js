
window.CmpTool.configResxDetailColumns = function (scope) {
    var result = [
        { dataField: "ResxID", caption: "ResxID", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "KeyName", caption: "KeyName", width: 320 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "Comment", caption: "Comment" }
        //,
        //{ dataField: "IsLocked", caption: "IsLocked" }    
    ];
    return result;
}