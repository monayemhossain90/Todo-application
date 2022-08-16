const express = require("express");

const ProfileController = require("../controllers/ProfileController");
const TodoListController = require("../controllers/TodoListController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");




const router = express.Router();

// Create API

router.post("/CreateProfile",ProfileController.CreateProfile);
router.post("/UserLogin",ProfileController.UserLogin);
router.get("/SelectProfile",AuthVerifyMiddleware,ProfileController.SelectProfile);
router.post("/UpdateProfile",AuthVerifyMiddleware,ProfileController.UpdateProfile );

// Todo API

router.post("/CreateTodo",AuthVerifyMiddleware,TodoListController.CreateTodo);
router.get("/SelectTodo",AuthVerifyMiddleware,TodoListController.SelectTodo);
router.post("/UpdateTodo",AuthVerifyMiddleware,TodoListController.UpdateTodo);
router.post("/UpdateStatusTodo",AuthVerifyMiddleware,TodoListController.UpdateStatusTodo);
router.post("/RemoveTodo",AuthVerifyMiddleware,TodoListController.RemoveTodo);
router.post("/SelectTodoStatus",AuthVerifyMiddleware,TodoListController.SelectTodoStatus);
router.post("/SelectTodoByDate",AuthVerifyMiddleware,TodoListController.SelectTodoByDate);



module.exports = router;