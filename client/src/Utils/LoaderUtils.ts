import { redirect } from "react-router-dom"
import store from "../store/store"


export const Auth =()=> {
        const {user} =  store.getState()
        console.log("ayy check data", user)
        const auth = sessionStorage.getItem("auth")
        if(auth !== 'Y'){
            return redirect('/login')
        }   
        return null;
}