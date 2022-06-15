const router = require('express').Router();
const { User, Blog, Comments } = require('../models');
const withAuthentication = require('../utils/auth');

// GET all blogs in the homepage regardless of whether or not users have logged in 
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
    );
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one specific blog post with the author, comments, and commenters with :id
router.get('/blog/:id', withAuthentication, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            'id',
            'name',
          ],
        },
        {
          model: Comments,
          attributes: [
            'content',
            'comenter_id',
            'date_created',
          ]
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    
    // if logged in user has the same as the author of the blog post, 
    // they may edit their post(s)
    if (blog.author_id === req.params.user_id) {
      res.render('editBlog', {
        blog, 
        logged_in: req.session.logged_in,
        isDashboard: false
      });
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET Dashboard
router.get('/dashboard', withAuthentication, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        author_id: req.session.user_id,
      },
      include: {
        model: User,
        attributes: ['name']
      }
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('dashboard', { 
      blogs,
      logged_in: req.session.logged_in,
      isDashboard: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route. If users is already logged in, redirect to 'home', else, to 'login' page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Signup route
router.get('/signup', (res, req) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
})

module.exports = router;
