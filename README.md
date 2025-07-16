# StoreBack
Backend con API REST en Node.js con Express y MongoDB.

#Mongosh
#UseProduct NombreDElaBD

| #   | Consulta                                                                                    | ¿Qué hace?                                                    |
| --- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1️⃣  | `db.products.find()`                                                                        | Muestra **todos los productos** en la colección.              |
| 2️⃣  | `db.products.find({ category: "Tecnología" })`                                              | Muestra productos cuya categoría es `"Tecnología"`.           |
| 3️⃣  | `db.products.find({ price: { $gt: 500 } })`                                                 | Muestra productos con `price > 500`.                          |
| 4️⃣  | `db.products.updateOne({ name: "Silla" }, { $set: { price: 130 } })`                        | Cambia el precio de `"Silla"` a `130`.                        |
| 5️⃣  | `db.products.deleteOne({ name: "Mesa" })`                                                   | Elimina el producto `"Mesa"` de la base.                      |
| 6️⃣  | `db.products.find().pretty()`                                                               | Muestra todos los documentos con formato legible.             |
| 7️⃣  | `db.products.updateMany({ category: "Tecnología" }, { $set: { category: "Electronica" } })` | Cambia todas las categorías `"Tecnología"` a `"Electronica"`. |
| 8️⃣  | `db.products.updateOne({ name: "Laptop" }, { $set: { category: "Electronica" } })`          | Cambia solo la categoría de `"Laptop"` a `"Electronica"`.     |

Postman
📬 Endpoints de la API REST (localhost:3000/products)

| #   | Método | Endpoint        | ¿Qué hace?                                          |
| --- | ------ | --------------- | --------------------------------------------------- |
| 1️⃣  | `GET`  | `/products`     | Devuelve **todos los productos**.                   |
| 2️⃣  | `GET`  | `/products/:id` | Devuelve un producto por su **ID**.                 |
| 3️⃣  | `POST` | `/products`     | Crea un nuevo producto (**name, price, category**). |

{
"name": "Audífonos",
"price": 400,
"category": "Tecnología"
}
 
| 4️⃣ | `PUT` | `/products/:id` | Actualiza un producto existente por **ID**. |

{
  "price": 450
}

| 5️⃣ | `DELETE` | `/products/:id` | Elimina un producto por **ID**. |

EXTRAS
| 6️⃣ | `GET` | `/products?category=Tecnología` | Filtra productos por categoría `"Tecnología"`. |
| 7️⃣ | `GET` | `/products?minPrice=500` | Devuelve productos con precio **mayor o igual a 500**. |
| 8️⃣ | `GET` | `/products?minPrice=500&maxPrice=1000` | Devuelve productos con precio entre **500 y 1000**. |
| 9️⃣ | `GET` | `/products?name=Laptop` | Busca producto con nombre `"Laptop"` (exacto o parcial con RegExp). |
| 🔟 | `GET` | `/products?category=Tecnología&minPrice=800` | Filtra por categoría `"Tecnología"` y precio **≥ 800**. |
