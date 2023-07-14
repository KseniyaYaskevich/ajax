const urlGet = 'db.json';
const urlSend = 'https://jsonplaceholder.typicode.com/posts';

const getData = (url) => {
    return fetch(url)
        .then(response => response.json());
};

const sendData = (url, data) => {
    return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(response => response.json());
};

const sendDataXMLHttpRequest = (url, data) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
    xhr.responseType = 'json';

    xhr.onload = function () {
        if (xhr.status != 201) {
            console.log('Ошибка: ' + xhr.status)
            return;
        } else {
            let responseObj = xhr.response;
            console.log('send data to jsonplaceholder using XMLHttpRequest', responseObj);
        }
    };
};

getData(urlGet)
    .then(data => {
        console.log('get data from db.json', data);
        sendData(urlSend, data)
            .then(data => console.log('send data to jsonplaceholder using fetch', data))
            .catch(error => console.log(error));

        sendDataXMLHttpRequest(urlSend, data);
    })
    .catch(error => console.log(error));