import { useState } from "react";
import Task from "./components/Task";
import { Plus } from "lucide-react";
import useTasks from "./useTasks.js";

export default function App() {
    const { tasks, addTask, markTask, deleteTask } = useTasks();
    const [newTaskInputVisible, setNewTaskInputVisible] = useState(false);

    function handleAddTask(event) {
        if (event.key === "Enter") {
            const newTaskName = event.target.value.trim();

            if (newTaskName === "") {
                alert("The task cannot be empty");
                return;
            }

            addTask(newTaskName);
            event.target.value = "";
            setNewTaskInputVisible(false);
        }
    }

    const sortedTasks = [...tasks].sort((a, b) => a.isDone - b.isDone);

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
                        onKeyDown={handleAddTask}
                    />
                )}

                <div className="tasks-container">
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
                    <p className="empty-task-list-message">
                        The task list is empty.
                        <br />
                        To add a task, click on the plus button.
                    </p>
                )}
            </div>

            <button className="button-new-task" onClick={() => setNewTaskInputVisible(true)}>
                <Plus />
            </button>
        </>
    );
}
