function getCookie(name) {
    var cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');

        for (i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            };
        };
    };
    return cookieValue;
};

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit');
    const inputAddTask = document.querySelector("#addTask");
    const user_id = document.getElementById("user_id").innerHTML;

    console.log(user_id)
    
    submitButton.addEventListener("click", function() {
        fetch('/save_list/save', {
            method: "POST",
            headers: {
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                user_id: user_id,
                todo: inputAddTask.value
            })
        })

    })


    submitButton.disabled = true;

    inputAddTask.addEventListener("keyup", () => {
        if (inputAddTask.value.trim().length > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        };
    });

    const DoingList = document.querySelector('.DoingList');
    const DoneList = document.querySelector('.DoneList');

    const divDoingList = document.querySelector('.Doing');
    const divDoneList = document.querySelector('.Done');

    function addDoingTask() {
        const dragging = document.querySelector('.dragging');
        DoingList.appendChild(dragging);
        fetch(`/save_list/edit_situation/${dragging.dataset.id}`, {
            method: 'PUT',
            headers: {
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                situation: "Doing"
            })
        });
    };
    
    function addDoneTask() {
        const dragging = document.querySelector('.dragging');
        DoneList.appendChild(dragging);
        fetch(`/save_list/edit_situation/${dragging.dataset.id}`, {
            method: 'PUT',
            headers: {
                'X-CSRFToken': getCookie("csrftoken")
            },
            body: JSON.stringify({
                situation: "Done"
            })
        });
    };

    divDoingList.addEventListener('dragover', addDoingTask);
    divDoneList.addEventListener('dragover', addDoneTask);


    // criando uma nova task
    document.querySelector('form').onsubmit = () => {
        const ul = document.querySelector('.ToDoList');

        const li = document.createElement('li');
        li.innerHTML = document.querySelector('form input[type=text]').value;
        li.draggable = true;
        fetch("/last_id").then(Response => Response.json()).then(last_id => {li.dataset.id = last_id.id})
        li.addEventListener('dragstart', () => {li.classList = 'dragging'});
        li.addEventListener('dragend', () => {li.classList = "";});
        ul.append(li);

        document.querySelector('form input[type=text]').value = "";

        submitButton.disabled = true;

        return false
    }

    // busca as tasks já criadas quando a página é carregada
    const itemsList = document.querySelectorAll('.listas .list ul li');
    itemsList.forEach(task => {
        try {
            task.addEventListener("dragstart", moveTask);
        } catch(e) {
            console.log(e);
        }

    })
})