const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async()=>{
    try{
      await mongoose.connect(process.env.MONGODB_CNN,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        //useCreateIndex:true,
        //useFindAndModify: false
      });

      console.log('Base de datos online');
    }
    catch(error){
        throw error;
    }
}


module.exports = {
    dbConnection
}