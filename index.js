const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')


const registerCustomer = require('./routes/registerCustomer')
const authCustomer = require('./routes/authCustomer')
const addRoom = require('./routes/addRoom')
const getRooms = require('./routes/getRooms')
const viewImage = require('./routes/viewRoomImage')

const env = require('./envVariables')
global.appRoot = path.resolve(__dirname);


mongoose.connect(env.mongoDB)
    .then(() => {console.log('Connected to mongoDB')})
    .catch((err) => {console.log('Could not Connect to mongoDB', err)})


app.use(cors())
app.use(express.json());
app.use('/api/user/register', registerCustomer)
app.use('/api/user/auth', authCustomer)
app.use('/api/user/rooms', getRooms)
app.use('/api/user/room/image', viewImage)


app.use('/api/admin/addroom', addRoom)



const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port} ...`));


