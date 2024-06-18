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

app.get('/ping' , (req : Request, res : Response) => {
    res.json(true);
});

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
        console.log('DB has been updated');
    }
    catch(error){
        console.error('Error updating db:', error);
        return res.status(500).json({error : 'Error updating db'});
    }
    return res.json({message : 'Submission deleted'});
});



app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});