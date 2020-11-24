const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "leave",
  password: "hRsbYDbRZZ3x",
  port: 5432,
});

const getUsers = (req, res) => {
    pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  };

  const getUsersById = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  const createUser = (request, response) => {
    const { name, totalleave, startdate } = request.body
  
    pool.query("INSERT INTO users (name, totalleave, startdate) VALUES ($1, $2, $3)", 
    [name, totalleave, startdate], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.ID}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { totalleave, startdate } = request.body;

    console.log(id);
    pool.query("UPDATE users SET totalleave = $1, startdate = $2 WHERE id = $3",
    [totalleave, startdate, id], (error, results) => {
      if(error)
      {
        throw error
      }

    response.setHeader("Access-Control-Allow-Origin", ["http://localhost:3000"]);
    response.setHeader('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");

      response.status(201).send(`User patched with ID: ${results.id}`)
    
    })
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  const getRequests = (req, res) => {
    pool.query("SELECT * FROM requests ORDER BY id ASC", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  };

  const getRequestsById = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query("SELECT * FROM requests WHERE id = $1", [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  const createRequest = (request, response) => {
    const { name, date, status, type } = request.body
  
    pool.query("INSERT INTO requests (name, date, status, type) VALUES ($1, $2, $3, $4)", 
    [name, date, status, type], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Request added with ID: ${results.ID}`)
    })
  }

  const deleteRequest = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM requests WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Request deleted with ID: ${id}`)
    })
  }

  module.exports = {
      getUsers,
      getUsersById,
      createUser,
      updateUser,
      deleteUser,
      getRequests,
      getRequestsById,
      createRequest,
      deleteRequest,

  }