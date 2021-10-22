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
            taskSubmit.id = 'task-submit-button';

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


            const taskSubmitBtn = document.querySelector('#task-submit-button');
            taskSubmitBtn.addEventListener('click', async(e) => {
                const taskForm = document.querySelector('.new-task-form')
                const taskFormFunc = async() => {
                    const formData = new FormData(taskForm);
                    const name = formData.get('name');
                    const content = formData.get('content');
                    const language = formData.get('language');
                    const dueDate = formData.get('dueDate');
                    const projectId = id;
                    const body = {name, content, language, dueDate, projectId};
                    
                    try{
                        const res = await fetch(`/tasks/${projectId}`, {
                            method: "POST",
                            body: JSON.stringify(body),
                            headers: {"Content-Type": "application/json"}
                        })
                        const newTask = await res.json();
                        return newTask;
                    } catch(e) {
                        if(e.status == 401) {
                            windows.location.href = '/users/login';
                        } 
                    }
                }
            });
        } catch (e) {

        }
    });
};

export { addTaskFunc };
