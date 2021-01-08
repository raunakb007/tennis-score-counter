# RBI Take Home Assignment Submission - Raunak Bajaj

This is my submission for the Restaurant Brands International Technical Development Program Internship! I had a great time building the Node.js API and Frontend for this assignment! Below is some information regarding my submission.

# Technologies Used
 - Node.js for the API
 - React for the Frontend
 - Mongodb for the Database

# How to Run Locally
## Requirements

You will need to have Node.js and Mongodb installed on your machine in order to run the Application.

## Database

If you have Mongodb installed on you machine, you can spin up a local instance of Mongodb using the following command:

```mongod```

If you run into an error like this:

```NonExistentPath: Data directory /data/db not found```

You can create a directory and run the following:
```mongod --dbpath <path to directory>```

You should now have a running instance of Mongodb!

## Server

Download the submission package and, in a separate terminal window, cd to /rbi-tennis-assignment/server

Install the necessary packages from the package.json file with the following command:

```npm install```

Run the server with the following command:

```npm start```

## Frontend

In another terminal window, cd to /rbi-tennis-assignment/client

Install the necessary packages from the package.json file with the following command:

```npm install```

Run the server with the following command:

```npm start```

This should open a window to http://localhost:3000 which is where the app will be!

# Tests

The tests for the logic of the scoring system can be found at /rbi-tennis-assignment/server/test

## Run Tests

To run the test cases, make sure the required packages have been installed and then run the following command from the server directory:

```npm test```

This should run through all of the test cases I have made to test the logic of the scoring system!
