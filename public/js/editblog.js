// UPDATE an entry
const blodUpdateHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#project-funding').value.trim(); // need to define id in handlebars!!!!
    const content = document.querySelector('#project-desc').value.trim(); // need to define id in handlebars!!!!
  
    if (title && content) {
      const response = await fetch(req_url, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update this blog!');
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
    alert('Failed to delete blog entry!');
    }
};

document
  .querySelector('.blog-update')
  .addEventListener('submit', blodUpdateHandler);

document
  .querySelector('.blog-delete')
  .addEventListener('click', blogDeleteHandler);