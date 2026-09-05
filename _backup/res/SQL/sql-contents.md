
1.Database is an organized collection of digital data designed for easy storage, retrieval, and updates. It is controlled by software called a database management system (DBMS) and uses languages like SQL for fast processing.
Main Types of Databases
Relational (SQL): Uses tables with rows and columns; great for structured data like bank records (e.g., MySQL, PostgreSQL).
Non-Relational (NoSQL): Stores data as documents or key-values; great for flexible or messy data.
Cloud/Vector: Hosted online or built for specialized AI tasks. 

A Database Management System (DBMS) is a software tool used to create, store, manage, and retrieve data efficiently. Key systems include MySQL, Oracle Database, and Microsoft SQL Server. It acts as a secure bridge between users or applications and the data itself. 
Common Types of DBMS
Relational (RDBMS): Organizes data into rows and columns inside tables; uses SQL. Examples include MySQL and PostgreSQL.
NoSQL: Stores unstructured or large-scale data using flexible formats like documents or key-value pairs. Examples include MongoDB and Cassandra.
Hierarchical/Network: Structures data in tree-like parent-child links. 
Main Benefits
Data Security: Protects information from unauthorized access.
Concurrency: Allows multiple users to read and write data at the same time without conflicts.
Integrity: Reduces data repetition and keeps records accurate.



2.SQL
Structured Query Language (SQL) is the standard language used to communicate with relational database management systems. It allows you to create tables, insert data, and run complex queries.
Five Main Commands
SELECT: Extracts specific data from a database table.
INSERT: Adds new records or rows to a table.
UPDATE: Modifies existing data within a table.
DELETE: Removes specific records from a table.
CREATE: Sets up new databases, tables, or indexes.
1.CREATE DATABASE database_name;

2.DROP DATABASE databasename;

1. CREATE
This command builds a new table from scratch, defining its columns and data types.
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);


2. INSERT
This command adds new rows of data into your table. [1, 2]
sql
INSERT INTO employees (employee_id, first_name, last_name, department, salary)
VALUES (101, 'Alice', 'Smith', 'Marketing', 65000.00);
3. SELECT
This command retrieves and displays data based on your specific criteria. 
SELECT first_name, last_name, salary 
FROM employees 
WHERE department = 'Marketing';
4. UPDATE
This command modifies existing information already stored in the table. [1]
sql
UPDATE employees 
SET salary = 70000.00 
WHERE employee_id = 101;


5. DELETE
This command permanently removes specific rows from the table. [1, 2]
sql
DELETE FROM employees 
WHERE employee_id = 101;


3.What are Constraints?


Constraints are rules applied to table columns to ensure the accuracy, consistency, and integrity of the data stored in a database.


In simple words:


Constraints prevent invalid data from being inserted into the database.




Why do we use Constraints?


Imagine a student database.


Every student should have a unique ID.
Student name should not be empty.
Email should not be duplicated.
Admission date should have today's date if not provided.
Student ID should automatically increase.


All these rules are implemented using constraints.




Types of Constraints
PRIMARY KEY
NOT NULL
UNIQUE
DEFAULT
AUTO_INCREMENT


1. PRIMARY KEY
Definition


A PRIMARY KEY is a column (or combination of columns) that uniquely identifies each row in a table.


Rules of PRIMARY KEY
Values must be unique.
Cannot contain NULL.
Only one PRIMARY KEY is allowed per table.


CREATE TABLE Student(
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100)
);


2. NOT NULL
Definition


The NOT NULL constraint ensures that a column must always contain a value.


It prevents empty values.


Example:


CREATE TABLE Employee(
    id INT,
    name VARCHAR(100) NOT NULL
);


3. UNIQUE
Definition


The UNIQUE constraint ensures that all values in a column are different.


Duplicate values are not allowed.


Unlike PRIMARY KEY,


A table can have multiple UNIQUE constraints.


Real-world Example


Unique values


Email
Aadhaar Number
Passport Number
PAN Number






PRIMARY KEY vs UNIQUE


| PRIMARY KEY                  | UNIQUE                |
| ---------------------------- | --------------------- |
| Only one per table           | Many allowed          |
| Cannot be NULL               | Can contain NULL      |
| Uniquely identifies each row | Ensures unique values |
| Automatically indexed        | Automatically indexed |




4. DEFAULT




The DEFAULT constraint automatically assigns a value if the user does not provide one during insertion.


CREATE TABLE Employee(
    id INT,
    salary DECIMAL(10,2) DEFAULT 15000
);


5. AUTO_INCREMENT
Definition


AUTO_INCREMENT automatically generates sequential numbers whenever a new record is inserted.


No need to manually enter IDs.


CREATE TABLE Student(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);


INSERT INTO Student(name)
VALUES
('Mohamed'),
('Rahul'),
('Priya');










