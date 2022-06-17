const blogPostHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login-form
    const title = document.querySelector("#blog-title").value.trim();
    const content = document.querySelector("#blog-content").value.trim();

    if (title && content) {
        // Send POST req to the API endpoint
        const response = await fetch('api/blog', {
            method: 'POST',
            body: JSON.stringify( { title, content }),
            headers: { 
                'Content-Type': 'application/json'
             },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.blog-post')
  .addEventListener('submit', blogPostHandler);