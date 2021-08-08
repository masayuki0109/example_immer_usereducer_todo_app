import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

export type Priority = "height" | "mid" | `low`;
export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
  priority: Priority;
};

const priorityLabel = {
  height: "高い",
  mid: "中",
  low: "低い",
} as const;

export const todoTemplate = (id: number, title: string): Todo => ({
  id,
  title,
  isDone: false,
  priority: "mid",
});

export const prioritys: Priority[] = ["height", "mid", "low"];

export default function Todo() {
  const initTodos: Todo[] = [
    { id: 0, title: "走る", isDone: false, priority: "mid" },
  ];
  const [inputValue, setInputValue] = useState("");
  const { todos, onAddButtonClick, onDeleteButtonClick, onPriorityButtonCick } =
    useTodos(initTodos);

  return (
    <>
      <h1>TodoアプリでuseReducerを使う</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={() => onAddButtonClick(inputValue)}>登録</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.isDone}></input>
            <label>{`${todo.title} ---  優先度: ${
              priorityLabel[todo.priority]
            }`}</label>
            <button onClick={() => onDeleteButtonClick(todo.id)}>削除</button>
            <button onClick={() => onPriorityButtonCick(todo.id, -1)}>
              優先度UP
            </button>
            <button onClick={() => onPriorityButtonCick(todo.id, 1)}>
              優先度DOWN
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
