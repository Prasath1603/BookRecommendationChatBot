const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

// Replace this with your actual API key
const API_KEY = "AIzaSyC7r2CG67merJ253HshsXLhX1dSuOOrkxI";
const genAI = new GoogleGenerativeAI(API_KEY);

// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

app.get('/' , (req,res) => {
    res.render('login')
})
app.get('/signup' , (req,res) => {
    res.render('signup')
})
app.get('/wishlist' , (req,res) => {
    res.render('wishlist')
})
app.get('/profile' , (req,res) => {
    res.render('profile')
})
app.get('/home' , (req,res) => {
    res.render('home')
})
app.get('/login' , (req,res) => {
    res.render('login')
})
app.use(express.json());

app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent(prompt);
        res.json({ response: result.response.candidates[0].content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// const express = require('express');
// const path = require('path')
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// const app = express();
// const port = 3000;

// // Replace this with your actual API key
// const API_KEY = "AIzaSyC7r2CG67merJ253HshsXLhX1dSuOOrkxI";
// const genAI = new GoogleGenerativeAI(API_KEY);

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.use(express.json());

// app.post('/generate', async (req, res) => {
//     const prompt = req.body.prompt;
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
//         const result = await model.generateContent(prompt);
//         console.log(result.response)
//         // Send only the generated text from the first candidate
//         console.log(result.response.candidates[0].content);
        
//         res.json({ response: result.response.candidates[0].content });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
