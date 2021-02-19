const mongoose = require('mongoose')
//const bcrypt = require('bcrypt');
//const mongodb = require('mongodb');

const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
  accessCode : {
    type : String,
    required : true,
    unique : true
  },
  name : {
    type: String,
    required: true
  },
  highScore : {
    type: Number,
    default: 0
  },
  used : {
    type: Boolean,
    default: false
  }
});
 
// UserSchema.pre('save', async function (next) {
//   const user = this;
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });
 
// UserSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);
//   return compare;
// }
 
const UserModel = mongoose.model('user', UserSchema);
 
module.exports = UserModel;