const app = require('./index');
const cors = require('cors');


// CORS
app.use(cors());

// ROUTES

app.get('/auth', authRoutes);
