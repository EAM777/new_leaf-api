import mongoose from 'mongoose';
// MainLine

import CloneData from '../../../../controller/facilityControl/flwrControl/farmControl/strainControl/cloneControl/clone';

let Schema = mongoose.Schema;

let StrainSchema = new Schema({
  strainName: {
    type: String,
    required: true
  },
  cloneData: [{
    type: Schema.Types.ObjectId,
    ref: 'CloneData'
  }],
  farm: {
    type: Schema.Types.ObjectId,
    ref: 'Farm',
    required: true
  }
});

module.exports = mongoose.model('Strain', StrainSchema);
