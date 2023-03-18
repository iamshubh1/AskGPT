const express = require("express");
const cors = require("cors");
const env = require("dotenv");
env.config();
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey:  process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/",(req,res)=>{
  res.json({
   message:"                                        Hey there, AskGPT's Server is running on this site                         ",
  });
});
app.post("/",(req,res)=>{
    const question =req.body.question;
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
      })
      .then((response)=>{
        console.log({response});
        return response?.data?.choices?.[0]?.text;
      })
      .then((answer)=>{
        const array=answer?.split("\n").filter((value)=>value).map((value)=>value.trim());
        return array;
      })
      .then((answer)=>{
       res.json({
        answer:answer,
       });
      });
});
app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});


