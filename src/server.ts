import express , {Request, Response} from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { error } from 'console';

//skeleton for the submission data.
interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: number;
}

//setting up an express app and the respective port for it as well.
const app = express();
const port = 3000;

app.use(bodyParser.json());

let submissions : Submission[] = [];

try{
    const data = fs.readFileSync('db.json', 'utf8');
    submissions = JSON.parse(data);
}
catch(error){
    console.error('Error reading file:', error);
}

//to check if the port works.
app.get('/ping' , (req : Request, res : Response) => {
    res.json(true);
});

//posting the data in the db.
app.post('/submit' , (req : Request, res : Response) => {
    const {name , email , phone , github_link , stopwatch_time} = req.body;
    const newSubmission : Submission = { name , email , phone , github_link , stopwatch_time};
    submissions.push(newSubmission);

    //debugging to check if it actually pushes into the db.
    console.log(submissions);

    try{
    fs.writeFileSync('db.json', JSON.stringify(submissions));
    console.log('Data written to file');
    }
    catch(error){
        console.error('Error writing to file:', error);
        return;
    }
    res.json({message : 'Submission successful'});
});

//to read data according to their index.
app.get('/read' , (req : Request, res : Response) => {
    const index = parseInt(req.query.index as string);
    if(isNaN(index) || index < 0 || index >= submissions.length){
        res.status(400).json({error : 'Invalid index'});
    }
    else {
        const submission = submissions[index];
        res.json(submission);
    }
});


//delete functionality.
app.delete('/submissions/:index' , (req : Request, res : Response) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= submissions.length){
        res.status(400).json({error : 'Invalid index'});
    }

    //to essentially remove move the sub db.
    submissions.splice(index, 1);

    //need to update the db so that it can be seen that particular data has been removed.
    try{ 
        fs.writeFileSync('db.json', JSON.stringify(submissions));
        console.log('DB has been updated and the submission has been deleted');
    }
    catch(error){
        console.error('Error updating db:', error);
        return res.status(500).json({error : 'Error updating db'});
    }
    return res.json({message : 'Submission deleted'});
});

//to edit the forms.
app.put('/edit/:index' , (req : Request, res : Response) => {
    const index = parseInt(req.params.index);
    if(isNaN(index) || index < 0 || index >= submissions.length){
        res.status(400).json({error : 'Invalid index'});
    }
    const {name , email , phone , github_link , stopwatch_time} = req.body;
    const updatedSubmission : Submission = { name , email , phone , github_link , stopwatch_time};

    submissions[index] = updatedSubmission;

    try{
        fs.writeFileSync('db.json', JSON.stringify(submissions));
        console.log('DB has been updated and the submission has been edited');
    }
    catch(error){
        console.error('Error updating db:', error);
        return res.status(500).json({error : 'Error updating db'});
    }
    res.json({message : 'Submission updated successfully'});
});


//to search by email id.
app.get('/search' , (req : Request, res : Response) => {
    const email = req.query.email as string;
    if(!email){
        return res.status(400).json({error : 'Email is required !'});
    }
    const submission = submissions.find(submission => submission.email === email);
    if(submission){
        return res.json(submission);
    }
    return res.status(404).json({error : 'Submission not found'});
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});