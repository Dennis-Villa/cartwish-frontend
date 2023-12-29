import { jwtDecode } from "jwt-decode";
import apiClient from "../utils/api-client";

const tokenName = "token";

export const signup = (user, profilePic) => {

    const body = new FormData();

    body.append("name", user.name);
    body.append("email", user.email);
    body.append("password", user.password);
    body.append("deliveryAddress", user.deliveryAddress);
    body.append("profilePic", profilePic);

    return apiClient.post("/user/signup", body)
    .then(resp => {
        localStorage.setItem(tokenName, resp.data.token);
    });

};

export const login = (user) => {

    return apiClient.post("/user/login", user)
    .then(resp => {
        localStorage.setItem(tokenName, resp.data.token);
    });
    
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getUser = () => {
    
    const jwt = localStorage.getItem(tokenName);

    if(jwt){
        return jwtDecode(jwt);
    }
    else{
        return null;
    }
    
};

export const getJWT = () => {
    return localStorage.getItem(tokenName);
};