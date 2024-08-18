## insallation process
- clone the repository
- install the dependencies
- add the .env file

```bash
# demo env file
MONGO_URI=your_mongo_uri
PORT=your_port
```
### commands
```bash
git https://github.com/chaudhuree/products-filtering-server.git
cd products-filtering-server
npm install
npm run startDev
```

### API Endpoints
- GET /products
- GET /product/:id
- POST /product
- PUT /product/:id
- DELETE /product/:id

### Hosted on Render: [products filtering](https://products-filtering-b798.onrender.com/api/v1/products)

### Hosted on Vercel: [products filtering](https://products-filtering-server.vercel.app/api/v1/products)