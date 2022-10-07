const { log } = require("console");
const mysql = require(`mysql`);

const db = mysql.createConnection({

  host:'localhost',
  user:'root',
  password:'',
  database:'car-management'

});

module.exports = db.connect(err =>{
  if (err) {
    console.log(err);
  }else{
    console.log(`Database Connected...`);
  }

});

const loginUser = (req,res) =>{




  let sql = `SELECT * FROM login WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;

  let result  = db.query(sql,(err,result) =>{

    if (err) {

      // returning the response with error message
      return res.status(500).json({

        hasError: true,
        message: `Something Went Wrong`,
        data: {

          data: `Unhandled error occured on the server`

        }

      });
      
    }else{

      if (result.length === 0) {

        // returning the response with success message
        return res.status(404).json({

          hasError: false,
          message: `SUCCESS: Requested operation successful.`,
          data: {

            data: `User Not found`

          }

        });

      }else{

        // returning the response with success message
        return res.status(200).json({

          hasError: false,
          message: `SUCCESS: Requested operation successful.`,
          data: {

            data: `User Login Successfuly`

          }
        })
      }
    }

  });

}

const contactUs = (req,res) =>{

  let data = req.body;

  let sql = 'INSERT INTO contact SET ?';

  let query = db.query(sql,data,(err,result) =>{

    if (err) {

      console.log(err);

    }else{

      console.log(result);

    }

  });

}

const checkout = (req,res) =>{

  let data = req.body;

  let sql = 'INSERT INTO checkout SET ?';

  let query = db.query(sql,data,(err,result) =>{

    if (err) {

      console.log(err);

    }else{

      console.log(result);

    }

  });

}

module.exports = {
  loginUser,
  contactUs,
  checkout
}