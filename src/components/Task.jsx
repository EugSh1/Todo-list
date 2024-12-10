import { Trash2, Circle, CircleCheckBig } from "lucide-react";

export default function Task({ task, onTaskMark, onTaskDelete }) {
    return (
        <div className="p-2 bg-zinc-300 dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-500 rounded flex flex-row justify-between items-center gap-1 group shadow-sm">
            <div className="flex flex-row items-center gap-1">
                <button
                    className="flex justify-center items-center"
                    onClick={onTaskMark}
                    title={task.isDone ? "Mark as uncompleted" : "Mark as completed"}
                >
                    {task.isDone ? (
                        <CircleCheckBig className="text-zinc-800 dark:text-zinc-300" />
                    ) : (
                        <Circle className="text-zinc-800 dark:text-zinc-300" />
                    )}
                </button>

                <h3
                    className={`${
                        task.isDone ? "line-through" : ""
                    } text-zinc-700 dark:text-zinc-200 text-lg break-all`}
                >
                    {task.taskName}
                </h3>
            </div>

            <button
                className="bg-zinc-400 dark:bg-zinc-600 p-2 rounded md:invisible group-hover:visible"
                onClick={onTaskDelete}
                title="Delete task"
            >
                <Trash2 className="text-zinc-800 dark:text-zinc-300" />
            </button>
        </div>
    );
}
