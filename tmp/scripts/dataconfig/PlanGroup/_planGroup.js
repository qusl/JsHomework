
window.CmpTool.configPlanGroupColumns = function(scope) {
    var result = [
        { dataField: "PlanGroupID", allowEditing: false, cssClass: 'gray', width: 150 },
        {
            dataField: "ResellerID",
            caption: "L1 Reseler",
            lookup: {
                dataSource: scope.parentResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 390,
            allowEditing: false
        },
        { dataField: "PlanGroupName", caption: "PlanGroupName", width: 320 },
        { dataField: "Size", caption: "Size", width: 120 },
        { dataField: "Description", caption: "Description", width: 420 },
        //{ dataField: "Maximum", caption: "Maximum", width: 120 },
        //    { dataField: "Minimum", caption: "Minimum", width: 120 },
        { dataField: "PlanGroupType", caption: "PlanGroupType", width: 180 },
        //{ dataField: "IsParent", caption: "IsParent", width: 130 },
        { dataField: "SortOrder", caption: "SortOrder", width: 150 },
        { dataField: "IsActive", caption: "IsActive", width: 150 },
        { dataField: "Memo", caption: "Memo", width: 120 }
    ];
    return result;
}