
window.CmpTool.configIMStaffUsersColumns = function (scope) {
    var result = [
        { dataField: "StaffUserID", caption: "StaffUserID", allowEditing: false, cssClass: 'gray', width: 160 },
        {
            dataField: "ResellerID",
            caption: "L2 Reseller",
            lookup: {
                dataSource: scope.childResellerDropdown,
                valueExpr: 'ResellerID',
                displayExpr: 'DispName'
            },
            width: 290
        },
        { dataField: "IMUserID", caption: "IMUserID", width: 180 },
        { dataField: "IMUserName", caption: "IMUserName", width: 160 },
        { dataField: "IMRole", caption: "IMRole", width: 120 },

        { dataField: "IMEmailAddress", caption: "IMEmailAddress", width: 150 },
        { dataField: "IMCapsID", caption: "IMCapsID", width: 120 },
        { dataField: "FirstName", caption: "FirstName", width: 120 },
        { dataField: "LastName", caption: "LastName", width: 120 },
        
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "SortOrder", caption: "SortOrder", width: 120 },
        { dataField: "Memo", caption: "Memo", width: 150 }

    ];
    return result;
}