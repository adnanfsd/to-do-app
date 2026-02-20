import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["completed", "ongoing"],
      default: "ongoing",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
