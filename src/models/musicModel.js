import mongoose from 'mongoose';
const { Schema } = mongoose;

const musicSchema = new Schema({
  song: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    require: true
  }
},{
    timestamps: true
});

export const Music = mongoose.model('Music', musicSchema);