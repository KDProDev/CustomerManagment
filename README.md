
![photo_5879735809781909068_y](https://github.com/user-attachments/assets/2c75de2e-db96-46bb-a432-5c6be33b6d8f)


## Backend Setup
Clone the repository:

```
git clone ...
cd project
```
Configure SQLite Database:
In your appsettings.json (within the API project folder), ensure the connection string is set up for SQLite:
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=./Data/database.db"
  }
}
```
This creates a database file called database.db inside the /Data directory.

Set Up Database Migrations:

If this is the first time setting up the database, add initial migrations.
```
dotnet ef migrations add InitialCreate -s API -p Data
```
-s API specifies the startup project (API).
-p Data specifies the project where the DbContext is located.
Apply migrations to create the database schema:
```
dotnet ef database update -s API -p Data
```
Run the Backend API:
```
cd API
dotnet run
```
The API should now be running locally on https://localhost:7143 (or a similar port).

2. Frontend Setup
Navigate to the Frontend Directory:
```
cd ./frontend  
```
Install Dependencies:
```
npm install
```

Run the Frontend:
```
ng serve
```
The frontend should now be running on http://localhost:4200 by default.
