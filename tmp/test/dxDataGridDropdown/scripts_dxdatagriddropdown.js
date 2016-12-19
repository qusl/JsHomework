
$(document).ready(function () {
    window.isNewEdit = false;
    $("#myGridView").dxDataGrid({
        dataSource: gridItems,
        columns: [
            'ID',
            {
                dataField: 'Category',
                lookup: {
                    dataSource: categoryItems,
                    valueExpr: 'CategoryID',
                    displayExpr: 'CategoryName'
                }
            },
            {
                dataField: 'Product',
                lookup: {
                    dataSource: productItems,
                    valueExpr: 'ProductID',
                    displayExpr: 'ProductName'
                }
            }
        ],
        editing: {
            editEnabled: true
        },
        // this is working fine:
        //onEditorPrepared: function (options) {
        //    if (options.parentType == 'dataRow' && options.dataField == 'Category') {
        //        options.editorElement.dxSelectBox('instance').option('onValueChanged', function (e) {
        //            console.log('yyy');
        //        });
        //    }
        //}

        //onCellPrepared: function (e) {
        //    var cellElement = e.cellElement,
        //        editorElement = cellElement.find(".dx-selectbox"),
        //        category,
        //        selectBox = editorElement.data("dxSelectBox");
        //    if (e.rowType === "data") {
        //        category = e.data.Category;
        //        if (selectBox && e.column.dataField === "Category" && category) {
        //            var items = selectBox.option("items");
        //            selectBox.option({
        //                dataSource: {
        //                    store: items,
        //                    filter: [["CategoryID", "=", category]]
        //                },
        //                value: e.value
        //            });
        //        }
        //        if (e.column.dataField === "Category") {
        //            selectBox = cellElement.find(".dx-selectbox").data("dxSelectBox");
        //            selectBox && selectBox.on("valueChanged", function (args) {
        //                var cell = e.component.getCellElement(e.rowIndex, "CategoryID"),
        //                    selectBox = cell.find(".dx-selectbox").data("dxSelectBox");
        //                if (selectBox) {
        //                    var items = selectBox.option("dataSource.store") || selectBox.option("items");
        //                    selectBox.option("dataSource", {
        //                        store: items,
        //                        filter: [["CategoryID", "=", args.value]]
        //                    });
        //                }
        //            });
        //        }
        //    }
        //}

        onEditingStart: function(e){
            window.isNewEdit = true;
        },

        onCellPrepared: function (e) {
            var cellElement = e.cellElement,
                editorElement = cellElement.find(".dx-selectbox"),
                category,
                selectBox = editorElement.data("dxSelectBox");
            if (e.rowType === "data") {
                category = e.data.drillCategoryId;
                if (selectBox && e.column.dataField === "drillModel.drillTypeId" && category && window.isNewEdit) {
                    var items = selectBox.option("items");
                    selectBox.option({
                        dataSource: {
                            store: items,
                            filter: [["drillCategoryId", "=", category]]
                        },
                        value: e.value
                    });
                    window.isNewEdit = false;
                }
                if (e.column.dataField === "drillCategoryId") {
                    selectBox = cellElement.find(".dx-selectbox").data("dxSelectBox");
                    selectBox && selectBox.on("valueChanged", function (args) {
                        var cell = e.component.getCellElement(e.rowIndex, "drillModel.drillTypeId"),
                            selectBox = cell.find(".dx-selectbox").data("dxSelectBox");
                        if (selectBox) {
                            var items = selectBox.option("dataSource.store") || selectBox.option("items");
                            selectBox.option("dataSource", {
                                store: items,
                                filter: [["drillCategoryId", "=", args.value]]
                            });
                        }
                    });
                }
            }
        }


    });
});