const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    activated: {
        type: Boolean,
        required: true,
        default: false,
    },
    favoriteMovies: [{type:
      mongoose.Schema.Types.ObjectId, ref: "Movie"}]
}, {
  versionKey: false,
  timestamps: true, 
})

UserSchema.pre('save', async function () {
  if (this.isNew || this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});


const User = mongoose.model('user', UserSchema);


module.exports = { User }
