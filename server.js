const { json } = require("body-parser");
const express = require(`express`);
const { loginUser, contactUs,checkout } = require(`./backend`);
const cors = require(`cors`);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(json());

app.post('/login', loginUser);
app.post('/contact', contactUs);
app.post(`/checkout`, checkout);

app.use(cors());

app.use(function (req, res, next) {

  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept, Authorization`);

  // 
  if (req.method === `OPTIONS`) {

    res.header(`Access-Control-Allow-Methods`, `GET, POST, PATCH, DELETE`);

    return res.status(200).json({

      hasError: false,
      message: `SUCCESS: Requested operation successful.`,
      data: {}

    });

  }

  next();

});

app.listen(PORT , () =>{
  console.log(`SERVER IS LISTNING ON ${PORT}`);
});