const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const dbSource = 'todo.db';
const db = new sqlite3.Database(dbSource);
const {v4:uuidv4} = require('uuid');
const HTTP_PORT = 8000;
var app = express();
app.use(cors());

app.get('/todo',(req,res,next)=>{
    let strTaskID = req.query.taskid;
    if (strTaskID){
        let strCommand = "select * from tblTasks where TaskID = " + strCommand;
        db.all(strCommand,(err,row)=>{
        if(err){
            res.status(400).json({error:err.message});
        }else{
            res.status(200).json({message:"success",task:row})
        }
        })
    } else{
        let strCommand = "select * from tblTasks";
        db.all(strCommand,(err,row)=>{
        if(err){
            res.status(400).json({error:err.message});
        }else{
            res.status(200).json({message:"success",task:row})
        }
        })
    }
})

app.post('/todo',(req,res,next)=>{
    let strTaskID = uuidv4();
    let strName = req.query.name;
    let strDueDate = req.query.dueDate;
    let strLocation = req.query.location;
    let strInstruction = req.query.instruction;
    let strStatus = req.query.status;
    if(strTaskID && strName && strStatus){
        let strCommand = "insert into tblTasks(TaskID,TaskName,Status,DueDate,Location,Instructions) values (?,?,?,?,?,?)";
        let arrParameter = [strTaskID,strName,strStatus,strDueDate,strLocation,strInstruction]
        db.run(strCommand,arrParameter,(err,row)=>{
            if(err){
                res.status(400).json({error:err.message});
            }else{
                res.status(201).json({message:"success",task:{TaskID:strTaskID,TaskName:strName,Status:strStatus,DueDate:strDueDate,Location:strLocation,Instructions:strInstruction}})
            }
        })
    }else{
        res.status(400).json({error:"TaskID, TaskName, Status not provided"})
    }
})

app.put('/todo/:taskID/',(req,res,next)=>{
    let strTaskID = req.params.taskID;
    let strName = req.query.name;
    let strDueDate = req.query.dueDate;
    let strLocation = req.query.location;
    let strInstruction = req.query.instruction;
    let strStatus = req.query.status;
    if(strTaskID){
        let strFields ="";
        let arrParameter = [];
        if(strName){
            strFields+= "TaskName =?, ";
            arrParameter.push(strName);
        }
        if(strDueDate){
            strFields+= "DueDate =?, ";
            arrParameter.push(strDueDate);
        }
        if(strLocation){
            strFields+= "Location =?, ";
            arrParameter.push(strLocation);
        }
        if(strInstruction){
            strFields+= "Instructions =?, ";
            arrParameter.push(strInstruction);
        }
        if(strStatus){
            strFields+= "Status =?, ";
            arrParameter.push(strStatus)
        }
        strFields = strFields.slice(0,-2);
        
        arrParameter.push(strTaskID);
        let strCommand = "UPDATE tblTasks SET "+ strFields+"WHERE TaskID = ?";
        console.log(strCommand)
        console.log(arrParameter)
        db.run(strCommand,arrParameter,function(err,result){
            if(err){
                res.status(400).json({error:err.message})
            }else{
                res.status(201).json({message:"success"})
            }
        })
    }else{
        res.status(400).json({message:"Invalid TaskID"})
    }
})

app.delete('/todo/delete',(req,res,next)=>{
    let strTaskID = req.query.taskID;
    if(strTaskID){
        let strCommand = 'delete from tblTasks where TaskID =?';
        let arrParameter = [strTaskID]
        db.all(strCommand,arrParameter,(err,row)=>{
            if(err){
                res.status(400).json({error:err.message})
            }else{
                res.status(200).json({message:"success"})
            }
        })
    }else{
        res.status(400).json({error:"No taskID provided"})
    }
})

app.listen(HTTP_PORT);