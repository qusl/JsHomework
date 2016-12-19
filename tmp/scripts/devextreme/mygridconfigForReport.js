
(function() {
    //var clickTimer, lastRowCLickedId;

    window.CmpTool.myGridConfigForReport = {
        showRowLines: true,
        rowAlternationEnabled: false,
        showBorders: true,
        showColumnLines: true,
        columnAutoWidth: true,
        allowColumnReordering: true,
        allowColumnResizing: true,
        hoverStateEnabled: true,
        loadPanel: {
            enabled: false,
            height: 100,
            width: 200,
            text: 'Loading Data...'
        },
        sorting: {
            mode: "multiple"
        },
        stateStoring: {
            enabled: true,
            type: "localStorage",
            storageKey: "storage"
        },
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
            pageSize: 20,
            pageIndex: 0
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
            mode: "form",
            //mode: "batch",
            allowUpdating: false,
            allowEditing: false,
            allowAdding: false,
            allowDeleting: false
        },
        columnFixing: {
            enabled: true
        },
        "export": {
            enabled: true,
            fileName: 'item'
        },
        selection: {
            mode: "single"
            //mode: 'multiple'
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        }

        //,

        //rowClick: function (e) {
        //    var rows = instance.getSelectedRowsData();

        //    if (clickTimer && lastRowCLickedId === e.rowIndex) {
        //        clearTimeout(clickTimer);
        //        clickTimer = null;
        //        lastRowCLickedId = e.rowIndex;

        //        console.log('double');
        //    } else {
        //        clickTimer = setTimeout(function() {
        //            console.log('single');
        //        }, 250);
        //    }

        //    lastRowCLickedId = e.rowIndex;
        //}

    };

})();