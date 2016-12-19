
window.CmpTool.configCountryColumns = function (scope) {
    var result = [
        { dataField: "CountryID", caption: "CountryID", allowEditing: false, cssClass: 'gray', width: 120 },
        { dataField: "Name", caption: "Name", allowEditing: false, cssClass: 'gray', width: 180 },
        { dataField: "ZipCodeRegExp", caption: "ZipCodeRegExp", allowEditing: false, cssClass: 'gray', width: 180 },
        { dataField: "CountryUnionID", caption: "CountryUnionID", allowEditing: false, cssClass: 'gray', width: 160 },
        { dataField: "FirstSortNo", caption: "FirstSortNo", allowEditing: false, cssClass: 'gray', width: 140 },
        { dataField: "DefaultPhoneCountryCode", caption: "DefaultPhoneCountryCode", allowEditing: false, cssClass: 'gray', width: 220 },
        { dataField: "NeedPhoneAreaCode", caption: "NeedPhoneAreaCode", allowEditing: false, cssClass: 'gray', width: 140 },
        { dataField: "PhoneRegex", caption: "PhoneRegex", width: 180 },
        { dataField: "IsActive", caption: "IsActive", width: 120 },
        { dataField: "Memo", caption: "Memo", width: 120 }
    ];
    return result;
}