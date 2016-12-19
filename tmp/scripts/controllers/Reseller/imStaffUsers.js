
(function () {
    var tableName = "IMStaffUsers";
    var currentChildDispName = '';
    var resellerId;

    window.CmpTool.getIMStaffUsers = function (scope, parentresellerId) {
        resellerId = parentresellerId;
        var resellerTable = CmpToolStatic.resellerTableName;
        var resellerMethod = CmpToolStatic.parentResellerGetMethod;
        scope.getServiceData(resellerTable, resellerMethod).then(function (resellerResponse) {
            scope.parentResellerDropdown = resellerResponse.data;
            var childTable = CmpToolStatic.resellerTableName;
            var childMethod = CmpToolStatic.childResellerGetMethod;
            scope.getServiceData(childTable, childMethod, resellerId).then(function (childResponse) {
                scope.childResellerDropdown = childResponse.data;
                setDataSource(scope);
            });
        });
    }

    function setDataSource(scope) {
        var maxIdTableName = "IMStaffUsers";
        var maxIdGetMethod = "GetMaxStaffUserId";
        var myGrid = angular.copy(window.CmpTool.myGridConfig);
        
        // if it's insert, populate StaffUserID:
        myGrid.onEditorPrepared = function (e) {
            if (scope.appIsInsert && e.dataField == 'StaffUserID') {
                scope.getServiceData(maxIdTableName, maxIdGetMethod).then(function(respMaxId) {
                   var  maxId = CmpToolUtility.getMaxId(respMaxId);
                    CmpToolUtility.setTextBoxReadOnly(maxId + 1, "_StaffUserID");
                });
            }
        }

        var keyName = "StaffUserID";
        var refreshGrid = function () {
            var getMethod = "GetImStaffUsersByResellerId";
            scope.getServiceData(tableName, getMethod, resellerId).then(function(respRefresh) {
                currentChildDispName = CmpToolUtility.getCurrentResellerDispName(scope.childResellerDropdown, resellerId);
                myGrid.columns = window.CmpTool.configIMStaffUsersColumns(scope);
                myGrid.dataSource = respRefresh.data;
                CmpToolUtility.refreshDataGrid($("#myGridView"), myGrid);
            });
        };

        myGrid.onRowUpdated = function (e) {
            var selected = JSON.stringify(e.key);
            scope.updateServiceData(tableName, keyName, selected);
        };

        myGrid.onRowInserted = function (e) {
            scope.insertServiceData(tableName, JSON.stringify(e.data)).then(function () {
                refreshGrid();
            }
            );
        }

        myGrid.onRowRemoved = function (e) {
            var id = e.data.StaffUserID;
            var selected = JSON.stringify(e.key);
            scope.deleteServiceData(tableName, id, selected);
        };
        
        myGrid.stateStoring.storageKey = "storage" + tableName;

        refreshGrid();
    }

})();