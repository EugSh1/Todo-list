import { useEffect, useState } from "react";

export default function useTasks() {
    const [tasks, setTasks] = useState(getInitialTasks());

    function getInitialTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(taskName) {
        const newTask = { taskName, id: Date.now(), isDone: false };
        setTasks([...tasks, newTask]);
    }

    function markTask(taskId) {
        const tasksCopy = [...tasks];
        const selectedTask = tasksCopy.find((task) => task.id === taskId);

        if (!selectedTask) return;

        selectedTask.isDone = !selectedTask.isDone;
        setTasks(tasksCopy);
    }

    function deleteTask(taskId) {
        setTasks(tasks.filter((task) => task.id !== taskId));
    }

    return { tasks, addTask, markTask, deleteTask };
}
