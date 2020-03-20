const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    fbId: String
});

userSchema.statics.findOrCreate = async function(args, filter) {
    try {
      let user = await this.findOne(filter);
      if (!user) {
        user = await this.create(args);
      }
      return user;
    } catch (error) {
      return console.log(error);
    }
  };
  
module.exports = mongoose.model('User', userSchema);