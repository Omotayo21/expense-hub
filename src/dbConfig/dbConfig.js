import mongoose from "mongoose";

export async function connect(){
    try {
      mongoose.connect(process.env.MONGO_URI)  ;
      const connection = mongoose.connection;

      connection.on('connected', ()=> {
        console.log('MONGODB connected successfully')
      })
      connection.on('error', (err) => {
        console.log( 'connection error, ensure mongodb is working ' + err)
        process.exit()
      })
    } catch (error) {
      console.log('somethings erong')  
    }
}