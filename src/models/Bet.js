import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  creator: {
    type: String,
    required: true,
  },
  joiner: {
    type: String,
    default: '0x00000000000000000',
  },
  currency: {
    type: String,
    required: true,
  },
  predictPrice: {
    type: Number,
    required: true,
  },
  predictTime: {
    type: Number,
    required: true,
  },
  predictType: {
    type: Number,
    required: true,
  },
  submittedPrice: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
  joinerJoiend: {
    type: Boolean,
    default: false,
  },
  creatorJoined: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('ret', schema);
