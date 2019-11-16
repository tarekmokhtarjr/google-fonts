# Chingu v13 pre-work project

This repo contains (Google Fonts) for Tier 3 pre-work submission, the project is built with ExpressJS for the backend and ReactJS in the frontend and it's configured for deployment on Heroku.

This project uses https://github.com/manzinello/react-express-heroku as kickstarter for deployment on Heroku.

## Installation

Clone this repo

```bash
git clone https://github.com/tarek-caesar/google-fonts.git
```
You need to create .env file inside server folder and set 

```bash
MONGODB_URI = (your mongodb uri)
API_URI = (your google font api uri)
```
Go to project directory
```bash
cd google-fonts
```
Install server dependencies
```bash
cd server
npm install 
```
Install client frontend dependencies
```bash
cd ../
cd client
npm install 
```

## Run this project
Go to server directory
```bash
cd server
npm start
```
Open another terminal session then, Go to client directory
```bash
cd client
npm start
```
