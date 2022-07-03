import { ADD_TODO, DEL_TODO, SET_TODO_INPUT } from "./constant";

const initState = {
  todos: [],
  todoInput: "",
};

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case SET_TODO_INPUT:
      newState = {
        ...state,
        todoInput: action.payload,
      };
      break;
    case ADD_TODO:
      newState = {
        ...state,
        todos: [...state.todos, action.payload],
      };
      break;
    case DEL_TODO:
      const newTodos = [...state.todos];

      newTodos.splice(action.payload, 1);

      newState = {
        ...state,
        todos: newTodos,
      };
      break;
    default:
      throw new Error(`Invalid action `);
  }

  return newState;
}

export { initState };
export default reducer;
