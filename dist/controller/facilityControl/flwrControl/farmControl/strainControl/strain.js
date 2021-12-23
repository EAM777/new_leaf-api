'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _farm = require('../../../../../model/facilityModel/flwrRoomModel/farm');

var _farm2 = _interopRequireDefault(_farm);

var _strain = require('../../../../../model/facilityModel/flwrRoomModel/farmModel/strain');

var _strain2 = _interopRequireDefault(_strain);

var _clone = require('../../../../../model/facilityModel/flwrRoomModel/farmModel/cloneModel/clone');

var _clone2 = _interopRequireDefault(_clone);

var _authMiddleware = require('../../../../../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/entity/facility/farm/strain - read
  api.get('/:id', function (req, res) {
    _strain2.default.findById(req.params.id, function (err, strain) {
      if (err) {
        res.send(err);
      }
      console.log("Get Strain By Id: ");
      console.log(req.params.id);
      res.json(strain);
    });
  });

  // '/v1/entity/facility/farm/strain/:id' - UPDATE
  api.put('/:id', function (req, res) {
    _strain2.default.find({ farm: req.params.id }, function (err, strain) {
      if (err) {
        res.send(err);
      }
      strain.strainName = req.body.strainName;
      strain.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Strain Info Updated"
        });
      });
    });
  });

  // '/v1/entity/facility/farm/strain/:id' - Delete
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _strain2.default.findById(req.params.id, function (err, strain) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (strain === null) {
        res.status(404).send("Strain not Found");
        return;
      }
      _strain2.default.remove({
        _id: req.params.id
      }, function (err, strain) {
        if (err) {
          res.send(500).send(err);
          return;
        }
        _clone2.default.remove({
          strain: req.params.id
        }, function (err, cloneData) {
          if (err) {
            res.send(err);
          }
          res.json({
            message: "CloneData Successfully Removed"
          });
        });
      });
    });
  });

  // get strain by strainName

  api.get('/strainName/:strainName', function (req, res) {
    _strain2.default.find({
      strain: req.body.strainName
    }, function (err, strainName) {
      if (err) {
        res.send(err);
      }
      res.json(strainName);
    });
  });

  // '/v1/entity/facility/flowerRoom/farm/strain/cloneData' - read

  api.post('/cloneData/add/:id', function (req, res) {
    _strain2.default.findById(req.params.id, function (err, strain) {
      if (err) {
        res.send(err);
      }
      var newCloneData = new _clone2.default();

      newCloneData.growFlowId = req.body.growFlowId;
      newCloneData.cloneWeight = req.body.cloneWeight;
      newCloneData.strain = strain._id;
      newCloneData.save(function (err, cloneData) {
        if (err) {
          res.send(err);
        }
        strain.cloneData.push(newCloneData);
        strain.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({
            message: 'Clone Data Saved!'
          });
        });
      });
    });
  });

  api.get('/getCloneList/:id', _authMiddleware.authenticate, function (req, res) {
    _clone2.default.find({
      strain: req.params.id
    }, function (err, cloneData) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (cloneData === null) {
        res.status(404).send("Flower Room Not Found");
        return;
      }
      //  console.log([flowerRooms.flowerRooms])
      //  console.log(flowerRooms.username)
      //    console.log(flowerRooms.id)
      //    console.log(flowerRooms.__v)
      console.log("getCloneList API CALL:");
      console.log(req.params.id);
      console.log(cloneData);
      res.json(cloneData);
    });
  });

  return api;
};
//# sourceMappingURL=strain.js.map