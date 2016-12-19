
window.CmpTool.configMeasurementUnitColumns = function (scope) {
    var result = [
        { dataField: "measureUnit", caption: "measureUnit", allowEditing: false, cssClass: 'gray' },
        { dataField: "Language", caption: "Language", allowEditing: false, cssClass: 'gray' },
        { dataField: "Name", caption: "Name", allowEditing: false, cssClass: 'gray' },
        { dataField: "MeasurementUnitType", caption: "MeasurementUnitType", allowEditing: false, cssClass: 'gray' }
    ];
    return result;
}