import mongoose from 'mongoose';
import {
  Router
} from 'express';

import FlwrRooms from '../../../../model/facilityModel/flowerRooms';
import Farm from '../../../../model/facilityModel/flwrRoomModel/farm';
import Strain from '../../../../model/facilityModel/flwrRoomModel/farmModel/strain';

import {
  authenticate
} from '../../../../middleware/authMiddleware';

export default ({
  config,
  db
}) => {
  let api = Router();



  // '/v1/entity/facility/flowerRooms/farm' Read
  api.get('/', (req, res) => {
    Farm.find({}, (err, farm) => {
      if (err) {
        res.send(err);
      }
      res.json(farm);
    });
  });

  api.get('/:id', (req, res) => {
    Farm.findById( req.params.id , (err, farm) => {
      if (err) {
        res.send(err);
      }
      console.log("Get Strain By Id: ")
      console.log(req.params.id)
      res.json(farm);
    });
  });

  // '/v1/entity/facility/flowerRooms/farm/:id' Read 1

  // '/v1/entity/facility/flowerRooms/farm/:id' Update
  api.put('/:id', (req, res) => {
    Farm.findById(req.params.id , (err, farm) => {
      if (err) {
        res.send(err);
      }
      farm.farmName = req.body.farmName;
      farm.harvestDate = req.body.harvestDate;
      farm.save(err => {
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

  api.delete('/:id', authenticate, (req, res) => {
      Farm.findById(req.params.id, (err, farm) => {
          if (err) {
              res.status(500).send(err);
              return;
            }
            if (farm === null) {
              res.status(404).send("Farm Not Found");
              return;
            }
            Farm.remove({
                _id: req.params.id
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


api.get('/:flowerRoom', (req, res) => {
  Farm.find({
    flowerRooms: req.params.flowerRooms
  }, (err, farm) => {
    if (err) {
      res.send(err);
    }
    res.json(farm);
  });
});


// CRUD = Create Read Update delete
// '/v1/entity/facility/farm/strain/add' - Create

api.post('/strain/add/:id', (req, res) => {
  Farm.findById(req.params.id, (err, farm) => {
    if (err) {
      res.send(err);
    }
    let newStrain = new Strain();
    newStrain.strainName = req.body.strainName;
    newStrain.farm = farm._id;
    newStrain.save((err, strain) => {
      if (err) {
        res.send(err);
      }
      farm.strain.push(newStrain);
      farm.save(err => {
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

api.get('/getStrainList/:id', (req, res) => {
  Strain.find({
    farm: req.params.id
  },(err, strain) => {
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
    console.log("getStrainList API CALL:")
    console.log(req.params.id)
    console.log(strain)
    res.json(strain)

  });
});





return api;
}
