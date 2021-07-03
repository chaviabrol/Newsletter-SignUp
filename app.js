
const ex = require("express");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = ex();

app.use(ex.urlencoded({extended:true}));
app.use(ex.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

mailchimp.setConfig({
    apiKey: "e1e3cfc2b1a79b6311e4779ebe3f5482-us6",

    server:"us6"
});
app.post("/", function(req,res){
    const fname = req.body.FirstName;
    const lname = req.body.LastName;
    const email = req.body.email_id;

    const list_id  = "95d0506093";
    const subscribinguser = {
        firstName: fname,
        LastName: lname,
        email: email
    };

    //uploading data to server
    async function run (){
        try{
        const response = await mailchimp.lists.addListMember(list_id,{
            email_address: subscribinguser.email,
            status: "subscribed",
            merge_fields: {
            FNAME: subscribinguser.firstName,
            LNAME: subscribinguser.LastName
           }
        });
        res.sendFile(__dirname+"/sucess.html");
        console.log("Successful");
        } catch(e){
            console.log(e.status);
            res.sendFile(__dirname+"/failure.html");
        }
    };

    run();
});
app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is up and running");
});


// Api key
// f6f93d19b2849c1dc54256261fb5e38c-us6
// Audience key
//95d0506093