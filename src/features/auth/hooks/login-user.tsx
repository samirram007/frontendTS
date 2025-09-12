import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ILoginPayload } from "../interfaces/login-interface"
import { fetchUserProfileService, loginService } from "../services/apis"
import { toast } from "sonner"
import { useAuth } from "../contexts/AuthContext"






export const useLoginMutation = () =>{

    const queryClient = useQueryClient();
    const {setUser,setIsAuthenticated} = useAuth();


    return useMutation({
        mutationKey:['userLogin'],
        mutationFn:(payload:ILoginPayload)=>{
            return loginService(payload)
        },
        retry:1,
        onSuccess:(data)=>{
            setIsAuthenticated(true);
            queryClient.fetchQuery({
                queryKey:['userProfile'],
                queryFn: fetchUserProfileService
            }).then((data)=>{
                setUser(data?.data?.data);
            }).catch(()=>{
                setUser(null);
            })
            console.log(data,"login muration");
            if(data.status != 200){
                toast.error(data?.data?.message)
            }else{
                toast.success(data?.data.message);
            }
            
        },
        onError:(error)=>{
            toast.error(error.message);
        },
    })
}