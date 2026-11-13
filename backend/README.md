# The Little Big Kid Catalog – Backend

NestJS + MongoDB API behind the catalog and the admin dashboard.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in ADMIN_PASSWORD and JWT_SECRET
npm run start:dev      # http://localhost:4000
```

On first start with an empty database, the products that used to be hard-coded in
`src/data/productsLekki.js` / `productsIkoyi.js` are imported from `seed/products.seed.json`.
Products that were in both files are imported with branch `All`.

## Environment

| Variable         | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| `MONGODB_URI`    | MongoDB connection string                                          |
| `ADMIN_PASSWORD` | Password for `hello@thelittlebigkid.net` (the only admin login)    |
| `JWT_SECRET`     | Long random string for signing login tokens (`openssl rand -hex 32`) |
| `CORS_ORIGIN`    | Allowed frontend URL(s), comma-separated                           |
| `PORT`           | Port to listen on (default 4000)                                   |

## API

| Method | Path                       | Auth  | Description                                  |
| ------ | -------------------------- | ----- | -------------------------------------------- |
| POST   | `/auth/login`              |       | `{ email, password }` → `{ token }`          |
| GET    | `/products?branch=Lekki`   |       | Products for a branch (includes `All`)       |
| GET    | `/products`                |       | Every product                                |
| POST   | `/products`                | Admin | Create a product                             |
| PATCH  | `/products/:id`            | Admin | Update a product                             |
| DELETE | `/products/:id`            | Admin | Delete a product (and its uploaded photo)    |
| POST   | `/images`                  | Admin | Upload a photo (multipart field `image`)     |
| GET    | `/images/:id`              |       | Serve an uploaded photo                      |

Admin routes need an `Authorization: Bearer <token>` header.
