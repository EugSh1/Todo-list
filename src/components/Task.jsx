import { Trash2, Circle, CircleCheckBig } from "lucide-react";

export default function Task({ task, onTaskMark, onTaskDelete }) {
    return (
        <div className="p-2 bg-zinc-300 dark:bg-zinc-700 border border-zinc-400 dark:border-zinc-500 rounded-sm flex flex-row justify-between items-center gap-1 group shadow-xs">
            <div className="flex flex-row items-center gap-1">
                <button
                    className="flex justify-center items-center cursor-pointer"
                    onClick={onTaskMark}
                    title={task.isDone ? "Mark the task as incomplete" : "Mark the task as completed"}
                    aria-label={
                        task.isDone
                            ? `Mark the "${task.taskName}" task as incomplete`
                            : `Mark the "${task.taskName}" task as completed`
                    }
                >
                    {task.isDone ? (
                        <CircleCheckBig className="text-zinc-800 dark:text-zinc-300" />
                    ) : (
                        <Circle className="text-zinc-800 dark:text-zinc-300" />
                    )}
                </button>

                <p
                    className={`${
                        task.isDone ? "line-through" : ""
                    } text-zinc-700 dark:text-zinc-200 text-lg break-all`}
                >
                    {task.taskName}
                </p>
            </div>

            <button
                className="bg-zinc-400 dark:bg-zinc-600 p-2 rounded-sm md:invisible group-hover:visible group-focus-within:visible cursor-pointer"
                onClick={onTaskDelete}
                title="Delete task"
                aria-label={`Delete the \"${task.taskName}\" task`}
            >
                <Trash2 className="text-zinc-800 dark:text-zinc-300" />
            </button>
        </div>
    );
}
