const jwt = require('jsonwebtoken');

const { JWTSECRET } = process.env;

function verifyJWT(req, res, next) {
    next();

    const token = req.headers['x-access-token'];
    if (!token)
        return res
            .status(401)
            .json({ auth: false, message: 'Nenhum token definido' });

    jwt.verify(token, JWTSECRET, function (err, decoded) {
        if (err)
            return res.status(500).json({
                auth: false,
                message: 'falha ao autenticar token',
            });

        req.userId = decoded.id;
        next();
    });
}
function generateJWT(req, res) {
    const token = jwt.sign({}, JWTSECRET, {
        expiresIn: 900, // expira em 15min
    });
    return res.json({ auth: true, token: token, expiresIn: '15Min' });
}
module.exports = { verifyJWT, generateJWT };
