import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Baller from './models/Baller';
import { runInNewContext } from 'vm';


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/ballers');
const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('MongoDB database connection established successfully!!');
});

//Creating Get end point for a lsit of ballers
router.route('/ballers').get((req, res) => {
    Baller.find((err, ballers) => {
        if(err)
            console.log(err);
        else 
           res.json(ballers);
    });
});

//end point for getting a single baller using ID.
router.route('/ballers/:id').get((req, res) => {
    Baller.findById(req.params.id,(err, baller) => {
        if(err)
            console.log(err);
        else 
           res.json(baller);
    });
});

//End point for posting/creating a NEW BALLER TO THE DATABASE
router.route('/ballers/add').post((req, res) =>{
    let baller = new Baller(req.body);
    baller.save()
         .then(baller => {
             res.status(200).json({'baller': 'Added Successfully'});
         })
         .catch(err => {
             res.status(400).send('Failed to create a new record');
         });
});

//Creating a post request end point for Editing already existing baller
router.route('/ballers/update/:id').post((req, res) => {
    Baller.findById(req.params.id, (err, baller) => {
        if(!baller)
            return net(new Error('Could not load document'))
        else{
            baller.name = req.body.name;
            baller.sport = req.body.sport;
            baller.teams = req.body.teams;
            baller.championships = req.body.championships;
            baller.retired = req.body.retired;

            baller.save().then(baller => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

//Creating an end point for deleting a baller using ID-parameter
router.route('/ballers/delete/:id').get((req, res) => {
    Baller.findByIdAndRemove({_id: req.params.id},(err, baller) => {
        if (err)
            res.json(err);
        else
           res.json('Deleted Successfully');
    });
});


app.use('/', router);

app.listen(4000, () => console.log('Express server is running on port 4000'));