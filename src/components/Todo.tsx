import { useState } from "react";

type Priority = "height" | "mid" | `low`;
type Todo = {
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

const todoTemplate = (id: number, title: string): Todo => ({
  id,
  title,
  isDone: false,
  priority: "mid",
});

const prioritys: Priority[] = ["height", "mid", "low"];
export default function Todo() {
  const initTodos: Todo[] = [
    { id: 0, title: "走る", isDone: false, priority: "mid" },
  ];
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>(initTodos);

  // 登録ボタンを押されたときの処理。空文字の場合は登録しない
  const onAddButtonClick = () => {
    if (!inputValue) return;

    const nextId = Math.max(...todos.map((todo) => todo.id)) + 1;
    setTodos((prev) => [...prev, todoTemplate(nextId, inputValue)]);
  };

  // 削除時の処理
  const onDeleteButtonClick = (id: number) => {
    setTodos((prev) => {
      const nextTodos = prev.filter((todo) => todo.id !== id);
      return nextTodos;
    });
  };

  // プライオリティ変更
  const onPriorityButtonCick = (id: number, diff: number) => {
    setTodos((prev) => {
      const nextTodos = prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            priority:
              prioritys?.[prioritys.indexOf(todo.priority) + diff] ??
              todo.priority,
          };
        }
        return todo;
      });
      return nextTodos;
    });
  };

  return (
    <>
      <h1>TodoアプリでuseReducerを使う</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={onAddButtonClick}>登録</button>
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
