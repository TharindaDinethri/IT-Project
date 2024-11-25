const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);

const mongoURI = 'mongodb+srv://praveen:52032477@sboot.tjmop2e.mongodb.net/?retryWrites=true&w=majority&appName=SBoot';

mongoose.connect(mongoURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log('MongoDB connected');
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
