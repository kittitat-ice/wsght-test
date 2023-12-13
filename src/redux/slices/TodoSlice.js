import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  // data structure
  // Task(id: String, title: String, duedate: Number, subtask: Array<Task>)
  todoList: [
    {
      id: '1',
      title: 'maintask',
      desc: 'desc',
      dueDate: new Date().getTime() / 1000,
    },
  ],
  // data structure
  // {[id]: Task}
  subTasks: {
    ['1']: [
      {
        id: '123',
        title: 'subtask1',
        desc: 'desc1',
        dueDate: new Date().getTime() / 1000,
      },
      {
        id: '1234',
        title: 'subtask2',
        desc: 'desc2',
        dueDate: new Date().getTime() / 1000,
      },
    ],
  },
};

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    clearTodoList: state => {
      state.todoList = [];
    },
    addTodoTask: (state, action) => {
      const newList = state.todoList;
      if (action.payload) {
        newList.push(action.payload);
        console.log(newList);
        state.todoList = newList;
      }
    },
    setSubTasks: (state, action) => {
      state.subTasks = action.payload;
    },
    clearSubTasks: state => {
      state.subTasks = {};
    },
    // (id, task)
    addSubTask: (state, action) => {
      const {id, task} = action.payload;
      if (!id || !task) return state;
      const newList = state.subTasks[id] || [];
      newList.push(task);
      state.subTasks = {...state.subTasks, [id]: newList};
    },
    // (id, subTaskId)
    removeSubTask: (state, action) => {
      const {id, subTaskId} = action.payload;
      if (!id || !subTaskId) return state;
      const prevList = state.subTasks[id] || [];

      const newList = prevList.filter(item => item.id !== subTaskId);

      state.subTasks = {...state.subTasks, [id]: newList};
    },
  },
});

export const {
  setTodoList,
  clearTodoList,
  addTodoTask,
  setSubTasks,
  clearSubTasks,
  addSubTask,
  removeSubTask,
} = TodoSlice.actions;
export const selectTodoReducer = state => state.todo;

export default TodoSlice.reducer;
