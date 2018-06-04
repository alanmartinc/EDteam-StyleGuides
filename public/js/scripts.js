(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _menu = require("./modules/menu");

var _modal = require("../../node_modules/ed-ui/src/js/modal");

var _tabs = require("./modules/tabs");

var _video = require("./modules/video");

var _live = require("./modules/live");

var _courseAside = require("./modules/course-aside");

window.edModal = _modal.edModal;
window.edTabs = _tabs.edTabs;

(0, _tabs.edTabs)();

},{"../../node_modules/ed-ui/src/js/modal":8,"./modules/course-aside":2,"./modules/live":3,"./modules/menu":4,"./modules/tabs":5,"./modules/video":6}],2:[function(require,module,exports){
'use strict';

var stickyCardCourse = function stickyCardCourse(referId, cardId) {
  var refer = document.getElementById(referId),
      card = document.getElementById(cardId),
      largeBp = matchMedia('(min-width: 1024px)');

  var stickyStyles = function stickyStyles(breakpointBoolean) {
    if (refer && card) {
      var t = refer.getBoundingClientRect().top,
          l = card.parentElement.getBoundingClientRect().left,
          w = card.parentElement.getBoundingClientRect().width;

      var styles = breakpointBoolean ? '\n        position: fixed;\n        top: ' + t + 'px;\n        left: ' + l + 'px;\n        width: ' + w + 'px;\n      ' : '\n      position: static\n      ';
      card.setAttribute('style', styles);

      var temary = document.querySelector(".course-temary");

      addEventListener("scroll", function () {
        var temaryBottom = temary.getBoundingClientRect().bottom;
        if (temaryBottom <= card.getBoundingClientRect().bottom) {
          // El card no debe superar al temario
          var stylesAbsolute = '\n            position: absolute;\n            top: auto;\n            bottom: 0;\n          ';
          card.setAttribute('style', stylesAbsolute);
          card.parentElement.style.position = "relative";
        }
      });
    }
  };

  stickyStyles(largeBp.matches);
  addEventListener('resize', function () {
    stickyStyles(largeBp.matches);
  });
};

stickyCardCourse('course-title', 'course-card');

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* Layout de página de live
* */

var video = document.getElementById('live-video');
var chat = document.getElementById('live-chat');
var largeBp = matchMedia('(min-width: 1024px)');
var chatInput = void 0,
    chatMessages = void 0;

var liveLayout = exports.liveLayout = function liveLayout() {
  if (largeBp.matches) {
    var h = getVideoSize();
    chatInput = chat.querySelector('.chat__send');
    chatMessages = chat.querySelector('.chat__messages');
    chatMessages.style.height = 'calc(' + h + ' - ' + chatInput.getBoundingClientRect().height + 'px - 1rem)';
  }
};

var getVideoSize = function getVideoSize() {
  var w = video.getBoundingClientRect().width;
  var h = w / 16 * 9 + 'px';
  video.style.height = h;
  return h;
};

var fixedVideoLive = function fixedVideoLive() {
  var videoSibling = video.nextElementSibling;
  var h = getVideoSize();
  if (!largeBp.matches) {
    video.classList.add('video-fixed');
    videoSibling.style.marginTop = h;
  } else {
    video.classList.remove('video-fixed');
    videoSibling.style.marginTop = '0';
  }
};

if (video && chat) {
  addEventListener('DOMContentLoaded', function () {
    liveLayout();
    fixedVideoLive();
  });
  addEventListener('resize', function () {
    liveLayout();
    fixedVideoLive();
  });
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
* Funcionalidad de menu principal
* */

var menu = exports.menu = function menu(toggleId, navId) {
  var toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId);
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('show');
      if (navId === 'main-menu') document.body.classList.toggle('main-menu-visible');
    });
  }
};

menu('main-menu-toggle', 'main-menu');
menu('vertical-menu-toggle', 'vertical-menu');

var activeMenuItem = function activeMenuItem(containerId) {
  var links = [].concat(_toConsumableArray(document.querySelectorAll('#' + containerId + ' a')));
  var curentUrl = document.location.href;
  links.map(function (link) {
    if (link.href === curentUrl) {
      link.classList.add('active');
    }
  });
};

activeMenuItem('vertical-menu');

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
* Funcionalidad de tabs
* */

