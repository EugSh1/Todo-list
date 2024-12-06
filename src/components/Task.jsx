import { Trash2, Circle, CircleCheckBig } from "lucide-react";

export default function Task({ task, onTaskMark, onTaskDelete }) {
    return (
        <div className={task.isDone ? "task-card task-card-done" : "task-card"}>
            <div>
                <button
                    className="button-mark"
                    onClick={onTaskMark}
                    title={task.isDone ? "Mark as uncompleted" : "Mark as completed"}
                >
                    {task.isDone ? <CircleCheckBig /> : <Circle />}
                </button>

                <h3>{task.taskName}</h3>
            </div>

            <div>
                <button className="button-action" onClick={onTaskDelete} title="Delete task">
                    <Trash2 />
                </button>
            </div>
        </div>
    );
}
