import mongoose from 'mongoose';
import {  Router
} from 'express';
import FlwrRooms from '../../../model/facilityModel/flowerRooms';
import Farm from '../../../model/facilityModel/flwrRoomModel/farm';

import {
  authenticate
} from '../../../middleware/authMiddleware';

export default ({
  config,
  db
}) => {
  let api = Router();



  // '/v1/entity/facility/flwrRoom' - Read
  api.get('/', (req, res) => {
    FlwrRooms.find({}, (err, flowerRooms) => {
     if (err) {
        res.send(err);
     }
      res.json(flowerRooms);
      console.log("Get ALL FLOWER ROOMS")
      console.log(flowerRooms)
  });
  });


  api.get('/:id', (req, res) => {
    FlwrRooms.findById(req.params.id, (err, flowerRooms) => {
     if (err) {
        res.send(err);
     }
      res.json(flowerRooms);
      console.log("Get ALL FLOWER ROOMS")
      console.log(flowerRooms)
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

  api.put('/:id', authenticate, (req, res) => {
    FlwrRooms.findById(req.params.id, (err, flowerRooms) => {
      if (err) {
        res.send(err);
      }
      flowerRooms.roomName = req.body.roomName;
      flowerRooms.save(err => {
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
  api.delete('/:id', authenticate, (req, res) => {
    FlwrRooms.findById(req.params.id, (err, flowerRooms) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (flowerRooms === null) {
        res.status(404).send("Flower Room Not Found");
        return;
      }

      FlwrRooms.remove({
        _id: req.params.id
      }, (err, flowerRooms) => {
        if (err) {
          res.send(500).send(err);
          return;
        }
        Farm.remove({
          flowerRooms: req.params.id
        }, (err, farm) => {
          if (err) {
            res.send(err);
          }
          Strain.remove({
            farm: req.params.id
          }, (err, strain) => {
            if (err) {
              res.send(err);
            }
            CloneData.remove({
              strain: req.params.id
            }, (err, clone) => {
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
  api.get('/:roomName', (req, res) => {
    FlwrRooms.find({
      flowerRooms: req.params.roomName
    }, (err, roomNumber) => {
      if (err) {
        res.send(err);
      }
      res.json(roomNumber)
    });
  });

  // CRUD - Create Read Update Delete
  // '/v1/entity/facility/flowerRooms/farm'

  api.post('/farm/add/:id', authenticate, (req, res) => {
    FlwrRooms.findById(req.params.id, (err, flowerRooms) => {
      if (err) {
        res.send(err);
      }
      let newFarm = new Farm();
      newFarm.farmName = req.body.farmName;
      newFarm.harvestDate = req.body.harvestDate;
      newFarm.flowerRooms = flowerRooms._id;
      newFarm.save((err, farm) => {
        if (err) {
          res.send(err);
        }
        flowerRooms.farm.push(newFarm);
        flowerRooms.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({
            message: 'Farm saved Successfully'
          })
          console.log("Farm SAVED FROM MOBILE DEVICE");
        });
      });
    });
  });

  api.get('/getFarm/:id', (req, res) => {
    Farm.find({
      flowerRooms: req.params.id
    } , (err, farm) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (farm === null) {
        res.status(404).send("Flower Room Not Found");
        return;
      }
        res.json(farm);
        console.log(farm)
    });
  });

  return api;
}
