import User from '../model/userSchema.js';

export const userLogIn = async (request, response) => {
    try {
        let user = await User.findOne({ email: request.body.email, password: request.body.password });
        console.log(user);
        console.log(request.body);
        if(user) {
            return response.send({username:user.username});
        } else {
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        response.json('Error: ', error.message);        
    }
}

export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).messagejson({ message: 'User already exist'});
        }
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        response.status(200).json(`${user.firstName} has been successfully registered`);
        
    } catch (error) {
        response.json('Error: ', error.message);
    }
}



