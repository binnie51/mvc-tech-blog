const router = require('express').Router();
const { Blog, Comments } = require('../../models');
const withAuthentication = require('../../utils/auth');

// GET all blogs
router.get("/", async (req, res) => {
    // find all Blogs
    try {
      const blogData = await Blog.findAll({
        attributes: ["id", "title","content","author_id"],
      });
      res.json(blogData);
    } catch (error) {
      res.status(400).json({ message: "Cannot find blogs!" });
    }
});


// GET blog with specific id (only after users have signed in)
router.get('/:id', withAuthentication, async (req,res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);
        const blog = blogData.get({ plain: true });
        res.status(200).json(blog);
    }
    catch (err) {
        res.status(400).json({ message: "Error! The blog with that ID doesn't exist."})
    }
});

// CREATE new blog
router.post('/', withAuthentication, async (res, req) => {
    try {
        const createBlog = await Blog.create({
          title: req.body.title,
          content: req.body.content,
          author_id: req.body.author_id
        });
        return res.json(createBlog);
    } catch (error) {
        res.status(400).json({ message: "Cannot post blog!" });
    }
});

// UPDATE specific entry that belongs to the a user who has a matching 
// username to the author of the blog post
router.put('/:id', withAuthentication, async (req, res) => {
    try {
        if (req.body && req.params.id) {
            const blogData = await Blog.update(req.body, {
                where: {
                    id: req.params.id,
                    author_id: req.session.user_id,
                },
            });

            if (!blogData) {
                res.status(404).json({ message: 'No blog post found with this id!' });
            }
        }
        res.status(200).json(blogData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a specific blog entry that belongs to the a user who has a matching 
// username to the author of the blog post
router.delete('/:id', withAuthentication, async (res, req) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                author_id: req.params.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Add comment to a specific blog post 
router.post('/:id/comment', withAuthentication, async (req, res) => {
    try {
        if (req.body.content) {
            const commentsData = await Comments.create({
                content: req.body.content,
                blog_id: req.body.blog_id,
                commentor_id: req.session.user_id,
            });
            res.status(200).json(commentsData);
        }
        else {
            res.status(404).json({ message: "Error! Can't comment." });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;