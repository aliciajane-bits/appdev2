const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const filename = parsedUrl.query.filename;
    const filePath = filename ? path.join(__dirname, filename) : null;

    if (!filename) {
        res.writeHead(400);
        return res.end("Filename is required.");
    }

    if (req.method === "GET") {
        if (parsedUrl.pathname === "/create") {
            fs.writeFile(filePath, "New file created.", (err) => {
                if (err) {
                    res.writeHead(500);
                    return res.end("Error creating file.");
                }
                res.writeHead(200);
                res.end(`File '${filename}' created successfully.`);
            });

        } else if (parsedUrl.pathname === "/read") {
            fs.readFile(filePath, "utf-8", (err, data) => {
                if (err) {
                    res.writeHead(404);
                    return res.end("File not found.");
                }
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(data);
            });

        } else if (parsedUrl.pathname === "/update") {
            fs.appendFile(filePath, "\nUpdated content.", (err) => {
                if (err) {
                    res.writeHead(500);
                    return res.end("Error updating file.");
                }
                res.writeHead(200);
                res.end(`File '${filename}' updated successfully.`);
            });

        } else if (parsedUrl.pathname === "/delete") {
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.writeHead(404);
                    return res.end("File not found.");
                }
                res.writeHead(200);
                res.end(`File '${filename}' deleted successfully.`);
            });

        } else {
            res.writeHead(404);
            res.end("Invalid Route");
        }
    } else {
        res.writeHead(405);
        res.end("Method Not Allowed");
    }
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
