async function searchVideos() {
  const key = document.getElementById('api-key').value.trim();
  const query = document.getElementById('query').value;
  const maxResults = document.getElementById('max-results').value;
  const order = document.getElementById('order').value;

  if (!key) {
    alert('Please provide a YouTube API key.');
    return;
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('q', query);
  url.searchParams.set('type', 'video');
  url.searchParams.set('maxResults', maxResults);
  url.searchParams.set('order', order);
  url.searchParams.set('key', key);

  const res = await fetch(url);
  const data = await res.json();
  displayResults(data.items);
}

function displayResults(items) {
  const container = document.getElementById('results');
  container.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'result';
    const link = `https://www.youtube.com/watch?v=${item.id.videoId}`;
    div.innerHTML = `
      <a href="${link}" target="_blank">
        <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">
        <p>${item.snippet.title}</p>
      </a>
    `;
    container.appendChild(div);
  });
}

document.getElementById('search-btn').addEventListener('click', searchVideos);
