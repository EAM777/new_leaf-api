'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

var _flowerRooms = require('../model/facilityModel/flowerRooms');

var _flowerRooms2 = _interopRequireDefault(_flowerRooms);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/account'
  api.post('/register', function (req, res) {
    // integrate register user with create new facility function.
    _account2.default.register(new _account2.default({
      username: req.body.username
    }), req.body.password, function (err, accounts) {
      if (err) {
        res.send(err);
      }
      _passport2.default.authenticate('local', {
        session: false
      })(req, res, function () {
        res.status(200).send('Successfully created new account');
      });
    });
  });

  // '/v1/account/login'
  api.post('/login', _passport2.default.authenticate('local', {
    session: false,
    scope: []
  }), _authMiddleware.generatedAccessToken, _authMiddleware.respond);

  api.get('/', function (req, res) {
    _account2.default.find({}, function (err, accounts) {
      if (err) {
        res.send(err);
      }
      res.json(accounts);
    });
  });

  api.get('/me', _authMiddleware.authenticate, function (req, res) {
    _account2.default.find({}, function (err, account) {
      //  res.status(200).json(req.user);
      if (err) {
        res.send(err);
      }
      res.status(200).json([req.user]);
    });
  });

  api.get('/user', _authMiddleware.authenticate, function (req, res) {
    _account2.default.find({}, function (err, account) {
      //  res.status(200).json(req.user);
      if (err) {
        res.send(err);
      }
      res.status(200); //.json(req.user.id)
      console.log("logged in userID:");
      console.log(req.user.id);
      console.log("ARRAY of USERS");
      console.log(account);
    });
    _account2.default.findById(req.user.id, function (err, account) {
      if (err) {
        res.send(err);
      }
      res.json([account]);
      console.log("retrieved logged in user:");
      console.log([account]);
    });
  });

  // '/v1/account' - read
  api.get('/:id', _authMiddleware.authenticate, function (req, res) {
    _account2.default.findById(req.params.id, function (err, accounts) {
      if (err) {
        res.send(err);
      }
      res.json(accounts);
    });
  });

  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _account2.default.findById(req.params.id, function (err, accounts) {
      if (err) {
        res.send(err);
      }
      accounts.facilityName = req.body.facilityName;
      accounts.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Facility Name Updated"
        });
      });
    });
  });

  // '/v1/account/logout'

  api.get('/logout', _authMiddleware.authenticate, function (req, res) {
    req.logout();
    res.status(200).send('Successfully logged out');
  });

  api.post('/flowerRooms/add/:id', function (req, res) {
    _account2.default.findById(req.params.id, function (err, accounts) {
      if (err) {
        res.send(err);
      }
      var newFlowerRoom = new _flowerRooms2.default();
      newFlowerRoom.roomName = req.body.roomName;
      newFlowerRoom.accounts = accounts._id;
      newFlowerRoom.save(function (err, flowerRooms) {
        if (err) {
          res.send(err);
        }
        accounts.flowerRooms.push(newFlowerRoom);
        accounts.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({
            message: 'Farm saved Successfully'
          });
        });
      });
    });
  });

  api.get('/getRoom/:id', _authMiddleware.authenticate, function (req, res) {
    _flowerRooms2.default.find({ accounts: req.params.id }, function (err, flowerRooms) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (flowerRooms === null) {
        res.status(404).send("Flower Room Not Found");
        return;
      }
      //  console.log([flowerRooms.flowerRooms])
      //  console.log(flowerRooms.username)
      //    console.log(flowerRooms.id)
      //    console.log(flowerRooms.__v)
      console.log("getRoom API CALL:");
      console.log(req.params.id);
      console.log(flowerRooms);
      res.json(flowerRooms);
    });
  });

  return api;
};
//# sourceMappingURL=account.js.map