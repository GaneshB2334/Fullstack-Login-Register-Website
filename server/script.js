const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const User = require('./models/user.js')
const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(express.json()); //it is a express middleware to parse JSON
app.use(cors())
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        User.findOne({ email })
            .then(async(user)=>{
                if(user){
                    res.json("AlreadyPresent")
                }
                else{
                    const user = new User({ name: name, email: email, password: password })
                    await user.save();
                    res.status(201).json('success');
                }
            })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password == password) {
                    res.json({ message: "success", name : user.name })
                }
                else {
                    res.json({ message: "incorrect password" })
                }
            }
            else {
                res.json({ message: "invalid id" })
            }
        })
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
