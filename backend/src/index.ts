import app from './app.js'
import { connectToDatabase } from './db/db.js';

const PORT = process.env.PORT || 3000;
connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Listening on port 3000");
        })
    })
    .catch((err) => console.log(err));
    
