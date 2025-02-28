    import mongoose from "mongoose";
    import taskModel from "../models/tasks.js";

    mongoose.set("debug", true);

    function getTasks() {
    let promise;
    promise = taskModel.find();
    return promise;
    }

    function addTask(task) {
        const taskToAdd = new taskModel(task);
        const promise = taskToAdd.save();
        return promise;
    }

    function deleteTaskById(id) {
        return taskModel.findByIdAndDelete(id);
    }

    export default {
    addTask,
    getTasks,
    deleteTaskById
    };