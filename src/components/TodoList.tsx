import { Todo } from '../App'
import styles from './TodoList.module.css'
import clipboard from '../assets/clipboard.svg'
import { TodoCard } from './TodoCard'

interface TodoListProps {
  setTodos: (todos: Todo[]) => void
  todos: Todo[]
}

export function TodoList({ todos, setTodos }: TodoListProps) {
  const doneTodosAmount = todos.reduce(
    (acc, todo) => (todo.done ? acc + 1 : acc),
    0,
  )

  function handleChangeTodoState(targetTodo: Todo) {
    const newTodoList = todos.map((todo) => {
      if (todo.id !== targetTodo.id) {
        return todo
      }

      return {
        ...targetTodo,
        done: !targetTodo.done,
      }
    })

    setTodos(newTodoList)
  }

  function handleDeleteTodo(targetTodo: Todo) {
    const todosAfterChange = todos.filter((todo) => todo.id !== targetTodo.id)
    setTodos(todosAfterChange)
  }

  return (
    <>
      <header className={styles.todoListHeader}>
        <div className={styles.totalTodos}>
          <span>Tarefas criadas</span>
          <span>{todos.length}</span>
        </div>
        <div className={styles.doneTodos}>
          <span>Concluídas</span>
          <span>{doneTodosAmount}</span>
        </div>
      </header>
      <section>
        {todos.length ? (
          <>
            {todos.map((todo) => {
              return (
                <TodoCard
                  todo={todo}
                  key={todo.id}
                  handleChangeTodoState={handleChangeTodoState}
                  handleDeleteTodo={handleDeleteTodo}
                />
              )
            })}
          </>
        ) : (
          <div className={styles.noTodosCreatedTab}>
            <img src={clipboard} alt="Prancheta" width={56} />
            <b>Você ainda não tem tarefas cadastradas</b>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        )}
      </section>
    </>
  )
}
