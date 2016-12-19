var store = new DevExpress.data.ArrayStore({
    key: 'Id',
    data: [
        { Id: 1, Category: 'Oceania', VisibleIndex: 0 },
        { Id: 2, Category: 'Africa', VisibleIndex: 1 },
        { Id: 3, Category: 'Americas', VisibleIndex: 2 },
        { Id: 4, Category: 'Asia', VisibleIndex: 3 },
        { Id: 5, Category: 'Europe', VisibleIndex: 4 }
    ]
});
function initDragging($gridElement) {
    var appendTo = $gridElement.find(".dx-datagrid-content-fixed");
    if (!appendTo.length) {
        appendTo = "parent";
    }
    $gridElement.find('.myRow').draggable({
        helper: 'clone',
        appendTo: appendTo,
        start: function (event, ui) {
            var $originalRow = $(this),
                $clonedRow = ui.helper;
            var $originalRowCells = $($gridElement).dxDataGrid('instance').getView('rowsView').getCellElements($originalRow.index());             
            $clonedRow.empty();
            $originalRowCells.clone().appendTo($clonedRow);
            var $clonedRowCells = $clonedRow.children();
            for (var i = 0; i < $originalRowCells.length; i++)
                $($clonedRowCells.get(i)).width($($originalRowCells.get(i)).width());
            $clonedRow
              .width($originalRow.width())
              .addClass('drag-helper');
        }
    });
    $gridElement.find('.dx-scrollable-container .myRow').droppable({
        drop: function (event, ui) {
            var draggingRowKey = ui.draggable.data('keyValue');
            var targetRowKey = $(this).data('keyValue');
            var draggingIndex = null,
                targetIndex = null;
            store.byKey(draggingRowKey).done(function (item) {
                draggingIndex = item.VisibleIndex;
            });
            store.byKey(targetRowKey).done(function (item) {
                targetIndex = item.VisibleIndex;
            });
            var draggingDirection = (targetIndex < draggingIndex) ? 1 : -1;
            var dataItems = null
            store.load().done(function (data) {
                dataItems = data;
            });
            for (var dataIndex = 0; dataIndex < dataItems.length; dataIndex++) {
                if ((dataItems[dataIndex].VisibleIndex > Math.min(targetIndex, draggingIndex)) && (dataItems[dataIndex].VisibleIndex < Math.max(targetIndex, draggingIndex))) {
                    dataItems[dataIndex].VisibleIndex += draggingDirection;
                }
            }
            store.update(draggingRowKey, { VisibleIndex: targetIndex});
            store.update(targetRowKey, { VisibleIndex: targetIndex + draggingDirection });
            $gridElement.dxDataGrid('instance').refresh();
        }
    });
}
var viewModel = {
    gridSettings: {
        dataSource: {
            store: store,
            sort: 'VisibleIndex'
        },
        columns: [
            {
                dataField: 'Id',
                allowSorting: false
            },
            {
                dataField: 'Category',
                allowSorting: false
            },
            { 
                dataField: 'VisibleIndex',
                caption: 'Index',
                allowSorting: false
            }
        ],
        onRowPrepared: function (e) {
            if (e.rowType != 'data')
                return;
            e.rowElement
            .addClass('myRow')
            .data('keyValue', e.key);
        },
        loadPanel: {
            enabled: false
        },
        width: 400,
        onContentReady: function (e) {
            initDragging(e.element);
        }
    }
};
