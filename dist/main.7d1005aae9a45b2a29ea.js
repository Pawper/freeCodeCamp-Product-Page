/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 141:
/***/ (() => {

var gallery = document.getElementsByClassName('images__grid')[0];

function addGalleryImages(aspectRatio) {
  var newLoop = true;
  var breakLoop = false;
  var image;
  var imageThumbs = new Array();
  var imageFulls = new Array();
  var imageIndex = 1;
  var interval = setInterval(addImage, 1);

  function addImage() {
    if (breakLoop) {
      clearInterval(interval);
      var elements = imageThumbs.map(function (x, i) {
        return [x, imageFulls[i]];
      });
      elements.forEach(function (element, index) {
        var photoElement = document.createElement('a');
        photoElement.setAttribute('href', element[1]);
        photoElement.setAttribute('target', '_blank');
        photoElement.setAttribute('class', "images__".concat(aspectRatio));
        photoElement.appendChild(element[0]);

        if (index === 0) {
          gallery.append(photoElement);
        } else {
          var galleryPhotos = gallery.children;
          var number = galleryPhotos.length;
          var insertionPoint = Math.floor((number + 1) * Math.random());

          if (number === insertionPoint) {
            gallery.append(photoElement);
          } else {
            galleryPhotos[insertionPoint].before(photoElement);
          }
        }
      });
    }

    if (newLoop) {
      newLoop = false;
      image = new Image();
      image.src = "../img/gallery/".concat(aspectRatio, "/thumb/").concat(imageIndex, ".png"); // image.loading = 'lazy'; // doesn't seem to work in Chrome

      image.onload = exists;
      image.onerror = absent;
    }
  }

  function exists() {
    var srcBreakup = this.src.split('/').reverse();
    var linkURL = "".concat(srcBreakup[4], "/").concat(srcBreakup[3], "/").concat(srcBreakup[2], "/full/").concat(srcBreakup[0]);
    imageThumbs.push(image);
    imageFulls.push(linkURL);
    imageIndex++;
    newLoop = true;
  }

  function absent() {
    console.log("^ Image does not exist, so not adding to gallery.");
    breakLoop = true;
  }
}

addGalleryImages('landscape');
addGalleryImages('portrait');
addGalleryImages('square');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/modules/Blog.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Blog = /*#__PURE__*/function () {
  function Blog() {
    _classCallCheck(this, Blog);

    this.xmlSource = 'feed.xml';
    this.blog = document.getElementsByClassName('news__blog')[0];
    this.events();
  }

  _createClass(Blog, [{
    key: "events",
    value: function () {
      var _events = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = document;
                _context.t1 = this;
                _context.next = 4;
                return this.getBlogObject(this.xmlSource);

              case 4:
                _context.t2 = _context.sent;
                _context.t3 = _context.t1.buildBlogPosts.call(_context.t1, _context.t2);

                _context.t0.addEventListener.call(_context.t0, 'DOMContentLoaded', _context.t3);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function events() {
        return _events.apply(this, arguments);
      }

      return events;
    }()
  }, {
    key: "getBlogObject",
    value: function () {
      var _getBlogObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(xmlSource) {
        var response, xmlString, parser, xml;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(xmlSource);

              case 2:
                response = _context2.sent;
                _context2.next = 5;
                return response.text();

              case 5:
                xmlString = _context2.sent;
                parser = new DOMParser();
                xml = parser.parseFromString(xmlString, "application/xml");
                return _context2.abrupt("return", xml);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getBlogObject(_x) {
        return _getBlogObject.apply(this, arguments);
      }

      return getBlogObject;
    }()
  }, {
    key: "buildBlogPosts",
    value: function buildBlogPosts(xml) {
      var _this = this;

      var blogPosts = xml.getElementsByTagName('item');
      Array.prototype.forEach.call(blogPosts, function (item) {
        var blogPost = document.createElement('article');
        blogPost.setAttribute('class', 'news__blog-post');
        var title = item.getElementsByTagName('title')[0].textContent;
        var link = item.getElementsByTagName('link')[0].textContent;
        var creator = item.getElementsByTagName('dc:creator')[0].textContent;
        var pubDate = item.getElementsByTagName('pubDate')[0].textContent;
        var dateMS = Date.parse(pubDate);
        var dateObject = new Date(dateMS);
        var mediaQuery = window.matchMedia('(min-width: 550px)');
        var options = {};
        var formattedDate = '';

        if (mediaQuery.matches) {
          options = {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short"
          };
          formattedDate = dateObject.toLocaleString('en-US', options);
        } else {
          options = {
            dateStyle: "short"
          };
          formattedDate = dateObject.toLocaleDateString('en-US', options);
        }

        var category = item.getElementsByTagName('category')[0].textContent;
        var content = item.getElementsByTagName('content:encoded')[0].textContent;
        blogPost.innerHTML = "\n            <a target=\"_blank\" class=\"news__blog-post-title\" href=\"".concat(link, "\"><h3>").concat(title, "</h3></a>\n            <div class=\"news__blog-post-nav\"><p class=\"news__blog-post-tags\"><a target=\"_blank\" href=\"").concat(link, "\" class=\"news__blog-post-date\"><i class=\"far fa-calendar-alt\"></i> ").concat(formattedDate, "</a><a target=\"_blank\" href=\"http://tombraider-dox.com/author/").concat(creator, "/\" class=\"news__blog-post-author\"><i class=\"fas fa-user\"></i> ").concat(creator, "</a><a target=\"_blank\" href=\"http://tombraider-dox.com/category/").concat(category, "/\" class=\"news__blog-post-category\"><i class=\"fas fa-tag\"></i> ").concat(category, "</a></p></div>\n            <div class=\"news__blog-post-content\">\n            ").concat(content, "</div>\n          ");

        _this.blog.append(blogPost);
      });
      var latestPost = this.blog.getElementsByClassName('news__blog-post')[0];
      latestPost.style.display = "grid";
      latestPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("afterbegin", "<a class=\"news__blog-post-back\" onclick=\"showPreviousPost(this)\" title=\"Previous Post\"><i class=\"fas fa-chevron-left\"></i></a>");
      var blogImages = this.blog.querySelectorAll('img');
      Array.prototype.forEach.call(blogImages, function (blogImage) {
        var fileName = blogImage.src.substring(blogImage.src.lastIndexOf('/') + 1);
        var newFilePath = "img/blog/".concat(fileName);
        blogImage.src = newFilePath;
      });
      var blogPostLinks = this.blog.querySelectorAll('.news__blog-post-content a');
      Array.prototype.forEach.call(blogPostLinks, function (link) {
        link.target = '_blank';
      });
    }
  }]);

  return Blog;
}();


;// CONCATENATED MODULE: ./src/js/modules/closeMenu.js
function closeMenu() {
  var toggleInput = document.getElementById('navbar-collapse');
  toggleInput.checked = false;
}

/* harmony default export */ const modules_closeMenu = (closeMenu);
;// CONCATENATED MODULE: ./src/js/modules/Videos.js
function Videos_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Videos_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Videos_createClass(Constructor, protoProps, staticProps) { if (protoProps) Videos_defineProperties(Constructor.prototype, protoProps); if (staticProps) Videos_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Videos = /*#__PURE__*/function () {
  function Videos() {
    Videos_classCallCheck(this, Videos);

    this.videos = document.getElementsByClassName("gameplay__video");
    this.previousButton = document.querySelector('.gameplay__previous-video');
    this.nextButton = document.querySelector('.gameplay__next-video');
    this.currentVideo = this.videos[0];
    this.updateVideoOrder();
    this.hideVideos();
    this.showVideo(this.currentVideo);
    this.events();
  }

  Videos_createClass(Videos, [{
    key: "events",
    value: function events() {
      var _this = this;

      this.previousButton.addEventListener('click', function () {
        return _this.showPreviousVideo();
      });
      this.nextButton.addEventListener('click', function () {
        return _this.showNextVideo();
      });
    }
  }, {
    key: "updateVideoOrder",
    value: function updateVideoOrder() {
      var currentVideoIndex = Array.from(this.videos).indexOf(this.currentVideo);
      var previousVideoIndex = currentVideoIndex - 1;
      var nextVideoIndex = currentVideoIndex + 1;
      var lastVideoIndex = this.videos.length - 1;

      if (currentVideoIndex === 0) {
        previousVideoIndex = lastVideoIndex;
      } else if (currentVideoIndex === lastVideoIndex) {
        nextVideoIndex = 0;
      }

      this.previousVideo = this.videos[previousVideoIndex];
      this.nextVideo = this.videos[nextVideoIndex];
    }
  }, {
    key: "hideVideos",
    value: function hideVideos() {
      Array.from(this.videos).forEach(function (video) {
        video.style.display = "none";
      });
    }
  }, {
    key: "showVideo",
    value: function showVideo(video) {
      video.style.display = "block";
    }
  }, {
    key: "showPreviousVideo",
    value: function showPreviousVideo() {
      this.hideVideos();
      this.currentVideo = this.previousVideo;
      this.showVideo(this.currentVideo);
      this.updateVideoOrder();
    }
  }, {
    key: "showNextVideo",
    value: function showNextVideo() {
      this.hideVideos();
      this.currentVideo = this.nextVideo;
      this.showVideo(this.currentVideo);
      this.updateVideoOrder();
    }
  }]);

  return Videos;
}();


// EXTERNAL MODULE: ./src/js/modules/gallery.js
var gallery = __webpack_require__(141);
;// CONCATENATED MODULE: ./src/js/main.js





new Videos();
var blogInstance = new Blog();
var blog = blogInstance.blog;

window.showPreviousPost = function (target) {
  var visiblePost = target.parentElement.parentElement;
  var visibleIndex = Array.prototype.indexOf.call(blog.children, visiblePost);
  var previousPost = blog.getElementsByClassName('news__blog-post')[visibleIndex + 1];
  var prevousIndex = Array.prototype.indexOf.call(blog.children, previousPost);
  visiblePost.style.display = "none";
  previousPost.style.display = "grid";

  if (prevousIndex < blog.children.length - 1) {
    previousPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("afterbegin", "<a class=\"news__blog-post-back\" onclick=\"showPreviousPost(this)\" title=\"Previous Post\"><i class=\"fas fa-chevron-left\"></i></a>");
  }

  previousPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("beforeend", "<a class=\"news__blog-post-forward\" onclick=\"showNextPost(this)\" title=\"Next Post\"><i class=\"fas fa-chevron-right\"></i></a>");
};

window.showNextPost = function (target) {
  var visiblePost = target.parentElement.parentElement;
  var visibleIndex = Array.prototype.indexOf.call(blog.children, visiblePost);
  var nextPost = blog.getElementsByClassName('news__blog-post')[visibleIndex - 1];
  var prevousIndex = Array.prototype.indexOf.call(blog.children, nextPost);
  visiblePost.style.display = "none";
  nextPost.style.display = "grid";

  if (prevousIndex > 0) {
    nextPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("beforeend", "<a class=\"news__blog-post-forward\" onclick=\"showNextPost(this)\" title=\"Next Post\"><i class=\"fas fa-chevron-right\"></i></a>");
  }

  nextPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("afterbegin", "<a class=\"news__blog-post-back\" onclick=\"showPreviousPost(this)\" title=\"Previous Post\"><i class=\"fas fa-chevron-left\"></i></a>");
};

modules_closeMenu();
})();

/******/ })()
;
//# sourceMappingURL=main.7d1005aae9a45b2a29ea.js.map