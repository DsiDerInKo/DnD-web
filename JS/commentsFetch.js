document.addEventListener('DOMContentLoaded', () => {
    const commentsContainer = document.getElementById('comments_container');
    const preloader = document.getElementById('preloader');

    preloader.style.display = 'block'
    fetchComments();

    function fetchComments() {
        fetch('https://jsonplaceholder.typicode.com/comments?_start=100&_limit=10')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(comments => {
                preloader.style.display = 'none';
                renderComments(comments);
            })
            .catch(error => {
                preloader.style.display = 'none';
                showError(error.message);
            });
    }

    function renderComments(comments) {
        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.classList.add('comment');
            const header = document.createElement('h4');
            header.textContent = comment.name;
            const body = document.createElement('p');
            body.textContent = comment.body;
            commentEl.appendChild(header);
            commentEl.appendChild(body);
            commentsContainer.appendChild(commentEl);
        });
    }

    function showError(message) {
        const errorEl = document.createElement('div');
        errorEl.classList.add('error');
        errorEl.textContent = `Что-то пошло не так: ${message}`;
        commentsContainer.appendChild(errorEl);
    }
});