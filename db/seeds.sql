-----SEEDS------
INSERT INTO department (name) VALUES
    ('Bakery'),
    ('Meat'),
    ('Produce');

INSERT INTO role (title, salary, department_id) VALUES
    ('Baker', 36000, 1),
    ('Baker Supervisor', 37000, 1),
    ('Butcher', 48000, 2),
    ('Butcher Supervisor', 70000, 2),
    ('Stocker', 24000, 3),
    ('Stocker Supervisor', 32000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Austin', 'Apple', 2, NULL),
    ('Brent', 'Barkley', 1, 2),
    ('Cameron', 'Carlson', 4, NULL),
    ('Don', 'Lemmon', 3, 4),
    ('Elliot', 'Edgar', 6, NULL),
    ('Frank', 'Farsi', 5, 6);
