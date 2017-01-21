'use strict';
let http = require('http');

let jsonObj = [];
let request = http.request({
    port: 80,
    host: 'web-aaronding.rhcloud.com',
    method: 'GET',
    path: '/employee.html'
});

request.on('response', function (res) {
    res.on('data', function (data) {
        let tableStr = getTableStr(data.toString());
         
        // 1. get table html
        tableStr = tableStr.replace(/<\/tr>/g, '');
        tableStr = tableStr.replace(/<tr bgcolor=DDDDDD>/g, '<tr>');
        let items = tableStr.split('<tr>');
        if (items.length < 2) {
            console.log('no data for table row');
        }

        // 2. get header
        let keyNameArr = [];
        let header = items[1].replace(/<\/th>/g, '');
        let headerArr = header.split('<th>');
        for (let i = 0; i < headerArr.length; i++) {
            let keyName = removeTags(headerArr[i]);
            if (keyName) {
                keyNameArr.push(keyName);
            }
        }

        // 3. get value
        for(let j = 2; j < items.length; j ++){
            let item = {};
            let data = items[j].replace(/<\/td>/g, '');
            let dataArr = data.split('<td>');
            for (let k = 1; k < dataArr.length; k++) {
                let value = removeTags(dataArr[k]);
                item[keyNameArr[k]] = value.trim();
            }
            jsonObj.push(item);
        }

        console.log(jsonObj)
    });
});
request.end();

let getTableStr = function (dataStr) {
    let posStart = dataStr.indexOf("<table ");
    let newStr = dataStr.substring(posStart);
    let posEnd = newStr.indexOf("</body>");
    let tableStr = newStr.substring(0, posEnd);
    return tableStr;
}

let removeTags = function (html) {
    let posLeftStart = html.indexOf('<');
    while (posLeftStart > -1) {
        if (posLeftStart === 0) {
            html = html.substring(1);
            let posLeftEnd = html.indexOf('>');
            if (posLeftEnd > 0) {
                html = html.substring(posLeftEnd + 1);
            }
            posLeftStart = html.indexOf('<');
        } else {
            posLeftStart = -1;    // end of the loop
        }
    }
    let posRight = html.indexOf('<');
    if (posRight > -1) {
        html = html.substring(0, posRight);
    }
    return html;
}
