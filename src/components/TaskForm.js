import { useState } from "react";

function TaskForm(props) {

    return (
        <form className="task-input-form">
            <label for="task-name">Task Name:</label>
            <input type="text" id="task-name" name="task-name" placeholder="Task Name"></input>
        </form>
    );
}


export default TaskForm;