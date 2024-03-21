const express = require("express");
const fs = require("fs").promises;

const app = express();
app.use(express.json());

const dataFolderPath = "./data/";

// Retrieve a list of all files
// curl -i http://localhost:3000/files

app.get("/files", async (req, res) => {
  try {
    const files = await fs.readdir(dataFolderPath);
    res.json(files.map((file) => file.replace(".json", "")));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving files.");
  }
});

// Retrieve a single file and its content, returned as JSON
// curl -X POST -H "Content-Type: application/json" -d '{"fileName":"example","data":{"key":"value"}}' http://localhost:3000/files

app.post("/files", async (req, res) => {
  try {
    const { fileName, data } = req.body;
    const filePath = `${dataFolderPath}${fileName}.json`;
    await fs.writeFile(filePath, JSON.stringify(data));
    res.status(201).send(`File ${fileName} created successfully.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating file.");
  }
});

// Retrieve a single file and its content, returned as JSON
// curl -i http://localhost:3000/files/example

app.get("/files/:fileName", async (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = `${dataFolderPath}${fileName}.json`;
    const fileContent = await fs.readFile(filePath, "utf8");
    res.json(JSON.parse(fileContent));
  } catch (err) {
    console.error(err);
    res.status(404).send("File not found.");
  }
});

// Update a file JSON data
// curl -X PUT -H "Content-Type: application/json" -d '{"data":{"key":"updated value"}}' http://localhost:3000/files/example

app.put("/files/:fileName", async (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = `${dataFolderPath}${fileName}.json`;
    const { data } = req.body;

    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);
    if (!fileExists) {
      return res.status(404).send("File not found.");
    }

    await fs.writeFile(filePath, JSON.stringify(data));
    res.send(`File ${fileName} updated successfully.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating file.");
  }
});

// Delete a file
// curl -X DELETE http://localhost:3000/files/example

app.delete("/files/:fileName", async (req, res) => {
  try {
    const { fileName } = req.params;
    const filePath = `${dataFolderPath}${fileName}.json`;
    await fs.unlink(filePath);
    res.send(`File ${fileName} deleted successfully.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting file.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
