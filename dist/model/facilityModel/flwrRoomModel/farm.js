'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _strain = require('../../../controller/facilityControl/flwrControl/farmControl/strainControl/strain');

var _strain2 = _interopRequireDefault(_strain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var FarmSchema = new Schema({
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

module.exports = _mongoose2.default.model('Farm', FarmSchema);
//# sourceMappingURL=farm.js.map