const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'user_management', // Replace with your database name
});

const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));


db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// JWT Secret key
const JWT_SECRET = 'your-secret-key'; // Store this in environment variables in a real application

// --- API ENDPOINTS ---
// Registration Endpoint
app.post('/register', async (req, res) => {
  const { name, email, mobile, password, role = 'user' } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, mobile, role) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, mobile, role], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: 'Database error during registration' });
      }
      res.status(201).send({ message: 'User registered successfully!' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error during registration' });
  }
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Database error during login' });
    }
    if (results.length > 0) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { id: user.id, name: user.name, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.status(200).send({
          message: 'Login successful',
          token,
          user: { id: user.id, name: user.name, email: user.email, role: user.role },
        });
      } else {
        res.status(401).send({ message: 'Incorrect password' });
      }
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});

// Fetch all admins
app.get('/admins', (req, res) => {
  const sql = "SELECT id, name, email, mobile, status FROM users WHERE role = 'admin'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while fetching admins' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Add a new admin
app.post('/admins', (req, res) => {
  const { name, email, mobile, password, status = 'Active' } = req.body;
  const role = 'admin'; // Fixed role for admins
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error hashing password' });
    }
    const sql = `
      INSERT INTO users (name, email, password, mobile, role, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, email, hashedPassword, mobile, role, status], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Database error while adding admin' });
      } else {
        res.status(201).send({ message: 'Admin added successfully!' });
      }
    });
  });
});

// Update an admin
app.put('/admins/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, status } = req.body;
  const sql = `
    UPDATE users
    SET name = ?, email = ?, mobile = ?, status = ?
    WHERE id = ? AND role = 'admin'
  `;
  db.query(sql, [name, email, mobile, status, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while updating admin' });
    } else {
      res.status(200).send({ message: 'Admin updated successfully!' });
    }
  });
});

// Delete an admin
app.delete('/admins/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ? AND role = 'admin'";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while deleting admin' });
    } else {
      res.status(200).send({ message: 'Admin deleted successfully!' });
    }
  });
});

// Fetch all teachers (Admin)
app.get('/teachers', (req, res) => {
  const sql = "SELECT id, name, email, mobile, status FROM users WHERE role = 'teacher'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while fetching teachers' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Add a new teacher
app.post('/teachers', (req, res) => {
  const { name, email, mobile, password, status = 'Active' } = req.body;
  const role = 'teacher'; // Fixed role for teachers
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error hashing password' });
    }
    const sql = `
      INSERT INTO users (name, email, password, mobile, role, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, email, hashedPassword, mobile, role, status], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Database error while adding teacher' });
      } else {
        res.status(201).send({ message: 'Teacher added successfully!' });
      }
    });
  });
});

// Update a teacher
app.put('/teachers/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, status } = req.body;
  const sql = `
    UPDATE users
    SET name = ?, email = ?, mobile = ?, status = ?
    WHERE id = ? AND role = 'teacher'
  `;
  db.query(sql, [name, email, mobile, status, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while updating teacher' });
    } else {
      res.status(200).send({ message: 'Teacher updated successfully!' });
    }
  });
});

// Delete a teacher
app.delete('/teachers/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ? AND role = 'teacher'";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while deleting teacher' });
    } else {
      res.status(200).send({ message: 'Teacher deleted successfully!' });
    }
  });
});

// Fetch all students (Admin)
app.get('/students', (req, res) => {
  const sql = "SELECT id, name, email, mobile, status FROM users WHERE role = 'student'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while fetching students' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Add a new student
app.post('/students', (req, res) => {
  const { name, email, mobile, password, status = 'Active' } = req.body;
  const role = 'student'; // Fixed role for students
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Error hashing password' });
    }
    const sql = `
      INSERT INTO users (name, email, password, mobile, role, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, email, hashedPassword, mobile, role, status], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Database error while adding student' });
      } else {
        res.status(201).send({ message: 'Student added successfully!' });
      }
    });
  });
});

// Update a student
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, status } = req.body;
  const sql = `
    UPDATE users
    SET name = ?, email = ?, mobile = ?, status = ?
    WHERE id = ? AND role = 'student'
  `;
  db.query(sql, [name, email, mobile, status, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while updating student' });
    } else {
      res.status(200).send({ message: 'Student updated successfully!' });
    }
  });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ? AND role = 'student'";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while deleting student' });
    } else {
      res.status(200).send({ message: 'Student deleted successfully!' });
    }
  });
});

// Fetch all courses (Admin)
app.get('/courses', (req, res) => {
  const sql = "SELECT * FROM courses"; // Modify according to your database schema
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Database error while fetching courses' });
    } else {
      res.status(200).json(results);
    }
  });
});app.get('/teachers', (req, res) => {
  const sql = "SELECT id, name FROM users WHERE role = 'teacher'"; // Modify as per your schema
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Database error while fetching teachers' });
    }
    res.status(200).json(results);
  });
});

// add course endpoint
app.post('/courses', (req, res) => {
  const { title, description, price, level, status, teacher_id } = req.body;

  // Validation (ensure all fields are provided)
  if (!title || !description || !price || !level || !status || !teacher_id) {
    return res.status(400).send({ message: 'All fields are required!' });
  }

  // SQL Query to insert the new course into the database
  const sql = 'INSERT INTO courses (title, description, price, level, status, teacher_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, description, price, level, status,teacher_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Database error while adding course' });
    }
    res.status(201).send({ message: 'Course added successfully!' });
  });
});


// Fetch all schedules
// Get all schedules
app.get('/schedules', (req, res) => {
  const sql = `
    SELECT 
      schedules.id, 
      courses.title AS course, 
      users.name AS teacher, 
      schedules.day, 
      schedules.time, 
      schedules.room, 
      schedules.modality 
    FROM 
      schedules
    JOIN 
      courses ON schedules.course_id = courses.id
    JOIN 
      users ON schedules.teacher_id = users.id AND users.role = 'teacher';
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching schedules:', err);
      return res.status(500).json({ message: 'Database error while fetching schedules' });
    }
    res.status(200).json(results); // Return fetched schedules
  });
});

