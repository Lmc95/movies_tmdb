// apiKey.js
let apiKey = fetch('/.netlify/functions/envNetlify')
    .then(response => response.json())
    .then(data => data.apiKey)
    .catch(error => {
        console.error('Error fetching the API key:', error);
        return null;
    });

export default apiKey;
