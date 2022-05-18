exports.handler = async function (event, context){
    const {OPENAI_API} = process.env;
    return {
        statusCode: 200,
        body: JSON.stringify({
            api: OPENAI_API
        }),
    }
}