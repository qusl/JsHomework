
window.CmpTool.configExceptionColumns = function() {
    var result = [
        { dataField: "LogID", caption: "LogID", allowEditing: false, cssClass: 'gray', width: 110 },
        { dataField: "EventID", caption: "EventID", allowEditing: false, cssClass: 'gray', width: 100 },
        { dataField: "Priority", caption: "Priority", allowEditing: false, cssClass: 'gray', width: 100 },
        { dataField: "Severity", caption: "Severity", allowEditing: false, cssClass: 'gray', width: 100 },
        { dataField: "Title", caption: "Title", allowEditing: false, cssClass: 'gray', width: 660 },
        { dataField: "DBTimestamp", caption: "DBTimestamp", allowEditing: false, cssClass: 'gray', width: 190 },
        { dataField: "MachineName", caption: "MachineName", allowEditing: false, cssClass: 'gray', width: 150 },
        { dataField: "ActivityID", caption: "ActivityID", allowEditing: false, cssClass: 'gray', width: 300 },
        { dataField: "HandlingInstanceId", caption: "HandlingInstanceId", allowEditing: false, cssClass: 'gray', width: 300 },
        { dataField: "CmpSessionId", caption: "CmpSessionId", allowEditing: false, cssClass: 'gray', width: 200 },
        { dataField: "ProvOrderId", caption: "ProvOrderId", allowEditing: false, cssClass: 'gray', width: 120 }
    ];
    return result;
}