const { Comments } = require('../models');

const commentsData = [
    {
        content: "Just what I needed to feed my curiousity!",
        blog_id: 1,
        commenter_id: 2,
    },
    {
        content: "I enjoy tech and humor at the same time! Will give this a try.",
        blog_id: 3,
        commentr_id: 2,
    },
    {
        content: "My go to fountain of knowledge for STEM!",
        blog_id: 1,
        commentr_id: 3,
    },
    {
        content: "This one has well-witten articles for those who are tech freaks like myself.",
        blog_id: 2,
        commentr_id: 4,
    },
];

const seedComments = () => Comments.bulkCreate(commentsData); 

module.exports = seedComments;