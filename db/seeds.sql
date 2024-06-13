INSERT INTO department (name) VALUES
  ('Bakery'),
  ('Meat'),
  ('Produce');


INSERT INTO role (title, salary, department_id) VALUES
  ('Baker', 36000, 1),
  ('Butcher', 48000, 2),
  ('Stocker', 24000, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Austin', 'Apple', 1, NULL),
  ('Brent', 'Barkley', 1, 1),
  ('Cameron', 'Carlson', 2, NULL),
  ('Don', 'Lemmon', 2, 2),
  ('Elliot', 'Edgar', 3, NULL),
  ('Frank', 'Farsi', 3, 3);
