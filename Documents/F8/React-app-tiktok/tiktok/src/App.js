import { useRef } from "react";
import { useStore, actions } from "./store";
import { setTodoInput } from "./store/actions";

function App() {
  const [state, dispatch] = useStore();
  const { todos, todoInput } = state;
  const inputRef = useRef()
  console.log("todoInput", todoInput);
  const handleAdd = () => {
    dispatch(actions.addTodo(todoInput));
    dispatch(setTodoInput(''));
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input
      ref={inputRef}
        value={todoInput}
        placeholder="Enter your task..."
        onChange={(e) => {
          dispatch(actions.setTodoInput(e.target.value));
        }}
      />
      <button onClick={handleAdd}>Add</button>
      {todos.map((todo, index) => (
        <li key={index} style={{width:'250px', lineHeight: '30px'}}>{todo}
        <span style={{float: 'right', cursor: 'pointer'}}
          onClick={() => dispatch(actions.delTodo(index))}
        >Del</span>
        </li>
      ))}
    </div>
  );
}

export default App;
