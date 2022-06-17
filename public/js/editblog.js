// Global vars to identify blogs
var currentUrl = window.location.pathname;
const parsedCurrUrl = currentUrl.split('/');
const blog_id = parseInt(parsedCurrUrl[parsedCurrUrl.length -1]);
const req_url = `api/blog/${blog_id}`

// UPDATE an entry
const blodUpdateHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim(); 
    const content = document.querySelector('#blog-content').value.trim(); 
  
    if (title && content) {
      const response = await fetch(req_url, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
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
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
};

document
  .querySelector('.blog-update')
  .addEventListener('click', blodUpdateHandler);

document
  .querySelector('.blog-delete')
  .addEventListener('click', blogDeleteHandler);