const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const InvoiceRoutes = require("./routes/invoice.routes")
const CarrierRoutes = require("./routes/carrier.routes")
const AssesorRoutes = require("./routes/assesor.routes")
const CityRoutes = require("./routes/city.routes")
const CountryRoutes = require("./routes/country.routes")
const PaymentMethodRoutes = require("./routes/paymentMethod.routes")
const ProductRoutes = require("./routes/product.routes")

const app = express();
//configure
app.set("port", process.env.PORT || 3000);

//middlewares
const corsOptions = {}
app.use(cors(corsOptions));
app.use(express.json()); //Usamos esto para que express entienda json
app.use(express.urlencoded({extended: false})); //Usamos esto para que express entienda peticiones de formularios html
app.use(morgan('dev')); //Mostrar las peticiones que van llegando por consola

//routes
app.get("/", (req, res) => {
    res.json({ response: "Welcome to the jungle" });
});

app.use("/api/purchaseOrder", InvoiceRoutes);
app.use("/api/carrier", CarrierRoutes);
app.use("/api/assesor", AssesorRoutes);
app.use("/api/city", CityRoutes);
app.use("/api/country", CountryRoutes);
app.use("/api/paymentMethod", PaymentMethodRoutes);
app.use("/api/product", ProductRoutes);

// export default app;
module.exports = app;
