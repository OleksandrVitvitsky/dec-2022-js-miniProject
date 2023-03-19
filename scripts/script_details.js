
// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
// котра має детальну інфу про поточний пост.


function GetMoreInformation(object) {
    let returnValue = '';
    for (const objectKey in object) {
        if (typeof object[objectKey] === 'object'){
            returnValue = returnValue + GetMoreInformation(object[objectKey]);
        } else {
            returnValue = returnValue + `${object[objectKey]}, `;
        }
    }
return returnValue;
}

function DisplayPostsThisUser(id){
    //
    let url = new URL('https://jsonplaceholder.typicode.com/users/'+id+'/posts');
    fetch(url)
        .then(responce => responce.json())
        .then(postsArray => {
            let container = document.createElement('div');
            container.id = 'mainDivPosts';

            let divForPosts = document.createElement('div');
            divForPosts.id = 'divForPosts';
            for (let i = 0; i < postsArray.length; i++) {
                const postItem = postsArray[i];
                let post = document.createElement('div');
                    post.id = 'post';
                post.innerHTML = `<h2>Post #${postItem.id} </h2> <h4>Title ${postItem.title}</h4>`;
                let btnPost = document.createElement('div');
                btnPost.setAttribute('class', 'button2');

                let a = document.createElement('a');
                a.setAttribute('target', '_blank');
                a.innerText = 'Отримати більше';
                a.href = './post-details.html?objectParam=' + JSON.stringify(postItem);
                btnPost.appendChild(a);
                post.appendChild(btnPost);
                if (i % 5 === 0) {
                    divForPosts = document.createElement('div');
                    divForPosts.id = 'divForPosts';
                    container.appendChild(divForPosts);
                }

                divForPosts.appendChild(post);
            }


            container.appendChild(divForPosts);
            document.body.appendChild(container);
            ScrollWindow();
        })


}

function ScrollWindow() {
    mainContainerForPosts = document.getElementById('mainDivPosts');

    let nextBlockHeight = mainContainerForPosts.getBoundingClientRect().height;
    window.scrollBy({
        top: nextBlockHeight,
        left: 0,
        behavior: 'smooth'
    });
}

let main_div = document.createElement('div');
let url = new URL(location.href);
let json = url.searchParams.get('objectParam');
let user = JSON.parse(json);

let form = document.createElement('form');
form.id='form';
let h1 = document.createElement('h1');
h1.innerText = 'User registration info';
form.appendChild(h1);

for (const key in user) {
    let div_group = document.createElement('div');
    div_group.setAttribute('class','group');
    let label = document.createElement('label');
    let innerText = `${key}:`;
    innerText = innerText.charAt(0).toUpperCase() + innerText.slice(1)
    label.innerText = innerText;
    let textarea = document.createElement('textarea');
    // input.setAttribute('row',1);
    textarea.addEventListener('input', () => {
        textarea.style.height = `${textarea.scrollHeight}px`;
    })
    let typeOfInput = 'text';
    if (innerText === 'Email'){
        typeOfInput = 'email';
    }
    textarea.setAttribute('type', typeOfInput);

    if (typeof user[key] === 'object'){
        let value = GetMoreInformation(user[key]);
        textarea.value = value.slice(0, -2);
    } else {
        textarea.value = user[key];
    }
   

    label.appendChild(textarea);
    div_group.appendChild(label);
    form.appendChild(div_group);

}
let div_group = document.createElement('div');
div_group.setAttribute('class', 'group_btn');

let btn = document.createElement('button');
btn.setAttribute('class','button1');
btn.innerText = 'Post of current user';
btn.addEventListener('click', function(event){
   event.preventDefault();
    let mainContainerForPosts = document.getElementById('mainDivPosts');
    if (!mainContainerForPosts) {
        DisplayPostsThisUser(user.id);
    }
    ScrollWindow();
});

div_group.appendChild(btn);
form.appendChild(div_group);
main_div.appendChild(form);
document.body.appendChild(main_div);