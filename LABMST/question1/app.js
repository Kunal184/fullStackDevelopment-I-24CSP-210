document.getElementById('postForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;

  fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  })
    .then(function (response) {
      if (response.ok) {
        document.getElementById('postForm').reset();
        document.getElementById('successMessage').style.display = 'block';
      } else {
        alert('Something went wrong. Please try again.');
      }
    })
    .catch(function (error) {
      alert('Request failed: ' + error.message);
    });
});
