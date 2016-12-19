
window.CmpTool.configPlanRatePeriodColumns = function (scope) {
    var result = [
        { dataField: "RatePeriodId", allowEditing: false, cssClass: 'gray' },
        { dataField: "PlanRateId", allowEditing: false, cssClass: 'gray' },
        { dataField: "PlanPeriodId", allowEditing: false, cssClass: 'gray' },
        { dataField: "RecurringFee", allowEditing: false, cssClass: 'gray' },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray' }
    ];
    return result;
}