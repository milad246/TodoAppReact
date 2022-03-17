import React from 'react';
import './TaskList.css';
import {
  TaskItem 
} from 
'../';
const TaskList = ({ tasks, deleteTask, handleChangeStatus }) => (
    <div className='TaskList'>
        <ul>
          {tasks.map((task) => <TaskItem key={`task-${task.id}`} task={task} deleteTask={deleteTask} handleChangeStatus={handleChangeStatus} />)}
        </ul>
      </div>
)

export default TaskList;