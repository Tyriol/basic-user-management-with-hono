import { serve } from '@hono/node-server'
import { Hono } from 'hono' 
import { checkDataFile, readDataFile } from '../utils/file-system-helpers.js';

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
      error: `failed to fetch users ${err}`
    }, 500)
  }
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
