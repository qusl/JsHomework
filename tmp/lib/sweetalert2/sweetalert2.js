/*!
 * sweetalert2 v4.3.2
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Sweetalert2 = factory());
}(this, function () { 'use strict';

  var swalPrefix = 'swal2-';

  var prefix = function(items) {
    var result = {};
    for (var i in items) {
      result[items[i]] = swalPrefix + items[i];
    }
    return result;
  };

  var swalClasses = prefix([
    'container',
    'modal',
    'overlay',
    'close',
    'content',
    'spacer',
    'confirm',
    'cancel',
    'icon',
    'image',
    'input',
    'range',
    'select',
    'radio',
    'checkbox',
    'textarea',
    'validationerror',
    'progresssteps',
    'activeprogressstep',
    'progresscircle',
    'progressline'
  ]);

  var iconTypes = prefix([
    'success',
    'warning',
    'info',
    'question',
    'error'
  ]);

  var defaultParams = {
    title: '',
    text: '',
    html: '',
    type: null,
    customClass: '',
    animation: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    showConfirmButton: true,
    showCancelButton: false,
    preConfirm: null,
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
    confirmButtonClass: null,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#aaa',
    cancelButtonClass: null,
    buttonsStyling: true,
    reverseButtons: false,
    focusCancel: false,
    showCloseButton: false,
    showLoaderOnConfirm: false,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    imageClass: null,
    timer: null,
    width: 500,
    padding: 20,
    background: '#fff',
    input: null,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputClass: null,
    inputAttributes: {},
    inputValidator: null,
    progressSteps: [],
    currentProgressStep: null,
    progressStepsDistance: '40px',
    onOpen: null,
    onClose: null
  };

  var sweetHTML = '<div class="' + swalClasses.overlay + '" tabIndex="-1"></div>' +
    '<div class="' + swalClasses.modal + '" style="display: none" tabIndex="-1">' +
      '<ul class="' + swalClasses.progresssteps + '"></ul>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.error + '">' +
        '<span class="x-mark"><span class="line left"></span><span class="line right"></span></span>' +
      '</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.success + '">' +
        '<span class="line tip"></span> <span class="line long"></span>' +
        '<div class="placeholder"></div> <div class="fix"></div>' +
      '</div>' +
      '<img class="' + swalClasses.image + '">' +
      '<h2></h2>' +
      '<div class="' + swalClasses.content + '"></div>' +
      '<input class="' + swalClasses.input + '">' +
      '<div class="' + swalClasses.range + '">' +
        '<output></output>' +
        '<input type="range" class="' + swalClasses.input + '">' +
      '</div>' +
      '<select class="' + swalClasses.select + '"></select>' +
      '<div class="' + swalClasses.radio + '"></div>' +
      '<label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">' +
        '<input type="checkbox" id="' + swalClasses.checkbox + '">' +
      '</label>' +
      '<textarea class="' + swalClasses.textarea + '"></textarea>' +
      '<div class="' + swalClasses.validationerror + '"></div>' +
      '<hr class="' + swalClasses.spacer + '">' +
      '<button type="button" class="' + swalClasses.confirm + '">OK</button>' +
      '<button type="button" class="' + swalClasses.cancel + '">Cancel</button>' +
      '<span class="' + swalClasses.close + '">&times;</span>' +
    '</div>';

  var extend = function(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  };


  /*
   * Set hover, active and focus-states for buttons (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
   */
  var colorLuminance = function(hex, lum) {
    // Validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // Convert to decimal and change luminosity
    var rgb = '#';
    for (var i = 0; i < 3; i++) {
      var c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
    }

    return rgb;
  };

  // Remember state in cases where opening and handling a modal will fiddle with it.
  var states = {
    previousWindowKeyDown: null,
    previousActiveElement: null
  };

  /*
   * Manipulate DOM
   */
  var elementByClass = function(className) {
    return document.querySelector('.' + className);
  };

  var getModal = function() {
    return elementByClass(swalClasses.modal);
  };

  var getOverlay = function() {
    return elementByClass(swalClasses.overlay);
  };

  var getIcons = function() {
    var modal = getModal();
    return modal.querySelectorAll('.' + swalClasses.icon);
  };

  var getSpacer = function() {
    return elementByClass(swalClasses.spacer);
  };

  var getProgressSteps = function() {
    return elementByClass(swalClasses.progresssteps);
  };

  var getConfirmButton = function() {
    return elementByClass(swalClasses.confirm);
  };

  var getCancelButton = function() {
    return elementByClass(swalClasses.cancel);
  };

  var getCloseButton = function() {
    return elementByClass(swalClasses.close);
  };

  var getFocusableElements = function(focusCancel) {
    var buttons = [getConfirmButton(), getCancelButton()];
    if (focusCancel) {
      buttons.reverse();
    }
    return buttons.concat(Array.prototype.slice.call(
      getModal().querySelectorAll('button:not([class^=' + swalPrefix + ']), input:not([type=hidden]), textarea, select')
    ));
  };

  var hasClass = function(elem, className) {
    return elem.classList.contains(className);
  };

  var focusInput = function(input) {
    input.focus();

    // http://stackoverflow.com/a/2345915/1331425
    var val = input.value;
    input.value = '';
    input.value = val;
  };

  var addClass = function(elem, className) {
    if (!elem || !className) {
      return;
    }
    var classes = className.split(/\s+/);
    classes.forEach(function(className) {
      elem.classList.add(className);
    });
  };

  var removeClass = function(elem, className) {
    if (!elem || !className) {
      return;
    }
    var classes = className.split(/\s+/);
    classes.forEach(function(className) {
      elem.classList.remove(className);
    });
  };

  var getChildByClass = function(elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i];
      }
    }
  };

  var show = function(elem, display) {
    if (!display) {
      display = 'block';
    }
    elem.style.opacity = '';
    elem.style.display = display;
  };

  var hide = function(elem) {
    elem.style.opacity = '';
    elem.style.display = 'none';
  };

  var empty = function(elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  };

  // borrowed from jqeury $(elem).is(':visible') implementation
  var isVisible = function(elem) {
    return elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length;
  };

  var removeStyleProperty = function(elem, property) {
    if (elem.style.removeProperty) {
      elem.style.removeProperty(property);
    } else {
      elem.style.removeAttribute(property);
    }
  };

  var getTopMargin = function(elem) {
    var elemDisplay = elem.style.display;
    elem.style.left = '-9999px';
    elem.style.display = 'block';

    var height = elem.clientHeight;

    elem.style.left = '';
    elem.style.display = elemDisplay;
    return ('-' + parseInt(height / 2, 10) + 'px');
  };

  var fadeIn = function(elem, interval) {
    if (+elem.style.opacity < 1) {
      interval = interval || 16;
      elem.style.opacity = 0;
      elem.style.display = 'block';
      var last = +new Date();
      var tick = function() {
        var newOpacity = +elem.style.opacity + (new Date() - last) / 100;
        elem.style.opacity = (newOpacity > 1) ? 1 : newOpacity;
        last = +new Date();

        if (+elem.style.opacity < 1) {
          setTimeout(tick, interval);
        }
      };
      tick();
    }
  };

  var fadeOut = function(elem, interval) {
    if (+elem.style.opacity > 0) {
      interval = interval || 16;
      var opacity = elem.style.opacity;
      var last = +new Date();
      var tick = function() {
        var change = new Date() - last;
        var newOpacity = +elem.style.opacity - change / (opacity * 100);
        elem.style.opacity = newOpacity;
        last = +new Date();

        if (+elem.style.opacity > 0) {
          setTimeout(tick, interval);
        } else {
          hide(elem);
        }
      };
      tick();
    }
  };

  var fireClick = function(node) {
    // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
    // Then fixed for today's Chrome browser.
    if (typeof MouseEvent === 'function') {
      // Up-to-date approach
      var mevt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
      });
      node.dispatchEvent(mevt);
    } else if (document.createEvent) {
      // Fallback
      var evt = document.createEvent('MouseEvents');
      evt.initEvent('click', false, false);
      node.dispatchEvent(evt);
    } else if (document.createEventObject) {
      node.fireEvent('onclick');
    } else if (typeof node.onclick === 'function') {
      node.onclick();
    }
  };

  var stopEventPropagation = function(e) {
    // In particular, make sure the space bar doesn't scroll the main window.
    if (typeof e.stopPropagation === 'function') {
      e.stopPropagation();
      e.preventDefault();
    } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
      window.event.cancelBubble = true;
    }
  };

  var animationEndEvent = (function() {
    var testEl = document.createElement('div'),
      transEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd oanimationend',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
      };
    for (var i in transEndEventNames) {
      if (transEndEventNames.hasOwnProperty(i) &&
        testEl.style[i] !== undefined) {
        return transEndEventNames[i];
      }
    }

    return false;
  })();


  // Reset the page to its previous state
  var resetPrevState = function() {
    var modal = getModal();
    window.onkeydown = states.previousWindowKeyDown;
    if (states.previousActiveElement && states.previousActiveElement.focus) {
      states.previousActiveElement.focus();
    }
    clearTimeout(modal.timeout);
  };

  // Remove dynamically created media query
  var addMediaQuery = function(content) {
    var mediaqueryId = swalPrefix + 'mediaquery-' + Math.random().toString(36).substring(2, 7);
    var head = document.getElementsByTagName('head')[0];
    var cssNode = document.createElement('style');
    cssNode.type = 'text/css';
    cssNode.id = mediaqueryId;
    cssNode.innerHTML = content;
    head.appendChild(cssNode);
    return mediaqueryId;
  };

  // Remove dynamically created media query
  var removeMediaQuery = function(mediaqueryId) {
    if (!mediaqueryId) {
      return false;
    }
    var head = document.getElementsByTagName('head')[0];
    var mediaquery = document.getElementById(mediaqueryId);
    if (mediaquery) {
      head.removeChild(mediaquery);
    }
  };

  var modalParams = extend({}, defaultParams);
  var queue = [];

  /*
   * Set type, text and actions on modal
   */
  var setParameters = function(params) {
    var modal = getModal();

    for (var param in params) {
      if (!defaultParams.hasOwnProperty(param) && param !== 'extraParams') {
        console.warn('SweetAlert2: Unknown parameter "' + param + '"');
      }
    }

    // set modal width and margin-left
    params.width = params.width.toString();
    var width = params.width.match(/^(\d+)(px|%)?$/);
    var widthUnits;
    if (!width) {
      console.warn('SweetAlert2: Invalid width parameter, usage examples: "400px", "50%", or just 500 which equals to "500px"');
    } else {
      widthUnits = 'px';
      if (width[2]) {
        widthUnits = width[2];
      }
      width = parseInt(width[1], 10);
      modal.style.width = width + widthUnits;
      modal.style.marginLeft = -width / 2 + widthUnits;
    }

    modal.style.padding = params.padding + 'px';
    modal.style.background = params.background;

    if (widthUnits === 'px') {
      // add dynamic media query css
      var margin = 5; // %
      var mediaQueryMaxWidth = width + (width * (margin/100) * 2);
      var mediaqueryId = addMediaQuery(
        '@media screen and (max-width: ' + mediaQueryMaxWidth + 'px) {' +
          '.' + swalClasses.modal + ' {' +
            'width: auto !important;' +
            'left: ' + margin + '% !important;' +
            'right: ' + margin + '% !important;' +
            'margin-left: 0 !important;' +
          '}' +
        '}'
      );
      modal.setAttribute('data-mediaquery-id', mediaqueryId);
    }

    var $title = modal.querySelector('h2');
    var $content = modal.querySelector('.' + swalClasses.content);
    var $confirmBtn = getConfirmButton();
    var $cancelBtn = getCancelButton();
    var $closeButton = modal.querySelector('.' + swalClasses.close);

    // Title
    $title.innerHTML = params.title.split('\n').join('<br>');

    // Content
    var i;
    if (params.text || params.html) {
      if (typeof params.html === 'object') {
        $content.innerHTML = '';
        if (0 in params.html) {
          for (i = 0; i in params.html; i++) {
            $content.appendChild(params.html[i].cloneNode(true));
          }
        } else {
          $content.appendChild(params.html.cloneNode(true));
        }
      } else {
        $content.innerHTML = params.html || (params.text.split('\n').join('<br>'));
      }
      show($content);
    } else {
      hide($content);
    }

    // Close button
    if (params.showCloseButton) {
      show($closeButton);
    } else {
      hide($closeButton);
    }

    // Custom Class
    modal.className = swalClasses.modal;
    if (params.customClass) {
      addClass(modal, params.customClass);
    }

    // Progress steps
    var progressStepsContainer = getProgressSteps();
    var currentProgressStep = parseInt(params.currentProgressStep === null? swal.getQueueStep() : params.currentProgressStep, 10);
    if (params.progressSteps.length) {
      show(progressStepsContainer);
      empty(progressStepsContainer);
      if (currentProgressStep >= params.progressSteps.length) {
        console.warn(
          'SweetAlert2: Invalid currentProgressStep parameter, it should be less than progressSteps.length ' +
          '(currentProgressStep like JS arrays starts from 0)'
        );
      }
      params.progressSteps.forEach(function(step, index) {
        var circle = document.createElement('li');
        addClass(circle, swalClasses.progresscircle);
        circle.innerHTML = step;
        if (index === currentProgressStep) {
          addClass(circle, swalClasses.activeprogressstep);
        }
        progressStepsContainer.appendChild(circle);
        if (index !== params.progressSteps.length - 1) {
          var line = document.createElement('li');
          addClass(line, swalClasses.progressline);
          line.style.width = params.progressStepsDistance;
          progressStepsContainer.appendChild(line);
        }
      });
    } else {
      hide(progressStepsContainer);
    }

    // Icon
    var icons = getIcons();
    for (i = 0; i < icons.length; i++) {
      hide(icons[i]);
    }
    if (params.type) {
      var validType = false;
      for (var iconType in iconTypes) {
        if (params.type === iconType) {
          validType = true;
          break;
        }
      }
      if (!validType) {
        console.error('SweetAlert2: Unknown alert type: ' + params.type);
        return false;
      }
      var $icon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
      show($icon);

      // Animate icon
      switch (params.type) {
        case 'success':
          addClass($icon, 'animate');
          addClass($icon.querySelector('.tip'), 'animate-success-tip');
          addClass($icon.querySelector('.long'), 'animate-success-long');
          break;
        case 'error':
          addClass($icon, 'animate-error-icon');
          addClass($icon.querySelector('.x-mark'), 'animate-x-mark');
          break;
        case 'warning':
          addClass($icon, 'pulse-warning');
          break;
        default:
          break;
      }

    }

    // Custom image
    var $customImage = modal.querySelector('.' + swalClasses.image);
    if (params.imageUrl) {
      $customImage.setAttribute('src', params.imageUrl);
      show($customImage);

      if (params.imageWidth) {
        $customImage.setAttribute('width', params.imageWidth);
      } else {
        $customImage.removeAttribute('width');
      }

      if (params.imageHeight) {
        $customImage.setAttribute('height', params.imageHeight);
      } else {
        $customImage.removeAttribute('height');
      }

      $customImage.className = swalClasses.image;
      if (params.imageClass) {
        addClass($customImage, params.imageClass);
      }
    } else {
      hide($customImage);
    }

    // Cancel button
    if (params.showCancelButton) {
      $cancelBtn.style.display = 'inline-block';
    } else {
      hide($cancelBtn);
    }

    // Confirm button
    if (params.showConfirmButton) {
      removeStyleProperty($confirmBtn, 'display');
    } else {
      hide($confirmBtn);
    }

    // Buttons spacer
    var spacer = getSpacer();
    if (!params.showConfirmButton && !params.showCancelButton) {
      hide(spacer);
    } else {
      show(spacer);
    }

    // Edit text on cancel and confirm buttons
    $confirmBtn.innerHTML = params.confirmButtonText;
    $cancelBtn.innerHTML = params.cancelButtonText;

    // Set buttons to selected background colors
    if (params.buttonsStyling) {
      $confirmBtn.style.backgroundColor = params.confirmButtonColor;
      $cancelBtn.style.backgroundColor = params.cancelButtonColor;
    }

    // Add buttons custom classes
    $confirmBtn.className = swalClasses.confirm;
    addClass($confirmBtn, params.confirmButtonClass);
    $cancelBtn.className = swalClasses.cancel;
    addClass($cancelBtn, params.cancelButtonClass);

    // Buttons styling
    if (params.buttonsStyling) {
      addClass($confirmBtn, 'styled');
      addClass($cancelBtn, 'styled');
    } else {
      removeClass($confirmBtn, 'styled');
      removeClass($cancelBtn, 'styled');

      $confirmBtn.style.backgroundColor = $confirmBtn.style.borderLeftColor = $confirmBtn.style.borderRightColor = '';
      $cancelBtn.style.backgroundColor = $cancelBtn.style.borderLeftColor = $cancelBtn.style.borderRightColor = '';
    }

    // CSS animation
    if (params.animation === true) {
      removeClass(modal, 'no-animation');
    } else {
      addClass(modal, 'no-animation');
    }
  };

  /*
   * Animations
   */
  var openModal = function(animation, onComplete) {
    var modal = getModal();
    if (animation) {
      fadeIn(getOverlay(), 10);
      addClass(modal, 'show-swal2');
      removeClass(modal, 'hide-swal2');
    } else {
      show(getOverlay());
    }
    show(modal);
    states.previousActiveElement = document.activeElement;
    if (onComplete !== null && typeof onComplete === 'function') {
      onComplete.call(this, modal);
    }
  };

  /*
   * Set 'margin-top'-property on modal based on its computed height
   */
  var fixVerticalPosition = function() {
    var modal = getModal();

    if (modal !== null) {
      modal.style.marginTop = getTopMargin(modal);
    }
  };

  function modalDependant() {

    if (arguments[0] === undefined) {
      console.error('SweetAlert2 expects at least 1 attribute!');
      return false;
    }

    var params = extend({}, modalParams);

    switch (typeof arguments[0]) {

      case 'string':
        params.title = arguments[0];
        params.text  = arguments[1] || '';
        params.type  = arguments[2] || '';

        break;

      case 'object':
        extend(params, arguments[0]);
        params.extraParams = arguments[0].extraParams;

        if (params.input === 'email' && params.inputValidator === null) {
          params.inputValidator = function(email) {
            return new Promise(function(resolve, reject) {
              var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
              if (emailRegex.test(email)) {
                resolve();
              } else {
                reject('Invalid email address');
              }
            });
          };
        }

        break;

      default:
        console.error('SweetAlert2: Unexpected type of argument! Expected "string" or "object", got ' + typeof arguments[0]);
        return false;
    }

    setParameters(params);

    // Modal interactions
    var modal = getModal();

    return new Promise(function(resolve, reject) {
      // Close on timer
      if (params.timer) {
        modal.timeout = setTimeout(function() {
          sweetAlert.closeModal(params.onClose);
          reject('timer');
        }, params.timer);
      }

      // Get input element by specified type or, if type isn't specified, by params.input
      var getInput = function() {
        switch (params.input) {
          case 'select':
          case 'checkbox':
          case 'textarea':
            return getChildByClass(modal, swalClasses[params.input]);
          case 'radio':
            return modal.querySelector('.' + swalClasses.radio + ' input:checked') ||
              modal.querySelector('.' + swalClasses.radio + ' input:first-child');
          case 'range':
            return modal.querySelector('.' + swalClasses.range + ' input');
          default:
            return getChildByClass(modal, swalClasses.input);
        }
      };

      // Get the value of the modal input
      var getInputValue = function() {
        var input = getInput();
        switch (params.input) {
          case 'checkbox':
            return input.checked ? 1 : 0;
          case 'radio':
            return input.checked ? input.value : null;
          case 'file':
            return input.files.length ? input.files[0] : null;
          default:
            return params.inputAutoTrim? input.value.trim() : input.value;
        }
      };

      // input autofocus
      if (params.input) {
        setTimeout(function() {
          var input = getInput();
          if (input) {
            focusInput(input);
          }
        }, 0);
      }

      var confirm = function(value) {
        if (params.showLoaderOnConfirm) {
          sweetAlert.showLoading();
        }

        if (params.preConfirm) {
          params.preConfirm(value, params.extraParams).then(
            function(preConfirmValue) {
              sweetAlert.closeModal(params.onClose);
              resolve(preConfirmValue || value);
            },
            function(error) {
              sweetAlert.hideLoading();
              if (error) {
                sweetAlert.showValidationError(error);
              }
            }
          );
        } else {
          sweetAlert.closeModal(params.onClose);
          resolve(value);
        }
      };

      // Mouse interactions
      var onButtonEvent = function(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var confirmBtn = getConfirmButton();
        var cancelBtn = getCancelButton();
        var targetedConfirm = confirmBtn === target || confirmBtn.contains(target);
        var targetedCancel = cancelBtn === target || cancelBtn.contains(target);

        switch (e.type) {
          case 'mouseover':
          case 'mouseup':
            if (params.buttonsStyling) {
              if (targetedConfirm) {
                confirmBtn.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.1);
              } else if (targetedCancel) {
                cancelBtn.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.1);
              }
            }
            break;
          case 'mouseout':
            if (params.buttonsStyling) {
              if (targetedConfirm) {
                confirmBtn.style.backgroundColor = params.confirmButtonColor;
              } else if (targetedCancel) {
                cancelBtn.style.backgroundColor = params.cancelButtonColor;
              }
            }
            break;
          case 'mousedown':
            if (params.buttonsStyling) {
              if (targetedConfirm) {
                confirmBtn.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.2);
              } else if (targetedCancel) {
                cancelBtn.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.2);
              }
            }
            break;
          case 'click':
            // Clicked 'confirm'
            if (targetedConfirm && sweetAlert.isVisible()) {
              if (params.input) {
                var inputValue = getInputValue();

                if (params.inputValidator) {
                  sweetAlert.disableInput();
                  params.inputValidator(inputValue, params.extraParams).then(
                    function() {
                      sweetAlert.enableInput();
                      confirm(inputValue);
                    },
                    function(error) {
                      sweetAlert.enableInput();
                      if (error) {
                        sweetAlert.showValidationError(error);
                      }
                    }
                  );
                } else {
                  confirm(inputValue);
                }

              } else {
                confirm(true);
              }

            // Clicked 'cancel'
            } else if (targetedCancel && sweetAlert.isVisible()) {
              sweetAlert.closeModal(params.onClose);
              reject('cancel');
            }

            break;
          default:
        }
      };

      var $buttons = modal.querySelectorAll('button');
      var i;
      for (i = 0; i < $buttons.length; i++) {
        $buttons[i].onclick     = onButtonEvent;
        $buttons[i].onmouseover = onButtonEvent;
        $buttons[i].onmouseout  = onButtonEvent;
        $buttons[i].onmousedown = onButtonEvent;
      }

      // Closing modal by close button
      getCloseButton().onclick = function() {
        sweetAlert.closeModal(params.onClose);
        reject('close');
      };

      // Closing modal by overlay click
      getOverlay().onclick = function() {
        if (params.allowOutsideClick) {
          sweetAlert.closeModal(params.onClose);
          reject('overlay');
        }
      };

      var $confirmButton = getConfirmButton();
      var $cancelButton = getCancelButton();

      // Reverse buttons if neede d
      if (params.reverseButtons) {
        $confirmButton.parentNode.insertBefore($cancelButton, $confirmButton);
      } else {
        $confirmButton.parentNode.insertBefore($confirmButton, $cancelButton);
      }

      // Focus handling
      function setFocus(index, increment) {
        var focusableElements = getFocusableElements(params.focusCancel);
        // search for visible elements and select the next possible match
        for (var i = 0; i < focusableElements.length; i++) {
          index = index + increment;

          // rollover to first item
          if (index === focusableElements.length) {
            index = 0;

          // go to last item
          } else if (index === -1) {
            index = focusableElements.length - 1;
          }

          // determine if element is visible
          var el = focusableElements[index];
          if (isVisible(el)) {
            return el.focus();
          }
        }
      }

      function handleKeyDown(event) {
        var e = event || window.event;
        var keyCode = e.keyCode || e.which;

        if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
          // Don't do work on keys we don't care about.
          return;
        }

        var $targetElement = e.target || e.srcElement;

        var focusableElements = getFocusableElements(params.focusCancel);
        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
        for (var i = 0; i < focusableElements.length; i++) {
          if ($targetElement === focusableElements[i]) {
            btnIndex = i;
            break;
          }
        }

        // TAB
        if (keyCode === 9) {
          if (!e.shiftKey) {
            // Cycle to the next button
            setFocus(btnIndex, 1);
          } else {
            // Cycle to the prev button
            setFocus(btnIndex, -1);
          }

          stopEventPropagation(e);

        } else {
          if (keyCode === 13 || keyCode === 32) {
            if (btnIndex === -1) {
              // ENTER/SPACE clicked outside of a button.
              if (params.focusCancel) {
                fireClick($cancelButton, e);
              } else {
                fireClick($confirmButton, e);
              }
            }
          } else if (keyCode === 27 && params.allowEscapeKey === true) {
            sweetAlert.closeModal(params.onClose);
            reject('esc');
          }
        }
      }

      states.previousWindowKeyDown = window.onkeydown;
      window.onkeydown = handleKeyDown;

      // Loading state
      if (params.buttonsStyling) {
        $confirmButton.style.borderLeftColor = params.confirmButtonColor;
        $confirmButton.style.borderRightColor = params.confirmButtonColor;
      }

      /**
       * Show spinner instead of Confirm button and disable Cancel button
       */
      sweetAlert.showLoading = sweetAlert.enableLoading = function() {
        show(getSpacer());
        show($confirmButton, 'inline-block');
        addClass($confirmButton, 'loading');
        addClass(modal, 'loading');
        $confirmButton.disabled = true;
        $cancelButton.disabled = true;
      };

      /**
       * Show spinner instead of Confirm button and disable Cancel button
       */
      sweetAlert.hideLoading = sweetAlert.disableLoading = function() {
        if (!params.showConfirmButton) {
          hide($confirmButton);
          if (!params.showCancelButton) {
            hide(getSpacer());
          }
        }
        removeClass($confirmButton, 'loading');
        removeClass(modal, 'loading');
        $confirmButton.disabled = false;
        $cancelButton.disabled = false;
      };

      sweetAlert.enableButtons = function() {
        $confirmButton.disabled = false;
        $cancelButton.disabled = false;
      };

      sweetAlert.disableButtons = function() {
        $confirmButton.disabled = true;
        $cancelButton.disabled = true;
      };

      sweetAlert.enableConfirmButton = function() {
        $confirmButton.disabled = false;
      };

      sweetAlert.disableConfirmButton = function() {
        $confirmButton.disabled = true;
      };

      sweetAlert.enableInput = function() {
        var input = getInput();
        if (input.type === 'radio') {
          var radiosContainer = input.parentNode.parentNode;
          var radios = radiosContainer.querySelectorAll('input');
          for (var i = 0; i < radios.length; i++) {
            radios[i].disabled = false;
          }
        } else {
          input.disabled = false;
        }
      };

      sweetAlert.disableInput = function() {
        var input = getInput();
        if (input.type === 'radio') {
          var radiosContainer = input.parentNode.parentNode;
          var radios = radiosContainer.querySelectorAll('input');
          for (var i = 0; i < radios.length; i++) {
            radios[i].disabled = true;
          }
        } else {
          input.disabled = true;
        }
      };

      sweetAlert.showValidationError = function(error) {
        var $validationError = modal.querySelector('.' + swalClasses.validationerror);
        $validationError.innerHTML = error;
        show($validationError);

        var input = getInput();
        focusInput(input);
        addClass(input, 'error');
      };

      sweetAlert.resetValidationError = function() {
        var $validationError = modal.querySelector('.' + swalClasses.validationerror);
        hide($validationError);

        var input = getInput();
        if (input) {
          removeClass(input, 'error');
        }
      };

      sweetAlert.getProgressSteps = function() {
        return params.progressSteps;
      };

      sweetAlert.setProgressSteps = function(progressSteps) {
        params.progressSteps = progressSteps;
        setParameters(params);
      };

      sweetAlert.showProgressSteps = function() {
        show(getProgressSteps());
      };

      sweetAlert.hideProgressSteps = function() {
        hide(getProgressSteps());
      };

      sweetAlert.enableButtons();
      sweetAlert.hideLoading();
      sweetAlert.resetValidationError();

      // input, select
      var inputTypes = ['input', 'range', 'select', 'radio', 'checkbox', 'textarea'];
      var input;
      for (i = 0; i < inputTypes.length; i++) {
        var inputClass = swalClasses[inputTypes[i]];
        input = getChildByClass(modal, inputClass);

        // set attributes
        while (input.attributes.length > 0) {
          input.removeAttribute(input.attributes[0].name);
        }
        for (var attr in params.inputAttributes) {
          input.setAttribute(attr, params.inputAttributes[attr]);
        }

        // set class
        input.className = inputClass;
        if (params.inputClass) {
          addClass(input, params.inputClass);
        }

        hide(input);
      }

      var populateInputOptions;
      switch (params.input) {
        case 'text':
        case 'email':
        case 'password':
        case 'file':
        case 'number':
        case 'tel':
          input = getChildByClass(modal, swalClasses.input);
          input.value = params.inputValue;
          input.placeholder = params.inputPlaceholder;
          input.type = params.input;
          show(input);
          break;
        case 'range':
          var range = getChildByClass(modal, swalClasses.range);
          var rangeInput = range.querySelector('input');
          var rangeOutput = range.querySelector('output');
          rangeInput.value = params.inputValue;
          rangeOutput.value = params.inputValue;
          show(range);
          break;
        case 'select':
          var select = getChildByClass(modal, swalClasses.select);
          select.innerHTML = '';
          if (params.inputPlaceholder) {
            var placeholder = document.createElement('option');
            placeholder.innerHTML = params.inputPlaceholder;
            placeholder.value = '';
            placeholder.disabled = true;
            placeholder.selected = true;
            select.appendChild(placeholder);
          }
          populateInputOptions = function(inputOptions) {
            for (var optionValue in inputOptions) {
              var option = document.createElement('option');
              option.value = optionValue;
              option.innerHTML = inputOptions[optionValue];
              if (params.inputValue === optionValue) {
                option.selected = true;
              }
              select.appendChild(option);
            }
            show(select);
            select.focus();
          };
          break;
        case 'radio':
          var radio = getChildByClass(modal, swalClasses.radio);
          radio.innerHTML = '';
          populateInputOptions = function(inputOptions) {
            for (var radioValue in inputOptions) {
              var id = 1;
              var radioInput = document.createElement('input');
              var radioLabel = document.createElement('label');
              var radioLabelSpan = document.createElement('span');
              radioInput.type = 'radio';
              radioInput.name = swalClasses.radio;
              radioInput.value = radioValue;
              radioInput.id = swalClasses.radio + '-' + (id++);
              if (params.inputValue === radioValue) {
                radioInput.checked = true;
              }
              radioLabelSpan.innerHTML = inputOptions[radioValue];
              radioLabel.appendChild(radioInput);
              radioLabel.appendChild(radioLabelSpan);
              radioLabel.for = radioInput.id;
              radio.appendChild(radioLabel);
            }
            show(radio);
            var radios = radio.querySelectorAll('input');
            if (radios.length) {
              radios[0].focus();
            }
          };
          break;
        case 'checkbox':
          var checkbox = getChildByClass(modal, swalClasses.checkbox);
          var checkboxInput = modal.querySelector('#' + swalClasses.checkbox);
          checkboxInput.value = 1;
          checkboxInput.checked = Boolean(params.inputValue);
          var label = checkbox.getElementsByTagName('span');
          if (label.length) {
            checkbox.removeChild(label[0]);
          }
          label = document.createElement('span');
          label.innerHTML = params.inputPlaceholder;
          checkbox.appendChild(label);
          show(checkbox);
          break;
        case 'textarea':
          var textarea = getChildByClass(modal, swalClasses.textarea);
          textarea.value = params.inputValue;
          textarea.placeholder = params.inputPlaceholder;
          show(textarea);
          break;
        case null:
          break;
        default:
          console.error('SweetAlert2: Unexpected type of input! Expected "text" or "email" or "password", "select", "checkbox", "textarea" or "file", got "' + params.input + '"');
          break;
      }

      if (params.input === 'select' || params.input === 'radio') {
        if (params.inputOptions instanceof Promise) {
          sweetAlert.showLoading();
          params.inputOptions.then(function(inputOptions) {
            sweetAlert.hideLoading();
            populateInputOptions(inputOptions);
          });
        } else if (typeof params.inputOptions === 'object') {
          populateInputOptions(params.inputOptions);
        } else {
          console.error('SweetAlert2: Unexpected type of inputOptions! Expected object or Promise, got ' + typeof params.inputOptions);
        }
      }

      fixVerticalPosition();
      openModal(params.animation, params.onOpen);

      // Focus the first element (input or button)
      setFocus(-1, 1);
    });
  }

  // SweetAlert function
  function sweetAlert() {
    // Copy arguments to the local args variable
    var args = arguments;
    var modal = getModal();

    if (modal === null) {
      sweetAlert.init();
      modal = getModal();
    }

    if (sweetAlert.isVisible()) {
      sweetAlert.close();
    }

    return modalDependant.apply(this, args);
  }

  /*
   * Global function to determine if swal2 modal is visible
   */
  sweetAlert.isVisible = function() {
    var modal = getModal();
    return isVisible(modal);
  };

  /*
   * Global function for chaining sweetAlert modals
   */
  sweetAlert.queue = function(steps) {
    queue = steps;
    var modal = getModal() || sweetAlert.init();
    var resetQueue = function() {
      queue = [];
      modal.removeAttribute('data-queue-step');
    };
    return new Promise(function(resolve, reject) {
      (function step(i, callback) {
        if (i < queue.length) {
          modal.setAttribute('data-queue-step', i);

          sweetAlert(queue[i]).then(function() {
            step(i+1, callback);
          }, function(dismiss) {
            resetQueue();
            reject(dismiss);
          });
        } else {
          resetQueue();
          resolve();
        }
      })(0);
    });
  };

  /*
   * Global function for getting the index of current modal in queue
   */
  sweetAlert.getQueueStep = function() {
    return getModal().getAttribute('data-queue-step');
  };

  /*
   * Global function for inserting a modal to the queue
   */
  sweetAlert.insertQueueStep = function(step, index) {
    if (index && index < queue.length) {
      return queue.splice(index, 0, step);
    }
    return queue.push(step);
  };

  /*
   * Global function for deleting a modal from the queue
   */
  sweetAlert.deleteQueueStep = function(index) {
    if (typeof queue[index] !== 'undefined') {
      queue.splice(index, 1);
    }
  };

  /*
   * Global function to close sweetAlert
   */
  sweetAlert.close = sweetAlert.closeModal = function(onComplete) {
    var modal = getModal();
    removeClass(modal, 'show-swal2');
    addClass(modal, 'hide-swal2');

    // Reset icon animations
    var $successIcon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes.success);
    removeClass($successIcon, 'animate');
    removeClass($successIcon.querySelector('.tip'), 'animate-success-tip');
    removeClass($successIcon.querySelector('.long'), 'animate-success-long');

    var $errorIcon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes.error);
    removeClass($errorIcon, 'animate-error-icon');
    removeClass($errorIcon.querySelector('.x-mark'), 'animate-x-mark');

    var $warningIcon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes.warning);
    removeClass($warningIcon, 'pulse-warning');

    resetPrevState();

    // If animation is supported, animate then remove mediaquery (#242)
    var mediaqueryId = modal.getAttribute('data-mediaquery-id');
    if (animationEndEvent && !hasClass(modal, 'no-animation')) {
      modal.addEventListener(animationEndEvent, function swalCloseEventFinished() {
        modal.removeEventListener(animationEndEvent, swalCloseEventFinished);
        if (hasClass(modal, 'hide-swal2')) {
          hide(modal);
          fadeOut(getOverlay(), 0);
        }
        removeMediaQuery(mediaqueryId);
      });
    } else {
      // Otherwise, remove mediaquery immediately
      hide(modal);
      hide(getOverlay());
      removeMediaQuery(mediaqueryId);
    }
    if (onComplete !== null && typeof onComplete === 'function') {
      onComplete.call(this, modal);
    }
  };

  /*
   * Global function to click 'Confirm' button
   */
  sweetAlert.clickConfirm = function() {
    getConfirmButton().click();
  };

  /*
   * Global function to click 'Cancel' button
   */
  sweetAlert.clickCancel = function() {
    getCancelButton().click();
  };

  /*
   * Add modal + overlay to DOM
   */
  sweetAlert.init = function() {
    if (typeof document === 'undefined') {
      console.log('SweetAlert2 requires document to initialize');
      return;
    } else if (document.getElementsByClassName(swalClasses.container).length) {
      return;
    }

    var sweetWrap = document.createElement('div');
    sweetWrap.className = swalClasses.container;

    sweetWrap.innerHTML = sweetHTML;

    document.body.appendChild(sweetWrap);

    var modal = getModal();
    var $input = getChildByClass(modal, swalClasses.input);
    var $range = modal.querySelector('.' + swalClasses.range + ' input');
    var $select = getChildByClass(modal, swalClasses.select);
    var $checkbox = modal.querySelector('#' + swalClasses.checkbox);
    var $textarea = getChildByClass(modal, swalClasses.textarea);
    var $image = getChildByClass(modal, swalClasses.image);

    $input.oninput = function() {
      sweetAlert.resetValidationError();
    };

    $input.onkeyup = function(event) {
      event.stopPropagation();
      if (event.keyCode === 13) {
        sweetAlert.clickConfirm();
      }
    };

    $range.oninput = function() {
      sweetAlert.resetValidationError();
      $range.previousSibling.value = $range.value;
    };

    $range.onchange = function() {
      sweetAlert.resetValidationError();
      $range.previousSibling.value = $range.value;
    };

    $select.onchange = function() {
      sweetAlert.resetValidationError();
    };

    $checkbox.onchange = function() {
      sweetAlert.resetValidationError();
    };

    $textarea.oninput = function() {
      sweetAlert.resetValidationError();
    };

    $image.onload = fixVerticalPosition;
    $image.onerror = fixVerticalPosition;

    window.addEventListener('resize', fixVerticalPosition, false);

    return modal;
  };

  /**
   * Set default params for each popup
   * @param {Object} userParams
   */
  sweetAlert.setDefaults = function(userParams) {
    if (!userParams) {
      throw new Error('userParams is required');
    }
    if (typeof userParams !== 'object') {
      throw new Error('userParams has to be a object');
    }

    extend(modalParams, userParams);
  };

  /**
   * Reset default params for each popup
   */
  sweetAlert.resetDefaults = function() {
    modalParams = extend({}, defaultParams);
  };

  sweetAlert.version = '4.3.2';

  window.sweetAlert = window.swal = sweetAlert;

  /*
  * If library is injected after page has loaded
  */
  (function() {
    if (document.readyState === 'complete' || document.readyState === 'interactive' && document.body) {
      sweetAlert.init();
    } else {
      document.addEventListener('DOMContentLoaded', function onDomContentLoaded() {
        document.removeEventListener('DOMContentLoaded', onDomContentLoaded, false);
        sweetAlert.init();
      }, false);
    }
  })();

  if (typeof Promise === 'function') {
    Promise.prototype.done = Promise.prototype.done || function() {
      return this.catch(function() {
        // Catch promise rejections silently.
        // https://github.com/limonte/sweetalert2/issues/177
      });
    };
  } else {
    console.warn('SweetAlert2: Please inlude Promise polyfill BEFORE including sweetalert2.js if IE10+ support needed.');
  }

  return sweetAlert;

}));