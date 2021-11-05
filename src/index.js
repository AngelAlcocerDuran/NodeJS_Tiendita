const exp = require('express');
const mor = require('morgan');

//inicialización
const app = exp();

//configuraciones
app.set('port', process.env.PORT || 4000);

//Middleware
app.use(mor('dev'));
app.use(exp.urlencoded({extended: false}));
app.use(exp.json());

//Rutas
app.use(require('./routes/index.js'));
app.use('/products', require('./routes/products.js'));

//Ejecutar servidor
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});