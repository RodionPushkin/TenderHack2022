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
}
