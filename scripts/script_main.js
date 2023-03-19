
// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули

let mainContainer = document.createElement('div');
mainContainer.id = 'main-container';
let div0 = document.createElement('div');
div0.setAttribute('class','div0');
let div1 = document.createElement('div');
div1.setAttribute('class', 'div1');

let url = new URL('https://jsonplaceholder.typicode.com/users');
fetch(url)
    .then(responce => responce.json())
    .then(usersArray => {
        for (let i = 0; i < usersArray.length; i++) {
            const userObj = usersArray[i];

            let userDiv = document.createElement('div');
            userDiv.id = 'user';
             userDiv.innerHTML = `<h2>id: ${userObj.id}</h2> <h3>Name: ${userObj.name}</h3>`;

            let btn = document.createElement('div');
            btn.setAttribute('id','button');
            let p = document.createElement('p');
            let a = document.createElement('a');
            a.setAttribute('target', '_blank');
            a.innerText = 'Дізнатись більше';
            a.href = './user-details.html?objectParam=' + JSON.stringify(userObj);
            p.appendChild(a);
            btn.appendChild(p);
            userDiv.appendChild(btn);

            let ost = i % 2;
            if (ost === 0) {
                div0.appendChild(userDiv);
            } else {
                div1.appendChild(userDiv);
            }

        }
    })
mainContainer.appendChild(div0);
mainContainer.appendChild(div1);
document.body.appendChild(mainContainer);