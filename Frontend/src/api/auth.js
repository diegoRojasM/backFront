import axios from "./axios"


export const registerRequest = user => axios.post(`/register`,user)

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get(`/verify`);

