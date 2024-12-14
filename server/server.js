const mongoose = require('mongoose');
const dotenv = require('dotenv')


dotenv.config({ path: './config.env' });
const app = require('./app');


const db = process.env.DATABASE.replace(
  '<USERNAME>',
  process.env.USERNAME
).replace('<PASSWORD>', process.env.PASSWORD);



mongoose.connect( db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(conn=> {
    console.log("Connecton Successful")
})



const port = process.env.PORT || 3000;

let server  = app.listen(port, () => console.log(`App running port: ${port}`));



process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  //server runs the pending tasks then only shutdown the serverr if the uncaught exception occurs
  server.close(() => {
    process.exit(1);
  });
});