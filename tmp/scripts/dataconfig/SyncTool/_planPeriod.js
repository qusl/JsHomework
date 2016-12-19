
window.CmpTool.configPlanPeriodColumns = function(scope) {
    var result = [
        { dataField: "PlanPeriodId", allowEditing: false, cssClass: 'gray', width: 180 },
        { dataField: "PlanId", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "Period", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "PeriodType", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "SetupFee", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "SubscriptionFee", allowEditing: false, cssClass: 'gray', width: 180 },
        { dataField: "NumberOfPeriods", allowEditing: false, cssClass: 'gray', width: 180 },
        { dataField: "Discount", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "TotalFee", allowEditing: false, cssClass: 'gray', width: 160 },
        { dataField: "Trial", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "FeeText", allowEditing: false, cssClass: 'gray', width: 420 },
        { dataField: "RenewalFee", allowEditing: false, cssClass: 'gray', width: 160 },
        { dataField: "TransferFee", allowEditing: false, cssClass: 'gray', width: 160 },
        { dataField: "DepositFee", allowEditing: false, cssClass: 'gray', width: 160 },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 220 }
    ];
    return result;
}