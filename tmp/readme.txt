
                                   Questions For CMP Configuration Tool

								       -- http://js.devexpress.com/Documentation


>> Main logic for CMP Web Tool:

* need to add 'window.CmpTool.' to all global functions/variables except 'CmpToolStatic' and 'CmpToolUtility'.

add 'app' before all scope variables/functions, like appMenuname, appActiveLeftmenu...

* DisplayPlans table: when user select 'All Countries', we allow user to chagne AccountID, but don't allow user to add new record. 

(because we cannot generate resellerID based on selected marketplace)


>> Questions:

1. How to avoid user change planid when user editing data in DisplayPlans table?

  -- https://www.devexpress.com/Support/Center/Question/Details/T196009

  e.cancel = true;  - in displayPlans.js -> myGrid.onEditorPreparing

2. why it's not working if we put jzip.min.js to app.bootstrap.js?

  Uncaught ReferenceError: JSZip is not defined

3. Need to fix: When we select 'Canada' in main menu, if we change top menu from 'Signup' to 'PlanGroup', 

    the default country change back to 'US', but the global variable for marketplace is still 'Canada'.

	-- fixed, changeset 42218

4. Need to delete Navigation Properites for PermissionType table in Entity Framework.

5. How to ignore bad https warning: 

		//    var agentOptions = {
        //        host: 'www.example.com'
        //    , port: '443'
        //    , path: '/'
        //    , rejectUnauthorized: false
        //    };
        //    var agent = new https.Agent(agentOptions);

6. show 'Loading...' image when retrieve data first time. (works fine when we save data for 'Edit' right now)

  -- done

7. why we cannot hit the breakpoint in Resellers.js for removing loading image?
		
8. don't allow user to change categoryID when edit a row.

9. for the Identity column tables, even if we allow user to change the id, and delete that id from database, we still cannot insert that data for that id, only can add new record with Id = maxId _ 1

   so we disable the key column, don't allow user to change Id. Like DisplayCategory, SkuMap, PayTools, PlanAttributeDetails, Upsells, PaymentMethods...

10. Need to configure the width of last column if there're too many columns in only form, otherwise the edit layout is not correct(cannot see the 'same', 'cancel' button).
		
		 
>> for the dropdown sequence:
update InternalPlans set sortOrder = planID where sortorder = 0
update Resellers set sortOrder = ResellerID where sortorder = 0
update ProductNameSlug set sortorder = ProductId where sortorder = 0
update VendorNameSlug set sortOrder = VendorId where sortorder = 0
update ResellerFolder set sortOrder = RFId where sortorder = 0
update PermissionType set sortOrder = PermissionTypeId where sortorder = 0
update DisplayCategory set sortOrder = CategoryID where sortorder = 0
update DisplayPlans set sortOrder = PlanID where sortorder = 0
...
update Upsells.UpsellMap set sortOrder = ChildID where sortorder = 0

>> Need to check DisplayPlanCategory data when the user delete record in DisplayPlans table.


>> update InternalPlans set IsActive = 0 where IsActive is null

Need to change IsActive to be not null for InternalPlans and InternalResourcesMap table

>> SyncTool: if no OSA item is selected, will check deleted item in OSA but still exist in CMP.

>> If the web service URL has a different host (by domain name or port) than the one from which the HTML page is served then your JavaScript is violating the same origin policy and any browser 

will prevent the web service request from loading. (http://stackoverflow.com/questions/5087897/how-to-call-webservice-using-javascript)

>> How to update Entity framework after adding IMStaffUsers constraint:

 - Delete Reseller, IMStaffUsers tables

  - Update from database: select "Include foreign key colums in the model", then delete the "Navigation properties" for related tables.

>> Help page for AutomationApi: http://localhost:1592/help

>> SyncTool -> PlanRatePeriod, planid = 7341: AccountID = 1000003615 instead of 1000004 in OSA. (that's why there're three records in SyncTool are inserted and deleted after)

>> Aggregator -> PlanNumAggregator/ResourceNumAggregator, only show the Sync button if the reseller is not base reseller(for example, US on Dev)

>> Need to modify SP: UpdatePlanNumByAggregator/UpdateResourceNumByAggregator if we convert other tables to use Num instead of IDs.

>> How to clear filter: input something in Search textbox, then delete it.

>> Need to add healthcheck: duplicated PlaNum/ResourceNum in InternalPlans/InternalResourcesMap

>> don't allow user to change primary key in UPDATE interface and BatchEditing mode.

>> warm up Entity Framework: call warm up webservice in loginViewController.cs. (if no activity in 20 minutes, will redirect to login.html page)

  right-click on the EDMX file -> Entity Framework -> Generate Views

  -- https://msdn.microsoft.com/en-us/library/dn469601(v=vs.113).aspx

>> How to debug: 

1. change the config section of gulpfile.js: 'scripts/**/*.js' -> //'scripts/**/*.js'  (comment out this row)
2. change index.html file name to a different name, then change index.html.debug to index.html;
3. change scripts/app.js to different name, then change scripts/app.js.debug to scripts/app.js;

Note:
These files are related to debug:

1. index.html 
2. scripts/controllers/homeViewController.js
3. scripts/services/dependencyResolverFor.js
4. scripts/app.js 
5. scripts/app.routes.js
6. scripts/app.bootstrap.js
7. html files in 'Views' folder
