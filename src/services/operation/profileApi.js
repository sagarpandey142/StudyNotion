import {toast} from "react-hot-toast"
import { endpoints, profileEndpoints } from "../api";
import axios from "axios";
import { apiConnector } from "../apiconnector";


export async function getAllEnrolledCourses(token){
     const toastId=toast.loading("Loading....")
     let result=[]
     try{
     

        const response = await apiConnector(
            "GET",
           profileEndpoints.GET_USER_ENROLLED_COURSES_API,
            null,
            {
              Authorisation: `Bearer ${token}`,
            }
          )
          

            if(!response.data.success){
                throw new Error(response.data.message);
            }
           
            result=response.data.data;
     }
     catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
     }
     toast.dismiss(toastId);
     return result;
}



export function deleteProfile(userid){
     
}