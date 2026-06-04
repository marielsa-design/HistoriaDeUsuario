import { getTasks, deleteTask } from "../../services/task.service.js"; 

export async function getTasks() {
    const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task.title)
    });

    
}