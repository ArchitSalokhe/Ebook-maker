<<<<<<< HEAD
// const express = require('express');
// const bodyParser = require('body-parser');
// const multer = require('multer')
// const cors = require('cors');
// const { default: mongoose } = require('mongoose');
// const { response } = require('express');

// const port = 8085;
// const app = express();
// app.use(cors())
// app.use(express.json());
// app.use(express.urlencoded());
// app.use('/public', express.static('coverimg'))

// app.get('/', (req, res) =>{
//     const conn = mongoose.createConnection('mongodb://localhost:27017/books');
//     const model = conn.model('modelname',  mongoose.Schema({}), 'bookdetails')
//     model.find()
//     .then((response) => {
//         if(response.length == 0){
//             res.json({msg:"NoBooks"})
//         }else{
//             console.log(response)
//             res.json(response)
//         }
//     })
//     .catch((response) => { res.json({msg:"Error fething books"}) })
// })

// const storage = multer.diskStorage({
//     destination: (r,f,c) =>{
//         c(null, './coverimg')
//     },
//     filename: (r,f,c) =>{
//         c(null, Date.now() + '.jpeg')
//     }
// })
// const upload = multer({storage:storage});

// app.post('/', upload.single('coverimg'),(req, res) =>{
//     let img = req.file
//     const {title, content} = req.body;

//     const conn = mongoose.createConnection('mongodb://localhost:27017/books');
//     const model = conn.model('modelname',  mongoose.Schema({}, { strict: false }), 'bookdetails')
//     const obj = new model({
//         'title':title,
//         'cover':img,
//         'content':content
//     })
//     obj.save()
//     // res.json({msg:"published"})
// })

// app.listen(port, () =>{
//     console.log(`server started on http://localhost:${port}`);
// });

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
=======
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const { response } = require('express');

const port = 8085;
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use('/public', express.static('coverimg'))

app.get('/', (req, res) =>{
    const conn = mongoose.createConnection('mongodb://localhost:27017/books');
    const model = conn.model('modelname',  mongoose.Schema({}), 'bookdetails')
    model.find()
    .then((response) => {
        if(response.length == 0){
            res.json({msg:"NoBooks"})
        }else{
            console.log(response)
            res.json(response)
        }
    })
    .catch((response) => { res.json({msg:"Error fething books"}) })
})

const storage = multer.diskStorage({
    destination: (r,f,c) =>{
        c(null, './coverimg')
    },
    filename: (r,f,c) =>{
        c(null, Date.now() + '.jpeg')
    }
})
const upload = multer({storage:storage});

app.post('/', upload.single('coverimg'),(req, res) =>{
    let img = req.file
    const {title, content} = req.body;

    const conn = mongoose.createConnection('mongodb://localhost:27017/books');
    const model = conn.model('modelname',  mongoose.Schema({}, { strict: false }), 'bookdetails')
    const obj = new model({
        'title':title,
        'cover':img,
        'content':content
    })
    obj.save()
    // res.json({msg:"published"})
})

app.listen(port, () =>{
    console.log(`server started on http://localhost:${port}`);
});
>>>>>>> ab1d9243d9ebae8b49d69dfecf7bdf16e8a949fc