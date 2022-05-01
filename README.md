step 1: go to command line and write: git clone <url of this git project> and clone the repo
step 2: go to the directory of this project.
step 3: to install node packages write: npm i
step 4: to run this project in local add .env file in directory
step 5: add below two line in .env file after starting your mongodb compass or mongo server
MONGO_CONNECTION_STRING=mongodb://localhost:27017/payroo-hotel
JWR_TOKEN_SECRET="secret for jwt" 
step 6: finally to run this project write : npm run dev