import { useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import cls from './ToDoList.module.css'
import { doc, getDoc, updateDoc } from "firebase/firestore";







const ToDoList = (props) => {

    const [todos, setTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');
    const [newTaskText, setNewTaskText] = useState('');
    const [textAreaError, setTextAreaErros] = useState(false);
    const [textTaskError, setTextTaskError] = useState(false)

    //-------------------------------- Firebase --------------------------------------------------

    const db = props.db;

    // get todos


    const getUserTodos = async (uid) => {
        const userArrayRef = doc(db, 'users', uid)
        const userArrayDoc = await getDoc(userArrayRef)

        if (userArrayDoc.exists()) {

            setTodos(userArrayDoc.data().todolist)
            console.log(userArrayDoc.data().todolist)
        }

        else {
            console.log('User document does not exist.');
        }
    }

    // update todos


    const updateTodosInBase = async (uid) => {
        const updateTodos = todos
        const userArrayRef = doc(db, 'users', uid)
        updateDoc(userArrayRef, { todolist: updateTodos });


    }



    // ------------------------------------ Task -----------------------------------------------

    // change NEW Task Text


    const changeNewTaskText = (e) => {
        setNewTaskText(e.target.value)
    }
    const chengeTasksNewText = (todoId) => {
        const updateTodos = todos.map((todo) => {
            if (todoId === todo.id) {
                return {
                    ...todo,
                    tasksNewText: !todo.tasksNewText
                }
            }
            return todo
        });
        setTodos(updateTodos);
    }


    //  Change Task Status

    const chengeTaskStatus = (todoId, taskid) => {
        const updateTodos = todos.map((todo) => {
            if (todoId === todo.id) {
                const updateTask = todo.tasks.map((task) => {
                    if (task.taskId === taskid) {
                        return {
                            ...task,
                            taskStatus: !task.taskStatus
                        }
                    }
                    return task
                })
                return { ...todo, tasks: updateTask }
            }
            return todo
        }

        );
        setTodos(updateTodos);
    }
    
    // Change Task Text

    const changeTaskText = (todoId, taskId, text) => {
        if (text)
        {const updateTodos = todos.map((todo) => {
            if (todoId === todo.id) {
                const updateTask = todo.tasks.map((task) => {
                    if(task.taskId === taskId) {
                        return {
                            ...task,
                            taskText: text
                        }
                    }
                    return task
                })
                return { ...todo, tasks: updateTask }
            }
            else {
                return todo
            }
        })
        setTodos(updateTodos)}
    }

    //      ADD TaskList


    const updateTasksList = (todoId) => {
        if (newTaskText) {
        const updateTodos = todos.map((todo) => {
            if (todoId === todo.id) {
                return {
                    ...todo, tasks: [
                        ...todo.tasks,
                        {
                            taskId: todo.tasks.length + 1,
                            taskText: newTaskText,
                            taskStatus: false
                        }
                    ],
                    tasksNewText: false
                }
            }
            return todo
        });
        setTodos(updateTodos);
        setNewTaskText('')
    }
    else {
        setTextTaskError(true)
        setTimeout(()=>{
            setTextTaskError(false)
        }, 300)
    }

    }

    // Delete Task

    const deleteTask = (todoId, taskId) => {
        const updateTodos = todos.map ((todo) => {
            if (todoId === todo.id) {
                const updateTasks = todo.tasks.filter((task)=> task.taskId !== taskId )
                .map ((task, index) => ({...task, taskId: index + 1}))
                return ({...todo, tasks: updateTasks})
            }
            else {
                return todo
            }
        } ) 
        setTodos(updateTodos)
    }

    //  ----------------------------------------  TODOS    --------------------------------------

    //      ADD TODO



    const handleAddTodo = () => {
        const newTodo = {
            id: todos.length + 1,
            text: newTodoText,
            statusComplated: false,
            tasks: [],
            tasksNewText: false

        }

        if (newTodoText) { setTodos([...todos, newTodo]) }
        else {
            setTextAreaErros(true);
            setTimeout(() => {
                setTextAreaErros(false);
            }, 300);
        }
        setNewTodoText('')
    }

    //    DELETE Todo

    const handleDeleteTodo = (todoId) => {
        const updateTodos = todos.filter((todo) => todo.id !== todoId)
            .map((todo, index) => ({ ...todo, id: index + 1  }));
        setTodos(updateTodos)
    }


    //   Chenge status ToDo


    const chengeStatusComplated = (todoId) => {
        const updateTodos = todos.map((todo) => {
            if (todoId === todo.id) {
                return {
                    ...todo,
                    statusComplated: !todo.statusComplated
                }
            }
            return todo
        });
        setTodos(updateTodos);
    }


    //       change NEW todo text


    const changeNewTodoText = (e) => {
        setNewTodoText(e.target.value)
    }

    //      change todo text

    const changeTodoText = (newText, todoId) => {
        if (newText){
            const updateTodos = todos.map((todo)=>{
                if ( todoId === todo.id) {
                    return {
                        ...todo,
                        text: newText
                    }
                }
                else {
                    return todo
                }
            })
            setTodos(updateTodos)
        }
        
    } 

    //----------------------------------- USE EFFECTS ------------------------------------------------

    useEffect(() => {
        getUserTodos(props.uid)

    }, [props.uid])

    useEffect(() => {

        updateTodosInBase(props.uid)
    }, [todos]);


    // --------------------------------------- RETURN -------------------------------------------------------
    return (
        <div className={cls.todoListContainer}>
            <div className={cls.todoAddContainer}>
                
                <textarea className={`${cls.inputText} ${textAreaError ? cls.textareaError : ''}`} type="text" value={newTodoText} onChange={changeNewTodoText} />
                <button className={cls.buttonAddText} onClick={handleAddTodo} >Add</button>

            </div>

            {todos &&
                <div className={cls.todoList}>


                    {todos.map((todo) => (

                        <Todo key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            statusComplated={todo.statusComplated}
                            tasks={todo.tasks}
                            tasksNewText={todo.tasksNewText}
                            newTaskText={newTaskText}
                            changeNewTaskText={changeNewTaskText}
                            updateTasksList={updateTasksList}
                            chengeTasksNewText={chengeTasksNewText}
                            chengeStatusComplated={chengeStatusComplated}
                            chengeTaskStatus={chengeTaskStatus}
                            handleDeleteTodo={handleDeleteTodo}
                            changeTodoText={changeTodoText}
                            changeTaskText={changeTaskText}
                            deleteTask={deleteTask}
                            textTaskError={textTaskError}
                        />

                    ))}


                </div>
            }



        </div>
    );
}

export default ToDoList;


