import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import CloneData from '../controller/facilityControl/flwrControl/farmControl/strainControl/cloneControl/clone';
import Strain from '../controller/facilityControl/flwrControl/farmControl/strainControl/strain';
import Farm from '../controller/facilityControl/flwrControl/farmControl/farm';
import FlwrRooms from '../controller/facilityControl/flwrControl/flowerRooms';
import Account from '../controller/account';


let router = express();

// connect to db
initializeDb(db => {

  // internal middle MIDDLEWARE
  router.use(middleware({ config, db }));
  // api routes v1 (/v1)
  router.use('/account/flowerRooms/farms/strain/cloneData',CloneData({config,db}));
  router.use('/account/flowerRooms/farms/strain', Strain({config, db}));
  router.use('/account/flowerRooms/farms',Farm({ config, db}));
  router.use('/account/flowerRooms', FlwrRooms({ config, db}));
  router.use('/account', Account({ config, db })); });

export default router;
