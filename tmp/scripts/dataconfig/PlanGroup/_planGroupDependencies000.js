
window.CmpTool.configPlanGroupDependenciesColumns = function (scope) {
    var result = [
        { dataField: "DependencyPlanGroupId", caption: "DependencyPlanGroupId", allowEditing: false, cssClass: 'gray' },
        { dataField: "PlanGroupID", caption: "PlanGroupID" },
        { dataField: "PlanGroupName", caption: "PlanGroupName" },
        { dataField: "DependencyPlanGroupName", caption: "DependencyPlanGroupName" },
        { dataField: "FullPlanGroupRequired", caption: "FullPlanGroupRequired" }

    ];
    return result;
}