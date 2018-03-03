const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('requests/1.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ req_arr: [], req_obj: {} })
  .write()

var sample_url = 'http://www.something.com/thing-else.html';

// Add a post
db.set(sample_url, 'typicode')
  .write();