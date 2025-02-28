import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
    trim: true,
  },
  task: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
});

const TasksListSchema = new mongoose.Schema(
  {
    tasks_list: {
      type: Map,
      of: [TaskSchema],
      required: true,
    },
  },
  { collection: "tasks_list" }
);

const taskModel = mongoose.model("taskModel", TasksListSchema);

export default taskModel;