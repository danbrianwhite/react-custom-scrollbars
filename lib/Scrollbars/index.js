'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf2 = require('raf');

var _raf3 = _interopRequireDefault(_raf2);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isString = require('../utils/isString');

var _isString2 = _interopRequireDefault(_isString);

var _returnFalse = require('../utils/returnFalse');

var _returnFalse2 = _interopRequireDefault(_returnFalse);

var _getInnerWidth = require('../utils/getInnerWidth');

var _getInnerWidth2 = _interopRequireDefault(_getInnerWidth);

var _getInnerHeight = require('../utils/getInnerHeight');

var _getInnerHeight2 = _interopRequireDefault(_getInnerHeight);

var _styles = require('./styles');

var _defaultRenderElements = require('./defaultRenderElements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scrollbars = function (_React$Component) {
    _inherits(Scrollbars, _React$Component);

    function Scrollbars(props) {
        var _ref;

        _classCallCheck(this, Scrollbars);

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Scrollbars.__proto__ || Object.getPrototypeOf(Scrollbars)).call.apply(_ref, [this, props].concat(rest)));

        _this.handleTrackMouseEnter = _this.handleTrackMouseEnter.bind(_this);
        _this.handleTrackMouseLeave = _this.handleTrackMouseLeave.bind(_this);
        _this.handleHorizontalTrackMouseDown = _this.handleHorizontalTrackMouseDown.bind(_this);
        _this.handleVerticalTrackMouseDown = _this.handleVerticalTrackMouseDown.bind(_this);
        _this.handleHorizontalThumbMouseDown = _this.handleHorizontalThumbMouseDown.bind(_this);
        _this.handleVerticalThumbMouseDown = _this.handleVerticalThumbMouseDown.bind(_this);
        _this.handleWindowResize = _this.handleWindowResize.bind(_this);
        _this.handleScroll = _this.handleScroll.bind(_this);
        _this.handleDrag = _this.handleDrag.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);

        _this.state = _this.getInitialState();
        return _this;
    }

    _createClass(Scrollbars, [{
        key: 'getInitialState',
        value: function getInitialState() {
            return {
                didMountUniversal: false
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.addListeners();
            this.update();
            this.componentDidMountUniversal();
        }
    }, {
        key: 'componentDidMountUniversal',
        value: function componentDidMountUniversal() {
            // eslint-disable-line react/sort-comp
            var universal = this.props.universal;

            if (!universal) return;
            this.setState({ didMountUniversal: true });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.update();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.removeListeners();
            (0, _raf2.cancel)(this.requestFrame);
            clearTimeout(this.hideTracksTimeout);
            clearInterval(this.detectScrollingInterval);
        }
    }, {
        key: 'getScrollLeft',
        value: function getScrollLeft() {
            var view = this.refs.view;

            return view.scrollLeft;
        }
    }, {
        key: 'getScrollTop',
        value: function getScrollTop() {
            var view = this.refs.view;

            return view.scrollTop;
        }
    }, {
        key: 'getScrollWidth',
        value: function getScrollWidth() {
            var view = this.refs.view;

            return view.scrollWidth - this.getPaddingWidth();
        }
    }, {
        key: 'getScrollHeight',
        value: function getScrollHeight() {
            var view = this.refs.view;

            return view.scrollHeight - this.getPaddingHeight();
        }
    }, {
        key: 'getClientWidth',
        value: function getClientWidth() {
            var view = this.refs.view;

            return view.clientWidth - this.getPaddingWidth();
        }
    }, {
        key: 'getClientHeight',
        value: function getClientHeight() {
            var view = this.refs.view;

            return view.clientHeight - this.getPaddingHeight();
        }
    }, {
        key: 'getPaddingWidth',
        value: function getPaddingWidth() {
            return _styles.scrollbarSize;
        }
    }, {
        key: 'getPaddingHeight',
        value: function getPaddingHeight() {
            return _styles.scrollbarSize;
        }
    }, {
        key: 'getValues',
        value: function getValues() {
            var view = this.refs.view;
            var scrollLeft = view.scrollLeft,
                scrollTop = view.scrollTop;


            var scrollWidth = view.scrollWidth - this.getPaddingWidth();
            var scrollHeight = view.scrollHeight - this.getPaddingHeight();
            var clientWidth = view.clientWidth - this.getPaddingWidth();
            var clientHeight = view.clientHeight - this.getPaddingHeight();

            return {
                left: scrollLeft / (scrollWidth - clientWidth) || 0,
                top: scrollTop / (scrollHeight - clientHeight) || 0,
                scrollLeft: scrollLeft,
                scrollTop: scrollTop,
                scrollWidth: scrollWidth,
                scrollHeight: scrollHeight,
                clientWidth: clientWidth,
                clientHeight: clientHeight
            };
        }
    }, {
        key: 'getThumbHorizontalWidth',
        value: function getThumbHorizontalWidth() {
            var _props = this.props,
                thumbSize = _props.thumbSize,
                thumbMinSize = _props.thumbMinSize;
            var _refs = this.refs,
                view = _refs.view,
                trackHorizontal = _refs.trackHorizontal;

            var scrollWidth = view.scrollWidth - this.getPaddingWidth();
            var clientWidth = view.clientWidth - this.getPaddingWidth();
            var trackWidth = (0, _getInnerWidth2["default"])(trackHorizontal);
            var width = clientWidth / scrollWidth * trackWidth;
            if (scrollWidth <= clientWidth) return 0;
            if (thumbSize) return thumbSize;
            return Math.max(width, thumbMinSize);
        }
    }, {
        key: 'getThumbVerticalHeight',
        value: function getThumbVerticalHeight() {
            var _props2 = this.props,
                thumbSize = _props2.thumbSize,
                thumbMinSize = _props2.thumbMinSize;
            var _refs2 = this.refs,
                view = _refs2.view,
                trackVertical = _refs2.trackVertical;

            var scrollHeight = view.scrollHeight - this.getPaddingHeight();
            var clientHeight = view.clientHeight - this.getPaddingHeight();
            var trackHeight = (0, _getInnerHeight2["default"])(trackVertical);
            var height = clientHeight / scrollHeight * trackHeight;
            if (scrollHeight <= clientHeight) return 0;
            if (thumbSize) return thumbSize;
            return Math.max(height, thumbMinSize);
        }
    }, {
        key: 'getScrollLeftForOffset',
        value: function getScrollLeftForOffset(offset) {
            var _refs3 = this.refs,
                view = _refs3.view,
                trackHorizontal = _refs3.trackHorizontal;

            var scrollWidth = view.scrollWidth - this.getPaddingWidth();
            var clientWidth = view.clientWidth - this.getPaddingWidth();
            var trackWidth = (0, _getInnerWidth2["default"])(trackHorizontal);
            var thumbWidth = this.getThumbHorizontalWidth();
            return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
        }
    }, {
        key: 'getScrollTopForOffset',
        value: function getScrollTopForOffset(offset) {
            var _refs4 = this.refs,
                view = _refs4.view,
                trackVertical = _refs4.trackVertical;

            var scrollHeight = view.scrollHeight - this.getPaddingHeight();
            var clientHeight = view.clientHeight - this.getPaddingHeight();
            var trackHeight = (0, _getInnerHeight2["default"])(trackVertical);
            var thumbHeight = this.getThumbVerticalHeight();
            return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
        }
    }, {
        key: 'scrollLeft',
        value: function scrollLeft() {
            var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var view = this.refs.view;

            view.scrollLeft = left;
        }
    }, {
        key: 'scrollTop',
        value: function scrollTop() {
            var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var view = this.refs.view;

            view.scrollTop = top;
        }
    }, {
        key: 'scrollToLeft',
        value: function scrollToLeft() {
            var view = this.refs.view;

            view.scrollLeft = 0;
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop() {
            var view = this.refs.view;

            view.scrollTop = 0;
        }
    }, {
        key: 'scrollToRight',
        value: function scrollToRight() {
            var view = this.refs.view;

            view.scrollLeft = view.scrollWidth - this.getPaddingWidth();
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
            var view = this.refs.view;

            view.scrollTop = view.scrollHeight - this.getPaddingHeight();
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            /* istanbul ignore if */
            if (typeof document === 'undefined') return;
            var _refs5 = this.refs,
                view = _refs5.view,
                trackHorizontal = _refs5.trackHorizontal,
                trackVertical = _refs5.trackVertical,
                thumbHorizontal = _refs5.thumbHorizontal,
                thumbVertical = _refs5.thumbVertical;

            view.addEventListener('scroll', this.handleScroll);
            trackHorizontal.addEventListener('mouseenter', this.handleTrackMouseEnter);
            trackHorizontal.addEventListener('mouseleave', this.handleTrackMouseLeave);
            trackHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
            trackVertical.addEventListener('mouseenter', this.handleTrackMouseEnter);
            trackVertical.addEventListener('mouseleave', this.handleTrackMouseLeave);
            trackVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
            thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
            thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
            window.addEventListener('resize', this.handleWindowResize);
        }
    }, {
        key: 'removeListeners',
        value: function removeListeners() {
            /* istanbul ignore if */
            if (typeof document === 'undefined') return;
            var _refs6 = this.refs,
                view = _refs6.view,
                trackHorizontal = _refs6.trackHorizontal,
                trackVertical = _refs6.trackVertical,
                thumbHorizontal = _refs6.thumbHorizontal,
                thumbVertical = _refs6.thumbVertical;

            view.removeEventListener('scroll', this.handleScroll);
            trackHorizontal.removeEventListener('mouseenter', this.handleTrackMouseEnter);
            trackHorizontal.removeEventListener('mouseleave', this.handleTrackMouseLeave);
            trackHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
            trackVertical.removeEventListener('mouseenter', this.handleTrackMouseEnter);
            trackVertical.removeEventListener('mouseleave', this.handleTrackMouseLeave);
            trackVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
            thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
            thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
            window.removeEventListener('resize', this.handleWindowResize);
            // Possibly setup by `handleDragStart`
            this.teardownDragging();
        }
    }, {
        key: 'handleScroll',
        value: function handleScroll(event) {
            var _this2 = this;

            var _props3 = this.props,
                onScroll = _props3.onScroll,
                onScrollFrame = _props3.onScrollFrame;

            if (onScroll) onScroll(event);
            this.update(function (values) {
                var scrollLeft = values.scrollLeft,
                    scrollTop = values.scrollTop;

                _this2.viewScrollLeft = scrollLeft;
                _this2.viewScrollTop = scrollTop;
                if (onScrollFrame) onScrollFrame(values);
            });
            this.detectScrolling();
        }
    }, {
        key: 'handleScrollStart',
        value: function handleScrollStart() {
            var onScrollStart = this.props.onScrollStart;

            if (onScrollStart) onScrollStart();
            this.handleScrollStartAutoHide();
        }
    }, {
        key: 'handleScrollStartAutoHide',
        value: function handleScrollStartAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.showTracks();
        }
    }, {
        key: 'handleScrollStop',
        value: function handleScrollStop() {
            var onScrollStop = this.props.onScrollStop;

            if (onScrollStop) onScrollStop();
            this.handleScrollStopAutoHide();
        }
    }, {
        key: 'handleScrollStopAutoHide',
        value: function handleScrollStopAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.hideTracks();
        }
    }, {
        key: 'handleWindowResize',
        value: function handleWindowResize() {
            this.update();
        }
    }, {
        key: 'handleHorizontalTrackMouseDown',
        value: function handleHorizontalTrackMouseDown() {
            var view = this.refs.view;
            var _event = event,
                target = _event.target,
                clientX = _event.clientX;

            var _target$getBoundingCl = target.getBoundingClientRect(),
                targetLeft = _target$getBoundingCl.left;

            var thumbWidth = this.getThumbHorizontalWidth();
            var offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
            view.scrollLeft = this.getScrollLeftForOffset(offset);
        }
    }, {
        key: 'handleVerticalTrackMouseDown',
        value: function handleVerticalTrackMouseDown(event) {
            var view = this.refs.view;
            var target = event.target,
                clientY = event.clientY;

            var _target$getBoundingCl2 = target.getBoundingClientRect(),
                targetTop = _target$getBoundingCl2.top;

            var thumbHeight = this.getThumbVerticalHeight();
            var offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
            view.scrollTop = this.getScrollTopForOffset(offset);
        }
    }, {
        key: 'handleHorizontalThumbMouseDown',
        value: function handleHorizontalThumbMouseDown(event) {
            this.handleDragStart(event);
            var target = event.target,
                clientX = event.clientX;
            var offsetWidth = target.offsetWidth;

            var _target$getBoundingCl3 = target.getBoundingClientRect(),
                left = _target$getBoundingCl3.left;

            this.prevPageX = offsetWidth - (clientX - left);
        }
    }, {
        key: 'handleVerticalThumbMouseDown',
        value: function handleVerticalThumbMouseDown(event) {
            this.handleDragStart(event);
            var target = event.target,
                clientY = event.clientY;
            var offsetHeight = target.offsetHeight;

            var _target$getBoundingCl4 = target.getBoundingClientRect(),
                top = _target$getBoundingCl4.top;

            this.prevPageY = offsetHeight - (clientY - top);
        }
    }, {
        key: 'setupDragging',
        value: function setupDragging() {
            (0, _domCss2["default"])(document.body, _styles.disableSelectStyle);
            document.addEventListener('mousemove', this.handleDrag);
            document.addEventListener('mouseup', this.handleDragEnd);
            document.onselectstart = _returnFalse2["default"];
        }
    }, {
        key: 'teardownDragging',
        value: function teardownDragging() {
            (0, _domCss2["default"])(document.body, _styles.disableSelectStyleReset);
            document.removeEventListener('mousemove', this.handleDrag);
            document.removeEventListener('mouseup', this.handleDragEnd);
            document.onselectstart = undefined;
        }
    }, {
        key: 'handleDragStart',
        value: function handleDragStart(event) {
            this.dragging = true;
            event.stopImmediatePropagation();
            this.setupDragging();
        }
    }, {
        key: 'handleDrag',
        value: function handleDrag(event) {
            if (this.prevPageX) {
                var clientX = event.clientX;
                var _refs7 = this.refs,
                    view = _refs7.view,
                    trackHorizontal = _refs7.trackHorizontal;

                var _trackHorizontal$getB = trackHorizontal.getBoundingClientRect(),
                    trackLeft = _trackHorizontal$getB.left;

                var thumbWidth = this.getThumbHorizontalWidth();
                var clickPosition = thumbWidth - this.prevPageX;
                var offset = -trackLeft + clientX - clickPosition;
                view.scrollLeft = this.getScrollLeftForOffset(offset);
            }
            if (this.prevPageY) {
                var clientY = event.clientY;
                var _refs8 = this.refs,
                    _view = _refs8.view,
                    trackVertical = _refs8.trackVertical;

                var _trackVertical$getBou = trackVertical.getBoundingClientRect(),
                    trackTop = _trackVertical$getBou.top;

                var thumbHeight = this.getThumbVerticalHeight();
                var _clickPosition = thumbHeight - this.prevPageY;
                var _offset = -trackTop + clientY - _clickPosition;
                _view.scrollTop = this.getScrollTopForOffset(_offset);
            }
            return false;
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
            this.dragging = false;
            this.prevPageX = this.prevPageY = 0;
            this.teardownDragging();
            this.handleDragEndAutoHide();
        }
    }, {
        key: 'handleDragEndAutoHide',
        value: function handleDragEndAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.hideTracks();
        }
    }, {
        key: 'handleTrackMouseEnter',
        value: function handleTrackMouseEnter() {
            this.trackMouseOver = true;
            this.handleTrackMouseEnterAutoHide();
        }
    }, {
        key: 'handleTrackMouseEnterAutoHide',
        value: function handleTrackMouseEnterAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.showTracks();
        }
    }, {
        key: 'handleTrackMouseLeave',
        value: function handleTrackMouseLeave() {
            this.trackMouseOver = false;
            this.handleTrackMouseLeaveAutoHide();
        }
    }, {
        key: 'handleTrackMouseLeaveAutoHide',
        value: function handleTrackMouseLeaveAutoHide() {
            var autoHide = this.props.autoHide;

            if (!autoHide) return;
            this.hideTracks();
        }
    }, {
        key: 'showTracks',
        value: function showTracks() {
            var _refs9 = this.refs,
                trackHorizontal = _refs9.trackHorizontal,
                trackVertical = _refs9.trackVertical;

            clearTimeout(this.hideTracksTimeout);
            (0, _domCss2["default"])(trackHorizontal, { opacity: 1 });
            (0, _domCss2["default"])(trackVertical, { opacity: 1 });
        }
    }, {
        key: 'hideTracks',
        value: function hideTracks() {
            if (this.dragging) return;
            if (this.scrolling) return;
            if (this.trackMouseOver) return;
            var autoHideTimeout = this.props.autoHideTimeout;
            var _refs10 = this.refs,
                trackHorizontal = _refs10.trackHorizontal,
                trackVertical = _refs10.trackVertical;

            clearTimeout(this.hideTracksTimeout);
            this.hideTracksTimeout = setTimeout(function () {
                (0, _domCss2["default"])(trackHorizontal, { opacity: 0 });
                (0, _domCss2["default"])(trackVertical, { opacity: 0 });
            }, autoHideTimeout);
        }
    }, {
        key: 'detectScrolling',
        value: function detectScrolling() {
            var _this3 = this;

            if (this.scrolling) return;
            this.scrolling = true;
            this.handleScrollStart();
            this.detectScrollingInterval = setInterval(function () {
                if (_this3.lastViewScrollLeft === _this3.viewScrollLeft && _this3.lastViewScrollTop === _this3.viewScrollTop) {
                    clearInterval(_this3.detectScrollingInterval);
                    _this3.scrolling = false;
                    _this3.handleScrollStop();
                }
                _this3.lastViewScrollLeft = _this3.viewScrollLeft;
                _this3.lastViewScrollTop = _this3.viewScrollTop;
            }, 100);
        }
    }, {
        key: 'raf',
        value: function raf(callback) {
            var _this4 = this;

            if (this.requestFrame) _raf3["default"].cancel(this.requestFrame);
            this.requestFrame = (0, _raf3["default"])(function () {
                _this4.requestFrame = undefined;
                callback();
            });
        }
    }, {
        key: 'update',
        value: function update(callback) {
            var _this5 = this;

            this.raf(function () {
                return _this5._update(callback);
            });
        }
    }, {
        key: '_update',
        value: function _update(callback) {
            var _props4 = this.props,
                onUpdate = _props4.onUpdate,
                hideTracksWhenNotNeeded = _props4.hideTracksWhenNotNeeded;
            var _refs11 = this.refs,
                thumbHorizontal = _refs11.thumbHorizontal,
                thumbVertical = _refs11.thumbVertical,
                trackHorizontal = _refs11.trackHorizontal,
                trackVertical = _refs11.trackVertical,
                container = _refs11.container;

            container.scrollTop = 0;
            container.scrollLeft = 0;
            var values = this.getValues();
            var scrollLeft = values.scrollLeft,
                clientWidth = values.clientWidth,
                scrollWidth = values.scrollWidth;

            var trackHorizontalWidth = (0, _getInnerWidth2["default"])(trackHorizontal);
            var thumbHorizontalWidth = this.getThumbHorizontalWidth();
            var thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
            var thumbHorizontalStyle = {
                width: thumbHorizontalWidth,
                transform: 'translateX(' + thumbHorizontalX + 'px)'
            };
            var scrollTop = values.scrollTop,
                clientHeight = values.clientHeight,
                scrollHeight = values.scrollHeight;

            var trackVerticalHeight = (0, _getInnerHeight2["default"])(trackVertical);
            var thumbVerticalHeight = this.getThumbVerticalHeight();
            var thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
            var thumbVerticalStyle = {
                height: thumbVerticalHeight,
                transform: 'translateY(' + thumbVerticalY + 'px)'
            };
            if (hideTracksWhenNotNeeded) {
                var trackHorizontalStyle = {
                    visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
                };
                var trackVerticalStyle = {
                    visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
                };
                (0, _domCss2["default"])(trackHorizontal, trackHorizontalStyle);
                (0, _domCss2["default"])(trackVertical, trackVerticalStyle);
            }
            (0, _domCss2["default"])(thumbHorizontal, thumbHorizontalStyle);
            (0, _domCss2["default"])(thumbVertical, thumbVerticalStyle);
            if (onUpdate) onUpdate(values);
            if (typeof callback !== 'function') return;
            callback(values);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props5 = this.props,
                onScroll = _props5.onScroll,
                onScrollFrame = _props5.onScrollFrame,
                onScrollStart = _props5.onScrollStart,
                onScrollStop = _props5.onScrollStop,
                renderView = _props5.renderView,
                renderTrackHorizontal = _props5.renderTrackHorizontal,
                renderTrackVertical = _props5.renderTrackVertical,
                renderThumbHorizontal = _props5.renderThumbHorizontal,
                renderThumbVertical = _props5.renderThumbVertical,
                autoHide = _props5.autoHide,
                autoHideTimeout = _props5.autoHideTimeout,
                autoHideDuration = _props5.autoHideDuration,
                thumbSize = _props5.thumbSize,
                thumbMinSize = _props5.thumbMinSize,
                universal = _props5.universal,
                autoHeight = _props5.autoHeight,
                autoHeightMin = _props5.autoHeightMin,
                autoHeightMax = _props5.autoHeightMax,
                autoWidth = _props5.autoWidth,
                autoWidthMin = _props5.autoWidthMin,
                autoWidthMax = _props5.autoWidthMax,
                style = _props5.style,
                children = _props5.children,
                props = _objectWithoutProperties(_props5, ['onScroll', 'onScrollFrame', 'onScrollStart', 'onScrollStop', 'renderView', 'renderTrackHorizontal', 'renderTrackVertical', 'renderThumbHorizontal', 'renderThumbVertical', 'autoHide', 'autoHideTimeout', 'autoHideDuration', 'thumbSize', 'thumbMinSize', 'universal', 'autoHeight', 'autoHeightMin', 'autoHeightMax', 'autoWidth', 'autoWidthMin', 'autoWidthMax', 'style', 'children']);

            var didMountUniversal = this.state.didMountUniversal;


            var containerStyle = _extends({}, _styles.containerStyleDefault, autoHeight && _extends({}, _styles.containerStyleAutoHeight, {
                minHeight: autoHeightMin,
                maxHeight: autoHeightMax
            }), style);

            var viewStyle = _extends({}, _styles.viewStyleDefault, {
                // Hide scrollbars by setting a negative margin
                marginRight: -this.getPaddingWidth(),
                marginBottom: -this.getPaddingHeight()
            }, autoHeight && _extends({}, _styles.viewStyleAutoHeight, {
                // Add paddingHeight to autoHeight in order to compensate negative margins
                minHeight: (0, _isString2["default"])(autoHeightMin) ? 'calc(' + autoHeightMin + ' + ' + this.getPaddingHeight() + 'px)' : autoHeightMin + this.getPaddingHeight(),
                maxHeight: (0, _isString2["default"])(autoHeightMax) ? 'calc(' + autoHeightMax + ' + ' + this.getPaddingHeight() + 'px)' : autoHeightMax + this.getPaddingHeight()
            }), universal && !didMountUniversal && _styles.viewStyleUniversalInitial);

            var viewWrapperStyle = _extends({}, _styles.viewWrapperStyleDefault, autoWidth && _extends({}, _styles.viewWrapperStyleAutoHeight, {
                minWidth: autoWidthMin,
                maxWidth: autoWidthMax
            }));

            var viewWrappedStyle = _extends({}, _styles.viewWrappedStyleDefault);

            var trackAutoHeightStyle = {
                transition: 'opacity ' + autoHideDuration + 'ms',
                opacity: 0
            };

            var trackHorizontalStyle = _extends({}, _styles.trackHorizontalStyleDefault, autoHide && trackAutoHeightStyle, universal && !didMountUniversal && {
                display: 'none'
            });

            var trackVerticalStyle = _extends({}, _styles.trackVerticalStyleDefault, autoHide && trackAutoHeightStyle, universal && !didMountUniversal && {
                display: 'none'
            });

            return _react2["default"].createElement(
                'div',
                _extends({}, props.className ? { className: props.className } : {}, { style: containerStyle, ref: 'container' }),
                _react2["default"].createElement(
                    'div',
                    { style: viewStyle, ref: 'view' },
                    _react2["default"].createElement(
                        'div',
                        { style: viewWrapperStyle, ref: 'viewWrapper' },
                        (0, _react.cloneElement)(renderView({ style: viewWrappedStyle }), { ref: 'viewWrapped' }, children)
                    )
                ),
                (0, _react.cloneElement)(renderTrackHorizontal({ style: trackHorizontalStyle }), { ref: 'trackHorizontal' }, (0, _react.cloneElement)(renderThumbHorizontal({ style: _styles.thumbHorizontalStyleDefault }), { ref: 'thumbHorizontal' })),
                (0, _react.cloneElement)(renderTrackVertical({ style: trackVerticalStyle }), { ref: 'trackVertical' }, (0, _react.cloneElement)(renderThumbVertical({ style: _styles.thumbVerticalStyleDefault }), { ref: 'thumbVertical' }))
            );
        }
    }]);

    return Scrollbars;
}(_react2["default"].Component);

