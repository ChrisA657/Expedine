# WebApp Project With MySQL DBaaS
#### Uses docker-compose with Node and React.JS containers.
#### Also uses a MySQL DBaaS like AWS RDS or GCloud CloudSQL.

- Express Server
- React.JS Client

# SETUP

# Requirements

You must have the following on your system:

- Node
- Docker
- Docker-Compose
- MySQL Database instance

## Initial setup
First make sure to open a terminal window to `./backend` and `./frontend` and from there `npm install` in both directories to install the necessary packages. 

On a fresh MYSQL server, run the script Expedine-Sql-Setup to create the appropriate database schema on your server.

Now you must create an .env file in ./backend with the following.
```
# mysql database name
MYSQL_DB=
# mysql port (usually 3306)
MYSQL_PORT=
# mysql cloud database login user
MYSQL_CLOUD_USER=
# mysql cloud database login password
MYSQL_CLOUD_PASS=
# mysql cloud database host URL
MYSQL_CLOUD_HOST=
# GPT Personal API key
GPT_API_KEY=
```



## Running the project
After installing the packages and entering your cloud DBaaS connection details, all you need to do is run `docker-compose up` from the root directory of the project to have the `docker-compose` file automatically spin the containers up for you.


## Stopping the project
As always make sure to type `docker-compose down` to shut the containers down and close everything up.
