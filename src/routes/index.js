const exp = require('express');
const router = exp.Router();

router.get('/', (req, res) => {
    res.send('hola mundo');
});

module.exports = router;