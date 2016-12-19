
window.CmpTool.configUpsellsMLColumns = function (scope) {
    var result = [
        //{ dataField: "ID", caption: "ID", allowEditing: false, cssClass: 'gray' },
        {
            dataField: "UpsellID",
            caption: "Upsell",
            lookup: {
                dataSource: scope.upsellDropdown,
                valueExpr: 'UpsellId',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        {
            dataField: "Language",
            caption: "Language",
            lookup: {
                dataSource: scope.activeLanguagesDropdown,
                valueExpr: 'LCName',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 190
        },
        { dataField: "UpsellName", caption: "UpsellName", width: 280 },
        { dataField: "UpsellDesc", caption: "UpsellDesc", width: 580 },
        { dataField: "UpsellLogo", caption: "UpsellLogo", width: 280 },
        { dataField: "LearnMore", caption: "LearnMore", width: 280 },
        //{ dataField: "USOID", caption: "USOID" },
        { dataField: "SelectorDesc", caption: "SelectorDesc", width: 280 }
        //,
        //{ dataField: "SelectorID", caption: "SelectorID" },
        //{ dataField: "ParentId", caption: "ParentId" }
    ];
    return result;
}