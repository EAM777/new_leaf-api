'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _clone = require('../../../../controller/facilityControl/flwrControl/farmControl/strainControl/cloneControl/clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
// MainLine

var StrainSchema = new Schema({
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

module.exports = _mongoose2.default.model('Strain', StrainSchema);
//# sourceMappingURL=strain.js.map