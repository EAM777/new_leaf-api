import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';
import FlwrRooms from '../controller/facilityControl/flwrControl/flowerRooms';

let AccountSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  facilityName: {
    type: String,
  },
  flowerRooms: [{
    type: Schema.Types.ObjectId,
    ref: 'FlwrRooms',
    required: true
  }]
});

AccountSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', AccountSchema);
