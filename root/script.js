
document.getElementById('frm_prompt').addEventListener("submit",   function(event){
    let prompt = document.getElementById('txtprompt');
    let model = document.getElementById('models');
    if(prompt.value != ""){
        handleSubmit(prompt, model);
    }
    event.preventDefault();
})

async function handleSubmit(prompt, model){
    let api_key   = await environmentVariable();
    let response  = await callApi(prompt.value, model.value, api_key)
    createResponse(prompt.value, response);

}

 function createResponse(prompt, response){

   let response_div = document.createElement("article");
   let response_container = document.getElementById("response_container");

   let prompt_para =  createElement_function(prompt, "p");
   let prompt_title =  createElement_function("Prompt:", "h3");
   let response_title =  createElement_function("Response:", "h3")
   let response_para =  createElement_function(response, "p")

   response_div.append(prompt_title)
   response_div.append(prompt_para)
   response_div.append(response_title)
   response_div.append(response_para)
   response_container.prepend(response_div);
   
}

function createElement_function (data, elementType){
    let dom_element = document.createElement(elementType);
    dom_element.innerHTML = data;
    return dom_element;
};

 async function callApi(prompt,model, api_key){

    let api_response = "";
    const data = {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
       };
        
       const response = await fetch(`https://api.openai.com/v1/engines/${model}/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_key}`,
        },
        body: JSON.stringify(data),
       }).then(res  => res.json())

       api_response = await response.choices[0].text;
       return api_response;
}

async function environmentVariable(){
    const response = await fetch("/.netlify/functions/api")
    .then(response => response.json())
    return response.api;
}