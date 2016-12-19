
window.CmpTool.myGridConfig = {
    //option:{
    //    'loadPanel.enabled': false
    //},
    showRowLines: true,
    rowAlternationEnabled: false,
    showBorders: true,
    showColumnLines: true,
    columnAutoWidth: true,
    allowColumnReordering: true,
    allowColumnResizing: true,
    hoverStateEnabled: true,
    loadPanel: {
        height: 100,
        width: 200,
        text: 'Loading Data...'
    },
    sorting: {
        mode: "multiple"
    },
    //stateStoring: {
    //    enabled: true,
    //    type: "localStorage",
    //    storageKey: "storage"
    //},
    columnChooser: {
        enabled: false
    },
    pager: {
        showInfo: true,
        infoText: 'Page {0}. Total: {1} ({2} items)',
        showPageSizeSelector: true,
        allowedPageSizes: [10, 16, 26, 50, 100, 500]
    },
    paging: {
        pageSize: 16,
        pageIndex: 0
    },
    headerFilter: {
        visible: true
    },
    filterRow: {
        visible: true
    },
    groupPanel: {
        visible: false
    },
    editing: {
        mode: "form",
        //mode: "batch",
        allowUpdating: true,
        allowEditing: true,
        allowAdding: true,
        allowDeleting: false
    },
    columnFixing: {
        enabled: true
    },
    "export": {
        enabled: false,
        fileName: 'item'
    },
    selection: {
        mode: "single"
        //mode: 'multiple'
    },
    searchPanel: {
        visible: false,
        width: 240,
        placeholder: "Search..."
    },
    onInitialized: function() {
        CmpToolUtility.hideGirdHeader();
    },
    onContentReady: function (e) {
        var $filterIcon = $('.dx-header-filter');
        var $gridHeader = $('.dx-datagrid .dx-datagrid-headers tr:first-child');
        CmpToolUtility.changeFilterStyle(e, $filterIcon, $gridHeader);
        
        if (CmpToolStatic.isRetrievingData) {
            setTimeout(function() {
                CmpToolUtility.hideLoadingPage();
            }, 500);
        } else {
            CmpToolStatic.isRetrievingData = true;
        }
    },
    onRowInserting: function (e) {
        CmpToolStatic.isRetrievingData = false;
        CmpToolUtility.showLoadingPage();
    },
    onRowRemoving: function (e) {
        CmpToolStatic.isRetrievingData = false;
        CmpToolUtility.showLoadingPage();
    },
    onRowUpdating: function (e) {
        CmpToolStatic.isRetrievingData = false;
        CmpToolUtility.showLoadingPage();
    },
    stateStoring: {
        enabled: true,
        //storageKey: "storage" + tableName,
        type: "custom",
        customLoad: function () {
            var state = localStorage.getItem(this.storageKey);
            if (state) {
                state = JSON.parse(state);
                for (var i = 0; i < state.columns.length; i++) {
                    state.columns[i].filterValue = null;
                }
            }
            return state;
        },
        customSave: function (state) {
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        }
    }
};