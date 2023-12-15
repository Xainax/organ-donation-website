# Organ Donation Website

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation guide

To run the website from your local computer, you will need to download the code, react, and some other important applications. First, download the code and using the terminal, navigate to the folder where the code is located. After navigating to the folder, you will need to run the following commands:
1. npm install
2. npm install react-scripts
3. npm install react-router-dom@5.2.0
(If you run into any issues, contact Eric at eric02pham@gmail.com to help troubleshoot. We are currently using npm version 10.2.4.)

After installing the necessary dependencies for React, you will need to download the necessary applications for the database/server. You will need to download Node.js and XAMPP using the following links:
https://nodejs.org/en/download
https://www.apachefriends.org/download.html

After downloading XAMPP version 8.2.4, you will need to open the manager and start the Apache Web Browser and MySQL database servers. If you are currently using or have an active MySQL database server, you will need to turn it off and turn it on through XAMPP. 
![image](https://github.com/Xainax/organ-donation-website/assets/46289589/fe0b0a75-126a-4c90-a989-33eee66c609d)

Once you start the Apache Web Browser, you will be navigated to the XAMPP homepage, and you will need to go to the phpMyAdmin tab. After accessing the phpMyAdmin portal. 
![image](https://github.com/Xainax/organ-donation-website/assets/46289589/379f1bd3-d13b-4ef0-a23b-31b61065751f)
To set up the database, you will need to go to the databases tab and create the database organDonation.
![image](https://github.com/Xainax/organ-donation-website/assets/46289589/f49ba13c-370f-43d8-8931-48a8b45a751d)
After creating the database, you will go to the import tab and import the organDonation.sql file that is also attached in the repository. 
![image](https://github.com/Xainax/organ-donation-website/assets/46289589/22aaac83-25b8-4883-94ce-f2487b8a69a8)



If you are accessing the code through Visual Studio Code, navigate to src->server->config->server.js and right-click on the file. Click on the option that says 'Open in Integrated Terminal' and you will need to install some more dependencies using the following commands:
1. npm install mysql
2. npm install express
3. npm install cors
4. npm install body-parser

After installing them, you should use the command 'node server.js' to start the server and it will connect to XAMPP, meaning your data should now be on the website.
![image](https://github.com/Xainax/organ-donation-website/assets/46289589/a659e2b1-0c84-4cd9-bbdd-0337be3d3155)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

