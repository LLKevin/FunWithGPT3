
document.getElementById('frm_prompt').addEventListener("submit",   function(event){
    prompt = document.getElementById('txtprompt');
    if(prompt.value != ""){
        handleSubmit(prompt);
    }
    event.preventDefault();
})

async function handleSubmit(prompt){
    let api_key   = await environmentVariable();
    let response  = await callApi(prompt.value, api_key)
    createResponse(prompt.value, response);

}

function createResponse(prompt, response){

   let response_div = document.createElement("div");
   let response_container = document.getElementById("response_container");

   let prompt_para = document.createElement('p');
   prompt_para.innerHTML = prompt;
   
   let prompt_title = document.createElement('h3');
   prompt_title.innerHTML = "Prompt:";

   let response_title = document.createElement('h3');
   response_title.innerHTML = "Response:";

   let response_para = document.createElement('p');
   response_para.innerHTML = response;

   response_div.append(prompt_title)
   response_div.append(prompt_para)
   response_div.append(response_title)
   response_div.append(response_para)
   response_container.append(response_div);
   
}

 async function callApi(prompt, api_key){

    let api_response = "";
    const data = {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
       };
        
       const response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
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