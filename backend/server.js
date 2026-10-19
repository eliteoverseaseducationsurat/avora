const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path =  require('path');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contact', require('./routes/contactRoutes'));





//Serve React frontend
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '../frondend/dist')));

app.get('*',(req, res)=>{
  res.sendFile(path.join(_dirname, '../frondend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));