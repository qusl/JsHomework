﻿
window.CmpTool.configResxValueColumns = function (scope) {
    var result = [
        //{ dataField: "ID", caption: "ID", allowEditing: false, cssClass: 'gray' },
        {
            dataField: "ResxID",
            caption: "ResxID",
            lookup: {
                dataSource: scope.resxDetailDropdown,
                valueExpr: 'ResxID',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 380
        },
        {
            dataField: "LCName",
            caption: "Language",
            lookup: {
                dataSource: scope.activeLanguagesDropdown,
                valueExpr: 'LCName',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 190
        },
         { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "Value", caption: "Value", width: 1020 }
        //,
        //{ dataField: "LCID", caption: "LCID" },
        
    ];
    return result;
}