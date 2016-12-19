/**
 * Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/* exported initSample */

if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
    CKEDITOR.tools.enableHtml5Elements(document);

// The trick to keep the editor in the sample quite small
// unless user specified own height.
//CKEDITOR.config.height = 150;
//CKEDITOR.config.width = 'auto';

var GetWindowHeight = function () {
    var de = document.documentElement;
    var isIe = /*@cc_on!@*/false || !!document.documentMode;
    if (!isIe) {
        var barwidth = de.scrollWidth > de.clientWidth ? 17 : 0;
        return window.innerHeight - barwidth;
    }
    return de.clientHeight || document.body.clientHeight;
}

var GetWindowWidth = function () {
    var de = document.documentElement;

    var isIe = /*@cc_on!@*/false || !!document.documentMode;
    if (!isIe) {
        var barwidth = de.scrollHeight > de.clientHeight ? 17 : 0;
        return window.innerWidth - barwidth;
    }

    return de.clientWidth || document.body.clientWidth;
}

var windowHeight = GetWindowHeight() - 225;
var windowWidth = GetWindowWidth() - 15;
CKEDITOR.config.height = windowHeight;
CKEDITOR.config.width = windowWidth;

var initCkEditor = (function () {
    var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

    return function () {
        var editorElement = CKEDITOR.document.getById('editor');

        // :(((
        if (isBBCodeBuiltIn) {
            editorElement.setHtml(
				'Hello world!\n\n' +
				'I\'m an instance of [url=http://ckeditor.com]CKEditor[/url].'
			);
        }

        // Depending on the wysiwygare plugin availability initialize classic or inline editor.
        if (wysiwygareaAvailable) {
            CKEDITOR.replace('editor');
        } else {
            editorElement.setAttribute('contenteditable', 'true');
            CKEDITOR.inline('editor');

            // TODO we can consider displaying some info box that
            // without wysiwygarea the classic editor may not work.
        }
    };

    function isWysiwygareaAvailable() {
        // If in development mode, then the wysiwygarea must be available.
        // Split REV into two strings so builder does not replace it :D.
        if (CKEDITOR.revision == ('%RE' + 'V%')) {
            return true;
        }

        return !!CKEDITOR.plugins.get('wysiwygarea');
    }
})();

