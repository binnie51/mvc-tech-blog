const blogPostHandler = async (event) => {
    event.preventDefault();

    // Collect values from the blog-post form
    const title = document.querySelector("#blog-title-typed").value.trim();
    const content = document.querySelector("#blog-content-typed").value.trim();

    if (title && content) {
        // Send POST req to the API endpoint
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify( { title, content }),
            headers: { 
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
            console.log("Cannot post!")
        }
    }
};

document
  .querySelector('.blog-post')
  .addEventListener('submit', blogPostHandler);