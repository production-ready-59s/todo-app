import mongoose from "mongoose";

export interface ITodoBase {
  name: string,
  completed: boolean,
}

export interface ITodo extends ITodoBase {
  id: string,
  createdAt?: Date,
  updatedAt?: Date,
}

type ITodoDb = mongoose.Document<unknown, {}, ITodo> & ITodo & { _id: mongoose.Types.ObjectId };

// Define the schema for Todo
const TodoSchema = new mongoose.Schema<ITodo>({
  name: {type: String, required: true},
  completed: {type: Boolean, required: true},
}, {timestamps: true, strict: true});

// Create a model for Todo
export const Todo = mongoose.model<ITodo>("Todo", TodoSchema);

const transformFromDb = (dbTodo: ITodoDb): ITodo => {
  return {
    name: dbTodo.name,
    completed: dbTodo.completed,
    id: dbTodo._id.toString(),
    createdAt: dbTodo.createdAt,
    updatedAt: dbTodo.updatedAt
  }
}

export const createTodo = async (todo: ITodoBase): Promise<ITodo> => {
  const dbTodo = await new Todo(todo).save();
  return transformFromDb(dbTodo);
}

export const getAllTodos = async (): Promise<ITodo[]> => {
  const dbTodos = await Todo.find();
  return dbTodos.map((dbTodo) => transformFromDb(dbTodo));
}

export const updateTodo = async (id: string, todo: ITodoBase): Promise<ITodo | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Error(`Invalid ID: ${id}`)
  }

  const dbTodo = await Todo.findByIdAndUpdate(id, todo, {new: true});
  if (!dbTodo) {
    return null;
  }

  return transformFromDb(dbTodo);
}


export const deleteTodo = async (id: string): Promise<ITodo | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Error(`Invalid ID: ${id}`)
  }

  const dbTodo = await Todo.findByIdAndDelete(id);
  if (!dbTodo) {
    return null;
  }

  return transformFromDb(dbTodo);
}