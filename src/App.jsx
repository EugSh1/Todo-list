import { useEffect, useState } from "react";
import Task from "./components/Task";
import { Plus } from "lucide-react";
import {
    getTasksFromLocalStorage,
    saveUpdatedTasksToLocalStorage,
    markTask,
    deleteTask
} from "./utils.js";

export default function App() {
    const [tasks, setTasks] = useState(getTasksFromLocalStorage());
    const [newTaskInputVisible, setNewTaskInputVisible] = useState(false);

    useEffect(() => {
        setTasks(getTasksFromLocalStorage());
    }, []);

    useEffect(() => {
        saveUpdatedTasksToLocalStorage(tasks);
    }, [tasks]);

    function addTask(event) {
        if (event.key === "Enter") {
            const newTaskName = event.target.value.trim();

            if (newTaskName === "") {
                alert("The task cannot be empty");
                return;
            }

            const newTask = { taskName: newTaskName, isDone: false };
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            event.target.value = "";
            setNewTaskInputVisible(false);
        }
    }

    function handleMarkTask(task) {
        const updatedTasks = markTask(task);
        setTasks(updatedTasks);
    }

    function handleDeleteTask(task) {
        const updatedTasks = deleteTask(task);
        setTasks(updatedTasks);
    }

    return (
        <>
            <div className="app">
                <h1>To do</h1>
                {newTaskInputVisible && (
                    <input
                        type="text"
                        placeholder="Enter new task"
                        autoFocus
                        onBlur={() => setNewTaskInputVisible(false)}
                        onKeyDown={addTask}
                    />
                )}

                <div className="tasks-container">
                    {tasks.map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            onTaskMark={() => handleMarkTask(task)}
                            onTaskDelete={() => handleDeleteTask(task)}
                        />
                    ))}
                </div>

                {tasks.length === 0 && !newTaskInputVisible && (
                    <p className="empty-task-list-message">
                        The task list is empty.
                        <br />
                        To add a task, click on the plus button.
                    </p>
                )}
            </div>

            <button
                className="button-new-task"
                onClick={() => setNewTaskInputVisible(true)}
            >
                <Plus />
            </button>
        </>
    );
}
