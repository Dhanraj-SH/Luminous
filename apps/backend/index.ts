import express from "express"

const app = express();

app.post("/api/v1/signup", (req, res) =>{
    res.json({});
});

app.post("/api/v1/signin", (req, res) =>{
    res.json({});
});

app.post("/api/v1/avatar", (req, res) =>{
    res.json({});
});

app.post("/api/v1/video", (req, res) =>{
    res.json({});
});

app.get("/api/v1/video/:videoId", (req, res) =>{
    res.json({});
});

app.get("/api/v1/videos", (req, res) =>{
    res.json({});
});

app.get("/api/v1/me", (req, res) =>{
    res.json({});
});

app.get("/api/v1/models", (req, res) =>{
    res.json({});
});

app.get("/api/v1/avatar/:avatarId", (req, res) =>{
    res.json({});
});

app.get("/api/v1/avatars", (req, res) =>{
    res.json({});
});

app.listen(3000);