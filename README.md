# employeeManagementDb    ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


## Description

Developers frequently need to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are known as content management systems (CMS). This project involves building a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer@8.2.4, and MySQL.

<img width="860" alt="Screenshot 2024-07-18 at 10 06 28" src="https://github.com/user-attachments/assets/827daf51-e41b-4777-a5c5-e0cb31a523e4">

## Link to video demonstration: if you would like to checkout a demo of the functionality, you can check it out on Google Drive [here!](https://drive.google.com/file/d/1RVYeIsPO4BanOIvPBq0G1QXi-gTxXO2X/view?usp=sharing)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

The first step to utilizting this CLI application is ensuring that you have Node.js installed on your machine. To install the necessary packages, navigate to your project folder, or the cloned version of this repo, and run the following commands. 


1.  Clone the repository

```
git clone https://github.com/collinsjosephj/employeeManagementDb.git
```

2.  Navigate to the project directory

```
cd employeeManagementDb
```

3.  Install dependencies

```
npm i
```

## Usage

To start the application, kindly navigate to the project directory and run either:

You will need to start up SQL and seed the database, to do so, navigate to db/schema.sql and open the terminal:

```
mysql -u root
```
or, 
```
mysql -your-user-name -your-password
```
Once a connection is initialized:
```
source schema.sql
```

Followed by:
```
source seeds.sql
```
node index.js
```
or, 

```
npm start
```

Upon starting the application, you will be presented with the following options:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

Follow the prompts to interact with the database.

## License  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This application is licensed under the MIT [LICENSE](https://github.com/collinsjosephj/employeeManagementDb/blob/main/LICENSE), please refer to MITs open-source documentation for further information. 

## Contributing

I would love to collaborate and further develop this project, or any project **you** have in mind, so simply reach out to me via the links below, or you can:

```
# Fork/clone the repo
git clone https://github.com/collinsjosephj/employeeManagementDb.git

# Create a new branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "added ______"

# Push to your branch
git push origin feature/your-feature

# Create a pull request
```

## Questions

If you have any questions about the repo, open an issue or contact me directly via email [here](mailto:collinsjosephj@gmail.com). 

You can find more of my work on [GitHub](https://github.com/collinsjosephj@gmail.com).
