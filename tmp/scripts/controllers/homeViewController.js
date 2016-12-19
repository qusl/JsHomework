
define(['app'], function(app) {
    app.controller('homeViewController',
    [
        '$window','$scope', 'MegaMenuService', 'homeService',
        function ($window, $scope, megaMenuService, homeService) {

            CmpToolUtility.removeTopMenuClass();
            $scope.currentHub = CmpToolStatic.currentHub;
            CmpToolUtility.generateMainmenu($scope, megaMenuService);
            $("#megamenutopbar").hide();
            $("#main").hide();
            $("#lasyloading").show();

            CmpToolUtility.setMarketplaces();
            CmpToolUtility.setResellerIds();

            var marketplaces = window.selected_marketplaces.toString();
            
            checkHubCheckbox(marketplaces);
            disabeProdHubChkbox();

            $scope.dtxSelect = function () { CmpToolUtility.dtxSelect($scope); }
            $scope.sgSelect = function () { CmpToolUtility.sgSelect($scope); }
            $scope.auSelect = function () { CmpToolUtility.auSelect($scope); }
            $scope.euSelect = function () { CmpToolUtility.euSelect($scope); }

            CmpToolUtility.addScopeService($scope, homeService);

            $scope.myNotes = function () {
                url = "myNotes.html";
                CmpToolUtility.openNewTab(url);
            }

            var errTable = 'Log';
            var errMethod = 'GetLatestErrors';
            $scope.getServiceData(errTable, errMethod).then(function (errResponse) {
                $scope.logErrorsArr = CmpToolUtility.getStrArrByResponseData(errResponse.data);
            });

            $scope.retrieveErrDetailByInstanceId = function (errText) {
                if (errText === CmpToolStatic.Message.more) {
                    // show the top 100 exceptions if the user select 'more...':
                    var urlErrorsForReport = '/exceptions.html';
                    window.open(urlErrorsForReport);
                } else {
                    var handlingInstanceId = CmpToolUtility.getHandlingInstanceIdFromErrTxt(errText);
                    if (handlingInstanceId) {
                        var url = '/exceptionDetail.html?HandlingInstanceId=' + handlingInstanceId;
                        window.open(url);
                    } else {
                        Alert('HandlingInstanceId is empty!');
                    }
                }
            }
            $scope.resellerAttributesHealthCheck = function () {
                $window.open('/resellerattributehealthcheck.html','_blank')
            }
            CmpToolUtility.hideLoadingPage();
        }
    ]);

    var checkHubCheckbox = function(marketplaces) {
        if (CmpToolStatic.currentHub === 'dev' || CmpToolStatic.currentHub === 'stg') {
            switch (marketplaces) {
            case CmpToolStatic.marketplaces_dtx.toString():
                document.getElementById('radioDtx').checked = true;
                break;
            case CmpToolStatic.marketplaces_sg.toString():
                document.getElementById('radioSg').checked = true;
                break;
            case CmpToolStatic.marketplaces_au.toString():
                document.getElementById('radioAu').checked = true;
                break;
            case CmpToolStatic.marketplaces_eu.toString():
                document.getElementById('radioEu').checked = true;
                break;
            }
        }
    }

    var disabeProdHubChkbox = function() {
        switch (CmpToolStatic.currentHub) {
            case CmpToolStatic.hubName.dtx:
                document.getElementById('radioDtx').checked = true;
                $('#radioSg').attr("disabled", "disabled");
                $('#radioAu').attr("disabled", "disabled");
                $('#radioEu').attr("disabled", "disabled");
                break;
            case CmpToolStatic.hubName.sg:
                document.getElementById('radioSg').checked = true;
                $('#radioDtx').attr("disabled", "disabled");
                $('#radioAu').attr("disabled", "disabled");
                $('#radioEu').attr("disabled", "disabled");
                break;
            case CmpToolStatic.hubName.au:
                document.getElementById('radioAu').checked = true;
                $('#radioDtx').attr("disabled", "disabled");
                $('#radioSg').attr("disabled", "disabled");
                $('#radioEu').attr("disabled", "disabled");
                break;
            case CmpToolStatic.hubName.eu:
                document.getElementById('radioEu').checked = true;
                $('#radioDtx').attr("disabled", "disabled");
                $('#radioAu').attr("disabled", "disabled");
                $('#radioSg').attr("disabled", "disabled");
                break;
        }
    }

});