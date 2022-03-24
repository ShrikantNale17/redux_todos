import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        actions: {
            undos: [],
            redos: []
        }
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos = [...state.todos, action.payload];
            // console.log(state.todos);
            state.actions.undos = [...state.actions.undos, state.todos];
            state.actions.redos = [];
        },
        editTodo: (state, action) => {
            state.todos = state.todos.map((todo, index) => index === action.payload.index ? { ...todo, active: !todo.active } : todo);
            state.actions.undos = [...state.actions.undos, state.todos];
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo, index) => index !== action.payload.index);
            state.actions.undos = [...state.actions.undos, state.todos];
        },
        undoTodo: state => {
            let redo = state.actions.undos[state.actions.undos.length - 1];
            state.actions.undos.pop();
            // console.log(state.actions.undos);
            state.actions.redos = redo ? [...state.actions.redos, redo] : [...state.actions.redos];
            state.todos = state.actions.undos.length > 0 ? state.actions.undos[state.actions.undos.length - 1] : [];
            // console.log(state.actions.redos);
        },
        redoTodo: state => {
            let undo = state.actions.redos[state.actions.redos.length - 1];
            state.actions.redos.pop();
            // console.log(state.actions.redos);
            state.actions.undos = undo ? [...state.actions.undos, undo] : [...state.actions.undos];
            state.todos = state.actions.undos.length > 0 ? state.actions.undos[state.actions.undos.length - 1] : [];
            // console.log(state.actions.undos);
        }
    }
})

export const { addTodo, editTodo, deleteTodo, undoTodo, redoTodo } = todoSlice.actions

export default todoSlice.reducer