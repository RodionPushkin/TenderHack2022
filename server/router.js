const authMiddleware = require('./middleware/auth.middleware')
const authNotMiddleware = require('./middleware/auth.not.middleware')
const corsMiddleware = require('./middleware/cors.middleware')
const corsAllMiddleware = require('./middleware/cors.all.middleware')
const tokenService = require('./service/token.service')
const ApiException = require('./exception/api.exception')
const {body, validationResult} = require('express-validator');
const db = require('./database')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const geoip = require('geoip-lite')
const path = require('path')
module.exports = router => {
    /**
     * @swagger
     * /api:
     *   get:
     *       description: api is working
     *       responses:
     *           '200':
     *               description: all right
     * */
    router.get(`/api`, [corsAllMiddleware], (req, res, next) => {
        try {
            res.json({data: `api is working`})
        } catch (e) {
            next(e)
        }
    })
    /**
     * @swagger
     * /api/user:
     *   get:
     *       description: проверка токена, получает токен с куки или с гет запроса
     *       responses:
     *           '200':
     *               description: всё гуд
     *           '401':
     *               description: не прошел авторизацию
     * */
    router.get(`/api/user`, [corsMiddleware], (req, res) => {
        if (req.cookies?.token) {
            if (req.cookies.token) {
                res.status(200).json(['ok'])
            } else {
                res.status(401).send('not authorized')
            }
        } else if (req.query?.token) {
            if (req.query.token != null) {
                res.status(200).json(['ok'])
            } else {
                res.status(401).send('not authorized')
            }
        } else {
            res.status(401).send('not authorized')
        }
    })
    /**
     * @swagger
     * /api/user/auth:
     *   put:
     *       description: авторизация
     *       responses:
     *           '200':
     *               description: отдает куку с значением токена и также текст с значением токена
     * */
    router.put(`/api/user/auth`, [corsMiddleware], (req, res) => {
        res.status(200).cookie('token', 'ok', {expires: new Date(Date.now() + 900000)}).json(['ok'])
    })
    /**
     * @swagger
     * /api/search:
     *   get:
     *       description: поиск
     *       responses:
     *           '200':
     *               description: что-то отдает
     * */
    router.get(`/api/search`, [corsMiddleware], (req, res) => {
        res.status(200).json(['ok'])
    })
    /**
     * @swagger
     * /api/upload:
     *   post:
     *       description: загрузка файла для обработки
     *       responses:
     *           '200':
     *               description: что-то отдает
     * */
    router.post(`/api/upload`, [corsMiddleware], async (req, res) => {
        // console.log(req.files.file);
        let newFileName = `${new Date().getTime()}.csv`
        console.log(path.join(__dirname, "/python/", `${newFileName}`))
        req.files.file.mv(path.join(__dirname, "/python/", `${newFileName}`), () => {

        })
        setTimeout(() => {
            res.json('ok')
        }, 20000)
        // let runPy = new Promise(function(success, nosuccess) {
        //     const { spawn } = require('child_process');
        //     const pyprog = spawn('python3', [path.join(__dirname,"/python/","check.py"), String(req.files.file.name)]);
        //     pyprog.stdout.on('data', (data) => {
        //         success(data);
        //     });
        //     pyprog.stderr.on('data', (data) => {
        //         nosuccess(data);
        //     });
        // });
        // return await runPy.then((data)=>{
        //     if(data.toString().includes('false')){
        //         return false
        //     }
        //     return true
        // })
    })
}
