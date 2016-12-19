

var number = /[0-9]/;
var letter = /[a-zA-Z]/;
var allLetters = /^[a-zA-Z]+$/;

var errUserNameTxt = "* UserName cannot be empty!";
var errPasswordTxt = "* Password cannot be empty!";
var errNotMatchTxt = "* Cannot login, please try again!";


angular.module("appLogin", [])
    .controller("loginViewController", ['$scope', '$http', function ($scope, $http) {

        if (navigator.appName == 'Microsoft Internet Explorer' || navigator.appName == 'Netscape') {
            localStorage.setItem('clientIp', 'Internal IP from IE browser');
        } else {
            CmpToolUtility.getClientIp().then(function (ip) {
                if (!ip || ip.length < 6 || ip.length > 20) {
                    ip = 'Internal IP';
                }
                localStorage.setItem('clientIp', ip);
            });
        }

        // warm up EF:
        var warmupContrlName = 'Util';
        var warmupUrl = CmpToolUtility.getFullUrlForTable(warmupContrlName);
        var warmupGetMethod = 'WarmupEF';
        warmupUrl = warmupUrl + warmupGetMethod;

        $http.get(warmupUrl).then(function () {

          var tableName = "Resellers";
          var getMethod = "GetParentResellersWithoutL0ForHub";
          var fullUrl = CmpToolStatic.apiUrl + "Api/" + tableName + "/" + getMethod + "/";
          $http.get(fullUrl).then(
                 function (pResellerResponse) {
                     var pResellers = pResellerResponse.data;
                     CmpToolUtility.getAndSaveMarketplaces(pResellers);
                     CmpToolUtility.getAndSaveResellerIds(pResellers);
                 });
        });

        initial($scope);
        validateUserName();
        validatePassword();
        $scope.login = function () {
            var userName = angular.element('#username')[0].value;
            var password = angular.element('#password')[0].value;

            if (!userName || userName == '') {
                document.getElementById('errUserName').innerHTML = errUserNameTxt;
                $('#loadingLogin').hide();
                $('#username').focus();
                return;
            }
            if (!password || password == '') {
                showPasswordError(errPasswordTxt);
                return;
            }
            if (password.length < 8) {
                showPasswordError('Password must be longer than 7!');
                return;
            }
            if (!letter.test(password)) {
                showPasswordError('Password must contains letter!');
                return;
            }
            if (!number.test(password)) {
                showPasswordError('Password must contains number!');
                return;
            }

            callWebService($http, userName, password);
        }
    }]);

var initial = function ($scope) {
    userNameKeydown($scope);
    passwordKeydown($scope);
    
    var rememberMe = localStorage.getItem('keepmelogin');
    var userName = localStorage.getItem('username');

    if (rememberMe && rememberMe === 'true') {
        document.getElementById('keepmelogin').checked = true;
    } else {
        document.getElementById('keepmelogin').checked = false;
    }
    document.getElementById('errUserName').innerHTML = '';
    document.getElementById('errPassword').innerHTML = '';
    
    if (userName === null || typeof (userName) === "undefined" || userName === '') {
        $('#username').focus();
    } else {
        $('#username').val(userName);
        $('#password').focus();
    }
}

var showPasswordError = function (errText) {
    document.getElementById('errPassword').innerHTML = errText;
    $('#loadingLogin').hide();
    $('#password').focus();
}

// 1. UserName: press enter to move focus to Password textbox:
var userNameKeydown = function ($scope) {
    document.getElementById("username").addEventListener("keydown", function(e) {
        if (!e) {
            e = window.event;
        }
        //e.preventDefault();
        if (e.keyCode == 13) {
            $scope.password = '';
            $('#password').focus();
        }
    }, false);
}

// 2. Password: press enter to trigger Login button click code:
var passwordKeydown = function ($scope) {
    document.getElementById("password").addEventListener("keydown", function(e) {
        if (!e) {
            e = window.event;
        }
        //e.preventDefault();
        if (e.keyCode == 13) {
            $scope.login();
        }
    }, false);
}

