let saveBtn = document.querySelector("#save");
let commentsDOM = document.querySelector("#comments");

getComments();

function hideForm () {
    let form = document.querySelector("#form");
    form.innerHTML = "<p>Köszönjük a hozzászólást!</p>";
}

function saveComment() {
    let name = document.querySelector("#name");
    let url = document.querySelector("#kep");
    let comment = document.querySelector("#comment");
    let data = {
        "name": name.value,
        "url": url.value,
        "comment": comment.value
    };

    fetch('https://penztar-11ecc-default-rtdb.europe-west1.firebasedatabase.app/posts.json', {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => {
        fetch(`https://penztar-11ecc-default-rtdb.europe-west1.firebasedatabase.app/posts/${json.name}.json`, {
            method: 'PATCH',
            headers:{
            'Content-type': 'application/json'
            },
            body: JSON.stringify({id: json.name})
        })
    });
};

function getComments() {
    commentsDOM.innerHTML = "";
    fetch("https://penztar-11ecc-default-rtdb.europe-west1.firebasedatabase.app/posts.json")
        .then(response => response.json())
        .then(json => {
            const values = Object.values(json);
            values.forEach(item => {
                showComments(item);
        });
})
};

function showComments(json) {
    commentsDOM.innerHTML += `<div class="commentcard">
                                <h2>${json.name}</h2>
                                <img src=${json.url}>
                                <p>${json.comment}</p>
                                <button class="torles" data-hozzaszolas-id="${json.id}">Törlés</button>
                                </div>`
};

function hozzaszolasTorles (id) {
    fetch(`https://penztar-11ecc-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`, {
        method: "DELETE",
    }) 
};

saveBtn.addEventListener("click", () => {
    saveComment();
    hideForm();
    setTimeout(() => { getComments() }, 100);
});

document.querySelector("#comments").addEventListener("click", (e) => {
    if (e.target.className === "torles") {
        hozzaszolasTorles(e.target.dataset.hozzaszolasId);
        setTimeout(() => { getComments() }, 100);
    }
});