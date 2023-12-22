import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "DBMS-pro",
    password: "123456",
    port: 5432,
  });

const app = express();
const port = 3000;

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


db.connect();


let student2 = [];

  app.get("/", async (req, res) => {
    const result =await db.query('SELECT * FROM student');
       let students = [];
       result.rows.forEach(student => {
        students.push(student)
       });
      
        console.log(students);

    res.render("index.ejs",{students});
  });

  app.get("/add", async (req, res) => {
    res.render("add.ejs");
  });


  app.post('/submit', async (req, res) => {
    try {
        const { name, ss, mpmc, mss, flat, cn, dm } = req.body;
        console.log(name);
  
        // Insert the form data into the 'students' table
        const insertQuery = 'INSERT INTO student (name, ss, mpmc, mss, flat, cn, dm) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        await db.query(insertQuery, [name, ss, mpmc, mss, flat, cn, dm]);

        res.render("add.ejs"); 
      
      }catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
  });

  app.get("/weak-students", async (req, res) => {
    res.render("buttons.ejs");
  });
  let students = [];
  app.post('/weak', (req, res) => {

    const selectedValue = req.body.selectedValue;

    const query = `SELECT * FROM student WHERE "${selectedValue}" < $1`; // Using $1 as a placeholder
    student2 = [];
    db.query(query, [40], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
        } else {
            console.log('Query result:', result.rows);
            result.rows.forEach(student1 => {
              student2.push(student1)
             });
            res.status(200).json(result.rows); // Sending query result back as JSON
        }

      });

    app.get("/weak", async (req, res) => {
        res.render("weak.ejs",{student2});
    });
       
});


  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
