const content = document.querySelector(".content");
const inputSearch = document.querySelector("input[type='search']");

let items = [];

// fetch("") => necessário banco de dados
    then((data) => data.json())
    then((users) => {
        users.forEach((user) => {
            addHTML(user.name);
            items.push(user.name);
        });
    });