Base de Datos: MongoDB Atlas (Clúster en la nube).

Interfaz: MongoDB Compass (para Shell y visualización).

Lenguaje de Consulta: MQL (MongoDB Query Language).

Inserción y Estructura de Datos (CREATE / SETUP)

Se creó la base de datos miProyectoPractica.

Se crearon las colecciones: productos (44 documentos) y Clientes (20 documentos).

Se incluyó un comando de mantenimiento: db.clientes.renameCollection("Clientes") para demostrar el manejo de la estructura de la DB.

EJEMPLOS : 


// Inserción de 44 productos con campos anidados y arrays de etiquetas
db.productos.insertMany([ /* ... */ ]);

// Inserción de 20 clientes con campos booleanos (vip) y métricas (pedidos_ult_6m)
db.Clientes.insertMany([ /* ... */ ]);

db.Clientes.createIndex({ email: 1 }, { unique: true });
db.productos.aggregate([
  // 1. Añade un campo 'precio_final' calculando el descuento
  { $addFields: { precio_final: { $multiply: ["$precio", { $subtract: [1, "$descuento"] }] } } },
  // 2. Agrupa por categoría y suma el valor del inventario
  { $group: { _id: "$categoria", total_inventario: { $sum: { $multiply: ["$precio_final", "$stock"] } } } },
  // 3. Ordena para ver qué categoría tiene el mayor valor
  { $sort: { total_inventario: -1 } }
]);

db.Clientes.aggregate([
  { $group: {
    _id: { ciudad: "$ciudad", es_vip: "$vip" },
    total_clientes: { $sum: 1 },
    pedidos_promedio: { $avg: "$pedidos_ult_6m" }
  }},
  { $sort: { total_clientes: -1 } }
]);