
window.CmpTool.configPlanFeaturesBaseColumns = function (scope) {
    var result = [
        { dataField: "FeatureId", caption: "FeatureId", allowEditing: false, cssClass: 'gray', width: 130 },
        { dataField: "FeatureName", caption: "FeatureName", width: 250 },
        { dataField: "Description", caption: "Description", width: 550 },
        { dataField: "UnitOfMeasure", caption: "UnitOfMeasure", width: 150 },
        { dataField: "Prefix", caption: "Prefix", width: 150 },
        { dataField: "IsActive", caption: "IsActive", width: 130 },
        { dataField: "IsPrice", caption: "IsActive", width: 130 },
        { dataField: "SortOrder", caption: "SortOrder", width: 130 },
        { dataField: "Memo", caption: "Memo", width: 150 }
    ];
    return result;
}