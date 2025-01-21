const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');


//GET all blogs
exports.getAllBlogsController = async(req, res) => {

    try {
const blogs = await blogModel.find({}).populate("user");
if (!blogs){
    return res.status(200).send({
        success:false,
        message:'no blogs found'
    });

}
return res.status(200).send({
    success:true,
    BlogCount:blogs.length,
    message:'All blogs here',
    blogs,

}) ;}
catch(error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error While Geting Blogs",
            error
        });}
}
//createBlog
exports.createBlogController = async(req, res) => {
    try {
        const {title, description, image, user} =  req.body
        if(!title || !description || !image || !user ){
            return res.status(400).send({
            success:false,
            message:'Provide All fields',
        });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
        const newBlog = new blogModel({title, description, image, user});
        const session = await mongoose.startSession();
         session.startTransaction();
        await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
    }catch(error){
        console.log(error)
            return res.status(400).send({
                success:false,
                message:'Error in creating blog',
                error,
            });}
    }

//updateBlog
exports.updateBlogController = async(req, res) => {
    try{
        const {id} = req.params;
        const {title, description, image} = req.body
        const blog = await blogModel.findByIdAndUpdate(id, 
            {...req.body},
            {new:true});
        return res.status(200).send({
            success: true,
            message:' Blog update success',
            blog,
        });
    }
    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'Error while Updating Blog',
            error
        });
    }
};

//getBlog
exports.getBlogByIdController = async(req, res) => {
    try{
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success: true,
                message:' blog not found',
        });
        }
        return res.status(200).send({
            success: true,
            message:' fetch Single post success',
            blog,
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'Error while geting single Post',
            error
        });
    }
};

//DeleteBolg
exports.deleteBlogController = async(req, res) => {
    try{
        const blog =  await blogModel.findByIdAndDelete(req.params.id)
        .populate("user");
        return res.status(200).send({
            success: true,
            message: ' Post Delete',
            
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'Error while deleting Post',
            error
        });
    }
};
//GET USER BLOG
exports.userBlogControlller = async (req, res) => {
    try {
      const userBlog = await userModel.findById(req.params.id).populate("blog");
  
      if (!userBlog) {
        return res.status(404).send({
          success: false,
          message: "blogs not found with this id",
        });
      }
      return res.status(200).send({
        success: true,
        message: "user blogs",
        userBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "error in user blog",
        error,
      });
    }
  };
