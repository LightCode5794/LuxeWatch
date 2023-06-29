const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};
const isAdmin = (req, res, next) => {
    req.user && req.user.email == process.env.EMAIL_ADMIN ? next() : res.sendStatus(401);
}
;
module.exports = {
    isLoggedIn,
    isAdmin,
};
