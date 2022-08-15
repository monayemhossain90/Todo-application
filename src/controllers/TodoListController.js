const jwt = require("jsonwebtoken");
const TodoListModel = require("../models/TodoListModel");

// Create Todo
exports.CreateTodo = (req, res) => {
  const reqBody = req.body;
  let UserName = req.headers["username"];
  let TodoSubject = reqBody["TodoSubject"];
  let TodoDescription = reqBody["TodoDescription"];
  let TodoStatus = "New";
  let TodoCreateDate = Date.now();
  let TodoUpdateDate = Date.now();

  let postBody = {
    UserName: UserName,
    TodoSubject: TodoSubject,
    TodoDescription: TodoDescription,
    TodoStatus: TodoStatus,
    TodoCreateDate: TodoCreateDate,
    TodoUpdateDate: TodoUpdateDate,
  };

  TodoListModel.create(postBody, (err, data) => {
    if (err) {
      res.status(401).json({ status: "Failed", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

// select Todo

exports.SelectTodo = (req, res) => {
  let UserName = req.headers["username"];
  TodoListModel.find({ UserName: UserName }, (err, data) => {
    if (err) {
      res.status(401).json({ status: "Failed", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

// update Todo
exports.UpdateTodo = (req, res) => {
  
  const reqBody = req.body;
  let _id = reqBody["_id"]
  let TodoSubject = reqBody["TodoSubject"];
  let TodoDescription = reqBody["TodoDescription"];
  let TodoUpdateDate = Date.now();

  let postBody = {
    
    TodoSubject:TodoSubject,
    TodoDescription:TodoDescription,
    TodoUpdateDate:TodoUpdateDate,
  }

  TodoListModel.updateOne({ _id: _id},{ $set: postBody },{ upsert: true },(err, data) => {
      if (err) {
        res.status(401).json({ status: "Failed", data: err });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    }
  );
};

// Update Status
exports.UpdateStatusTodo =(req,res)=>{
  let TodoStatus = req.body["TodoStatus"];
  let _id = req.body["_id"];
  let TodoUpdateDate = Date.now();

  let postBody = { 
    TodoStatus:TodoStatus,
    TodoUpdateDate:TodoUpdateDate
  }

  TodoListModel.updateOne({_id:_id},{$set:postBody},{upsert:true},(err,data)=>{
    if (err) {
      res.status(401).json({ status: "Failed", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }

  })

}

// Remove Todo

exports.RemoveTodo =(req,res)=>{
  let _id = req.body["_id"];
  TodoListModel.remove({_id:_id},(err,data)=>{
    if (err) {
      res.status(401).json({status:"Failed", data:err})
      
    } else {
      res.status(200).json({status:"Success",data:data})
    }

  })

}