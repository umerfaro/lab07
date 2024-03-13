const express = require('express');


const bodyParser = require('body-parser');

const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());


let tasks = [
 

];
let users = {
    'user1': {
        password: 'password1'
    },
    'user2': {
        password: 'password2'
    }
};


app.post('/login', (req, res) =>
 {
    const { username, password } = req.body;

    

    if (users[username] && users[username].password === password) 
    {

        res.status(200).send('Login ho giya hurra');
    } else 
    {
        res.status(401).send('Unable to login credentials wrong');
    }
});


app.post('/tasks', (req, res) =>
 {

    const newTask = req.body;

    tasks.push(newTask);

    res.status(201).send('succefully created task');
});


app.get('/', (req, res) =>
    {
    res.send('Welcome to the Task Manager API');
        
    });


app.get('/tasks', (req, res) => 
{
     const { sortBy } = req.query;
 
     let sortedTasks = tasks;
 
     if (sortBy) 
     {
     
        if (sortBy === 'dueDate') 
        {
     
            sortedTasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
     
        } else if (sortBy === 'category') 
        {
     
            sortedTasks = tasks.sort((a, b) => a.category.localeCompare(b.category));
        }
         else if (sortBy === 'status') 
         
         {
        
            sortedTasks = tasks.sort((a, b) => a.completed - b.completed);
        }
    }
   
   
    res.status(200).json(sortedTasks);
});


app.put('/tasks/:taskId', (req, res) =>
 {

    const { taskId } = req.params;

      const { completed } = req.body;

     const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) 
    {
    
         tasks[taskIndex].completed = completed;
    
         res.status(200).send('Task status updated successfully');
    } else 
    
    {

         res.status(404).send('Task not found');
    }
});


app.put('/tasks/:taskId/priority', (req, res) =>

{

     const { taskId } = req.params;

    const { priority } = req.body;
  
     const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) 
     {
    
        tasks[taskIndex].priority = priority;
    
        res.status(200).send('Task priority updated successfully');
    } 
    
    else
     
    {
    
    
        res.status(404).send('Task not found');
    }
});


app.listen(PORT, () =>
 {
 
 
    console.log(`Server run ho raha ha port ${PORT}`);

});
