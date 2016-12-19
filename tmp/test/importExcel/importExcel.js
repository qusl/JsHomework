
(function () {
    var X = XLSX;
    var wtf_mode = false;
    function fixdata(data) {
        var o = "", l = 0, w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    }

    function to_json(workbook) {
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
            var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
        return result;
    }

    function process_wb(wb) {
        var myDataFromExcel = to_json(wb)['Sheet1'];
        console.log(JSON.stringify(myDataFromExcel));

        var myGrid = window.CmpTool.myGridConfig;
        myGrid.dataSource = myDataFromExcel;
        myGrid.showRowLines = true;
        myGrid.editing = {
            editEnabled: false,
            insertEnabled: false,
            removeEnabled: false
        };
        $("#gridContainer").dxDataGrid(myGrid);
    }
    var drop = document.getElementById('drop');

    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        var f = files[0];
        {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                var data = e.target.result;
                var wb;
                var arr = fixdata(data);
                wb = X.read(btoa(arr), { type: 'base64' });
                process_wb(wb);
            };
            reader.readAsArrayBuffer(f);
        }
    }
    function handleDragover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }
    if (drop.addEventListener) {
        drop.addEventListener('dragenter', handleDragover, false);
        drop.addEventListener('dragover', handleDragover, false);
        drop.addEventListener('drop', handleDrop, false);
    }
    var xlf = document.getElementById('xlf');
    function handleFile(e) {
        var files = e.target.files;
        var f = files[0];
        {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                var data = e.target.result;
                var wb;
                var arr = fixdata(data);
                wb = X.read(btoa(arr), { type: 'base64' });
                process_wb(wb);
            };
            reader.readAsArrayBuffer(f);
        }
    }
    if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
})();