'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateCalendarRange = require('./shared/DateCalendarRange');

var _DateCalendarRange2 = _interopRequireDefault(_DateCalendarRange);

var _DateMonths = require('./shared/DateMonths');

var _DateMonths2 = _interopRequireDefault(_DateMonths);

var _angleLeft = require('react-icons/lib/fa/angle-left');

var _angleLeft2 = _interopRequireDefault(_angleLeft);

var _angleRight = require('react-icons/lib/fa/angle-right');

var _angleRight2 = _interopRequireDefault(_angleRight);

var _angleDoubleLeft = require('react-icons/lib/fa/angle-double-left');

var _angleDoubleLeft2 = _interopRequireDefault(_angleDoubleLeft);

var _angleDoubleRight = require('react-icons/lib/fa/angle-double-right');

var _angleDoubleRight2 = _interopRequireDefault(_angleDoubleRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

    _this.state = {
      mode: 'calendar'
    };
    return _this;
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var mode = this.state.mode;
      var _props = this.props,
          startMoment = _props.startMoment,
          endMoment = _props.endMoment;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('im-date-picker', this.props.className) },
        _react2.default.createElement(Toolbar, {
          display: startMoment.format('MMMM YYYY'),
          onPrevMonth: this.onPrevMonth.bind(this),
          onNextMonth: this.onNextMonth.bind(this),
          onPrevYear: this.onPrevYear.bind(this),
          onNextYear: this.onNextYear.bind(this),
          onToggleMode: this.onToggleMode.bind(this)
        }),
        mode === 'calendar' && _react2.default.createElement(_DateCalendarRange2.default, { startMoment: startMoment, endMoment: endMoment, onDaySelect: this.onDaySelect.bind(this) }),
        mode === 'months' && _react2.default.createElement(_DateMonths2.default, { moment: startMoment, onMonthSelect: this.onMonthSelect.bind(this) })
      );
    }
  }, {
    key: 'onPrevMonth',
    value: function onPrevMonth(e) {
      e.preventDefault();
      var startMoment = this.props.startMoment.clone();
      var endMoment = this.props.endMoment.clone();

      startMoment.subtract(1, 'month');
      endMoment.subtract(1, 'month');
      this.fireChangeEvent(startMoment, endMoment);
    }
  }, {
    key: 'onNextMonth',
    value: function onNextMonth(e) {
      e.preventDefault();
      var startMoment = this.props.startMoment.clone();
      var endMoment = this.props.endMoment.clone();

      startMoment.add(1, 'month');
      endMoment.add(1, 'month');
      this.fireChangeEvent(startMoment, endMoment);
    }
  }, {
    key: 'onPrevYear',
    value: function onPrevYear(e) {
      e.preventDefault();
      var startMoment = this.props.startMoment.clone();
      var endMoment = this.props.endMoment.clone();

      startMoment.subtract(1, 'year');
      endMoment.subtract(1, 'year');
      this.fireChangeEvent(startMoment, endMoment);
    }
  }, {
    key: 'onNextYear',
    value: function onNextYear(e) {
      e.preventDefault();
      var startMoment = this.props.startMoment.clone();
      var endMoment = this.props.endMoment.clone();

      startMoment.add(1, 'year');
      endMoment.add(1, 'year');
      this.fireChangeEvent(startMoment, endMoment);
    }
  }, {
    key: 'onToggleMode',
    value: function onToggleMode() {
      this.setState({
        mode: this.state.mode === 'calendar' ? 'months' : 'calendar'
      });
    }
  }, {
    key: 'onDaySelect',
    value: function onDaySelect(day, week) {
      var startMoment = this.props.startMoment.clone();
      var endMoment = this.props.endMoment.clone();

      var prevMonth = week === 0 && day > 7;
      var nextMonth = week >= 4 && day <= 14;

      var compMoment = startMoment.clone();
      if (prevMonth) compMoment.subtract(1, 'month');
      if (nextMonth) compMoment.add(1, 'month');
      compMoment.date(day);

      //begin new range select
      if (startMoment.date() !== endMoment.date()) {
        this.fireChangeEvent(compMoment, compMoment);
      }
      //2nd date in range select
      else {
          if (compMoment.valueOf() <= startMoment.valueOf()) {
            this.fireChangeEvent(compMoment, endMoment);
          } else {
            this.fireChangeEvent(startMoment, compMoment);
          }
        }
    }
  }, {
    key: 'onMonthSelect',
    value: function onMonthSelect(month) {
      var _this2 = this;

      var mom = (0, _moment2.default)().date(1).month(month);

      this.setState({ mode: 'calendar' }, function () {
        _this2.fireChangeEvent(mom, mom);
      });
    }

    //make sure change event sends range moment boundaries

  }, {
    key: 'fireChangeEvent',
    value: function fireChangeEvent(startMoment, endMoment) {
      //sometimes moments are same instance, so must clone
      this.props.onChange(startMoment.clone().startOf('day'), endMoment.clone().endOf('day'));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;

var Toolbar = function (_React$Component2) {
  _inherits(Toolbar, _React$Component2);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'toolbar' },
        _react2.default.createElement(_angleDoubleLeft2.default, {
          className: 'prev-nav',
          onClick: this.props.onPrevYear
        }),
        _react2.default.createElement(_angleLeft2.default, {
          className: 'prev-nav',
          onClick: this.props.onPrevMonth
        }),
        _react2.default.createElement(
          'span',
          {
            className: 'current-date',
            onClick: this.props.onToggleMode },
          this.props.display
        ),
        _react2.default.createElement(_angleRight2.default, {
          className: 'next-nav',
          onClick: this.props.onNextMonth
        }),
        _react2.default.createElement(_angleDoubleRight2.default, {
          className: 'next-nav',
          onClick: this.props.onNextYear
        })
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);