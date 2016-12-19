
window.CmpTool.configSecurityQuestionsColumns = function (scope) {
    var result = [
        { dataField: "ID", caption: "ID", width: 120 },
        { dataField: "QuestionContent", caption: "QuestionContent", width: 320 },
        { dataField: "QuestionCode", caption: "QuestionCode", width: 120 },
        { dataField: "IsActive", caption: "IsActive" },
        { dataField: "SortOrder", caption: "SortOrder" },
        { dataField: "Memo", caption: "Memo" }
         
    ];
    return result;
}