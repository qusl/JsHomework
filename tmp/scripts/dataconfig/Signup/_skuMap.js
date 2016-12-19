
window.CmpTool.configSkuMapColumns = function (scope) {
    var result = [
        { dataField: "ID", allowEditing: false, cssClass: 'gray', width: 100 },
        { dataField: "SkuID", width: 350 },
        { dataField: "SKU", width: 230 },
        //{
        //    dataField: "AccountID",
        //    caption: "L1 Reseler",
        //    lookup: {
        //        dataSource: scope.parentResellerDropdown,
        //        valueExpr: 'ResellerID',
        //        displayExpr: 'DispName'
        //    },
        //    width: 390,
        //    allowEditing: false
        //},
        {
            dataField: "PlanNum",
            caption: "Plan",
            lookup: {
                dataSource: scope.internalPlansWithPlanNumDropdown,
                valueExpr: 'PlanNum',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 580
        },
        {
            dataField: "ResourceNum",
            caption: "Resource",
            lookup: {
                dataSource: scope.internalResourcesWithNumDropdown,
                valueExpr: 'ResourceNum',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 500
        },
        { dataField: "DefaultAmount", width: 160 },
        { dataField: "PlanLengthMonths", width: 180 },
        { dataField: "ResourceLengthMonths", width: 200 },
        { dataField: "IsMigration", width: 160 },
        { dataField: "IsActive", width: 100 },
        { dataField: "SortOrder", width: 120 },
        { dataField: "Memo", width: 100 }
    ];
    return result;
}