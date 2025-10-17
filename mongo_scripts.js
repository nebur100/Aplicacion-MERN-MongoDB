// ==========================================================
// 1. INSERCIÓN DE DATOS (CREATE)
// ==========================================================

// Insertar 44 productos (pega el código completo de insertMany)
db.productos.insertMany([
    // ... pega todos los 44 productos aquí ...
]);

// Renombrar la colección 'clientes' a 'Clientes'
db.clientes.renameCollection("Clientes");

// Insertar 20 clientes (pega el código completo de insertMany)
db.Clientes.insertMany([
    // ... pega todos los 20 clientes aquí ...
]);


// ==========================================================
// 2. OPTIMIZACIÓN - CREACIÓN DE ÍNDICES
// ==========================================================

// Índice compuesto para consultas frecuentes (filtrar por categoría y ordenar por precio)
db.productos.createIndex({ categoria: 1, precio: -1 });

// Índice único para el email de clientes (para logins y evitar duplicados)
db.Clientes.createIndex({ email: 1 }, { unique: true });


// ==========================================================
// 3. CONSULTAS AVANZADAS (READ)
// ==========================================================

// Clientes VIP de la ciudad de Madrid
db.Clientes.find({ ciudad: "Madrid", vip: true });

// Productos con descuento superior al 10% y stock bajo (< 20)
db.productos.find({ descuento: { $gt: 0.1 }, stock: { $lt: 20 } });


// ==========================================================
// 4. ANÁLISIS DE DATOS (AGGREGATION)
// ==========================================================

// Calcular el valor total de inventario por cada categoría
db.productos.aggregate([
    { $addFields: { precio_final: { $multiply: ["$precio", { $subtract: [1, "$descuento"] }] } } },
    { $group: { _id: "$categoria", total_inventario: { $sum: { $multiply: ["$precio_final", "$stock"] } } } },
    { $sort: { total_inventario: -1 } }
]);