const addTaskFunc = (id) => {
    const addTaskBtn = document.querySelector(`#project-${id}-task`);
    addTaskBtn.addEventListener('click', async (e) => {
        console.log('string', id);
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


            nameInputField.name = 'new-task-name';
            contentInputField.name = 'new-task-content';
            languageInputField.name = 'new-task-language';
            dueDateInputField.name = 'new-task-dueDate';


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
            const taskForm = document.querySelector('.new-task-form')
            const taskFormFunc = async() => {
                const formData = new FormData(taskForm);
                const name = formData.get('new-task-name');
                const content = formData.get('new-task-content');
                const language = formData.get('new-task-language');
                const dueDate = formData.get('new-task-dueDate');
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
            taskSubmitBtn.addEventListener('click', async(e) => {
                const returnTaskVal = await taskFormFunc(); 
                console.log('returnTaskVal', returnTaskVal);
            });
        } catch (e) {

        }
    });
};

export { addTaskFunc };
