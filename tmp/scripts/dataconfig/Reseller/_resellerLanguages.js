
window.CmpTool.configResellerLanguagesColumns = function(scope) {
    var result = [
        { dataField: "ID", caption: "ID", allowEditing: false, cssClass: 'gray', width: 120 },
        {
            dataField: "ResellerID",
            caption: "L1 Reseller",
            lookup: {
                dataSource: scope.parentResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390
        },
        {
            dataField: "LanguageLCName",
            caption: "Languag",
            lookup: {
                dataSource: scope.activeLanguagesDropdown,
                valueExpr: 'LCName',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 190
        },
        {
            dataField: "DefaultCulture",
            caption: "DefaultCulture",
            lookup: {
                dataSource: scope.allLanguagesDropdown,
                valueExpr: 'LCName',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 260
        },
        { dataField: "IsDefaultLanguage", caption: "IsDefaultLanguage", width: 190 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Memo", caption: "Memo", width: 120 }
    ];
    return result;
}