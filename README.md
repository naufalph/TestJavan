# TestJavan

This test is done by:
H8 - Naufal Purnama Hadi

# Init the App:
1. After clone, install required package by :
```cmd
  npm install
```
2. Create the database, migrate, and seed :
```cmd
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
3. Run development through nodemon :
```cmd
npm run dev
```
4. Sync seed datas with :
```http
method: "GET"
localhost:3000/syncAll
```