import { useQuery } from "react-query";
import { api } from "../api";
type User ={
    id:"string";
    name:"string";
    email:"string";
    createdAt:"string";
}
export async function getUsers():Promise<User[]>{
    const {data}=await api.get("users");
   
    const users = data.users.map(user =>{
        return{
            id:user.id,
            name:user.name,
            email:user.email,
            createdAt:new Date(user.createdAt).toLocaleString("pt-BR",{
                day:"2-digit",
                month:"long",
                year:"numeric"
            })
        };
    }) ;  

     return users;
};
export function useUsers(){
    //pegando dados do usuario e formatando
    //Usando o react query os dados ficam guardados em cache, ajuda a controlar os estados (serever-state libary)
   return useQuery<User[]>("users",getUsers,{
        staleTime:1000*5,
    });
}