const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');

const port = 8085;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('coverimg'));

// MongoDB URI
const mongoUri = 'mongodb://127.0.0.1:27017/books';

// Connect to MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Schema and model definition
const bookSchema = new mongoose.Schema({}, { strict: false });
const BookModel = mongoose.model('bookdetails', bookSchema);

// Route to get all books
app.get('/', (req, res) => {
    BookModel.find()
        .then((response) => {
            if (response.length === 0) {
                res.json({ msg: "NoBooks" });
            } else {
                console.log(response);
                res.json(response);
            }
        })
        .catch((error) => {
            console.error('Error fetching books:', error);
            res.json({ msg: "Error fetching books" });
        });
});

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './coverimg');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.jpeg');
    },
});
const upload = multer({ storage: storage });

// Route to upload a book
app.post('/', upload.single('coverimg'), (req, res) => {
    let img = req.file;
    const { title, content } = req.body;

    const obj = new BookModel({
        title: title,
        cover: img,
        content: content,
    });
    obj.save()
        .then(() => {
            res.json({ msg: "Published" });
        })
        .catch((error) => {
            console.error('Error saving book:', error);
            res.json({ msg: "Error publishing book" });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
