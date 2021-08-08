import { useState } from "react";
import { prioritys, Todo, todoTemplate } from "../components/Todo";

export const useTodos = (initTodos: Todo[]) => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);

  // 登録ボタンを押されたときの処理。空文字の場合は登録しない
  const onAddButtonClick = (title: string) => {
    if (!title) return;

    const nextId = Math.max(...todos.map((todo) => todo.id)) + 1;
    setTodos((prev) => [...prev, todoTemplate(nextId, title)]);
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
  return { todos, onAddButtonClick, onDeleteButtonClick, onPriorityButtonCick };
};
