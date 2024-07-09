import authservices from "@/services/authservices";
import { defineStore } from "pinia";

export const useauthStore= defineStore('authStore', ()=>{
    const user = authservices.getUser()
    const isAuth =authservices.isAuth()
    
    
    const login = async (userName:string , password:string ) =>{
        return await authservices.login(userName , password)
    }
    const logout= async()=>{
        return await authservices.logout()
    }


    return{
        user,
        isAuth,
        login,
        logout
    }
})