This is a school management project developed as rest api. Used Node.js, Express.js for server side, JWT for authorization, and Sequelize(PostgreSql) for database management.
You can send http requests to certain endpoints to test the project.

## Usage
Clone the project and install the dependencies. 
```
git clone https://github.com/alimammadlii/school-system.git
cd school-system
npm install 
```
Don't forget to configurate project for your database (Database name, username, password, host etc.).
Then you can use postman to send http requests.
For example:
```
#Registering admin
post http://localhost:3000/api/admin/register
And add body parameters: firstName, lastName, tc, password
```
