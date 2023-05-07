import express from 'express';
import cors from 'cors';
import mssql from 'mssql';

const databaseConfig = {
    user: 'sa',
    password: 'Kolkata@1',
    server: 'BIPLAB_PC\\BIPLABPC',
    database: 'University',
    options: {
        encrypt: false,
        useUTC: true
    }
};

const app = express()
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());

app.listen(5000, () => console.log('Server has started on http://localhost:5000'));

app.get('/', async (req, res) => {
    res.status(200).send({
        message: "Default EndPoint"
    })
});

mssql.connect(databaseConfig, (error) => {
    error ? console.log(error) : console.log("SQL Connected");
})

app.post('/insertstudent', async (req, res) => {
    const { student_name, student_dob, student_marks } = req.body;
    const request = new mssql.Request();
    let query = `INSERT INTO [dbo].[Student]
           ([student_name]
           ,[student_dob]
           ,[student_marks])
     VALUES
           ('${student_name}',
           '${student_dob}',
           ${student_marks})`;
    console.log(query);
    request.query(query, (recordSet, error) => {
        error ? res.send({
            message: error
        }) : res.send({
            message: "Inserted successfully",
            DataSet: recordSet
        })
    })
})

app.post('/insertteacher', async (req, res) => {
    const { teacher_name, dept_id } = req.body;
    const request = new mssql.Request();
    let query = `INSERT INTO [dbo].[Teacher]
           ([teacher_name]
           ,[dept_id])
     VALUES
           ('${teacher_name}',
           ${dept_id})`;
    console.log(query);
    request.query(query, (recordSet, error) => {
        error ? res.send({
            message: error
        }) : res.send({
            message: "Inserted successfully",
            DataSet: recordSet
        })
    })
})

app.post('/updateteacher', async (req, res) => {
    const { teacher_name, dept_id, teacher_id } = req.body;
    const request = new mssql.Request();
    let query = `UPDATE [dbo].[Teacher]
    SET teacher_name = '${teacher_name}',
        dept_id = ${dept_id}
    WHERE teacher_id = ${teacher_id}`;
    console.log(query);
    request.query(query, (recordSet, error) => {
        error ? res.send({
            message: error
        }) : res.send({
            message: "Updated successfully",
            DataSet: recordSet
        })
    })

})

app.post('/updatestudent', async (req, res) => {
    const { student_name, student_dob, student_marks, student_id } = req.body;
    const request = new mssql.Request();
    let query = `UPDATE [dbo].[Student]
    SET student_name = '${student_name}',
        student_dob = '${student_dob}',
        student_marks = ${student_marks}
    WHERE student_id = ${student_id}`;

    console.log(query);
    request.query(query, (recordSet, error) => {
        error ? res.send({
            message: error
        }) : res.send({
            message: "Updated successfully",
            DataSet: recordSet
        })
    })

})

app.post('/deletemapper', async (req, res) => {
    const { table_name, table_attribute_id } = req.body;
    if (table_name === "Teacher") {
        const request = new mssql.Request();
        let query = `DELETE FROM [dbo].[${table_name}] Where teacher_id = ${table_attribute_id}`;
        console.log(query);
        request.query(query, (recordSet, error) => {
            error ? res.send({
                message: error
            }) : res.send({
                message: "Deleted successfully",
                DataSet: recordSet
            })
        })
    } else if (table_name === "Student") {
        const request = new mssql.Request();
        let query = `DELETE FROM [dbo].[${table_name}] Where student_id = ${table_attribute_id}`;
        console.log(query);
        request.query(query, (recordSet, error) => {
            error ? res.send({
                message: error
            }) : res.send({
                message: "Deleted successfully",
                DataSet: recordSet
            })
        })
    }
})

app.post('/readmapper', async (req, res) => {
    const { table_name } = req.body;
    const request = new mssql.Request();
    let query = `SELECT * from [dbo].[${table_name}]`;
    console.log(query);
    request.query(query, (records, error) => {
        error ? res.status(401).send({
            message: error
        }) : res.status(200).send({
            message: "Complied Successfully",
            DataSet: records
        })
    })
})