let form = document.querySelector('[data-form]');
let list = document.querySelector('[data-list]');
let input = document.querySelector('[data-input]');
let removeAll = document.querySelector('.deleteAll');


class Storage {
    static addCommentStorage(commentArr) {
        let storage = localStorage.setItem('comment', JSON.stringify(commentArr));
        return storage;
    }
    static getStorage(){
        let storage = localStorage.getItem('comment') === null ? []
            : JSON.parse(localStorage.getItem('comment'));
        return storage;
    }
}

let commentArr = Storage.getStorage();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = Math.random() * 10000;
    let date = new Date();
    date = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let comment = new Comment(id, date, input.value);
    commentArr = [...commentArr, comment];
    UI.displayData();
    UI.removeComment();
    UI.clearInput();
    Storage.addCommentStorage(commentArr);
    UI.removeAll();
});

class Comment{
    constructor(id, time, comment){
        this.id = id;
        this.time = time;
        this.comment = comment;
    }
}

class UI {
    static displayData(){
        let displayData = commentArr.map((item) => {
            return `
            <div class="mycard">
                <p>${item.comment}</p>
                <p>${item.time}</p>

                <button class="btn btn-danger remove" data-id=${item.id}>Delete</button>
            </div>
            `
        });
        list.innerHTML = [displayData].join("");

    }
    static clearInput(){
        input.value = '';
    }

    static removeComment(){
        list.addEventListener('click', (e) => {
            if(e.target.classList.contains('remove')){
                e.target.parentElement.remove();
            }
            let btnId = e.target.dataset.id;
            UI.removeArrayComment(btnId)
            console.log(commentArr)
        });
    }
    static removeArrayComment(id) {
        commentArr = commentArr.filter((item) => item.id !== +id);
        Storage.addCommentStorage(commentArr);
    }

    static removeAll(){
        removeAll.addEventListener('click', () => {
            localStorage.removeItem('comment');
            commentArr.length = 0;
            UI.displayData();
        })
    }
}

// localStorage.setItem('name', 'Islom');
// let name = localStorage.getItem('name');

// console.log(name)

window.addEventListener('DOMContentLoaded', () => {
    UI.displayData();
    UI.removeComment();
    UI.removeAll();
})