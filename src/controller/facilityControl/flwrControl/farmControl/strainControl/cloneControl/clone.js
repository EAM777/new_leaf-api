import mongoose from 'mongoose';
import {
  Router
} from 'express';
import Strain from '../../../../../../model/facilityModel/flwrRoomModel/farmModel/strain';
import CloneData from '../../../../../../model/facilityModel/flwrRoomModel/farmModel/cloneModel/clone';

import {
  authenticate
} from '../../../../../../middleware/authMiddleware';

export default ({
  config,
  db
}) => {
  let api = Router();

  // get clone data for specific strain id
  // '/v1/entity/facility/flowerRoom/farm/strain/:id'

  api.get('/', (req, res) => {
    CloneData.find({}, (err, cloneData) => {
      if (err) {
        res.send(err);
      }
      res.json(cloneData)
    });
  });

  api.get('/:id', (req, res) => {
    CloneData.findById(req.params.id
    , (err, cloneData) => {
      if (err) {
        res.send(err);
      }
      res.json(cloneData);
    });
  });

  // '/v1/entity/facility/flowerRoom/farm/strain/:id' - UPDATE
  api.delete('/:id', authenticate, (req, res) => {
    CloneData.findById(req.params.id, (err, cloneData) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (cloneData === null) {
        res.status(404).send("Clone Data not Found");
        return;
      }
      CloneData.remove({
        _id: req.params.id
      }, (err, cloneData) => {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Clone Data Successfully Removed"
        })
      });
    });
  });


  // get clone by growFlowId

  api.get('/growFlowId/:growFlowId', (req, res) => {
    CloneData.find({
      cloneData: req.body.growFlowId
    }, (err, growFlowId) => {
      if (err) {
        res.send(err);
      }
      res.json(growFlowId);
    });
  });


  return api;
}
