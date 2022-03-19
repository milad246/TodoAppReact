import React, { useEffect, useState } from 'react';
import {
    AddTaskForm,
    TaskList,
    FilterFooter,
} from '../';
import './TodoApp.css';
import { v4 as uuidv4 } from 'uuid';
const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [filterTask, setFilterTask] = useState([])
    const [filter, setFilter] = useState('all');
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        let storedTasks = localStorage.getItem("tasks");
        if(storedTasks){
            storedTasks  = JSON.parse(storedTasks);
        }else{
            storedTasks = [];  
        }
        setTasks(storedTasks)
    }, [])

    useEffect(() => {
        if (filter === 'all') {
            setFilterTask(tasks)
        }
        if (filter === 'completed') {
            const newCompletedFilterTasks = tasks.filter(task => task.status === true)
            setFilterTask(newCompletedFilterTasks)
        }
        if (filter === 'active') {
            const newActivFilterTasks = tasks.filter(task => task.status === true)
            setFilterTask(newActivFilterTasks)
        }
    }, [filter, tasks, refresh]);

    const addTask = (taskTitle) => {
        const newTask = [
            ...tasks,
            {
                id: uuidv4(),
                title: taskTitle,
                status: false,
            },
        ];
        setTasks(newTask);
        localStorage.setItem('tasks', JSON.stringify(newTask));
    }

    const deleteTask = (taskId) => {
        let newTasksList = tasks;
        delete newTasksList[tasks.findIndex((task) => task.id === taskId)];
        newTasksList = newTasksList.filter((item) => item);
        setTasks(newTasksList);
        localStorage.setItem('tasks', JSON.stringify(newTasksList));

    }

    const handleChangeStatus = (taskId) => {
        let newTasksList = tasks;
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        newTasksList[taskIndex].status = !newTasksList[taskIndex].status
        setTasks(newTasksList);
        localStorage.setItem('tasks', JSON.stringify(newTasksList));

        setRefresh(refresh+1)
    }

    return (
        <div className='TodoApp'>
            <AddTaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} handleChangeStatus={handleChangeStatus} />
            <FilterFooter updateFilter={setFilter} tasks={filterTask} />
        </div>
    )

}
export default TodoApp;

