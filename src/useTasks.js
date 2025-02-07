import { useEffect, useState } from "react";

function getInitialTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

export default function useTasks() {
    const [tasks, setTasks] = useState(getInitialTasks);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(taskName) {
        const newTask = { taskName, id: Date.now(), isDone: false };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    function markTask(taskId) {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === taskId ? { ...task, isDone: !task.isDone } : task))
        );
    }

    function deleteTask(taskId) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }

    return { tasks, addTask, markTask, deleteTask };
}
