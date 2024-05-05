const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const verificationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    code: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true },
  }
);
const Verification = mongoose.model('Verification', verificationSchema);

module.exports = {
  Verification,
};
