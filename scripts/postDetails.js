function DisplayCommentsOfThisPost(postId){
    let url = new URL('https://jsonplaceholder.typicode.com/posts/' + id + '/comments');
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
                comment.id = 'post';
                comment.innerHTML = `<h2>Comment #${i + 1} </h2> <h4>ID: ${commentItem.Id}</h4>
                <p>Name: ${commentItem.name}</p>
                <p>email: ${commentItem.email}</p> <p>Text: ${commentItem.body}</p>`;

                if (i % 4 === 0) {
                    divForComments = document.createElement('div');
                    divForPosts.id = 'divForComments';
                    container.appendChild(divForComments);
                }

                divForComments.appendChild(comment);
            }


            container.appendChild(divForComments);
            document.body.appendChild(container);

        })


}

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
     DisplayCommentsOfThisPost(post.id);
});


div_group.appendChild(btn);
form.appendChild(div_group);
main_div.appendChild(form);
document.body.appendChild(main_div);





//
//
// let url = new URL('https://jsonplaceholder.typicode.com/posts/'+ post.id+'/comments');
// fetch(url)
//     .then(responce => responce.json())
//     .then(postsArray => {
//
//
//
//     })

