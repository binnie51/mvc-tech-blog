const blogPostHandler = async (event) => {
    event.preventDefault();

    // Collect values from the blog-post form
    const title = document.querySelector("#blog-title-typed").value.trim();
    const content_blog = document.querySelector("#blog-content-typed").value.trim();

    if (title && content_blog) {
        // Send POST req to the API endpoint
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, content_blog }),
            headers: { 
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.blog-post')
  .addEventListener('submit', blogPostHandler);