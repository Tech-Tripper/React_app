import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Baller = new Schema({
    name: {
        type: String
    },
    sport: {
        type: String
    },
    teams: {
        type: String
    },
    championships: {
        type: String
    },
    retired: {
        type: String,
        
    }
});

export default mongoose.model('Baller', Baller);