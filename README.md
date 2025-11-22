A simple and efficient URL shortening service built with Node.js, Express, Postgres, and a React.js frontend.

API Endpoints
Auth
Method    	Endpoint	  Description
POST	     /register	  Register new user
POST	     /login	      Login user, returns JWT token


URL Operations
Method	    Endpoint	  Description
POST	      /shorten	  Create short URL
GET	       /api/links	  Get all URLs of logged-in user
GET	       /:code	      Redirect using shortcode
GET	       /api/links/:code	  Get URL details by shortcode
DELETE	   /api/:code	  Delete URL by shortcode

git clone https://github.com/your-username/urlgenerator.git
cd urlgenerator
cd backend
npm install

create .env
POSTGRES_URL=your_postgres_url
JWT_SECRET=your_secret_key
BASE_URL=http://localhost:3000
node app.js


cd ../frontend
npm install
npm run dev

Deployed in Vercel
