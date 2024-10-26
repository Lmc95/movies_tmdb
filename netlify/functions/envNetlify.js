exports.handler = async function () {
    return {
        statusCode: 200,
        body: JSON.stringify({ api_key: process.env.API_KEY }) // Ajusta el nombre según tu variable
    };
};
