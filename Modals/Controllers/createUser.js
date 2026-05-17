 const User = require('../User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../../mailer');

const createUser = async (req, res) => {
    const userVerification = async(email)=>{
       
        const user = await User.findOne({email});
        const verified = user.verified;
        if(!verified){
            const token = crypto.randomBytes(20).toString('hex');
            user.verificationToken = token;
            console.log(token)
            user.verificationTokenExpires = Date.now() + 5*60*1000;
            user.save();
            const verificationLink = `https://www.lumona.site/verify/${token}`;
            try{

                await  sendEmail(email,"verification link", `<a href="${verificationLink}">Verify Email</a>`)
                res.send("Email sent")
            }catch(error){
                console.log(error)
            }
            }
           
            
    }
        
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;



        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters'
            });
        }
        // }else if (!passwordRegex.test(password)) {
        //     return res.status(400).json({
        //         error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        //     });
        // }
        

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Email verification 
         userVerification(email);
        
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword
            });
            
            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                }
            });
            
            sendEmail(
                newUser.email,
                'Welcome to Lumona!',
                `Hi ${newUser.username}, thank you for joining Lumona! We're excited to have you on board.`
            ).catch((err) => {
                console.error('Email delivery failed:', err);
            });
            
        
    } catch (error) {  
        console.error(error);

        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

module.exports = createUser;