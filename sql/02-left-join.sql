
SELECT
    s.name, s.branch, i.company_name, i.stipend
FROM students AS s
LEFT JOIN internships AS i ON s.student_id = i.student_id;


SELECT
    s.name, s.branch, i.company_name, i.stipend
FROM students AS s
RIGHT JOIN internships AS i ON s.student_id = i.student_id;

SELECT
    s.name, s.branch, i.company_name, i.stipend
FROM internships AS i
LEFT JOIN students AS s ON s.student_id = i.student_id;