import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  lastIndex: {
    type: Number,
    default: -1,
  },
});

export default mongoose.model('record', schema);
