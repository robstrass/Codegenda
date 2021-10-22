const taskFormFunc = async() => {
    const formData = new FormData(form)
};

const addTaskFunc = (id) => {
    const addTaskBtn = document.querySelector(`#project-${id}-task`);
    addTaskBtn.addEventListener('click', async (e) => {
        try {
            const singleProjectDivEdit = document.querySelector("#single-project");
            const newTaskHolder = document.createElement('div');
            const newTaskForm = document.createElement('form');
            const nameInputField = document.createElement('input');
            const contentInputField = document.createElement('input');
            const languageInputField = document.createElement('input');
            const dueDateInputField = document.createElement('input');
            const taskSubmit = document.createElement('button');

            newTaskHolder.className = 'new-task-container';
            newTaskForm.className = 'new-task-form';
            nameInputField.className = 'new-task-field';
            contentInputField.className = 'new-task-field';
            languageInputField.className = 'new-task-field';
            dueDateInputField.className = 'new-task-field';
            dueDateInputField.type = 'date';

            nameInputField.placeholder = 'Task Name';
            contentInputField.placeholder = 'Content';
            languageInputField.placeholder = 'Coding Language';
            taskSubmit.innerText = 'Create Task';

            singleProjectDivEdit.appendChild(newTaskHolder);
            newTaskHolder.appendChild(newTaskForm);
            newTaskHolder.appendChild(taskSubmit);
            newTaskForm.appendChild(nameInputField);
            newTaskForm.appendChild(contentInputField);
            newTaskForm.appendChild(languageInputField);
            newTaskForm.appendChild(dueDateInputField);


        } catch (e) {

        }
    });
};

export { addTaskFunc };
