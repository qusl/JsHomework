
window.CmpTool.configPaymentMethodsColumns = function (scope) {
    var result = [
        { dataField: "Id", allowEditing: false, cssClass: 'gray', caption: "Id" },
        { dataField: "Description", caption: "Description" },
        { dataField: "PaymentMethodType", caption: "PaymentMethodType" },
        { dataField: "BackupCreditCard", width: 200 },
        { dataField: "SortOrder", caption: "SortOrder" },
        { dataField: "IsActive", caption: "IsActive" },
        { dataField: "Memo", caption: "Memo" }
    ];
    return result;
}