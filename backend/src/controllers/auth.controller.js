import dotenv from "dotenv";
import bcrypt from "bcryptjs"
import prisma from "../utils/prisma.js"
import jwt from "jsonwebtoken"


dotenv.config()

// register user 
export const register = async (req, res) => {
  try {
    let { firstName, lastName, emailAddress, password } = req.body;

    // check if all fields have some data
    if (!firstName || !lastName || !emailAddress || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize input fields (convert to lowercase except for password)
    [firstName, lastName, emailAddress] = [firstName, lastName, emailAddress].map(field => field.toLowerCase());


    // find a user with the same email
    const existingUser = await prisma.user.findUnique({
        where: { emailAddress: emailAddress }
    })

    // if user already exist
    if(existingUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            password: hashedPassword
        }
    })

    // if user does not exist
    res.status(201).json({ message: "User successfully registered" })

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err })
  }
};

// login user
export const login = async (req, res) => {
    try{
        let { emailAddress, password } = req.body

        // check if all fields are available
        if(!emailAddress || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // Normalize input fields (convert to lowercase except for password)
        [emailAddress] = [emailAddress].map(field => field.toLowerCase());

        // find a user with the existing email
        const existingUser = await prisma.user.findUnique({
            where: { emailAddress: emailAddress }
        })

        // if no user found
        if(!existingUser) {
            return res.status(404).json({ message: "User does not exist" })
        }

        // compare passwords
        const passwordMatch = bcrypt.compareSync(password, existingUser.password); 

        if(!passwordMatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        // generate the access token
        const accessToken = jwt.sign(
            { id: existingUser.id, firstName: existingUser.firstName, lastName: existingUser.lastName },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
  
        // generate the refresh token
        const refreshToken = jwt.sign(
            { id: existingUser.id, firstName: existingUser.firstName, lastName: existingUser.lastName },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        // send the access token and the refresh token as cookies
        res.cookie("access-token", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            path: '/',
        });
  
        // res.cookie("refresh-token", refreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "Lax",
        // });

        res.status(200).json({ 
            message: "Login successful",
            tokens: {
                "access-token": accessToken,
                "refresh-token": refreshToken
            }
         })
    }
    catch(err) {
        res.status(500).json({ message: "Internal Server Error", err })
    }
};

// logout
export const logout = async (req, res) => {
    try {
        // clear the access token and the refresh token
        res.clearCookie("access-token", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        });
    
        res.clearCookie("refresh-token", {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        });
    
        res.status(200).json({ message: "Logout Successful" });
      } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
};
