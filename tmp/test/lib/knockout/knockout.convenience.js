/// dependency: UtilityFunctionHelper, jQuery.global
(function (ko, handlers, unwrap, extend) {
    function patternProcessor(str) {
        var returnValue = str;
        if (typeof window.PatternResource !== "object") {
            console.log("Error: incorrect PatternResource type " + (typeof window.PatternResource));
        }
        if (returnValue == null) {
            return null;
        }
        returnValue = str.replace(/\{([^\{\}\|]+)(?:\|([^\}\{]*))?\}/g, function(match, variable, key) {
            variable = '{' + variable + '}';
            if (window.PatternResource.hasOwnProperty(variable)) {
                var replacement = window.PatternResource[variable];
                var objType = Object.prototype.toString.call(replacement);
                if (objType === '[object Array]') {
                    key = parseInt(key);
                    if (!isNaN(key) && key<replacement.length) {
                        return patternProcessor(replacement[key]);
                    }
                    console.log("Failed to retrieve index from array", key, replacement);
                }
                else if (objType === '[object Object]') {
                    if (replacement.hasOwnProperty(key)) {
                        return patternProcessor(replacement[key]);
                    }
                    console.log("Failed to retrieve key from object", key, replacement);
                }
                else {
                    return patternProcessor(replacement);
                }
            }
            return match;
        });

        /*$.each(window.PatternResource, function (key, value) {
            if (str.indexOf(key) > -1) {
                returnValue = UtilityFunctionHelper.replaceAll(str, key, value); //* replace all occurences
                str = returnValue;
            }
        });*/
        return returnValue;
    }

    ko.processPattern = patternProcessor;
    //window.TempResxForJsArray = [];
    //function displayResxForJsElementDistinct(value) {
    //    if ($.inArray(value, window.TempResxForJsArray) == -1) {
    //        if (value.indexOf('ResxForJs.') > -1) {
    //            window.TempResxForJsArray.push(value);
    //        }
    //    }
    //}
    extend(handlers, {
        text2: {
            update: function (element, valueAccessor) {
                var str = valueAccessor(); // input value.
                if (typeof str === 'function') {
                    str = str();
                }
                if (str == null) {
                    str = "";
                }
                if (typeof str !== "string") { // deal with boolean/integer value
                    str = str.toString();
                }
                return handlers.html.update(element, function () {

                    if (!str) {
                        if (element.outerHTML.indexOf('ResxForJs.') > -1) {
                            console.log(element.outerHTML);
                            console.log("string is null, empty or undefined.");
                        }
                        return str;
                    }

                    //displayResxForJsElementDistinct(element.outerHTML);

                    return patternProcessor(str);
                });
            }
        },
        mailto: {
            update: function (element, valueAccessor) {
                handlers.attr.update(element, function () {
                    return { href: "mailto:" + patternProcessor(valueAccessor()) };
                });
            }
        },
        title: {
            update: function (element, valueAccessor) {
                handlers.attr.update(element, function () {
                    return { title: patternProcessor(valueAccessor()) };
                });
            }
        },
        href: {
            update: function (element, valueAccessor) {
                handlers.attr.update(element, function () {
                    var hrefReturnValue = patternProcessor(valueAccessor());
                    return { href: hrefReturnValue };
                });
            }
        },
        currency: { //* dependency - jquery global lib.
            update: function (element, valueAccessor) {
                var value = +(unwrap(valueAccessor()) || 0);
                var helper = window.UtilityFunctionHelper;

                // Use jQuery.global.format with a max. decimal count of 3. 
                var oldDecimals = jQuery.global.culture.numberFormat.currency.decimals;
                var decimalCount = helper.decimalPlaces(value, 3);
                if (decimalCount >= 3) jQuery.global.culture.numberFormat.currency.decimals = 3;
                var formattedValue = jQuery.global.format(value, "c");
                jQuery.global.culture.numberFormat.currency.decimals = oldDecimals;

                var pieces = helper.decomposePrice(
                    jQuery.global.culture.numberFormat.currency["."], // Decimal separator.
                    jQuery.global.culture.numberFormat.currency[","], // Thousands separator.
                    formattedValue);

                var makeSpan = function (className, content) {
                    var escapedContent = content.replace(/\s/g, "&nbsp;");
                    return "<span class=\"" + className + "\">" + escapedContent + "</span>";
                }

                // Empty strings won't be wrapped in spans.
                var beforeHtml = pieces.before && makeSpan("price-currency", pieces.before);
                var integerHtml = pieces.integer && makeSpan("price-integer", pieces.integer);
                var decimalHtml = pieces.decimal && makeSpan("price-cents", pieces.decimal);
                var afterHtml = pieces.after && makeSpan("price-currency", pieces.after);

                ko.utils.setHtml(element, beforeHtml + integerHtml + decimalHtml + afterHtml);
                ko.utils.toggleDomNodeCssClass(element, "price-money", true);
                ko.utils.toggleDomNodeCssClass(element.parentElement, "price", true);
            }
        },
        src: {
            update: function (element, valueAccessor) {
                handlers.attr.update(element, function () {
                    return { src: patternProcessor(valueAccessor()) };
                });
            }
        },
        hidden: {
            update: function (element, valueAccessor) {
                var value = unwrap(valueAccessor());
                handlers.visible.update(element, function () { return !value; });
            }
        },
        instantValue: {
            init: function (element, valueAccessor, allBindingsAccessor) {
                handlers.value.init(element, valueAccessor,
                    ko.observable(extend(allBindingsAccessor(), { valueUpdate: 'afterkeydown' }))
                    );
            },
            update: handlers.value.update
        },
        toggle: {
            init: function (element, valueAccessor) {
                var value = valueAccessor();
                ko.applyBindingsToNode(element, {
                    click: function () {
                        value(!value());
                    }
                });
            }
        },
        stopBinding: {
            init: function () {
                return { controlsDescendantBindings: true };
            }
        },
        toJSON: {
            update: function (element, valueAccessor) {
                return handlers.text.update(element, function () {
                    return ko.toJSON(valueAccessor(), null, 2);
                });
            }
        },
        timeAgo: {
            dateToTimeAgo: function (dt) {
                var secs = (((new Date()).getTime() - dt.getTime()) / 1000),
                    days = Math.floor(secs / 86400);

                return days === 0 && (
                    secs < 60 && "just now" ||
                        secs < 120 && "a minute ago" ||
                        secs < 3600 && Math.floor(secs / 60) + " minutes ago" ||
                        secs < 7200 && "an hour ago" ||
                        secs < 86400 && Math.floor(secs / 3600) + " hours ago") ||
                    days === 1 && "yesterday" ||
                    days < 31 && days + " days ago" ||
                    days < 60 && "one month ago" ||
                    days < 365 && Math.ceil(days / 30) + " months ago" ||
                    days < 730 && "one year ago" ||
                    Math.ceil(days / 365) + " years ago";
            },
            update: function (element, valueAccessor) {
                var val = unwrap(valueAccessor()),
                    date = new Date(val), // WARNING: this is not compatibile with IE8
                    timeAgo = handlers.timeAgo.toTimeAgo(date);
                return handlers.html.update(element, function () {
                    return '<time datetime="' + encodeURIComponent(val) + '">' + timeAgo + '</time>';
                });
            }
        },
        mySlider: {
            //
            //* use "sliderOptions" to add extra configurations for slider control.
            //
            init: function (element, valueAccessor, allBindingsAccessor) {
                //* initialize with some optional options
                var options = allBindingsAccessor().sliderOptions || {};
                $(element).slider(options);

                //* handle the field changing
                ko.utils.registerEventHandler(element, "slidechange", function (event, ui) {
                    var observable = valueAccessor();
                    observable(ui.value);
                });
                ko.utils.registerEventHandler(element, "slide", function (event, ui) {
                    var observable = valueAccessor();
                    observable(ui.value);
                });

                //* handle disposal (if KO removes by the template binding)
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(element).slider("destroy");
                });
            },
            update: function (element, valueAccessor, allBindings, viewModel) {
                var value = unwrap(valueAccessor());
                value = String(value).replace(/\D/g, '');
                if (isNaN(value)) {
                    value = 1;
                }
                $(element).slider("value", value);
            }
        },
        myTouchSpin: {
            //
            //* use "touchSpinOptions" to add extra configurations for TouchSpin control.
            //
            init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                var options = allBindingsAccessor().touchSpinOptions || {};

                //* initialize TouchSpin
                $(element).TouchSpin(options);
                
                /*
                    //* handle the field changing -  change 
                    ko.utils.registerEventHandler(element, "touchspin.on.startspin", function (event) {
                        console.log("touchspin.on.startspin:" + currentValue);
                    });
                */
            }
        },
        fadeVisible: {
            init: function (element, valueAccessor) {
                // Initially set the element to be instantly visible/hidden depending on the value
                var value = valueAccessor();
                $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
            },
            update: function (element, valueAccessor) {
                // Whenever the value subsequently changes, slowly fade the element in or out
                var value = valueAccessor();
                ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
            }
        },
        enterKey: {
            init: function(element, valueAccessor, allBindings, viewModel) {
                var callback = valueAccessor();
                $(element).on("keypress", function(event) {
                    var keyCode = (event.which ? event.which : event.keyCode);
                    if (keyCode === 13) {
                        callback.call(viewModel);
                        return false;
                    }
                    return true;
                });
            }
        }
    });

    ko.virtualElements.allowedBindings.stopBinding = true;
}(ko, ko.bindingHandlers, ko.utils.unwrapObservable, ko.utils.extend));