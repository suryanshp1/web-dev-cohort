

SELECT
    s.name, 
    s.branch, 
    i.company_name, 
    i.stipend
FROM internships AS i
FULL OUTER JOIN students AS s ON s.student_id = i.student_id;
