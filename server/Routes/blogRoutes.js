const express = require('express')
const { getAllBlogsController, 
        createBlogController, 
        updateBlogController,
        getBlogByIdController, 
        deleteBlogController,
        userBlogControlller} = require('../Controller/blogController');

const router = express.Router();

//routes || GET
router.get('/all-blog', getAllBlogsController);

//create Blog || POST
router.post('/create-blog', createBlogController);

//PUT || Update
router.put('/update-blog/:id', updateBlogController);
//GET || Single blog
router.get('/get-blog/:id', getBlogByIdController);

//DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController);
//GET || user blog
router.get("/user-blog/:id", userBlogControlller);

module.exports = router;