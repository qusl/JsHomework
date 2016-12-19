
(function() {
    //* Mega menu
    dataService.getMegamenuInternal(function(data) {
        var json = JSON.parse(data);
        var cat = $('#categoriesfromjs');
        var menuHtml = generateHtml(json.DisplayCategories, cat);
        window.MegamenuHtml = menuHtml;
        var sites = $('#sitesfromjs');
        var sitesHtml = generateSites(json.ExternalSites);
        sites.append(sitesHtml);
    });
})();


function generateHtml(displayCategories, parent) {
    var html = '';
    var i = 0;
    var needCloseDiv = false;

    for (var colNum = 0; colNum < displayCategories.length; colNum++) {
        //$.each(displayCategories, function () {

        var columnDiv = $("<div>").addClass("col-md-4");
        var columnUl = $("<ul>").addClass("mega-menu-submenu");
        columnDiv.append(columnUl);
        parent.append(columnDiv);


        var columnCategories = displayCategories[colNum];

        for (var catNum = 0; catNum < columnCategories.length; catNum++) {
            var category = columnCategories[catNum];
            var titleLi = $("<li>");
            var title = $("<p>");
            titleLi.append(title);
            title.html(category.IsPublic ? category.CategoryName : generateIpWallMessageSpan(category.CategoryName));
            columnUl.append(titleLi);

            for (var subCatNum = 0; subCatNum < category.SubCategories.length; subCatNum++) {
                var subCat = category.SubCategories[subCatNum];
                var sublink = subCat.Url;
                if (sublink == "") {
                    sublink = "#";
                }

                var subcatLi = $("<li>");
                var subcatA = $("<a>");
                subcatA.attr("href", sublink);
                subcatA.html("" + (subCat.IsPublic ? subCat.CategoryName : generateIpWallMessageSpan(subCat.CategoryName)));//removed 2 spaces
                subcatLi.append(subcatA);
                columnUl.append(subcatLi);
            }
        }
    }
};


function generateSites(externalSites) {
    var container = $("<div>");
    container.addClass("col-md-12");
    var containerList = $("<ul>");
    containerList.addClass("mega-menu-submenu");
    containerList.appendTo(container);

    for (var i = 0; i < externalSites.length; i++) {
        var li = $("<li>");
        var link = externalSites[i].Url;
        var internalContainer;
        if (link != "") {
            internalContainer = $("<a>");
            internalContainer.attr({ target: "_blank", href: link });
        }
        else {
            internalContainer = $("<span>");
        }
        internalContainer.html(externalSites[i].Title);
        li.append(internalContainer);
        if (i == externalSites.length - 1) {
            internalContainer.css("marginBottom", "50px");
        }
        containerList.append(li);
    }

    return container;
};

