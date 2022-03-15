const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
var bodyParser = require('body-parser')

const {createRoles} = require('./libs/initialSetup')

const InvoiceRoutes = require("./routes/invoice.routes")
const CarrierRoutes = require("./routes/carrier.routes")
const AssesorRoutes = require("./routes/assesor.routes")
const CityRoutes = require("./routes/city.routes")
const CountryRoutes = require("./routes/country.routes")
const PaymentMethodRoutes = require("./routes/paymentMethod.routes")
const ProductRoutes = require("./routes/product.routes")
const ClientRoutes = require("./routes/client.routes")
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")

const app = express();
createRoles();
//configure
app.set("port", process.env.PORT || 3000);

//middlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev')); //Mostrar las peticiones que van llegando por consola

//routes
app.get("/", (req, res) => {
    res.json({ response: "Welcome to the jungle" });
});

app.use("/api/invoices", InvoiceRoutes);
app.use("/api/carriers", CarrierRoutes);
app.use("/api/assesor", AssesorRoutes);
app.use("/api/city", CityRoutes);
app.use("/api/country", CountryRoutes);
app.use("/api/paymentMethod", PaymentMethodRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/client", ClientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// export default app;
module.exports = app;
