// Простой учебный сервер без сторонних библиотек.
// Запуск из корня репозитория: node lab4/server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml"
};

http.createServer((request, response) => {
    const url = new URL(request.url, "http://localhost");

    if (request.method === "POST" && url.pathname === "/api/complaints") {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk;
            if (body.length > 10000) request.destroy();
        });
        request.on("end", () => {
            try {
                const complaint = JSON.parse(body);
                if (!complaint.name || !complaint.email || !complaint.crime || complaint.agreement !== true) {
                    response.writeHead(400);
                    return response.end("Неполные данные");
                }
                console.log("Получена жалоба:", complaint);
                response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                response.end(JSON.stringify({ success: true }));
            } catch {
                response.writeHead(400);
                response.end("Неверный JSON");
            }
        });
        return;
    }

    if (request.method !== "GET") {
        response.writeHead(405);
        return response.end("Метод не поддерживается");
    }

    const name = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
    const file = path.resolve(__dirname, "." + name);
    if (!file.startsWith(__dirname + path.sep)) {
        response.writeHead(403);
        return response.end("Доступ запрещён");
    }

    fs.readFile(file, (error, contents) => {
        if (error) {
            response.writeHead(404);
            return response.end("Страница не найдена");
        }
        response.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
        response.end(contents);
    });
}).listen(port, () => {
    console.log(`Сайт Чепы: http://localhost:${port}`);
});
