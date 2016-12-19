
window.CmpTool.myGridConfig = window.CmpTool.myGridConfig || {};

window.CmpTool.myGridConfig = {
    showRowLines: true,
    rowAlternationEnabled: false,
    showBorders: true,
    showColumnLines: true,
    columnAutoWidth: true,
    allowColumnReordering: true,
    allowColumnResizing: true,
    hoverStateEnabled: true,
    sorting: {
        mode: "multiple"
    },
    columnChooser: {
        enabled: false
    },
    paging: {
        pageSize: 16
    },
    headerFilter: {
        visible: true
    },
    filterRow: {
        visible: false
    },
    groupPanel: {
        visible: false
    },
    editing: {
        mode: "row",
        editEnabled: true,
        insertEnabled: false,
        removeEnabled: false
    },
    columnFixing: {
        enabled: true
    },
    export: {
        enabled: false,
        fileName: 'item'
    },
    selection: {
        mode: "single"
    },
    //selection: {
    //    mode: 'multiple'
    //},
    searchPanel: {
        visible: false,
        width: 240,
        placeholder: "Search..."
    }
};