    import mongoose from "mongoose";
    import taskModel from "../models/tasks.js";

    mongoose.set("debug", true);

    function getTasks() {
    let promise;
    promise = taskModel.findOne();
    return promise;
    }

    function addTask(task) {
        return taskModel.findOneAndUpdate(
          {}, // Empty filter matches the first document (you might want a specific filter)
          { 
            $push: { 
              [`tasks_list.${task.date}`]: task 
            } 
          },
          { 
            upsert: true,    // Create document if it doesn't exist
            new: true        // Return the modified document
          }
        );
      }

    export default {
    addTask,
    getTasks,
    };