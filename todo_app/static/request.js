function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getCSRFTokenValue() {
    return getCookie('csrftoken');
}
function getSessionIdValue() {
    return getCookie('sessionid');
}

$.ajaxSetup({
    headers: {
        'CSRFToken': getCSRFTokenValue(),
        'X-CSRFToken': getCSRFTokenValue(), // for --> SessionAuthentication
    },
    tryCount: 0,
    retryLimit: 3,
});


$(function () {
    let placeholder = document.querySelector("#todos");
    let out = ""
    $.ajax({
        url: '/todos/',
        type: "GET",
        success: function (todos) {
            console.log('successs', todos);
            for (let todo of todos.slice(0, 2)) {
                out += `
                    <p class='todo'>${todo.description}</p>
                `;
            }
            placeholder.innerHTML = out;
        }
    })
});


$(function () {
    const loadBtn = document.getElementById('loadMore')
    function loadmoreTodo() {
        const _currentRes = $('.todo').length;
        const content_container = document.getElementById('todos')
        console.log(_currentRes)
        $.ajax({
            url: '/load/',
            type: 'GET',
            data: {
                'total_todo': _currentRes
            },
            beforeSend: function () {

            },
            success: function (response) {
                console.log(response)
                const data = response.todos
                data.map(todo => {
                    content_container.innerHTML += `
                    <p class='todo'>${todo.description}</p>`
                })
            },
            error: function (err) {
                console.log(err);
            },
        })
    }
    loadBtn.addEventListener('click', () => {
        loadmoreTodo()
    })
})