exports.handler = async function (event, context){
    return {
        statusCode: 200,
        body: JSON.stringify({
            api: process.env.OPENAI_SECRET
        }),
    }
}