var edTabs = exports.edTabs = function edTabs() {
  var container = document.querySelector('.edui-tabs'),
      tabsContainer = void 0,
      panelsContainer = void 0,
      tabs = void 0,
      panels = void 0;

  if (container) {
    tabsContainer = container.querySelector('.tabs');
    panelsContainer = container.querySelector('.panels');

    if (tabsContainer) tabs = [].concat(_toConsumableArray(tabsContainer.querySelectorAll('.tab')));
    if (panelsContainer) panels = [].concat(_toConsumableArray(panelsContainer.querySelectorAll('.panel')));
  }

  if (tabs && tabs.length > 0) tabs[0].classList.add('active');
  if (panels && panels.length > 0) panels[0].classList.add('active');
  if (tabsContainer) {
    tabsContainer.setAttribute('data-tab', '1');

    tabsContainer.addEventListener('click', function (e) {
      var t = e.target,
          i = tabs.indexOf(t);

      if (t.classList.contains('tab') || t.tagName === "IMG") {
        tabs.map(function (tab) {
          return tab.classList.remove('active');
        });
        panels.map(function (panel) {
          return panel.classList.remove('active');
        });
        tabsContainer.removeAttribute('data-tab');
        tabsContainer.setAttribute('data-tab', '' + (i + 1));

        if (t.tagName === 'IMG') {
          t.parentElement.classList.add('active');
          i = tabs.indexOf(t.parentElement);
        } else {
          t.classList.add('active');
        }

        panels[i].classList.add('active');
      }
    });
  }
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* Layout de video
* */

var largeBp = matchMedia('(min-width: 1024px) and (min-aspect-ratio: 8 / 5)');
var fixedBp = matchMedia('(min-width:960px)');
var videoElement = document.getElementById('video-element');
var videoElementAlt = document.getElementById('video-element-alt');
var videoClass = document.getElementById('video-class');
var remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
var scrollFinal = innerHeight - remValue * 3;
var footer = void 0;
if (videoClass) footer = videoClass.querySelector('footer');

var videoSize = exports.videoSize = function videoSize(mq) {
  var viewportWidth = document.body.getBoundingClientRect().width;

  var unit = mq.matches ? (innerHeight - 11 * remValue) / 9 : viewportWidth / 16;

  if (videoElement) {
    videoElement.style.width = unit * 16 + 'px';
    videoElement.style.height = unit * 9 + 'px';
  }

  return viewportWidth;
};
// videoLayout mq = min-width: 1024px
var videoLayout = exports.videoLayout = function videoLayout(mq1, mq2) {
  var viewportWidth = videoSize(mq1);

  if (videoElement) {
    var e = videoElement.parentElement.nextElementSibling,
        h = viewportWidth / 16 * 9;

    // Video footer position
    if (mq2.matches) {
      e.style.marginTop = '0';
    } else {
      e.style.marginTop = h + 'px';
    }
  }
};

var scrollVideoFixed = function scrollVideoFixed() {
  if (videoElement && videoElementAlt) {
    var h = videoElementAlt.getBoundingClientRect().height;
    var w = videoElementAlt.getBoundingClientRect().width;
    videoElement.style.position = 'fixed';
    videoElement.style.right = '1rem';
    videoElement.style.top = '5rem';
    videoElement.style.width = w + 'px';
    videoElement.style.height = h + 'px';
  }
};

addEventListener('DOMContentLoaded', function () {
  videoLayout(largeBp, fixedBp);
});

addEventListener('resize', function () {
  videoLayout(largeBp, fixedBp);
});

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Crear elementos con atributos e hijo
var createCustomElement = exports.createCustomElement = function createCustomElement(element, attributes, children) {
  var customElement = document.createElement(element);
  if (children !== undefined) children.forEach(function (el) {
    if (el.nodeType) {
      if (el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el);
    } else {
      customElement.innerHTML += el;
    }
  });
  addAttributes(customElement, attributes);
  return customElement;
};

// Añadir un objeto de atributos a un elemento
var addAttributes = exports.addAttributes = function addAttributes(element, attrObj) {
  for (var attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr]);
  }
};

// Envolver un elemento con otro
var wrap = exports.wrap = function wrap(selector, wrapElementType, attributesObj) {
  var element = getElement(selector),
      nextSibling = element.nextElementSibling,
      parent = element.parentElement,
      wrapElement = createCustomElement(wrapElementType, attributesObj, element);

  nextSibling ? parent.insertBefore(wrapElement, nextSibling) : parent.appendChild(wrapElement);

  return wrapElement;
};

// Retornar un elemento del DOM (revisar)
var getElement = exports.getElement = function getElement(elementOrSelector) {
  var e = void 0,
      g = void 0;
  if (elementOrSelector.nodeType === 1) {
    e = elementOrSelector;
  } else {
    g = document.querySelector(elementOrSelector);
    if (document.querySelector(g)) {
      e = document.querySelector(g);
    } else {
      e = document.createElement('div');
      console.error('Function getElement() requires a DOM element\n    or a valid selector. It has been created a placeholder element to avoid\n    execution errors, please fixed as soon as posible');
    }
  }
  return e;
};

// Media queries
var mediaQuery = function mediaQuery(breakpoint, cb) {
  var isChangeSize = function isChangeSize(mql) {
    return cb(mql.matches);
  };
  breakpoint.addListener(isChangeSize);
  isChangeSize(breakpoint);
};

// From (EDgrid equivalent)
// cb receive a boolean argument from mediaQuery() function
var from = function from(breakpoint, cb) {
  var bp = window.matchMedia('(min-width: ' + breakpoint + ')');
  mediaQuery(bp, cb);
};

// To (EDgrid equivalent)
// cb receive a boolean argument from mediaQuery() function
var to = function to(breakpoint, cb) {
  var bp = window.matchMedia('(max-width: ' + breakpoint + ')');
  mediaQuery(bp, cb);
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edModal = undefined;

var _helpers = require("./helpers");

// Crear e imprimir modal
var edModal = exports.edModal = function edModal(content) {
  var modalContentEl = (0, _helpers.createCustomElement)('div', {
    id: "ed-modal-content",
    class: "ed-modal-content"
  }, [content]),
      modalEl = (0, _helpers.createCustomElement)('div', {
    id: "ed-modal-container",
    class: "ed-modal-container"
  }, [modalContentEl]);

  // Imprimir modal
  document.body.appendChild(modalEl);

  // Remover modal
  var removeModal = function removeModal() {
    return document.body.removeChild(modalEl);
  };

  // cerrar modal con click
  modalEl.addEventListener('click', function (e) {
    if (e.target === modalEl) removeModal();
  });

  // cerrar modal con escape
  var offCloseModalEsc = function offCloseModalEsc() {
    return removeEventListener('keyup', closeModalEsc);
  };
  var closeModalEsc = function closeModalEsc(e) {
    if (e.key === "Escape") {
      removeModal();
      offCloseModalEsc();
    }
  };
  addEventListener('keyup', closeModalEsc);
};

},{"./helpers":7}]},{},[1]);

//# sourceMappingURL=scripts.js.map
