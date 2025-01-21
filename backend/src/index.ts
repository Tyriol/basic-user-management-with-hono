import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import * as fs from 'node:fs'; 
import { checkDataFile, readDataFile } from '../utils/file-system-helpers.js';

const app = new Hono()

checkDataFile();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
