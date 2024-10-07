const jsonwebtoken = require("jsonwebtoken");

const TOKEN_KEYWORD = "Bearer";

const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    UNSUPPORTED_MEDIA_TYPE: 415,

    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
}

const KEY = process.env.KEY || "jwttokenkey";

async function getUserFromToken(req, res, next) {
    if (
        req?.headers &&
        req?.headers.authorization &&
        req?.headers.authorization.split(" ")[0] === TOKEN_KEYWORD
    ) {
        const accessToken = req?.headers.authorization.split(" ")[1];
        let tokenBlacklisted = false;

        if (!tokenBlacklisted) {
            jsonwebtoken.verify(accessToken, KEY, function (err, decode) {
                if (err) req.user = undefined;
                req.user = decode;
                next();
            });
        }
    } else {
        req.user = undefined;
        next();
    }
};

const loginRequired = async (req, res, next) => {
    if (req?.user) {
        next();
    } else {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({message: "You are not logged in"});
    }
}

module.exports = {
    STATUS_CODES,
    getUserFromToken,
    loginRequired
}