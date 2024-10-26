// apiKey.js
let apiKey_1 = fetch('/.netlify/functions/envNetlify')
    .then(response => response.json())
    .then(data => data.api_Key)
    .catch(error => {
        console.error('Error fetching the API key:', error);
        return null;
    });

export default apiKey_1;
