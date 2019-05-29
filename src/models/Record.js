import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  lastIndex: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('record', schema);
