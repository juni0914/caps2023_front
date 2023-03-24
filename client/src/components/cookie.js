import { Cookies } from "react-cookie";

const cookies = new Cookies();
//쿠키에 값을 저장할때 
export const setCookie = (username, value, option) => {
  return cookies.set(username, value, { ...option });
};
//쿠키에 있는 값을 꺼낼때 
export const getCookie = (username) => {
  return cookies.get(username);
};
//쿠키를 지울때 
export const removeCookie = (username) =>{
    return cookies.remove(username);
}