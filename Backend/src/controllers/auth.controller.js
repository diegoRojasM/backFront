import User from "../models/user.model.js"
import bcrypt  from "bcryptjs"
import {createAccessToken} from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js"



export const register = async (req, res) => {
    console.log(req.body);
    const {email,password,username} = req.body

    try{


        const userFound = await User.findOne({ email });

        if (userFound)
          return res.status(400).json(
            ["El correo ya esta en uso"]
          );

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password : passwordHash
        })
        console.log(newUser)

        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id})
        res.cookie("token",token)

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt:  userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });

    }catch(error){
        res.status(500).json({message: error.message})
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = await createAccessToken({ id: userFound._id });
        res.cookie("token", token);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req,res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    })
    return  res.sendStatus(200)

}

export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id); // Cambié req.user.id a req.userId, asumiendo que usaste req.userId en authRequired

        if (!userFound) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({message: 'No autorizado'});
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.Status(401).json({message: 'No autorizado'})
  
      const userFound = await User.findById(user.id);
      if (!userFound) return res.Status(401).json({message: 'No autorizado'});
  
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  };