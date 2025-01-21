import { serve } from '@hono/node-server'
import { Hono } from 'hono' 
import { checkDataFile, readDataFile, writeDataFile } from '../utils/file-system-helpers.js';

const app = new Hono()

checkDataFile();

app.get('/users', (c) => {
  try {
    const users = readDataFile();
    return c.json({
      users
    })
  } catch (err) {
    return c.json({
      error: `failed to fetch users: ${err}`
    }, 500)
  }
})

// get user by id

app.post("/users", async (c) => {
  try {
    const users = readDataFile()
    console.log(users);
    
    const newUser = await c.req.json();
    users.push(newUser);
    writeDataFile(users);
    return c.json({
      message: "User Created Successfully"
    })
  } catch (err) {
    return c.json({
      error: `failed to add new user: ${err}`
    }, 500)
  }
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
