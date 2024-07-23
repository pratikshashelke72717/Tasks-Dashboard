# Task Management System

## Overview

This project is a Task Management System developed with ASP.NET Core for the backend and React.js for the frontend. The application supports different roles including Admin, Team Leader, and Employee.

## Prerequisites

- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Node.js and npm](https://nodejs.org/)

## Getting Started

### Backend Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/pratikshashelke72717/Tasks-Dashboard.git
    cd Tasks-Dashboard
    ```

2. **Open the project**:
    - Open the `TaskManagementSystem.sln` file in Visual Studio.

3. **Configure the Database**:
    - Create a new database in your preferred SQL Server.
    - Update the `appsettings.json` file with your database connection string.

4. **Run Migrations**:
    - Open the Package Manager Console in Visual Studio and run the following commands:
      ```sh
      Add-Migration InitialCreate
      Update-Database
      ```

5. **Configure CORS**:
    - Open `Program.cs` file located in the `TaskManagementSystem` folder.
    - Update the CORS policy with your frontend URL:
      ```csharp
      builder.Services.AddCors(options =>
      {
          options.AddPolicy("AllowAll", builder =>
              builder.WithOrigins("http://localhost:3001") // Adjust to your frontend URL
                     .AllowAnyMethod()
                     .AllowAnyHeader()
                     .AllowCredentials());
      });
      ```

6. **Run the Application**:
    - Press `F5` or click the run button in Visual Studio to start the backend.

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```sh
    cd client
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the React application**:
    ```sh
    npm start
    ```

    The application should open at `http://localhost:3001`.

### User Credentials

Use the following credentials to log in:

- **Admin**:
  - Email: `admin.i@gmail.com`
  - Password: `Pratik@123`
- **Team Leader**:
  - Email: `jane.smith@example.com`
  - Password: `hashedpassword2`
- **Employee**:
  - Email: `pratik.i@gmail.com`
  - Password: `Pratik@1232`

## Running the Project

1. **Start the backend**:
    - Make sure the backend is running on the specified port.

2. **Start the frontend**:
    - Run the React application and ensure it is accessible at the correct URL.

## Features

- **Admin**: 
  - View all tasks
  - View all users
  - Add new tasks
- **Team Leader**:
  - View tasks assigned to their team members
- **Employee**:
  - Create tasks
  - View tasks assigned to them

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
