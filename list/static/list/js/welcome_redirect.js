const dots = document.querySelector('.redirected .dots');

setInterval(() => {
    if (dots.innerHTML == "...") {
        dots.innerHTML = "";
    } else if (dots.innerHTML == "..") {
        dots.innerHTML = "...";
    } else if (dots.innerHTML == ".") {
        dots.innerHTML = "..";
    } else if (dots.innerHTML == "") {
        dots.innerHTML = ".";
    }
}, 500);

setInterval(() => {
    location.href = "/todo_list"
}, 5000);