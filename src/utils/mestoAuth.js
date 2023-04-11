// авторизация Api

import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";

// базовый URL сервера для авторизации пользователя
const baseUrl = "https://auth.nomoreparties.co";

// функция проверки ответа сервера
function checkResponse(res) {
  console.log("Сообщение из mestoAuth: ", res);
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(new Error("Ошибка обработки запроса на сервере"), res);
}

// функция регистрации нового пользователя
export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => {
      //return checkResponse(res);
      if(res.ok) {
        return res.json();
      } else if(res.status == '400') {
        return Promise.reject(new Error("ошибка 400 - некорректно заполнено одно из полей "));
      }
      return Promise.reject(new Error("Ошибка регистрации"));
    });
}

// функция авторизации пользователя
export function authorize(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => {
      //return checkResponse(res);
      if(res.ok) {
        return res.json();
      } else if(res.status == '400') {
        return Promise.reject(new Error("ошибка 400 - не передано одно из полей"));
      } else if(res.status == '401') {
        return Promise.reject(new Error("ошибка 401 - пользователь с email не найден"));
      }
      // в ином случае
      return Promise.reject(new Error("Ошибка авторизации"));
    });
}

// функция аутентификации пользователя
export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then((res) => {
      //console.log(res);
      if(res.ok) {
        return res.json();
      } else if(res.status == '400') {
        return Promise.reject(new Error("ошибка 400 — Токен не передан или передан не в том формате"));
      } else if(res.status == '401') {
        return Promise.reject(new Error("ошибка 401 — Переданный токен некорректен"));
      }
      return Promise.reject(new Error("Ошибка аутентификации"));
    });
}
