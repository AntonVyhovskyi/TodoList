import { useState } from 'react';
import cls from './Todo.module.css'
import Task from '../Task/Task';

const Todo = (props) => {
    const [todoUpdateMod, setTodoUpdateMod] = useState(false)
    const [textForUpdate, setTextForUpdate] = useState(props.text)
    const [todoRedaktMod, setTodoRedaktMod] = useState(false)


    return (
        <div className={`${cls.todoContainer} ${props.statusComplated ? cls.todoContainerComplated : ''}`}>
            <div className={cls.todoHeader}>

                <span onClick={() => setTodoUpdateMod(true)}
                    className={cls.todoText}>N {props.id}. {todoUpdateMod
                        ?
                        <input className={cls.todoHeaderInput}
                        type='text' onBlur={() => {
                            setTodoUpdateMod(false)
                            props.changeTodoText(textForUpdate, props.id)
                        }}
                        style={{ width: `${textForUpdate.length}ch`, maxWidth: '800px',  }}
                            autoFocus={true} value={textForUpdate}
                            onChange={(e) => setTextForUpdate(e.target.value)}
                        />
                        :
                        props.text
                    } </span>

                <button onClick={() => setTodoRedaktMod(!todoRedaktMod)}
                    className={`${cls.redactButton} ${todoRedaktMod ? cls.redactButtonReverse : ''}`}>
                    <div></div>
                </button>

            </div>
            <div className={`${cls.todoSubList} ${!todoRedaktMod ? cls.todoSubListClose : ''}`}>
                <div className={cls.todoSubListLeft}>
                    <div className={cls.todoSubListTasks}>
                        {props.tasks && props.tasks.length > 0 &&
                            <div className={cls.todoSubListTaskList}>
                                {props.tasks.map((task) => (

                                    <Task key={task.taskId} taskId={task.taskId}
                                        id={props.id}
                                        taskText={task.taskText}
                                        taskStatus={task.taskStatus}
                                        chengeTaskStatus={props.chengeTaskStatus}
                                        changeTaskText={props.changeTaskText}
                                        deleteTask={props.deleteTask}
                                    />

                                ))}
                            </div>
                        }
                    </div>
                    <div className={cls.todoSubListNewTask}>
                        {props.tasksNewText ?
                            (
                                <form className={cls.todoSubListNewTaskForm} onSubmit={(e) => e.preventDefault()}>
                                    <input type="text" autoFocus={true} value={props.newTaskText} onChange={props.changeNewTaskText}
                                        className={`${props.textTaskError ? cls.inputError : ''}`} />
                                    <button className={cls.todoSubListNewTaskFormEnter} type='submit' onClick={() => props.updateTasksList(props.id)}>Enter</button>
                                    <button className={cls.todoSubListNewTaskFormCancel}  onClick={() => props.chengeTasksNewText(props.id)}>Cancel</button>
                                </form>
                            )
                            :
                            (

                                <button className={cls.todoSubListOnAddTask} onClick={() => props.chengeTasksNewText(props.id)}>Add Task</button>
                            )
                        }
                    </div>
                </div>
                <div className={cls.todoSubListRight}>
                    <div className={cls.todoSubListBtnStatus}>
                        {props.statusComplated
                            ? (<button onClick={() => props.chengeStatusComplated(props.id)} className={cls.todoReady}>готово</button>)
                            : (<button onClick={() => props.chengeStatusComplated(props.id)} className={cls.todoNotReady}>не готово</button>)}
                    </div>
                    <div className={cls.todoSubListBtnDelete}>
                        <button onClick={() => { props.handleDeleteTodo(props.id) }}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;