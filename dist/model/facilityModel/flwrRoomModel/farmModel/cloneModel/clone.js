'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CloneSchema = new Schema({
  growFlowId: {
    type: String,
    required: true
  },
  cloneWeight: Number,
  strain: {
    type: Schema.Types.ObjectId,
    ref: 'Strain',
    required: true
  }

});

module.exports = _mongoose2.default.model('CloneData', CloneSchema);
//# sourceMappingURL=clone.js.map