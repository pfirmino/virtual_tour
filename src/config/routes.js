const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer();

module.exports = (server) => {
    const router = express.Router();

    //API Routes
    server.use('/', router);

    //VTOUR Routes
    const virtualTourService = require('../api/vtour/virtualtourservice');
    virtualTourService.register(router, '/api/vtour');

    //VIEWS Routes
    router.get('/', function (req, res, next) {
        console.log(req.headers.host);
        axios.get('http://' + req.headers.host + '/api/vtour')
            .then(function (response) {
                // handle success
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ vtour: response.data }));
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    });

    router.get('/users', function (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ msg: `Hello users!` }));
    });

    router.get('/upload', function (req, res, next) {
        res.render('upload', { msg: "Upload!" });
    });

    router.post('/upload', upload.any(), async (req, res) => {
        try {
            console.log('BODY:', req.body);

            // If you're sending structured JSON (recommended)
            const data = JSON.parse(req.body.projectData || '{}');

            const vtour = new virtualTourModel({
                title: data.title,
                description: data.desc,
                areas: data.areas
            });

            const saved = await vtour.save();

            res.json(saved);
        } catch (err) {
            console.error('🔥 Upload error:', err);
            res.status(500).json({ error: err.message });
        }
    });

    //ERROR Handlers
    const createError = require('http-errors');

    // catch 404 and forward to error handler
    server.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    server.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}