// Add a new schedule
app.post('/schedules', (req, res) => {
  const { course_id, teacher_id, day, time, room, modality } = req.body;

  if (!course_id || !teacher_id || !day || !time || !room || !modality) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `
    INSERT INTO schedules (course_id, teacher_id, day, time, room, modality)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [course_id, teacher_id, day, time, room, modality], (err, result) => {
    if (err) {
      console.error('Error adding schedule:', err);
      return res.status(500).json({ message: 'Error adding schedule' });
    }
    res.status(201).json({ message: 'Schedule added successfully!' });
  });
});

// Delete a schedule
app.delete('/schedules/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Schedule ID is required' });
  }

  const sql = 'DELETE FROM schedules WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting schedule:', err);
      return res.status(500).json({ message: 'Error deleting schedule' });
    }
    res.status(200).json({ message: 'Schedule deleted successfully!' });
  });
});

// Update course details
app.get("/api/courses/:courseId", (req, res) => {
  const courseId = req.params.courseId;

  const query = `
    SELECT 
      courses.id, 
      courses.title, 
      courses.description, 
      courses.price, 
      courses.status, 
      GROUP_CONCAT(videos.video_url) AS videoLinks
    FROM courses
    LEFT JOIN videos ON courses.id = videos.course_id
    WHERE courses.id = ?
    GROUP BY courses.id
  `;

  db.query(query, [courseId], (err, results) => {
    if (err) {
      console.error("Error fetching course details:", err);
      return res.status(500).send("Failed to fetch course details");
    }

    if (results.length === 0) {
      return res.status(404).send("Course not found");
    }

    const course = results[0];
    res.json({
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      status: course.status,
      videoLinks: course.videoLinks ? course.videoLinks.split(",") : [], // Convert video links into an array
    });
  });
});

// Update course details (PUT request)
app.put("/api/courses/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  const { title, description, price, status, videoLinks } = req.body;

  // Update course details
  const updateQuery = `
    UPDATE courses
    SET title = ?, description = ?, price = ?, status = ?
    WHERE id = ?
  `;

  db.query(updateQuery, [title, description, price, status, courseId], (err) => {
    if (err) {
      console.error("Error updating course:", err);
      return res.status(500).send("Failed to update course");
    }

    // Delete existing videos and insert new ones into the 'videos' table
    const deleteVideosQuery = "DELETE FROM videos WHERE course_id = ?";
    db.query(deleteVideosQuery, [courseId], (err) => {
      if (err) {
        console.error("Error deleting old videos:", err);
        return res.status(500).send("Failed to delete old videos");
      }

      // Insert new video links
      if (videoLinks && videoLinks.length > 0) {
        const videoInsertQuery = "INSERT INTO videos (course_id, video_url) VALUES ?";
        const videoValues = videoLinks.map((url) => [courseId, url]);

        db.query(videoInsertQuery, [videoValues], (err) => {
          if (err) {
            console.error("Error inserting videos:", err);
            return res.status(500).send("Failed to insert videos");
          }

          res.status(200).send("Course updated successfully");
        });
      } else {
        res.status(200).send("Course updated successfully");
      }
    });
  });
});

// API endpoint to fetch videos for a specific course
app.get("/videos/:courseId", (req, res) => {
  const { courseId } = req.params;
  const query = "SELECT * FROM videos WHERE course_id = ?";  // Adjust table and column names accordingly
  
  db.query(query, [courseId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch videos", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No videos found for this course" });
    }
    res.json(results);
  });
});

app.get('/api/courses', (req, res) => {
  const query = 'SELECT id, title, price, status FROM courses';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      res.status(500).send('Error fetching courses.');
    } else {
      res.json(results);
    }
  });
});




// Update a specific course
app.put('/courses', async (req, res) => {
  const { course_id, date, modality } = req.body;
  try {
    const result = await db.query(
      'UPDATE courses SET date = $1, modality = $2 WHERE course_id = $3',
      [date, modality, course_id]
    );

    if (result.rowCount > 0) {
      res.status(200).send('Course updated successfully');
    } else {
      res.status(404).send('Course not found');
    }
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).send('Error updating course');
  }
});

// API endpoint to fetch courses
app.get('/api/courses', (req, res) => {
  // Query the database to fetch all courses
  const query = 'SELECT title, level, modality FROM courses WHERE status = "Active"';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      return res.status(500).json({ error: 'Failed to fetch courses' });
    }

    // Send the results as JSON
    res.json(results);
  });
});








// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
