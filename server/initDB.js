import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//Set up default mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is missing'],
        unique: [true, 'Duplicate username']
    },
    password: {
        type: String,
        required: [true, 'Password is missing']
    }
});

export const Users = mongoose.model('Users', UsersSchema);
export const initDB = () => {
    let query = {'username':'admin', 'password': 'admin'};
    let update = {expire: new Date()};
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    Users.findOneAndUpdate(query, update, options).exec(function (err, users){
        if (err) {
            console.log(err);
            return handleError(err);
        }
    });
    Users.find({'username':'admin', 'password':'admin'}).exec(function (err, users) {
        if (err) {
            console.log(err);
            return handleError(err);
        }
    });
};

export default {initDB, Users};