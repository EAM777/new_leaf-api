import mongoose from 'mongoose';

import Farm from '../../controller/facilityControl/flwrControl/farmControl/farm';

let Schema = mongoose.Schema;

let FlwrRoomSchema = new Schema({
  roomName: {
    type: String,
    required: true
  },
  farm: [{
    type: Schema.Types.ObjectId,
    ref: 'Farm'
  }],
  accounts: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  }
});

module.exports = mongoose.model('FlwrRooms', FlwrRoomSchema);
