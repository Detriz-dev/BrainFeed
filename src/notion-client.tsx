require('dotenv').config()
const { Client } = require("@notionhq/client")

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// Test it works
async function test() {
  const response = await notion.users.me()
  console.log("Connected as:", response.name)
}

test()