// Handle error text for UserName:
var validateUserName = function() {
    $('#username').change(function() {
        var userName = document.getElementById('username').value;
        if (userName) {
            document.getElementById('errUserName').innerHTML = '';
            document.getElementById('notMatch').innerHTML = '';
        } else {
            document.getElementById('errUserName').innerHTML = errUserNameTxt;
        }
    });
}

// Handle error text for Password:
var validatePassword = function() {
    $('#password').change(function() {
        var password = document.getElementById('password').value;
        if (password) {
            document.getElementById('errPassword').innerHTML = '';
            document.getElementById('notMatch').innerHTML = '';
        } else {
            document.getElementById('errPassword').innerHTML = errPasswordTxt;
        }
    });
}

//Sample fullUrl: 'http://localhost:1592/api/Login/UserLoginCheck/1/annatestcc39528/1610BayStreetM5J2R8/'
var callWebService = function($http, userName, password) {
    $('#loadingLogin').show();
    
    var pwdContrlName = 'Util';
    var pwdUrl = CmpToolUtility.getFullUrlForTable(pwdContrlName);
    var pwdGetMethod = 'GetEncrypedString';
    pwdUrl = pwdUrl + pwdGetMethod + '/1?str=' + password + '&username=' + userName;
    $http.get(pwdUrl)
        .success(function (pwdResponse) {
            var encryptedPassword = pwdResponse;
            localStorage.setItem("encryptedPassword", encryptedPassword);
            //localStorage.setItem('password', '');
            var contrlName = 'Login';
            var getMethod = 'UserLoginCheck';
            var fullUrl = CmpToolUtility.getFullUrlForTable(contrlName);
            //encryptedPassword = encodeURI(encryptedPassword);  // use Uri.EscapeUriString() function in C# code to restore the password
            // maybe we need more characters to replace: (unsafe characters: " < > # % { } | \ ^ ~ [ ] `)
            encryptedPassword = encryptedPassword.replace(/\//g, '......');    // replace '/' globally
            encryptedPassword = encryptedPassword.replace(/\+/g, '...x...');   // replace '+' globally
            encryptedPassword = encryptedPassword.replace(/\>/g, '...1...');   // replace '>' globally
            encryptedPassword = encryptedPassword.replace(/\</g, '...2...');   // replace '<' globally
            fullUrl = fullUrl + getMethod + '/1/' + userName + '/' + encryptedPassword + '/';
            $('input[type="submit"]').prop('disabled', true);
            $http.get(fullUrl)
                .success(function (response) {
                    $('input[type="submit"]').prop('disabled', false);
                    var checkResult = response;
                    if (checkResult > 0) {
                        localStorage.setItem('isLoggedin', true);
                        var chb = document.getElementById('keepmelogin');
                        if (chb.checked) {
                            localStorage.setItem('keepmelogin', true);
                        } else {
                            localStorage.setItem('keepmelogin', false);
                        }
                        localStorage.setItem('username', userName);

                        window.location = '/index.html';
                        if (checkResult > 1) {
                            localStorage.setItem('isSysAdmin', true);
                        } else {
                            localStorage.setItem('isSysAdmin', false);
                        }
                    } else {
                        $('#loadingLogin').hide();
                        document.getElementById('notMatch').innerHTML = errNotMatchTxt;
                        $('#password').val('');
                        $('#password').focus();
                    }
                })
                .error(function (response) {
                    $('#loadingLogin').hide();
                    $('input[type="submit"]').prop('disabled', false);
                    var msgText = CmpToolStatic.Message.retrieveFailedErr;
                    CmpToolUtility.handleErr(response, msgText, fullUrl);
                });
        })
        .error(function (errResponse) {
            localStorage.setItem("encryptedPassword", '');
            console.log(errResponse);
        });

}