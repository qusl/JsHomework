
window.CmpTool.configPlanRateColumns = function(scope) {
    var result = [
        { dataField: "PlanRateId", allowEditing: false, cssClass: 'gray' },
        { dataField: "PlanId", allowEditing: false, cssClass: 'gray' },
        { dataField: "ResourceId", allowEditing: false, cssClass: 'gray' },
        { dataField: "SetupFee", allowEditing: false, cssClass: 'gray' },
        { dataField: "IncludedValue", allowEditing: false, cssClass: 'gray' },
        { dataField: "MaxValue", allowEditing: false, cssClass: 'gray' },
        { dataField: "IsRFperUnit", allowEditing: false, cssClass: 'gray' },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray' }
    ];
    return result;
}