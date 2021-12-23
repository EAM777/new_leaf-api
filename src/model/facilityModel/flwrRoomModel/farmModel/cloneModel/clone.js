import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let CloneSchema = new Schema({
  growFlowId: {
    type: String,
    required: true,
  },
  cloneWeight: Number,
  strain: {
    type: Schema.Types.ObjectId,
    ref: 'Strain',
    required: true
  }
});

module.exports = mongoose.model('CloneData', CloneSchema);
