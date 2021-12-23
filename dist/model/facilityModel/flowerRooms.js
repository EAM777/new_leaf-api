'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _farm = require('../../controller/facilityControl/flwrControl/farmControl/farm');

var _farm2 = _interopRequireDefault(_farm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var FlwrRoomSchema = new Schema({
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

module.exports = _mongoose2.default.model('FlwrRooms', FlwrRoomSchema);
//# sourceMappingURL=flowerRooms.js.map