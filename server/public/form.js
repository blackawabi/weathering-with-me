let form_url = 'http://119.246.79.200:8080/login';
let form_method = 'POST';
let form_body = {
    username: 'tester01',
    password: '1234',
    permission: 'true'
};

function sendForm(){
    let ele_content = document.querySelector("#test");
    
    fetch(form_url, {
        method: form_method,
        body: new URLSearchParams(form_body),
    })
    .then(res => res.text())
    .then(data => {
        console.log(data);
        ele_content.innerHTML = data;
    })
    .catch(err => {
        ele_content.innerHTML = err;
    });


    /*
    fetch(form_url, {
        method: form_method,
        body: new URLSearchParams(form_body)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        ele_content.innerHTML = data['username'];
    }).catch(err => {
        ele_content.innerHTML = err;
    });
    */
}