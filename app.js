
var oldData = [
    {
        "firstName": "Tom",
        "lastName": "Zhang",
        "ext": "10010",
        "cell": "416-000-0000",
        "alt": "",
        "title": "Manager",
        "email": "tomz@jsrocks.com"
    }
],
    newData = [
        {
            "firstName": "Tom",
            "lastName": "Zhang",
            "ext": "1001",
            "cell": "416-000-0000",
            "alt": "416-456-4567",
            "title": "Manager",
            "email": "tomz@jsrocks.com"
        },
        {
            "firstName": "Peter",
            "lastName": "Wang",
            "ext": "1003",
            "cell": "647-222-2222",
            "alt": "416-333-3333",
            "title": "QA",
            "email": "peterw@jsrocks.com"
        }
    ];

var getChanges = function (srcData, destData) {
    var objLeng = Object.keys(srcData).length;
    for (var i = 0; i < objLeng; i++) {
        if (srcData[Object.keys(srcData)[i]] !== destData[Object.keys(destData)[i]]) {
            return srcData;
        }
    }
    return null;
}

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

var isSamePerson = function (srcData, destData) {
    if(srcData.firstName == destData.firstName && srcData.lastName === destData.lastName){
        return true;
    }
    return false;
}

var objAdded = [], objDeleted=[], objModified=[];

for (var i = 0; i < oldData.length; i++) {
    var objSrc = oldData[i];
    var canFind = false;
    for (var j = 0; j < newData.length; j++) {
        var objDest = newData[j];
        var samePerson = isSamePerson(objSrc, objDest);
        if (isSameObj(objSrc, objDest) || samePerson) {
            canFind = true;
        }

        if (samePerson) {
            var changes = getChanges(objSrc, objDest);
            if (changes) {
                objModified.push(changes);
            }
        } else {
            var canFindInSrc = false;
            for (var x = 0; x < oldData.length; x++) {
                var objSrcTmp = oldData[x];
                if (isSameObj(objSrcTmp, objDest)) {
                    canFindInSrc = true;
                }
            }
            if (!canFindInSrc) {
                objAdded.push(objDest);
            }
        }
    }
    if (!canFind) {
        objDeleted.push(objSrc);
    }
}

var result = {
    "added": objAdded,
    "deleted": objDeleted,
    "modified": objModified
};
console.log(result);



