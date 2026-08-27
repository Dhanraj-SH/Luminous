import "dotenv/config";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "./db";
import { Schemas } from "./types";

const app = express();

app.post("/api/v1/signup", async (req, res) =>{
    const response = Schemas.NewUser.safeParse(req.body);
    if(!response.success){
        return res.status(400).json({
            error: response.error.issues
        });
    }

    const {username, password} = response.data;

    try{
        const userExists = await prisma.user.findUnique({
            where:{
                username:username
            }
        });
        if(userExists){
            return res.status(409).json({
                message:"Username already taken"
            });
        }
    
        const newUser = await prisma.user.create({
            data:{
                username: username,
                password: await bcrypt.hash(password,10)
            }
        });
    
        return res.status(201).json({
            message: "New user created" + newUser.id
        });
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.post("/api/v1/signin", async (req, res) =>{
    const response =  Schemas.Login.safeParse(req.body);
    if(!response.success){
        return res.status(400).json({
            error: response.error.issues
        });
    }
    const {username, password} = response.data;
    try{
        const userExists = await prisma.user.findUnique({
            where:{
                username: username
            }
        });
        if(!userExists){
            return res.status(403).json({
                message: "Invalid Credentails"
            });
        }

        const checkPassword = await bcrypt.compare(password, userExists.password);
        if(!checkPassword){
            return res.status(403).json({
                message: "Invaild Credentails"
            })
        }
        const token = jwt.sign({
            userId: userExists.id
        }, process.env.JWT_SECERT!);

        return res.status(200).json({
            token: token
        });
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
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