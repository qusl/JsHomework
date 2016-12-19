<%@ Page Language="C#" AutoEventWireup="true" CodeFile="healthcheck.aspx.cs" Inherits="csm_healthcheck" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Health Check</title>
</head>
<body ng-app="appHealthCheck" ng-controller="healthCheckController">
    <div ng-bind="healthCheckText"></div>

    <script src="../scripts/app.initial.js"></script>
    <script src="../scripts/app.util.js"></script>

    <script src="../lib/angular/angular.min.js"></script>
    <script src="../scripts/controllers/healthCheckController.js"></script>
</body>
</html>

