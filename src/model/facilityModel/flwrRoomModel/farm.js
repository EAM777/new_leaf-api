import mongoose from 'mongoose';

import Strain from '../../../controller/facilityControl/flwrControl/farmControl/strainControl/strain';

let Schema = mongoose.Schema;

let FarmSchema = new Schema({
  farmName: {
    type: String,
    required: true
  },
  harvestDate: String,
  strain: [{
    type: Schema.Types.ObjectId,
    ref: 'Strain'
  }],
  flowerRooms: {
    type: Schema.Types.ObjectId,
    ref: 'FlwrRooms',
    required: true
  }
});


module.exports = mongoose.model('Farm', FarmSchema);
