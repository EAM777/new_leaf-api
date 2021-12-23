import mongoose from 'mongoose';
import { Router } from 'express';
import Farm from '../../../../../model/facilityModel/flwrRoomModel/farm';
import Strain from '../../../../../model/facilityModel/flwrRoomModel/farmModel/strain';
import CloneData from '../../../../../model/facilityModel/flwrRoomModel/farmModel/cloneModel/clone';


import {
  authenticate
} from '../../../../../middleware/authMiddleware';

export default ({
  config,
  db
}) => {
  let api = Router();



  // '/v1/entity/facility/farm/strain - read
  api.get('/:id', (req, res) => {
    Strain.findById( req.params.id , (err, strain) => {
      if (err) {
        res.send(err);
      }
      console.log("Get Strain By Id: ")
      console.log(req.params.id)
      res.json(strain);
    });
  });




  // '/v1/entity/facility/farm/strain/:id' - UPDATE
  api.put('/:id', (req, res) => {
    Strain.find({ farm: req.params.id}, (err, strain) => {
      if (err) {
        res.send(err);
      }
      strain.strainName = req.body.strainName;
      strain.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Strain Info Updated"
        })
      });
    });
  });

  // '/v1/entity/facility/farm/strain/:id' - Delete
  api.delete('/:id', authenticate, (req, res) => {
    Strain.findById(req.params.id, (err, strain) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (strain === null) {
        res.status(404).send("Strain not Found");
        return;
      }
      Strain.remove({
        _id: req.params.id
      }, (err, strain) => {
        if (err) {
          res.send(500).send(err);
          return;
        }
        CloneData.remove({
          strain: req.params.id
        }, (err, cloneData) => {
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

  api.get('/strainName/:strainName', (req, res) => {
    Strain.find({
      strain: req.body.strainName
    }, (err, strainName) => {
      if (err) {
        res.send(err);
      }
      res.json(strainName);
    });
  });

  // '/v1/entity/facility/flowerRoom/farm/strain/cloneData' - read

  api.post('/cloneData/add/:id', (req, res) => {
    Strain.findById(req.params.id, (err, strain) => {
      if (err) {
        res.send(err);
      }
      let newCloneData = new CloneData();

      newCloneData.growFlowId = req.body.growFlowId;
      newCloneData.cloneWeight = req.body.cloneWeight;
      newCloneData.strain = strain._id;
      newCloneData.save((err, cloneData) => {
        if (err) {
          res.send(err);
        }
        strain.cloneData.push(newCloneData);
        strain.save(err => {
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

  api.get('/getCloneList/:id', (req, res) => {
    CloneData.find({
      strain: req.params.id
    },(err, cloneData) => {
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
      console.log("getCloneList API CALL:")
      console.log(req.params.id)
      console.log(cloneData)
      res.json(cloneData)

    });
  });




  return api;
}
