

const express=require('express');
const https=require("https");
const bodyParser=require('body-parser');
const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res)
{
    const query=req.body.city;
    const appid="c5e71a951940340e4e94bd941715e678";
    // https://api.openweathermap.org/data/2.5/weather?q=london&appid=c5e71a951940340e4e94bd941715e678 
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid;
    // console.log(url);
    
    https.get(url,function(response)
    {
    //   console.log(response.statusCode);
      if(response.statusCode!="200")
      {
        res.render("failure",{city:query});
      }
      else
      {
      response.on('data',function(data)
      {
        const weatherData=JSON.parse(data);
        // console.log(weatherData);
        const temp=weatherData.main.temp;
        const description=weatherData.weather[0].description;

        res.render("success",{city:query,weather:weatherData});
      });
    }
      
    });

})



app.listen(process.env.PORT || 3000,function()
{
  console.log("Server is running on port 3000");
})

