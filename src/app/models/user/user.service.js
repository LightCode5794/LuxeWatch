const addGoogleUser =
    (User) =>
    ({ id, email, isAdmin, firstName, lastName, profilePhoto }) => {
        const user = new User({
            id,
            email,
            isAdmin,
            firstName,
            lastName,
            profilePhoto,
            source: 'google',
        });
        return user.save();
    };

const getUsers = (User) => () => {
    return User.find({});
};

const getUserByEmail =
    (User) =>
    async ({ email }) => {
        return await User.findOne({
            email,
        });
    };

module.exports = (User) => {
    return {
        addGoogleUser: addGoogleUser(User),
        getUsers: getUsers(User),
        getUserByEmail: getUserByEmail(User),
    };
};
