const express = require("express")
const path = require("path");
const PORT = 3000;

const app = express();
app.get("/", (req, res) =>{
    // res.send("hello world!");
    res.sendFile(path.join(__dirname, "home.html"))
})
// serve client-side JS
app.get("/home.js", (req, res) => {
  res.sendFile(path.join(__dirname, "home.js"));
});

app.listen(PORT, 
    ()=> console.log(`Server running at http://localhost:${PORT}`)
)