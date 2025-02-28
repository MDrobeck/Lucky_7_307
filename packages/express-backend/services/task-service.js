    import mongoose from "mongoose";
    import taskModel from "../models/tasks.js";

    mongoose.set("debug", true);

    function getTasks() {
    let promise;
    promise = taskModel.findOne();
    return promise;
    }

    function addUser(user) {
    const userToAdd = new taskModel(user);
    const promise = userToAdd.save();
    return promise;
    }

    function findUserByName(name) {
    return taskModel.find({ name: name });
    }

    function findUserByJob(job) {
    return taskModel.find({ job: job });
    }

    function findUserByJobAndName(name, job) {
    return taskModel.find({name: name, job: job});
    }

    function deleteUserById(id) {
    return taskModel.findByIdAndDelete(id);
    }

    export default {
    addUser,
    getTasks,
    };