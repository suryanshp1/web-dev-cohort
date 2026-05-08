-- DROP TABLE students; -- delete previous table

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    branch VARCHAR(50)
);

CREATE TABLE internships (
    internship_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100),
    role VARCHAR(50),
    stipend INT CHECK(stipend > 1000),
    status VARCHAR(20), -- Selectec / Pending / Rejected
    student_id INT REFERENCES students(student_id) ON DELETE SET NULL
    -- student_id INT REFERENCES students(student_id) ON DELETE RESTRICT
    -- student_id INT REFERENCES students(student_id) ON DELETE CASCADE
)

INSERT INTO students (name, email, branch)
VALUES
('Aarav Sharma', 'aarav.sharma@gmail.com', 'Computer Science'),
('Priya Verma', 'priya.verma@gmail.com', 'Information Technology'),
('Rohan Singh', 'rohan.singh@gmail.com', 'Mechanical'),
('Sneha Patel', 'sneha.patel@gmail.com', 'Electronics'),
('Aditya Yadav', 'aditya.yadav@gmail.com', 'Civil'),
('Kavya Nair', 'kavya.nair@gmail.com', 'Computer Science'),
('Rahul Mishra', 'rahul.mishra@gmail.com', 'Electrical'),
('Neha Gupta', 'neha.gupta@gmail.com', 'Information Technology'),
('Vikram Joshi', 'vikram.joshi@gmail.com', 'Mechanical'),
('Ananya Roy', 'ananya.roy@gmail.com', 'Computer Science'),

('Siddharth Jain', 'siddharth.jain@gmail.com', 'Electronics'),
('Pooja Kulkarni', 'pooja.kulkarni@gmail.com', 'Civil'),
('Karan Malhotra', 'karan.malhotra@gmail.com', 'Electrical'),
('Ishita Kapoor', 'ishita.kapoor@gmail.com', 'Computer Science'),
('Arjun Mehta', 'arjun.mehta@gmail.com', 'Information Technology'),
('Meera Iyer', 'meera.iyer@gmail.com', 'Mechanical'),
('Yash Thakur', 'yash.thakur@gmail.com', 'Electronics'),
('Simran Kaur', 'simran.kaur@gmail.com', 'Civil'),
('Dev Chauhan', 'dev.chauhan@gmail.com', 'Computer Science'),
('Ritika Desai', 'ritika.desai@gmail.com', 'Electrical');


INSERT INTO internships
(company_name, role, stipend, status, student_id)
VALUES
('TCS', 'Backend Developer Intern', 15000, 'Selected', 1),

('Infosys', 'Frontend Developer Intern', 12000, 'Pending', 2),

('Wipro', 'Data Analyst Intern', 18000, 'Rejected', 3),

('Google', 'Software Engineer Intern', 80000, 'Selected', 4),

('Microsoft', 'Cloud Intern', 75000, 'Pending', 5),

('Amazon', 'SDE Intern', 85000, 'Selected', 6),

('Flipkart', 'Backend Intern', 30000, 'Selected', 7),

('Paytm', 'DevOps Intern', 25000, 'Rejected', 8),

('Zoho', 'Full Stack Intern', 22000, 'Pending', 9),

('Adobe', 'UI/UX Intern', 40000, 'Selected', 10),

('Capgemini', 'Testing Intern', 14000, 'Pending', 11),

('Accenture', 'Java Developer Intern', 20000, 'Selected', 12),

('IBM', 'AI/ML Intern', 50000, 'Selected', 13),

('Oracle', 'Database Intern', 45000, 'Rejected', 14),

('Swiggy', 'Product Intern', 35000, 'Pending', 15),

('Zomato', 'Operations Intern', 18000, 'Selected', 16),

('Deloitte', 'Cybersecurity Intern', 32000, 'Selected', 17),

('Cognizant', 'Support Intern', 12000, 'Rejected', 18),

('Intel', 'Embedded Systems Intern', 55000, 'Pending', 19),

('PhonePe', 'Software Intern', 60000, 'Selected', 20);

SELECT * FROM students;
SELECT * FROM internships;

DELETE FROM students WHERE student_id = 5;

SELECT
    s.name, 
    s.branch, 
    i.company_name
FROM students AS s
INNER JOIN internships AS i ON s.student_id = i.student_id;

SELECT
    s.*,
    i.*
FROM students AS s
INNER JOIN internships AS i ON s.student_id = i.student_id;

SELECT
    *
FROM students AS s
INNER JOIN internships AS i ON s.student_id = i.student_id;

SELECT
    *
FROM students AS s
LEFT JOIN internships AS i ON s.student_id = i.student_id;

SELECT
    *
FROM students AS s
RIGHT JOIN internships AS i ON s.student_id = i.student_id;

SELECT
    *
FROM students AS s
FULL OUTER JOIN internships AS i ON s.student_id = i.student_id;