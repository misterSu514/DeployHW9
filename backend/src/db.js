import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';

dotenv.config();

export default {
    connect: () => { 
            mongoose.connect("mongodb+srv://DataUser0:DataUser0Password@cluster0.cdvvjih.mongodb.net/?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((res) => console.log("mongo db connection created"));
        }
};