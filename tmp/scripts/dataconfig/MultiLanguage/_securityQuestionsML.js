
window.CmpTool.configSecurityQuestionsMLColumns = function (scope) {
    var result = [
        //{ dataField: "ID", caption: "ID", allowEditing: false, cssClass: 'gray' },
        { dataField: "QuestionID", caption: "QuestionID", width: 130 },
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
        { dataField: "QuestionContent", caption: "QuestionContent", width: 280 },
        { dataField: "QuestionCode", caption: "QuestionCode" }
    ];
    return result;
}