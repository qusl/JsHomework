
window.CmpTool = window.CmpTool || {};

window.CmpTool.ServiceHelper = (function (myModule) {

    // 1. get
    myModule.getItem = function (myhttp, myUrl) {
        if (!CmpToolUtility.refreshSession()) {
            return null;
        }
        var userId = CmpToolUtility.getUserId();
        if (userId === '') {
            return null;
        }
        return myhttp.get(myUrl)
            .error(function (response) {
                //if (CmpToolStatic.isDeployed && (CmpToolStatic.currentHub === 'dev' || CmpToolStatic.currentHub === 'stg')) {
                //    CmpToolUtility.handleHttpsForWS(true);
                //}
                var msgText = CmpToolStatic.Message.retrieveDataErr;
                CmpToolUtility.handleErr(response, msgText, myUrl);
            });
    }

    myModule.getItemExt = function (myhttp, myUrl) {
        if (!CmpToolUtility.refreshSession()) {
            return null;
        }
        var userId = CmpToolUtility.getUserId();
        if (userId === '') {
            return null;
        }
        myhttp.get(myUrl)
            .success(function (response) {
                //CmpToolUtility.hideLoadingPage();
                return response;
            })
            .error(function (response) {
                //if (CmpToolStatic.isDeployed && (CmpToolStatic.currentHub === 'dev' || CmpToolStatic.currentHub === 'stg')) {
                //    CmpToolUtility.handleHttpsForWS(true);
                //}
                CmpToolUtility.hideLoadingPage();
                var msgText = CmpToolStatic.Message.retrieveDataErr;
                CmpToolUtility.handleErr(response, msgText, myUrl);
            });
    }


// 2. update
    myModule.updateItem = function(myhttp, myUrl, myselected, keyName) {
        var jData;
        try {
            jData = JSON.parse(myselected);
        } catch (e) {
            jData = myselected;
        }
        jData = addAdditionalInfo(jData);
        if (jData == null) {
            return null;
        }

        var keyValue = jData[keyName];
        if (typeof keyValue === 'undefined') {
            keyValue = 0;
        } else {
            if (keyValue[keyName]) {
                keyValue = keyValue[keyName];
            }
        }
        if (typeof keyValue === 'undefined') {
            keyValue = 0;
        }

        myselected = JSON.stringify(jData);
        myselected = CmpToolUtility.getEncryptText(myselected);
        var request = {
            method: 'PUT',
            data: myselected,
            url: myUrl + keyValue + '/',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return myhttp(request)
            .success(function (response) {
                CmpToolUtility.hideLoadingPage();
                var msg = 'Save Succeeded!';
                CmpToolUtility.showToastrMessage(msg);
            })
            .error(function (response) {
                CmpToolUtility.hideLoadingPage();
                var msgText = CmpToolStatic.Message.saveFailedErr;
                CmpToolUtility.handleErr(response, msgText, myUrl);
            });
    }

    // 3. insert
    myModule.insertItem = function (myhttp, myUrl, myselected) {
        var jData;
        try {
            jData = JSON.parse(myselected);
        } catch (e) {
            jData = myselected;
        }
        jData = addAdditionalInfo(jData);
        if (jData == null) {
            return null;
        }

        myselected = JSON.stringify(jData);
        myselected = CmpToolUtility.getEncryptText(myselected);
        var request = {
            method: 'POST',
            data: myselected,
            url: myUrl,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return myhttp(request)
            .success(function (response) {
                CmpToolUtility.hideLoadingPage();
                var msg = 'Insert Succeeded!';
                CmpToolUtility.showToastrMessage(msg);
            })
            .error(function (response) {
                CmpToolUtility.hideLoadingPage();
                var msgText = CmpToolStatic.Message.saveFailedErr;
                CmpToolUtility.handleErr(response, msgText, myUrl);
            });
    }

    // 4. delete
    myModule.deleteItem = function(myhttp, myUrl, id, myselected) {
        var jData;
        try {
            jData = JSON.parse(myselected);
        } catch (e) {
            jData = myselected;
        }
        jData = addAdditionalInfo(jData);
        if (jData == null) {
            return null;
        }

        myselected = JSON.stringify(jData);
        myselected = CmpToolUtility.getEncryptText(myselected);
        var request = {
            method: 'DELETE',
            data: myselected,
            url: myUrl + id,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return myhttp(request)
            .success(function (response) {
                CmpToolUtility.hideLoadingPage();
                if (response || response === '') {
                    var msg = 'Delete Succeeded!';
                    CmpToolUtility.showToastrMessage(msg);
                } else {
                    AlertStop("Delete Failed! Cannot delete plan or resource with PlanNum/ResourceNum is not 0.");
                }
            })
            .error(function (response) {
                CmpToolUtility.hideLoadingPage();
                var msgText = CmpToolStatic.Message.saveFailedErr;
                CmpToolUtility.handleErr(response, msgText, myUrl);
            });
    }

    var addAdditionalInfo = function (jData) {
        if (!CmpToolUtility.refreshSession()) {
            return null;
        }
        jData.ModifiedBy = CmpToolUtility.getUserId();
        if (jData.ModifiedBy === '') {
            return null;
        }
        //jData.LastModifiedTime = new Date();
        jData.ClientIp = localStorage.getItem('clientIp');

        jData.EncryptedPassword = localStorage.getItem('encryptedPassword');
        if (jData.length > 0) {
            for (var i = 0; i < jData.length; i++) {
                jData[i].EncryptedPassword = localStorage.getItem('encryptedPassword');
            }
        }
        return jData;
    }

    return myModule;

})(window.CmpTool.ServiceHelper || {});