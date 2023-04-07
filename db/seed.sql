INSERT INTO departments (name)
VALUES 
    ('Sales'),
    ('Marketing'),
    ('Engineering'),
    ('Human Resources'),
    ('Finance'),
    ('Customer Service'),
    ('Research and Development'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Manager', 80000, 1),
    ('Sales Representative', 50000, 1),
    ('Marketing Manager', 90000, 2),
    ('Marketing Coordinator', 40000, 2),
    ('Software Engineer', 100000, 3),
    ('QA Engineer', 80000, 3),
    ('HR Manager', 85000, 4),
    ('HR Generalist', 55000, 4),
    ('Finance Manager', 95000, 5),
    ('Financial Analyst', 70000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mary', 'Johnson', 3, NULL),
    ('Tom', 'Williams', 4, 3),
    ('Michael', 'Brown', 5, NULL),
    ('David', 'Jones', 6, 5),
    ('Emily', 'Garcia', 7, NULL),
    ('William', 'Davis', 8, 7),
    ('Karen', 'Rodriguez', 9, NULL),
    ('Christopher', 'Martinez', 10, 9),
    ('Amanda', 'Wilson', 1, NULL),
    ('Kevin', 'Anderson', 2, 11),
    ('Steven', 'Thomas', 3, NULL),
    ('Michelle', 'Jackson', 4, 13),
    ('Joseph', 'White', 5, NULL),
    ('Ashley', 'Harris', 6, 15),
    ('Daniel', 'Martin', 7, NULL),
    ('Jennifer', 'Thompson', 8, 17),
    ('Brandon', 'Moore', 9, NULL),
    ('Elizabeth', 'Lee', 10, 19);



