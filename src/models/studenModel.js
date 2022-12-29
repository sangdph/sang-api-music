import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birth: {
    type: Date,
    required: true,
  },
  mssv: {
    type: String,
    required: true,
    unique: true
  },
  class: {
    type: String,
    unique: true
  }
});

export const Student = mongoose.model('Student', studentSchema);