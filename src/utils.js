export function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function saveUpdatedTasksToLocalStorage(newTasks) {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
}

export function markTask(taskToMark) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.map(task =>
        task.taskName === taskToMark.taskName
            ? { ...task, isDone: !task.isDone }
            : task
    );
    saveUpdatedTasksToLocalStorage(updatedTasks);
    return updatedTasks;
}

export function deleteTask(taskToDelete) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task =>
        task.taskName !== taskToDelete.taskName || task.isDone !== taskToDelete.isDone
    );
    saveUpdatedTasksToLocalStorage(updatedTasks);
    return updatedTasks;
}