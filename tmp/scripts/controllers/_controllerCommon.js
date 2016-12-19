
(function() {
    window.CmpTool.ctrlCommon = function(scope, megaMenuService) {
        handleBtn(scope);
        CmpToolUtility.generateMainmenu(scope, megaMenuService);
    }

    var filterGrid = function(value) {
        var grid = $("#gridContainer").dxDataGrid("instance");
        grid.needSelectElement = true;
        grid.searchByText(value);
    }

    var handleBtn = function(scope) {

        scope.btnChooserClick = function() {
            $("#gridContainer").data("dxDataGrid").showColumnChooser();
        }

        scope.btnExportClick = function() {
            $("#gridContainer").data("dxDataGrid").exportToExcel();
        }

        scope.btnEditClick = function() {
            scope.appIsInsert = false;
            var key = CmpToolUtility.isRowSelected($("#gridContainer"));
            if (key) {
                var rowIndex = $("#gridContainer").data("dxDataGrid").getRowIndexByKey(key);
                $("#gridContainer").data("dxDataGrid").editRow(rowIndex);
            } else {
                return;
            }
        }

        scope.btnAddClick = function() {
            scope.appIsInsert = true;
            $("#gridContainer").data("dxDataGrid").addRow();
        }

        scope.btnDeleteClick = function() {
            var key = CmpToolUtility.isRowSelected($("#gridContainer"));
            if (key) {
                var rowIndex = $("#gridContainer").data("dxDataGrid").getRowIndexByKey(key);
                $("#gridContainer").data("dxDataGrid").deleteRow(rowIndex);
            } else {
                return;
            }
        }

        scope.btnEditHtml1Click = function () {
            btnEditHtml1ClickFunc(scope);
        }

        scope.btnEditHtml2Click =  function () {
             btnEditHtml2ClickFunc(scope);
        }

        var throttleTimer = 0;
        scope.mainSearch = function(searchText) {
            clearTimeout(throttleTimer);
            throttleTimer = setTimeout(function() {
                filterGrid(searchText, "search");
            }, 500);
        }

        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
    }
})();