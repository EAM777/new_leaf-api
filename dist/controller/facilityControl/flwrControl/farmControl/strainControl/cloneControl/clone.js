'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _strain = require('../../../../../../model/facilityModel/flwrRoomModel/farmModel/strain');

var _strain2 = _interopRequireDefault(_strain);

var _clone = require('../../../../../../model/facilityModel/flwrRoomModel/farmModel/cloneModel/clone');

var _clone2 = _interopRequireDefault(_clone);

var _authMiddleware = require('../../../../../../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // get clone data for specific strain id
  // '/v1/entity/facility/flowerRoom/farm/strain/:id'

  api.get('/', function (req, res) {
    _clone2.default.find({}, function (err, cloneData) {
      if (err) {
        res.send(err);
      }
      res.json(cloneData);
    });
  });

  api.get('/:id', function (req, res) {
    _clone2.default.findById(req.params.id, function (err, cloneData) {
      if (err) {
        res.send(err);
      }
      res.json(cloneData);
    });
  });

  // '/v1/entity/facility/flowerRoom/farm/strain/:id' - UPDATE
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _clone2.default.findById(req.params.id, function (err, cloneData) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (cloneData === null) {
        res.status(404).send("Clone Data not Found");
        return;
      }
      _clone2.default.remove({
        _id: req.params.id
      }, function (err, cloneData) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Clone Data Successfully Removed"
        });
      });
    });
  });

  // get clone by growFlowId

  api.get('/growFlowId/:growFlowId', function (req, res) {
    _clone2.default.find({
      cloneData: req.body.growFlowId
    }, function (err, growFlowId) {
      if (err) {
        res.send(err);
      }
      res.json(growFlowId);
    });
  });

  return api;
};
//# sourceMappingURL=clone.js.map