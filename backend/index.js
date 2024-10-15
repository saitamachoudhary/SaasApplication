import 'dotenv/config' // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
import express from 'express'

const port = process.env.PORT || 3000

const app = express()
// Use the lax middleware that returns an empty auth object when unauthenticated
app.get(
  '/protected-endpoint',
  ClerkExpressWithAuth({
    // Add options here
    // See the Middleware options section for more details
  }),
  (req, res) => {
    res.json(req.auth)
  },
)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})