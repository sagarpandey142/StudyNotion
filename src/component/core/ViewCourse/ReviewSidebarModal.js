import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-stars'
import IconBtn from '../../common/IconBtn'
import { CreateRating } from '../../../services/operation/RatingandReview'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {RxCross2} from "react-icons/rx"
const ReviewSidebarModal = ({setreviewModal}) => {
    
    const courseId=useParams();
   
    const{token}=useSelector((state)=>state.auth)
    const{user}=useSelector((state)=>state.profile)
    const [ratingData,setRatingData]=useState(null);
   const{FullCourseData}=useSelector((state)=>state.ViewCourse)
    const {
        register,
        formState :{errors},
        getValues,
        handleSubmit,
        setValue
     }=useForm();
     
     useEffect(()=>{
        setValue("userExperience","");
        setValue("courseRating",0);
     },[])

    const ratingChanged=(data)=>{
      console.log("rating value",data);
         setValue("courseRating",data);
    }

    const submitHandler=async(data)=>{
     
         const values=getValues();

         const res=await CreateRating({
            rating:data.courseRating,
            review:data.userExperience,
            courseId:FullCourseData?._id,
         },token)
         setreviewModal(false);
    }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                   {/*modal header*/}
                   <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                        <p className="text-xl font-semibold text-richblack-5">Add A review</p>
                        <button onClick={()=>setreviewModal(false)}>
                           <RxCross2  className="text-2xl text-richblack-5"/>
                        </button>
                   </div>
                         {/*modalbody*/}
                    <div className='p-6'>
                         <div className="flex items-center justify-center gap-x-4"> 
                                 <img
                                    src={user?.images}
                                    alt={user?.firstName}
                                    className="aspect-square w-[50px] rounded-full object-cover"
                                 />
                                 <div>
                                          <p className="font-semibold text-richblack-5">{user?.firstName} {user?.lastName}</p>
                                          <p className="text-sm text-richblack-5">Posting Publicly</p>
                                 </div>
                       </div>

                                      {/*form*/}
                                       <form onSubmit={handleSubmit(submitHandler)}
                                          className='mt-6 flex flex-col items-center'>
                                                    {/*rating*/}
                                               <ReactStars
                                                   count={5}
                                                   size={24}
                                                   color2={'#ffd700'}
                                                   onChange={ratingChanged}
                                                />

                                             {/*user Experience*/}
                                             <div className="flex w-11/12 flex-col space-y-2">
                                                   <label
                                                      className="text-sm text-richblack-5">Add Your Experience <sup className='text-pink-100'>*</sup></label>
                                                   <input
                                                      id='userExperience'
                                                      name='userExperience'
                                                      placeholder='Add Your Experience'
                                                      {...register("userExperience",{required:true})}
                                                      className="form-style resize-x-none min-h-[130px] w-full "
                                                   />
                                                   {
                                                      errors.userExperience && (
                                                         <span className="ml-2 text-xs tracking-wide text-pink-200">
                                                            <p>Please Add Your Experience</p>
                                                         </span>
                                                      )
                                                   }
                                             </div>
                                             {/*button*/}
                                                   <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                                                      <button
                                                      onClick={()=>setreviewModal(false)}
                                                      className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
                                                            Cancel
                                                      </button>
                                                      <IconBtn
                                                         text="Save"
                                                         type="submit"
                                                      />
                                                   </div>
                                       </form>
                          </div>       
             </div>
    </div>
  )
}

export default ReviewSidebarModal