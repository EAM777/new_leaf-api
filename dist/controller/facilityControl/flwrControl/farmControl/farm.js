'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _flowerRooms = require('../../../../model/facilityModel/flowerRooms');

var _flowerRooms2 = _interopRequireDefault(_flowerRooms);

var _farm = require('../../../../model/facilityModel/flwrRoomModel/farm');

var _farm2 = _interopRequireDefault(_farm);

var _strain = require('../../../../model/facilityModel/flwrRoomModel/farmModel/strain');

var _strain2 = _interopRequireDefault(_strain);

var _authMiddleware = require('../../../../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/entity/facility/flowerRooms/farm' Read
  api.get('/', function (req, res) {
    _farm2.default.find({}, function (err, farm) {
      if (err) {
        res.send(err);
      }
      res.json(farm);
    });
  });

  api.get('/:id', function (req, res) {
    _farm2.default.findById(req.params.id, function (err, farm) {
      if (err) {
        res.send(err);
      }
      console.log("Get Strain By Id: ");
      console.log(req.params.id);
      res.json(farm);
    });
  });

  // '/v1/entity/facility/flowerRooms/farm/:id' Read 1

  // '/v1/entity/facility/flowerRooms/farm/:id' Update
  api.put('/:id', function (req, res) {
    _farm2.default.findById(req.params.id, function (err, farm) {
      if (err) {
        res.send(err);
      }
      farm.farmName = req.body.farmName;
      farm.harvestDate = req.body.harvestDate;
      farm.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Farm info Updated"
        });
      });
    });
  });

  // '/v1/entity/facility/flowerRooms/farm/:id' - delete

  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _farm2.default.findById(req.params.id, function (err, farm) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (farm === null) {
        res.status(404).send("Farm Not Found");
        return;
      }
      _farm2.default.remove({
        _id: req.params.id
      }, function (err, farm) {
        if (err) {
          res.send(err);
        }

        _strain2.default.remove({
          farm: req.params.id
        }, function (err, strain) {
          if (err) {
            res.send(err);
          }

          CloneData.remove({
            strain: req.params.id
          }, function (err, clone) {
            if (err) {
              res.send(err);
            }
          });
        });

        res.json({
          message: "Farm, and other Meta Data Successfully Removed"
        });
      });
    });
  });

  api.get('/:flowerRoom', function (req, res) {
    _farm2.default.find({
      flowerRooms: req.params.flowerRooms
    }, function (err, farm) {
      if (err) {
        res.send(err);
      }
      res.json(farm);
    });
  });

  // CRUD = Create Read Update delete
  // '/v1/entity/facility/farm/strain/add' - Create

  api.post('/strain/add/:id', function (req, res) {
    _farm2.default.findById(req.params.id, function (err, farm) {
      if (err) {
        res.send(err);
      }
      var newStrain = new _strain2.default();
      newStrain.strainName = req.body.strainName;
      newStrain.farm = farm._id;
      newStrain.save(function (err, strain) {
        if (err) {
          res.send(err);
        }
        farm.strain.push(newStrain);
        farm.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({
            message: 'Strain Saved Successfully'
          });
        });
      });
    });
  });

  api.get('/getStrainList/:id', _authMiddleware.authenticate, function (req, res) {
    _strain2.default.find({
      farm: req.params.id
    }, function (err, strain) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (strain === null) {
        res.status(404).send("Flower Room Not Found");
        return;
      }
      //  console.log([flowerRooms.flowerRooms])
      //  console.log(flowerRooms.username)
      //    console.log(flowerRooms.id)
      //    console.log(flowerRooms.__v)
      console.log("getStrainList API CALL:");
      console.log(req.params.id);
      console.log(strain);
      res.json(strain);
    });
  });

  return api;
};
//# sourceMappingURL=farm.js.map