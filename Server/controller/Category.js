const User=require("../model/User");
const Category=require("../model/category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

exports.createCategory=async(req,res)=>{
     try{
        //fetch data 
        const{name,decsription}=req.body;

        //validation
        if(!name || ! decsription){
            res.status(401).json({
                sucess:false,
                message:"All Fields Are Required",
            })
        }

        //save in db
        const dbSave=await Category.create({
            name:name,
            decsription:decsription,
        });

        res.status(200).json({
            sucess:false,
            message:"Tag creates SuccessFully",
        })
     } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
     }
}

exports.showAllCategory=async(req,res)=>{
     try{
          
       const AllCategory=await Category.find({},{name:true,decsription:true});

       res.status(200).json({
          success:true,
          data:AllCategory,
          message:"Tag Fetched SuccessFully",
       })

     } catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
     }
}

exports.categoryPageDetail=async(req,res)=>{
    try{
         //fetch category id from request
         const{categoryid}=req.body;
       
          //get courses for specified categoryId
          const specifiedCategory=await Category.findById(categoryid)
          .populate({
            path: "course",
            match: { status: "Published" },
            populate: "ratingAndReview",
          })
          .exec()
           
          if(!specifiedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not Found"
            })
          }
         
         
          
          if(specifiedCategory?.course?.length ===0){
              return res.status(404).json({
                success:false,
                message:"No Course found for the Selected Caregory"
              })
          }

           //get courses for unspecified categoryId
            console.log("hiiiii")
           const randomCategory=await Category.find({
                                        _id:{$ne:categoryid},
           })
          console.log("hii")
           let differentCategory = await Category.findOne(
            randomCategory[getRandomInt(randomCategory.length)]
              ._id
          )
           .populate({
            path:"course",
            match: {status : "Published"},
           })
           .exec();
   
           //HW TODO GET 10 HIGH SELLING COURSE
           const allCategories = await Category.find()
           .populate({
             path: "course",
             match: { status: "Published" },
             populate: {
               path: "instructor",
           },
           })
           .exec()
           console.log("first")
         const allCourses = allCategories.flatMap((category) => category.course)
         const mostSellingCourses = allCourses
           .sort((a, b) => b.sold - a.sold)
           .slice(0, 10)
          
           console.log("data",specifiedCategory,differentCategory,mostSellingCourses)
           return res.status(200).json({
              success:true,
              data:{
                specifiedCategory,
                differentCategory,
                mostSellingCourses,
              }
           })
          
    }   
          
     catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}
