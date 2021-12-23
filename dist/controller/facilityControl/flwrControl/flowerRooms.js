'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _flowerRooms = require('../../../model/facilityModel/flowerRooms');

var _flowerRooms2 = _interopRequireDefault(_flowerRooms);

var _farm = require('../../../model/facilityModel/flwrRoomModel/farm');

var _farm2 = _interopRequireDefault(_farm);

var _authMiddleware = require('../../../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/entity/facility/flwrRoom' - Read
  api.get('/', function (req, res) {
    _flowerRooms2.default.find({}, function (err, flowerRooms) {
      if (err) {
        res.send(err);
      }
      res.json(flowerRooms);
      console.log("Get ALL FLOWER ROOMS");
      console.log(flowerRooms);
    });
  });

  api.get('/:id', function (req, res) {
    _flowerRooms2.default.findById(req.params.id, function (err, flowerRooms) {
      if (err) {
        res.send(err);
      }
      res.json(flowerRooms);
      console.log("Get ALL FLOWER ROOMS");
      console.log(flowerRooms);
    });
  });

  //  api.get('/rooms/:id', (req, res) => {
  //    FlwrRooms.find({ account: req.params.id }, (err, flowerRooms) => {
  //      console.log("Get Flower Rooms For Specific Account Id:")
  //      console.log(req.params.id)//
  ///

  //    if (err) {
  //      res.send(err);
  //    }
  //res.status(200)
  //    res.json(flowerRooms);
  //    console.log(flowerRooms)
  //    });
  //  });


  // '/v1/entity/facility/flwrRooms/:id' - Read 1
  //  api.get('/getRoom/:id', (req, res) => {
  //    FlwrRooms.find({ account: req.params.id }
  //     , (err, flowerRooms) => {
  //    console.log("Get Specifil Room:")
  //      console.log(req.params.id)
  //      if (err) {
  //      res.send(err);
  //      }
  //   res.json(flowerRooms);
  //    });
  //  });

  // '/v1/entity/facility/flwrRooms/:id' - Update Flower Room

  api.put('/:id', _authMiddleware.authenticate, function (req, res) {
    _flowerRooms2.default.findById(req.params.id, function (err, flowerRooms) {
      if (err) {
        res.send(err);
      }
      flowerRooms.roomName = req.body.roomName;
      flowerRooms.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Flower Room Updated"
        });
      });
    });
  });

  // '/v1/entity/facility/flwrRooms/:id' - delete
  api.delete('/:id', _authMiddleware.authenticate, function (req, res) {
    _flowerRooms2.default.findById(req.params.id, function (err, flowerRooms) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (flowerRooms === null) {
        res.status(404).send("Flower Room Not Found");
        return;
      }

      _flowerRooms2.default.remove({
        _id: req.params.id
      }, function (err, flowerRooms) {
        if (err) {
          res.send(500).send(err);
          return;
        }
        _farm2.default.remove({
          flowerRooms: req.params.id
        }, function (err, farm) {
          if (err) {
            res.send(err);
          }
          Strain.remove({
            farm: req.params.id
          }, function (err, strain) {
            if (err) {
              res.send(err);
            }
            CloneData.remove({
              strain: req.params.id
            }, function (err, clone) {
              res.send(err);
            });
            res.json({
              message: "Flower Room, its Farms, and Other Meta Data Successfully Removed"
            });
          });
        });
      });
    });
  });

  // Get flowerRooms by room numberOfCuts
  api.get('/:roomName', function (req, res) {
    _flowerRooms2.default.find({
      flowerRooms: req.params.roomName
    }, function (err, roomNumber) {
      if (err) {
        res.send(err);
      }
      res.json(roomNumber);
    });
  });

  // CRUD - Create Read Update Delete
  // '/v1/entity/facility/flowerRooms/farm'

  api.post('/farm/add/:id', _authMiddleware.authenticate, function (req, res) {
    _flowerRooms2.default.findById(req.params.id, function (err, flowerRooms) {
      if (err) {
        res.send(err);
      }
      var newFarm = new _farm2.default();
      newFarm.farmName = req.body.farmName;
      newFarm.harvestDate = req.body.harvestDate;
      newFarm.flowerRooms = flowerRooms._id;
      newFarm.save(function (err, farm) {
        if (err) {
          res.send(err);
        }
        flowerRooms.farm.push(newFarm);
        flowerRooms.save(function (err) {
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

  api.get('/getFarm/:id', function (req, res) {
    _farm2.default.find({
      flowerRooms: req.params.id
    }, function (err, farm) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (farm === null) {
        res.status(404).send("Flower Room Not Found");
        return;
      }
      res.json(farm);
    });
  });

  return api;
};
//# sourceMappingURL=flowerRooms.js.map