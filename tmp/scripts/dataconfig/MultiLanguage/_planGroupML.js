
window.CmpTool.configPlanGroupMLColumns = function (scope) {
    var result = [
       {
           dataField: "PlanGroupID",
           caption: "PlanGroup",
           lookup: {
               dataSource: scope.allPlanGroupDropdown,
               valueExpr: 'PlanGroupID',
               displayExpr: 'DispName'
           },
           validationRules: [{ type: "required" }],
           width: 530
       },
        {
            dataField: "Language",
            caption: "Language",
            lookup: {
                dataSource: scope.activeLanguagesDropdown,
                valueExpr: 'LCName',
                displayExpr: 'DispName'
            },
            validationRules: [{ type: "required" }],
            width: 190
        },
        { dataField: "PlanGroupName", caption: "PlanGroupName", width: 220 },
        { dataField: "Size", caption: "Size", width: 260 },
        { dataField: "Description", caption: "Description", width: 420 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Memo", caption: "Memo", width: 120 }
    ];
    return result;
}