const addTaskFunc = (id) => {
    const addTaskBtn = document.querySelector(`#project-${id}-task`);
    addTaskBtn.addEventListener("click", async(e) => {
        try {
            let projectId = id; //here
            const singleProjectDivEdit = document.querySelector("#single-project");
            const newTaskHolder = document.createElement("div");
            const newTaskForm = document.createElement("form");
            const nameInputField = document.createElement("input");
            const contentInputField = document.createElement("input");
            const languageInputField = document.createElement("input");
            const dueDateInputField = document.createElement("input");
            const taskSubmit = document.createElement("button");

            newTaskHolder.className = "new-task-container";
            newTaskForm.className = "new-task-form";
            nameInputField.className = "new-task-field";
            contentInputField.className = "new-task-field";
            languageInputField.className = "new-task-field";
            dueDateInputField.className = "new-task-field";
            dueDateInputField.type = "date";
            taskSubmit.id = "task-submit-button";

            nameInputField.name = "new-task-name";
            contentInputField.name = "new-task-content";
            languageInputField.name = "new-task-language";
            dueDateInputField.name = "new-task-dueDate";

            nameInputField.placeholder = "Task Name";
            contentInputField.placeholder = "Content";
            languageInputField.placeholder = "Coding Language";
            taskSubmit.innerText = "Create Task";

            singleProjectDivEdit.appendChild(newTaskHolder);
            newTaskHolder.appendChild(newTaskForm);
            newTaskHolder.appendChild(taskSubmit);
            newTaskForm.appendChild(nameInputField);
            newTaskForm.appendChild(contentInputField);
            newTaskForm.appendChild(languageInputField);
            newTaskForm.appendChild(dueDateInputField);

            const taskSubmitBtn = document.querySelector("#task-submit-button");
            const taskForm = document.querySelector(".new-task-form");
            const taskFormFunc = async() => {
                const formData = new FormData(taskForm);
                const name = formData.get("new-task-name");
                const content = formData.get("new-task-content");
                const language = formData.get("new-task-language");
                const dueDate = formData.get("new-task-dueDate");
                const projectId = id;
                const body = { name, content, language, dueDate, projectId };

                try {
                    const res = await fetch(`/tasks/${projectId}`, {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: { "Content-Type": "application/json" },
                    });
                    const newTask = await res.json();
                    return newTask;
                } catch (e) {
                    if (e.status == 401) {
                        windows.location.href = "/users/login";
                    }
                }
            };
            taskSubmitBtn.addEventListener("click", async(e) => {
                const returnTaskVal = await taskFormFunc();
                // console.log('should be errors', returnTaskVal.errors)
                const { errors } = returnTaskVal;

                const taskErrorsDiv = document.querySelector('#task-errors');
                taskErrorsDiv.innerHTML = '';
                if (errors && errors.length > 0) {
                    const errorsUL = document.createElement('ul');
                    taskErrorsDiv.appendChild(errorsUL);
                    errors.forEach(error => {
                        const newErrMsg = document.createElement('li');
                        newErrMsg.innerText = error;
                        errorsUL.appendChild(newErrMsg);
                    })
                } else {
                    const { id, name, content, dueDate, language } = returnTaskVal;
                    const taskContainerDiv = document.querySelector("#task-container");
                    let newDueDate = dueDate.split("T")[0];

                    const taskHolder = document.createElement("div");
                    taskHolder.id = `task-container-${id}`;
                    taskContainerDiv.appendChild(taskHolder);
                    const taskName = document.createElement("div");
                    const taskContent = document.createElement("div");
                    const taskDueDate = document.createElement("div");
                    const taskLanguage = document.createElement("div");
                    const taskDeleteButton = document.createElement("button");
                    const taskEditButton = document.createElement('button');

                    taskName.id = `task-name-${id}`;
                    taskContent.id =`task-content-${id}`;
                    taskDueDate.id = `task-dueDate-${id}`;
                    taskLanguage.id = `task-language-${id}`;

                    taskDeleteButton.innerText = "Delete Task";
                    taskEditButton.innerText = 'Edit Task';
                    taskName.innerText = name;
                    taskContent.innerText = content;
                    taskDueDate.innerText = newDueDate;
                    taskLanguage.innerText = language;
                    taskHolder.append(
                        taskName,
                        taskContent,
                        taskDueDate,
                        taskLanguage,
                        taskEditButton,
                        taskDeleteButton
                    );

                    newTaskHolder.remove();
                    taskDeleteButton.addEventListener("click", async(e) => {
                        try {
                            const res = await fetch(`/tasks/${projectId}/${id}`, {
                                method: "DELETE",
                            });
                            taskHolder.remove();
                        } catch (e) {
                        }
                    });

                    taskEditButton.addEventListener('click', async(e) => {
                        const checkEditTaskDiv = document.querySelector('.edit-task-div-container');
                        if(!checkEditTaskDiv) {
                            const editTaskDivContainer = document.createElement('div');
                            const editTaskForm = document.createElement('form');
                            const editTaskName = document.createElement('input');
                            const editTaskContent = document.createElement('input');
                            const editTaskLanguage = document.createElement("input");
                            const editTaskDueDate = document.createElement("input")
                            const editTaskSubmitButton = document.createElement('button');
                            editTaskDueDate.type = 'date';
    
                            editTaskDivContainer.className = 'edit-task-div-container';
                            editTaskForm.className = 'edit-task-form';
                            editTaskName.className = 'edit-task-field';
                            editTaskContent.className = 'edit-task-field';
                            editTaskLanguage.className = 'edit-task-field';
                            editTaskSubmitButton.className = 'edit-task-button';
    
                            editTaskName.placeholder = 'Task Name';
                            editTaskContent.placeholder= 'Content';
                            editTaskLanguage.placeholder= 'Coding Language';
                            editTaskSubmitButton.innerText = 'Submit';
    
                            taskHolder.append(editTaskDivContainer);
                            editTaskDivContainer.append(editTaskForm, editTaskSubmitButton);
                            editTaskForm.append(editTaskName, editTaskContent, editTaskLanguage, editTaskDueDate);

                            editTaskSubmitButton.addEventListener('click', async(e) => {
                                e.preventDefault();

                                if(editTaskName.value !== '') {
                                    const newTaskName = editTaskName.value;
                                    taskName.innerText = newTaskName;
                                } else {
                                    editTaskName.value = taskName.innerText; 
                                }
    
                                if(editTaskContent.value !== '') {
                                    const newTaskContent = editTaskContent.value;
                                    taskContent.innerText = newTaskContent;
                                } else {
                                    editTaskContent.value = taskContent.innerText;
                                }
    
                                if(editTaskLanguage.value !== '') {
                                    const newTaskLanguage = editTaskLanguage.value;
                                    taskLanguage.innerText = newTaskLanguage;
                                } else {
                                    editTaskLanguage.value = taskLanguage.innerText;
                                }
    
                                if(editTaskDueDate.value !== '') {
                                    const newTaskDueDate = editTaskDueDate.value;
                                    taskDueDate.innerText = newTaskDueDate;
                                } else {
                                    editTaskDueDate.value = taskDueDate.innerText;
                                }

                                const name = editTaskName;
                                console.log('strings so we can see', name);

                                try {
                                    const res = await fetch(`/tasks/${projectId}/${id}`, {
                                        method: "PUT",
                                    });
                                } catch (e) {    
        
                                }
                            })
                        }

                    })
                }
            });
        } catch (e) {}
    });
};

export { addTaskFunc };
