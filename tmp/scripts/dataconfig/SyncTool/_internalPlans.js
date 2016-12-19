
window.CmpTool.configInternalPlanColumns = function(scope) {
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
        { dataField: "PlanNum", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "PlanName", allowEditing: false, cssClass: 'gray', width: 380 },
        { dataField: "PlanDesc", width: 380 },
        { dataField: "DomainSkip", width: 150 },
        { dataField: "DomainOptional", width: 180 },
        { dataField: "IsVPS", allowEditing: false, cssClass: 'gray', width: 100 },
        { dataField: "CopiedFromPlanID", allowEditing: false, cssClass: 'gray', width: 220 },
        { dataField: "BillingPeriodType", allowEditing: false, cssClass: 'gray', width: 220 },
        { dataField: "BillingPeriod", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "RecurringType", allowEditing: false, cssClass: 'gray', width: 150 },
        {
            dataField: "PermissionTypeId",
            caption: "PermissionType",
            validationRules: [{ type: "required" }],
            lookup: {
                dataSource: scope.permissionTypeDropdown,
                valueExpr: 'PermissionTypeId',
                displayExpr: 'DispName'
            },
            width: 180
        },
        { dataField: "IsDomain", width: 110 },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 220 },
        { dataField: "LastModifiedTime", allowEditing: false, cssClass: 'gray', width: 220 }
    ];
    return result;
}