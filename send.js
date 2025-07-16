const axios = require('axios');

const products = [
    { name: "Laptop", price: 1500, category: "Tecnología" },
    { name: "Celular", price: 800, category: "Tecnología" },
    { name: "Silla", price: 120, category: "Muebles" },
    { name: "Mesa", price: 250, category: "Muebles" }
];

async function seedProducts() {
    for (const product of products) {
        try {
            const res = await axios.post('http://localhost:3000/products', product);
            console.log(`✅ Insertado: ${res.data.name}`);
        } catch (error) {
            console.error(`❌ Error al insertar ${product.name}:`);

            if (error.response) {
                console.error("🛑 Respuesta del servidor:", error.response.data);
            } else {
                console.error("⚠️ Error general:", error.message);
            }
        }

    }
}

seedProducts();