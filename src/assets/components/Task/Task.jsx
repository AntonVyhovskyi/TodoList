import { useState } from 'react';
import cls from './Task.module.css'


const Task = (props) => {
    const [taskUpdateMod, setTaskUpdateMod] = useState(false)
    const [newTaskText, setNewTaskText] = useState(props.taskText)

    // if (taskUpdateMod) {
    //     return <input type="text"
    //         onBlur={() => {
    //             setTaskUpdateMod(false)
    //             props.changeTaskText(props.id, props.taskId, newTaskText)
    //         }}
    //         autoFocus={true}
    //         value={newTaskText}
    //         onChange={(e) => setNewTaskText(e.target.value)}
    //     />
    // } else {
        return (

            <div className={`${cls.task} ${props.taskStatus ? cls.taskComplate : ''}`}  >
                <input type='checkbox' value={props.taskStatus ? 'checked' : undefined} onClick={() => props.chengeTaskStatus(props.id, props.taskId)}
                        className={cls.taskReady}/> 
                
               
                {taskUpdateMod ? <div className={cls.newTextTaskInput}><input type="text"
                
                    onBlur={() => {
                        setTaskUpdateMod(false)
                        props.changeTaskText(props.id, props.taskId, newTaskText)
                    }}
                    autoFocus={true}
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                /></div> :
                <span onClick={() => setTaskUpdateMod(true)}>{props.taskText}</span> }
                  <button className={cls.buttonDelete} onClick={() => props.deleteTask(props.id, props.taskId)}>X</button>
                    

            </div>
        );
    }


export default Task;