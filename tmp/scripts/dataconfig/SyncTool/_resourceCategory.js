
window.CmpTool.configResourceCategoryColumns = function (scope) {
    var result = [
        { dataField: "Id", caption: "Id", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "Name", caption: "Name", allowEditing: false, cssClass: 'gray', width: 380 },
        { dataField: "ParentCategoryId", caption: "ParentCategoryId", allowEditing: false, cssClass: 'gray', width: 180 },
        { dataField: "Description", caption: "Description", allowEditing: false, cssClass: 'gray', width: 360 },
        { dataField: "TaxCategoryId", caption: "TaxCategoryId", allowEditing: false, cssClass: 'gray', width: 190 },
        { dataField: "AccountId", caption: "AccountId", allowEditing: false, cssClass: 'gray', width: 160 },
        { dataField: "IsOptional", caption: "IsOptional", allowEditing: false, cssClass: 'gray'}
    ];
    return result;
}