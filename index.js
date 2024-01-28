//const { Pool } = require("pg");
const { Pool, Client } = require("pg");
var express = require('express');
const dotenv = require("dotenv");
dotenv.config();

var app = express()

app.get('/',async function (req, res) {
  res.send('Hello World!')
});
app.post('/post', async function (req, res) {
	res.send('POST Hello World!')
};

app.get('/dbconnect',async function (req, res) {
	const poolResult = await poolDemo();
	console.log("Time with pool: " + poolResult.rows[0]["now"]);
    console.log("Time with pool: " + poolResult.rows[0]);
    const clientResult = await clientDemo();
    console.log("Time with client: " ,clientResult);
    console.log("Time with client now : " + clientResult.Result);
	
  res.send(clientResult.Result);
});

app.listen(3000, function () {
  console.log('Listening on port 3000...')
})
const credentials = {
    user: "gslabadmin",
    host: "my-rds-db.cnwhgmvzzzv.ap-south-1.rds.amazonaws.com",
    database: "dharraDB",
    password: "GAVS-PostgressSQL#",
    port: "54322",
  };

const connectDb = async () => {
    try {
        // const pool = new Pool({
        //     user: process.env.PGUSER,
        //     host: process.env.PGHOST,
        //     database: process.env.PGDATABASE,
        //     password: process.env.PGPASSWORD,
        //     port: process.env.PGPORT,
        // });
        const pool = new Pool(credentials);

        await pool.connect()
        const res = await pool.query('SELECT * FROM AGENTS')
        //console.log(res)
        //console.log("+++++++++++++++++++");
        //console.log(res.rows);
        console.log("=======A L L   R E C O R D S  ==========");
        for( r of res.rows){
            console.log("=================");
            console.log("Agent code  =",r.agent_code);
            console.log("agent Name  =",r.agent_name);
            console.log("Phone  =",r.phone_no);
            console.log("Country  =",r.country);
        }
        console.log("====== E  N  D  ===========");
        const res1 = await pool.query('SELECT * FROM "tblUser"')
        console.log("+++++++++++++++++++");
        console.log(res1.rows);
        await pool.end()
    } catch (error) {
        console.log(error)
    }
}
async function poolDemo() {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT NOW()");
    await pool.end();
  
    return now;
}

// Connect with a client.

async function clientDemo() {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query("SELECT NOW() as useTimeZone");
    await client.end();
  
    return now;
  }

 
//connectDb();
/*
(async () => {
    const poolResult = await poolDemo();
    console.log("Time with pool: " + poolResult.rows[0]["now"]);
    console.log("Time with pool: " + poolResult.rows[0]);
    const clientResult = await clientDemo();
    console.log("Time with client: " ,clientResult);
    console.log("Time with client now : " + clientResult.Result);
    //console.log("Time with client: " + clientResult.rows[0]);
  })();
*/

