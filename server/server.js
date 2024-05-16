const express = require('express');
const cors = require('cors');
const { PORT } = require("./config/settings");
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
