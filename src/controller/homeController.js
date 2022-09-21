
getIndex = (req,res) => {
        res.render('home', {
            path: '/home',
            pageTitle:'home',
            isStarted: null,
        });
    }

module.exports = {getIndex};