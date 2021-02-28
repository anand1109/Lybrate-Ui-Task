/*--------FETCH API-----------*/
let searchField = document.querySelector('#search');

let foundUsers = null;
let xhr = new XMLHttpRequest();
xhr.open('GET', "https://reqres.in/api/users?page=1", true);
xhr.send();
xhr.onload = () => {
    if (xhr.status === 200) {
        let data = xhr.responseText;
        let users = JSON.parse(data);
        console.log(users.data[0]);
        displayUser(users.data);
        foundUsers = users.data;

    }}




let displayUser = (users) => {
    setTimeout(()=>{

        let htmlTemplate = '';
        for (let i = 0 ; i < users.length; i++){
            htmlTemplate += `<div class="card mt-5 animated zoomIn">
                <img class="img-fluid" src="${users[i].avatar}">
             <div class="card-body">
             <h4 class="card-title">Id : ${users[i].id}</h4>
             <h4 class="card-title">Name :${users[i].first_name} ${users[i].last_name}</h4> <br>
             <h4 class="card-title">Email Id : ${users[i].email}</h4>
            </div>
              </div>`;
        }
        let card = document.querySelector('.col-sm');
        card.innerHTML = htmlTemplate;
    },700)


};

// below function listens for key up event from search input tag
searchField.addEventListener('keyup', () => {
    let Searchedusers = []; // storing users whose users email matches entered value
    if(searchField.value !== '' && searchField.value.trim() !== "" && searchField.value.length !== 0) {
        // this below code only runs when searchField value matches above ^ condition
        foundUsers.filter((user) => {
            if(user.email.indexOf(searchField.value) > -1) {
                Searchedusers.push(user);
            }
        })
        displayUser(Searchedusers)
    } else {
        displayUser(foundUsers)
    }
})