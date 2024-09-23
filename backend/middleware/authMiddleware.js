const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({ message: 'Nenhum token fornecido!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Falha na autenticação do token!' });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
