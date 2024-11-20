# Wix - Ecommerce - API

BE: Nest JS app + PRISMA
<br/>
FE: Vite React App

BE has 2 additional routes that not used by the FE
* Get: `/logs`: shows logs from create/updat/delete actions
* Post: `/logs/clear`: clears the logs table


How to run this

* clone this project
* backend:
    1. create in `/backend/` .env file that looks like this
```.env
WIX_TOKEN=IST.eyJraasxdsdssdX2FDMiIsImFsZyI6IlJTMjU2In0******
WIX_SITE_ID=c14axsf22-***-86ae-4648c2aa90f9

DATABASE_URL="file:./dev.db"
```
credentials needed to interact with wix store, DATABASE_URL configured to on server sqlite
  2. move to backend dir and 'npm install'
  3. `npm start` (to run the server)

* Frontend
  1. using terminal move to frontend dir and 'npm install'
  2. run `npm run build` to build a static site
  3. run `npm run preview` to run it
