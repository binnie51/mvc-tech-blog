const commentPostHandler = async (event) => {
    event.preventDefault();

    // gather values from comment-form
    const content_comment = document.querySelector("#comment-typed").value.trim();
    var currentUrl = window.location.pathname;
    console.log(currentUrl);

    const parsedCurrUrl = currentUrl.split('/');
    const blog_id = parseInt(parsedCurrUrl[parsedCurrUrl.length - 1]);

    comment_url = `/api/blogs/${blog_id}/comment`
    const response = await fetch(comment_url, {
        method: 'POST',
        body: JSON.stringify({ content_comment, blog_id }),
        headers: { 'Content-Type' : 'application/json' }
    })
    console.log('response in submit coment', response);

    if (response.ok) {
        document.location.replace(`/blogs/${blog_id}`);
    } else {
        alert(response.statusText);
    }
};

document
  .querySelector('.comment-post')
  .addEventListener('submit', commentPostHandler);