exports["default"] = Scrollbars;


Scrollbars.propTypes = {
    onScroll: _propTypes2["default"].func,
    onScrollFrame: _propTypes2["default"].func,
    onScrollStart: _propTypes2["default"].func,
    onScrollStop: _propTypes2["default"].func,
    onUpdate: _propTypes2["default"].func,
    renderView: _propTypes2["default"].func,
    renderTrackHorizontal: _propTypes2["default"].func,
    renderTrackVertical: _propTypes2["default"].func,
    renderThumbHorizontal: _propTypes2["default"].func,
    renderThumbVertical: _propTypes2["default"].func,
    tagName: _propTypes2["default"].string,
    thumbSize: _propTypes2["default"].number,
    thumbMinSize: _propTypes2["default"].number,
    hideTracksWhenNotNeeded: _propTypes2["default"].bool,
    autoHide: _propTypes2["default"].bool,
    autoHideTimeout: _propTypes2["default"].number,
    autoHideDuration: _propTypes2["default"].number,
    autoHeight: _propTypes2["default"].bool,
    autoHeightMin: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
    autoHeightMax: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
    autoWidth: _propTypes2["default"].bool,
    autoWidthMin: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
    autoWidthMax: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
    universal: _propTypes2["default"].bool,
    style: _propTypes2["default"].object,
    children: _propTypes2["default"].node
};

Scrollbars.defaultProps = {
    renderView: _defaultRenderElements.renderViewDefault,
    renderTrackHorizontal: _defaultRenderElements.renderTrackHorizontalDefault,
    renderTrackVertical: _defaultRenderElements.renderTrackVerticalDefault,
    renderThumbHorizontal: _defaultRenderElements.renderThumbHorizontalDefault,
    renderThumbVertical: _defaultRenderElements.renderThumbVerticalDefault,
    tagName: 'div',
    thumbMinSize: 30,
    hideTracksWhenNotNeeded: false,
    autoHide: false,
    autoHideTimeout: 1000,
    autoHideDuration: 200,
    autoHeight: false,
    autoHeightMin: 0,
    autoHeightMax: 200,
    autoWidth: false,
    autoWidthMin: '100%',
    autoWidthMax: '100%',
    universal: false
};