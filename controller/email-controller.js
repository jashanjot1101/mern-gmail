import Email from "../model/email.js";
import User from "../model/User.js";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";

export const saveSendEmails = async (request, response) => {
    try {
      // Verify the token upfront
      const token = request.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your_secret_key');
      const userId = decoded._id;
  
      // Extract user information from decoded token
      
  console.log('id:',userId)
  
      // Validate user information
      if (!userId ) {
        return response.status(400).json({ message: 'Invalid user information' });
      }
  
      const emailData = {
        ...request.body,
        user: userId, // Set the user field
        to: request.body.to, // Set the to field
      };
  
      await Email.create(emailData);
  
      response.status(200).json('Email saved successfully');
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return response.status(401).json({ message: 'Token expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return response.status(401).json({ message: 'Invalid token' });
      } else {
        console.error(error); // Log the error for debugging
        return response.status(500).json({ message: 'Internal server error' });
      }
    }
  };

export const getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false });
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true })
        } else if (request.params.type === 'allmail') {
            emails = await Email.find({});
        } else if (request.params.type === 'inbox') {
            emails = [];
        } else {
            emails = await Email.find({ type: request.params.type });
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const toggleStarredEmail = async (request, response) => {
    try {   
        await Email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value }})
        response.status(201).json('Value is updated');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const deleteEmails = async (request, response) => {
    try {
        await Email.deleteMany({ _id: { $in: request.body }})
        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({ _id: { $in: request.body }}, { $set: { bin: true, starred: false, type: '' }});
    } catch (error) {
        response.status(500).json(error.message);   
    }
}

//sign in and sign up 
export const signup = async (request, response) => {
    try {
        const { email, password } = request.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return response.status(400).json({ message: 'Email already exists.' });
        }

        const newUser = new User({ email, password });
        await newUser.save();
        const token = jwt.sign({ user: newUser._id }, 'your_secret_key', { expiresIn: '1h' });
        response.status(201).json({ message: 'User registered successfully.' ,token});
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(401).json({ message: 'Invalid email or password.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return response.status(401).json({ message: 'Invalid email or password.' });
        }
        const token = jwt.sign({ user: user._id }, 'your_secret_key', { expiresIn: '1h' });

        response.json({ message: 'Login successful', user,token });
    } catch (error) {
        response.status(500).json(error.message);
    }
}