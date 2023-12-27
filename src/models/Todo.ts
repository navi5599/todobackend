import mongoose from "mongoose"

const { Schema, Document } = mongoose

export interface ITodo extends Document {
  _id: string
  title: string
  description: string
  startingAt: string
  endingAt: string
  isCompleted: boolean
  isScheduled: boolean
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startingAt: { type: String, required: true },
  endingAt: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  isScheduled: { type: Boolean, required: true },
});

const Todos = mongoose.model<ITodo>('Todos', todoSchema)

module.exports.Todos = Todos