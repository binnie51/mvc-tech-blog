// Global vars to identify blogs
var currentUrl = window.location.pathname;
const parsedCurrUrl = currentUrl.split('/');
const blog_id = parseInt(parsedCurrUrl[parsedCurrUrl.length -1]);
const req_url = `/api/blogs/${blog_id}`

// UPDATE an entry
const blodUpdateHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title-typed').value.trim(); 
    const content_blog = document.querySelector('#blog-content-typed').value.trim(); 
  
    if (title && content_blog) {
      const response = await fetch(req_url, {
        method: 'PUT',
        body: JSON.stringify({ title, content_blog }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    } 
};

// DELETE an entry
const blogDeleteHandler = async (event) => {
    event.preventDefault();
  
    const response = await fetch(req_url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
};

// targets the <form> tags
document
  .querySelector('.edit-blog-post')
  .addEventListener('submit', blodUpdateHandler);

// targets the delete button
document
  .querySelector('.blog-delete-btn')
  .addEventListener('click', blogDeleteHandler);