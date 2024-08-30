# Node.js Cafe and Employee Management API

This is a Node.js API for managing cafes and their employees using SQLite as the database. The application is fully Dockerized for easy deployment and testing.

## Features

- **CRUD operations** for Cafes and Employees
- **Relationship management** between cafes and employees
- SQLite database for persistent data storage
- Dockerized for consistent environment setup and easy deployment

## Endpoints

### Cafe Endpoints

- **GET /cafes?location=<location>**
  - Returns a list of cafes filtered by location and sorted by the number of employees.
  - If no location is provided, returns all cafes.

- **POST /cafe**
  - Creates a new cafe.

- **PUT /cafe**
  - Updates an existing cafe's details.

- **DELETE /cafe**
  - Deletes an existing cafe and all its associated employees.

### Employee Endpoints

- **GET /employees?cafe=<cafe>**
  - Returns a list of employees filtered by cafe and sorted by the number of days worked.
  - If no cafe is provided, returns all employees.

- **POST /employee**
  - Creates a new employee and assigns them to a cafe.

- **PUT /employee**
  - Updates an existing employee's details and their relationship with a cafe.

- **DELETE /employee**
  - Deletes an existing employee.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**

    ```bash
    npm install
    ```
3. **Start the application:**
    
    ```bash
    npm start
    ```

4. **Access the application:**

    The endpoint defaults to the following baseURL:
    ```bash
    http://localhost:3000
    ```


    Examples:

    You can use curl to interact with the API.

    Create an Employee:
    ```curl
    curl -X POST -H "Content-Type: application/json" -d '{
    "id": "UI1234567",
    "name": "John Doe",
    "email_address": "john@example.com",
    "phone_number": "81234567",
    "gender": "Male"
    }' http://localhost:3000/employees
    ```

    Create a Cafe:
    ```curl
    curl -X POST -H "Content-Type: application/json" -d '{
    "name": "Cafe Latte",
    "description": "Cozy café with great coffee",
    "location": "Downtown"
    }' http://localhost:3000/cafes
    ```

    Assign an Employee to a Cafe:
    ```curl
    curl -X POST -H "Content-Type: application/json" -d '{
    "employee_id": "UI1234567",
    "cafe_id": "cafes-uuid",
    "start_date": "2024-09-01"
    }' http://localhost:3000/assign
    ```

    Get Employees and their assigned cafes:
    ```curl
    curl -X GET -H "Content-Type: application/json" http://localhost:3000/employees
    ```
