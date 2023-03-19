//
//
// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
// user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
// блоки з короткою іфною про post - в ряд по 5 .
// post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
// Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини
//
//  і тд)


function DisplayCommentsOfThisPost(postId){
    let url = new URL('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments');
    fetch(url)
        .then(responce => responce.json())
        .then(commentsArray => {
            let container = document.createElement('div');
            container.id = 'mainDivComments';

            let divForComments = document.createElement('div');
            divForComments.id = 'divForComments';
            for (let i = 0; i < commentsArray.length; i++) {
                const commentItem = commentsArray[i];
                let comment = document.createElement('div');
                comment.id = 'comment';
                comment.innerHTML = `<h2>Comment #${i + 1} </h2> <h4>ID: ${commentItem.id}</h4>
                <p><b>Name:</b> ${commentItem.name}</p>
                <p><b>email:</b> ${commentItem.email}</p> <p><b>Text:</b> ${commentItem.body}</p>`;

                if (i % 4 === 0) {
                    divForComments = document.createElement('div');
                    divForComments.id = 'divForComments';
                    container.appendChild(divForComments);
                }

                divForComments.appendChild(comment);
            }


            container.appendChild(divForComments);
            document.body.appendChild(container);
            ScrollWindow();
        })


}
function ScrollWindow(){
    mainContainerForComments = document.getElementById('mainDivComments');

    let nextBlockHeight = mainContainerForComments.getBoundingClientRect().height;


    window.scrollBy({
        top: nextBlockHeight,
        left: 0,
        behavior: 'smooth'
    });
}
let main_div = document.createElement('div');
let url = new URL(location.href);
let json = url.searchParams.get('objectParam');
let post = JSON.parse(json);

let form = document.createElement('form');
form.id = 'form';
let h2 = document.createElement('h2');
h2.innerText = `Post # ${post.id}`;
form.appendChild(h2);

for (const key in post) {
    let div_group = document.createElement('div');
    div_group.setAttribute('class', 'group');
    let label = document.createElement('label');
    let innerText = `${key}:`;
    innerText = innerText.charAt(0).toUpperCase() + innerText.slice(1)
    label.innerText = innerText;
    let textarea = document.createElement('textarea');
    // input.setAttribute('row',1);
    textarea.addEventListener('input', () => {
        textarea.style.height = `${textarea.scrollHeight}px`;
    })

    textarea.setAttribute('type', 'text');
    textarea.value = post[key];


    label.appendChild(textarea);
    div_group.appendChild(label);
    form.appendChild(div_group);

}
let div_group = document.createElement('div');
div_group.setAttribute('class', 'group_btn');

let btn = document.createElement('button');
btn.setAttribute('class', 'button1');

btn.innerText = 'Get comments';
btn.addEventListener('click', function (event) {
    event.preventDefault();
    let mainContainerForComments = document.getElementById('mainDivComments');
    if (!mainContainerForComments) {
        DisplayCommentsOfThisPost(post.id);

    }
    ScrollWindow();

});


div_group.appendChild(btn);
form.appendChild(div_group);
main_div.appendChild(form);
document.body.appendChild(main_div);
