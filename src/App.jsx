import { useState } from "react";
import Task from "./components/Task";
import { Plus } from "lucide-react";
import useTasks from "./useTasks.js";

export default function App() {
    const { tasks, addTask, markTask, deleteTask } = useTasks();
    const [newTaskInputVisible, setNewTaskInputVisible] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            if (newTaskName.trim() === "") {
                alert("The task name cannot be empty");
                return;
            }

            addTask(newTaskName.trim());
            setNewTaskName("");
            setNewTaskInputVisible(false);
        } else if (event.key === "Escape" && newTaskName.trim() === "") {
            setNewTaskName("");
            setNewTaskInputVisible(false);
        }
    }

    const sortedTasks = [...tasks].sort((a, b) => a.isDone - b.isDone);

    return (
        <>
            <div className="p-2 flex flex-col justify-center items-center h-screen bg-zinc-200 dark:bg-zinc-800">
                <div className="sm:p-2 sm:border border-zinc-100 dark:border-zinc-700 rounded shadow-md w-full h-full sm:w-[25%] sm:h-auto overflow-auto">
                    <h1 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 mb-1">To do</h1>

                    <div className="flex flex-col gap-1">
                        {newTaskInputVisible && (
                            <input
                                className="p-1 bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-lg rounded w-full focus-visible:outline outline-sky-400"
                                type="text"
                                placeholder="Enter new task"
                                autoFocus
                                maxLength={30}
                                value={newTaskName}
                                onChange={(event) => setNewTaskName(event.target.value)}
                                onBlur={() => setNewTaskInputVisible(false)}
                                onKeyDown={handleKeyDown}
                            />
                        )}
                        {sortedTasks.map((task) => (
                            <Task
                                key={task.id}
                                task={task}
                                onTaskMark={() => markTask(task.id)}
                                onTaskDelete={() => deleteTask(task.id)}
                            />
                        ))}
                    </div>

                    {tasks.length === 0 && !newTaskInputVisible && (
                        <p className="text-lg text-zinc-400 dark:text-zinc-500 text-center">
                            The task list is empty.
                            <br />
                            To add a task, click on the plus button.
                        </p>
                    )}
                </div>

                <button
                    className="p-2 bg-zinc-300 dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-600 rounded-full fixed bottom-2 right-2 transition-all hover:brightness-105 active:brightness-110"
                    onClick={() => setNewTaskInputVisible(true)}
                >
                    <Plus className="text-zinc-600 dark:text-zinc-300" />
                </button>
            </div>
        </>
    );
}
