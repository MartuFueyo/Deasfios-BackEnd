const {ProductManager} = require("./ProductManager");

const PM = new ProductManager();

// Pruebas para ejecutar El programa.
//console.log(PM.getProducts());
PM.addProduct({title:"Samsung", description:"Galaxy A34 5G", price:230999, thumbnail:"https://tienda.movistar.com.ar/media/catalog/product/cache/29ccbb5c02aec1862b4f5a57a55d0f2f/s/a/samsung_a34_graphite_front_1_8.png", code:"SAMSUNG2", stock:10});
console.log(PM.getProducts());
PM.addProduct({title:"Motorola", description:"Moto G72", price:154599, thumbnail:"https://tienda.movistar.com.ar/media/catalog/product/cache/29ccbb5c02aec1862b4f5a57a55d0f2f/f/r/frente_22_3.png", code:"MOTOROLA2", stock:15});
PM.addProduct({title:"Samsung", description:"Galaxy Z Flip 4 5G + Auriculares Bud2", price:703799, thumbnail:"https://tienda.movistar.com.ar/media/catalog/product/cache/29ccbb5c02aec1862b4f5a57a55d0f2f/g/r/graphite-128.png", code:"SAMNSUNGFLIP", stock:4});
//console.log(PM.getProductById(3));
//console.log(PM.getProductById(1));
PM.deleteProduct(1);
PM.updateProduct(2, {title:"Motorola", description:"Edge 40 Pro 5G", price:464899, thumbnail:"https://tienda.movistar.com.ar/media/catalog/product/cache/29ccbb5c02aec1862b4f5a57a55d0f2f/e/d/edge_40-pro_cargador_1.png", code:"MOTOROLA5", stock:12})
console.log(PM.getProducts());