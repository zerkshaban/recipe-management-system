const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipesRoutes = require('./routes/Recipes/recipes.route');

const app = express();

const port = 3000;

// middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));

app.use('/api/recipes', recipesRoutes);

mongoose
  .connect(
    'mongodb+srv://zerkshaban00:Ut1VzAVhByv6bT3t@recipe-management-syste.h4djta1.mongodb.net/?retryWrites=true&w=majority&appName=recipe-management-system'
  )
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
