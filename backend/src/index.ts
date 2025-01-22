import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { checkDataFile, readDataFile, writeDataFile } from '../utils/file-system-helpers.js';
import type {User} from '../types/types.ts';

const app = new Hono()

app.use('/api/*', cors())

checkDataFile();

app.get('/api/users', (c) => {
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

app.get('/api/users/:id', (c) => {
  try {
    const { id } = c.req.param();
    const users = readDataFile();
    const user = users.filter((u: User) => u.id === id);
    return c.json({
      user
    })
  } catch (err) {
    return c.json({
      error: `failed to fetch users: ${err}`
    }, 500)
  }
})

app.post("/api/users", async (c) => {
  try {
    const users = readDataFile();    
    const newUser = await c.req.json();
    users.push(newUser);
    writeDataFile(users);
    return c.json({
      message: "User Created Successfully"
    }, 201)
  } catch (err) {
    return c.json({
      error: `failed to add new user: ${err}`
    }, 500)
  }
})

app.put("/api/users/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const users = readDataFile();    
    const updatedUser = await c.req.json();
    const updatedUserIndex = users.findIndex((u: User) => u.id === id)
    if(updatedUserIndex === -1) {
      return c.json({
        error: "User Not Found"
      }, 404)
    }
    users[updatedUserIndex] = updatedUser;
    writeDataFile(users);
    return c.json({
      message: "User updated successfully",
      updatedUser
    })
  } catch (err) {
    return c.json({
      error: `failed to update user: ${err}`
    }, 500)
  }
})

app.delete("/api/users/:id", (c) => {
  try {
    const { id } = c.req.param();
    const users = readDataFile();
    const usersAfterDelete = users.filter((u: User) => u.id !== id);
    writeDataFile(usersAfterDelete);
    return c.json({
      message: "User deleted successfully",
      usersAfterDelete
    })
  } catch (err) {
    return c.json({
      error: `failed to delete user: ${err}`
    }, 500)
  }
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
