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
        setTasks([
            {
                id: uuidv4(),
                title: "Default Task",
                status: true,
            },
            {
                id: uuidv4(),
                title: "Default Task number 2",
                status: false,
            },
        ])
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
    }, [filter, refresh])

    const addTask = (taskTitle) => {
        setTasks([
            ...tasks,
            {
                id: uuidv4(),
                title: taskTitle,
                status: false,
            }
        ]);
    }

    const deleteTask = (taskId) => {
        let newTasksList = tasks;
        delete newTasksList[tasks.findIndex((task) => task.id === taskId)];
        newTasksList = newTasksList.filter((item) => item);
        setTasks(newTasksList);
    }

    const handleChangeStatus = (taskId) => {
        let newTasksList = tasks;
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        newTasksList[taskIndex].status = !newTasksList[taskIndex].status
        setTasks(newTasksList);
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

