
window.CmpTool.configStateBookColumns = function (scope) {
    var result = [
        { dataField: "CountryID", caption: "CountryID", allowEditing: false, cssClass: 'gray' },
        { dataField: "State", caption: "State", allowEditing: false, cssClass: 'gray' },
        //{ dataField: "StateId", caption: "StateId", allowEditing: false, cssClass: 'gray' },
        { dataField: "Name", caption: "Name", allowEditing: false, cssClass: 'gray' }
        //{ dataField: "IsActive", caption: "IsActive" },
        //{ dataField: "Memo", caption: "Memo" }
    ];
    return result;
}