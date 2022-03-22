import * as cookie from "./cookie.mjs";
import {clearCookie, getAuthToken} from "./cookie.mjs";

if(String(document.cookie).includes('access_token=')){
    const btn = document.querySelector('#sign-in-btn');

    btn.textContent = 'LOGOUT';
    btn.classList.add('header__btn')
    btn.href = "#"

    btn.onclick = (event) => {
        fetch('http://127.0.0.1:5000/user/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        }).then(response => {
            if (response.status === 200) {
                clearCookie('access_token');
                btn.textContent = 'SIGN IN';
                btn.classList.remove('header__btn')
                btn.href = "logIn.html"
                return response.json();
            }
            throw response.status;
        });
    }
}