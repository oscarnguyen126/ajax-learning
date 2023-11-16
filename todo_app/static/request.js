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
    console.log('aaaa')
    $.ajax({
        url: '/todos/',
        type: "GET",
        success: function (todos) {
            console.log('successs', todos);
            for (let todo of todos) {
                out += `
                    <p>${todo.description}</p>
                `;
            }
            placeholder.innerHTML = out;
        }
    })
});