const mongoose = require("mongoose");
const db_name = "Administrador_de_Producto";
mongoose.connect(`mongodb://localhost/${db_name}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Established a connection to the database"))
	.catch(err => console.log("Something went wrong when connecting to the database", err));
