        
window.CmpTool.configInternalPlanColumnsOsa = function(scope) {
    var result = [
        { dataField: "PlanID", allowEditing: false, cssClass: 'gray', width: 120 },
        {
            dataField: "AccountID",
            caption: "L1 Reseler",
            lookup: {
                dataSource: scope.parentResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390,
            allowEditing: false
        },
        //{ dataField: "serviceTemplateID", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "PlanName", allowEditing: false, cssClass: 'gray', width: 1680 },
        //{ dataField: "planCategoryID", width: 380 },
        //{ dataField: "published", width: 150 },
        { dataField: "CopiedFromPlanID", allowEditing: false, cssClass: 'gray', width: 280 },
        { dataField: "BillingPeriodType", allowEditing: false, cssClass: 'gray', width: 280 },
        { dataField: "BillingPeriod", allowEditing: false, cssClass: 'gray', width: 220 },
        { dataField: "RecurringType", allowEditing: false, cssClass: 'gray', width: 220 }
    ];
    return result;
}