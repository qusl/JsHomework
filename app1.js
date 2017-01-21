'use strict';

var isSameObj = function (srcData, destData) {
    var lengSrc = Object.keys(srcData).length;
    var lengDest = Object.keys(destData).length;
    if (lengSrc !== lengDest) {
        return false;
    }
    var objLeng = lengSrc;
    for (var i = 0; i < objLeng; i++) {
        if (srcData[Object.keys(srcData)[i]] !== destData[Object.keys(destData)[i]]) {
            return false;
        }
    }
    return true;
}

var compare = function(oldData, newData) {
    var result = {
        added: [],
        deleted: [],
        modified: []
    }
    for (var i = 0; i < newData.length; i++) {
        var index = oldData.findIndex(function (old) {
            return newData[i].email === old.email;
        });
        if(index < 0){
            result.added.push(newData[i]);
        }else{
            if(!isSameObj(oldData[index], newData[i])){
                result.modified.push(oldData[index]);
            }
            oldData.splice(index, 1);
        }
    }
    result.deleted = oldData;
    return result;
}


// function generateData(num){
//     let ret = [];
//     for(let i = 0; i < num; i ++){
//         ret.push({
//             "firstName": "firstName" + i,
//             "lastName": "lastName" + i,
//              "ext": "ext" + i,
//              "cell": "cell" + i,
//              "alt": "alt" + i,
//              "title": "title" + i,
//              "email": "email" + i
//         })
//     }
//     return ret;
// }

// let oldDataTest = generateData(100000);
// let newDataTest = generateData(100000);

// newDataTest.splice(0, 1);
// newDataTest.splice(8, 1, {
//     "firstName": "firstName" + "A",
//     "lastName": "lastName" + "A",
//     "ext": "ext" + "A",
//     "cell": "cell" + "A",
//     "alt": "alt" + "A",
//     "title": "title" + "A",
//     "email": "email" + "A"
// });

// newDataTest[5].title = 'new title';

// let tt = newDataTest[3].title;
// delete newDataTest[3].title;
// newDataTest[3].title = tt;

// console.time('a');
// var result = compare(oldDataTest, newDataTest);
// console.timeEnd('a');

// console.log(result);



