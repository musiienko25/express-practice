API DOC




Retrieve a single file and its content, returned as JSON
curl -X POST -H "Content-Type: application/json" -d '{"fileName":"example","data":{"key":"value"}}' http://localhost:3000/files

Retrieve a single file and its content, returned as JSON
curl -i http://localhost:3000/files/example

Update a file JSON data
curl -X PUT -H "Content-Type: application/json" -d '{"data":{"key":"updated value"}}' http://localhost:3000/files/example

Delete a file
curl -X DELETE http://localhost:3000/files/example

Retrieve a list of all files:

```bash
curl -i http://localhost:3000/files
```


