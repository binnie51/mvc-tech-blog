const router = require('express').Router();
const { Blog, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new blog
router.post('/', withAuth, async (res, req) => {
    try {
        const blogData = await Blog.create({
            ...req.body,
            title: req.body.title,
            content: req.body.content,
            author_id: req.session.user_id,
        });
        res.status(200).json(blogData);
    }
    catch (err) {
        res.status(400).json({ message: "Error! Can't create blog entry."});
    }
});

// GET/retrieves blog with specific id
router.get('/:id', withAuth, async (req,res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);
        const blogObj = blogData.get({ plain: true });
        res.status(200).json(blogObj);
    }
    catch (err) {
        res.status(400).json({ message: "Error! The blog with that ID doesn't exist."})
    }
})