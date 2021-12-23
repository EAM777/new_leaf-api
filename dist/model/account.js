'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passportLocalMongoose = require('passport-local-mongoose');

var _passportLocalMongoose2 = _interopRequireDefault(_passportLocalMongoose);

var _flowerRooms = require('../controller/facilityControl/flwrControl/flowerRooms');

var _flowerRooms2 = _interopRequireDefault(_flowerRooms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var AccountSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  facilityName: {
    type: String
  },
  flowerRooms: [{
    type: Schema.Types.ObjectId,
    ref: 'FlwrRooms',
    required: true
  }]
});

AccountSchema.plugin(_passportLocalMongoose2.default);
module.exports = _mongoose2.default.model('Account', AccountSchema);
//# sourceMappingURL=account.js.map