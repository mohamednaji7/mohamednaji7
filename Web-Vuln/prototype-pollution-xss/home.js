

function parseQuery(){
    const params = new URLSearchParams(window.location.search)
    const obj = {}
    try{
        for(const [k, v] of params.entries()){
            obj[k] = v;
        }
    }catch{
        console.warn("No user configs")
    }
    return obj
}
function setConfig(){
    console.log("setConfig")
    window.appConfig = parseQuery()
    console.log("appConfig")
    console.log(window.appConfig)
}

setConfig();
console.log("loaded")
// alert("loaded")

function updatePage(){
    // Show button if analytics_url exists
    window.addEventListener("DOMContentLoaded", () => {
      if (appConfig.analytics_url) {

    
        const script = document.createElement("script");
        script.src = appConfig.analytics_url;
        // // safe option ```
        // const allowedScripts = {
        //     analytics: "https://www.googletagmanager.com/gtag/js?id=UA-XXXX",
        //     chat: "https://cdn.chat.com/widget.js",
        //     };
        // if (!(Object.values(allowedScripts).includes(appConfig.analytics_url) ) ) {
        //     return 
        // }
        // // safe opion ^^^
        document.body.appendChild(script);

        const container = document.getElementById("button-container");
        const btn = document.createElement("a");
        btn.href = appConfig.analytics_url;
        btn.textContent = "Go to Analytics";
        btn.style.display = "inline-block";
        btn.style.padding = "10px";
        btn.style.background = "#007bff";
        btn.style.color = "#fff";
        btn.style.borderRadius = "6px";
        btn.style.textDecoration = "none";
    
        container.appendChild(btn);
        
      }
    });
    
}

updatePage();