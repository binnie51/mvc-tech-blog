const { Blog } = require('../models');

const blogData = [
    {
        "title": "MIT Technology Review",
        "content": "If you are looking for a tech blog, MIT Technology Review should be one of the first you click through to. MIT Technology Review features topics like AI, biotechnology, computing, climate change and so much more.",
        "author_id": 1,
    },
    {
        "title": "TechCrunch",
        "content": "TechCrunch has the latest news on gadgets and gizmos, apps, and tech events. TechCrunch even has sections for those looking specifically for video and audio when searching for new tech news.",
        "author_id": 1,
    },
    {
        "title": "Gizmodo",
        "content": "Gizmodo is the go-to blog for tech, science and culture. Gizmodo focuses on sharing tech content with occasional humor — and always with blunt honesty. With a history dating back to 2002, Gizmodo is a long-established and well-respected news source.",
        "author_id": 2,
    },
    {
        "title": "ReadWrite",
        "content": "ReadWrite was founded by New Zealander Richard MacManus in 2003. ReadWrite is a place to find the newest information about connected cars, smart homes, AR/VR, fintech and APIs.",
        "author_id": 2,
    },
    {
        "title": "Fast Company",
        "content": "Fast Company focuses on innovations in technology, leadership and world-changing design, emphasizing their impact on business. Launched in November 1995, Fast Company is still a leading site for business leaders, and a subscription to the newsletter provides a daily dose of all the important news.",
        "author_id": 3,
    }
];

const seedBlog = () => Blog.bulkCreate(blogData); 

module.exports = seedBlog;