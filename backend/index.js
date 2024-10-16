// import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
const express=require('express')
const router =require('./routes/route');

const port = process.env.PORT || 3000

const app = express()
app.use('/api',router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})