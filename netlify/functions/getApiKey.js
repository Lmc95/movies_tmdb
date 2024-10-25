exports.handler = async function(event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ apiKey: process.env.API_KEY }) // Asegúrate de que sea JSON válido
    };
  };
  