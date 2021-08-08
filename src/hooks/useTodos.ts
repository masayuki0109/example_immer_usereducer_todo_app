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
  return {todos ,onAddButtonClick, onDeleteButtonClick, onPriorityButtonCick}
};

// // type TodoAction =
// //   | {type: 'addTodo', payload: string}
// //   | {type: 'deleteTodo', payload: number}
// //   | {type: 'changePriority', payload: {id: number, diff: number}}

// // const todoReducer = (state: Todo[], action: TodoAction) => {
// //   switch (action.type) {
// //     case 'addTodo':
// //     const nextId = Math.max(...state.map((todo) => todo.id)) + 1;
// //       return [...state, todoTemplate(nextId, action.payload)]
// //     case 'deleteTodo':
// //       return [...state.filter(todo => action.payload !== todo.id)]
// //     case 'changePriority':
// //       const nextTodos = state.map((todo) => {
// //         if (todo.id === action.payload.id) {
// //           return {
// //             ...todo,
// //             priority:
// //               prioritys?.[prioritys.indexOf(todo.priority) + action.payload.diff] ??
// //               todo.priority,
// //           };
// //         }
// //         return todo;
// //       });
// //       return nextTodos;
// //     default:
// //       return state
// //   }
// // }

// // export const useTodos = (initTodos: Todo[]) => {
// //   const [todos, dispatch] = useReducer(todoReducer, initTodos)
// //   const onAddButtonClick = (title: string) => {
// //     dispatch({type: 'addTodo', payload: title})
// //   }
// //   const onDeleteButtonClick = (id: number) => {
// //     dispatch({type: 'deleteTodo', payload: id})
// //   }
// //   const onPriorityButtonCick = (id: number, diff: number) => {
// //     dispatch({type: 'changePriority', payload: {id, diff}})
// //   }

// //   return  {todos, onAddButtonClick, onDeleteButtonClick, onPriorityButtonCick}
// }
