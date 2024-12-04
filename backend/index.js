const express=require('express')
const router =require('./routes/route');
const{ clerkMiddleware} =require('@clerk/express');

const port = process.env.PORT || 3000

const app = express()
// app.use(express.json());
app.use(clerkMiddleware({ publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,secretKey:process.env.CLERK_SECRET_KEY}));
app.use('/api',router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})