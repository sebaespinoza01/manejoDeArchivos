const fs = require('fs');

class ProductManager {
constructor(filePath) {
    this.path = filePath;
}

addProduct(product) {
    const products = this.getProducts();
    product.id = this.generateProductId(products);
    products.push(product);
    this.saveProducts(products);
}

getProducts() {
    try {
        const data = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

    getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
}

updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
        updatedProduct.id = id;
        products[index] = updatedProduct;
        this.saveProducts(products);
    }
}

deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
        products.splice(index, 1);
        this.saveProducts(products);
    }
}

generateProductId(products) {
    if (products.length === 0) {
        return 1;
    }
    const maxId = Math.max(...products.map(product => product.id));
    return maxId + 1;
}

saveProducts(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
}
}

// Ejemplo de uso:
const productManager = new ProductManager('products.json');

// Agregar un producto
productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del Producto 1',
    price: 19.99,
    thumbnail: 'producto1.jpg',
    code: 'ABC123',
    stock: 10,
});

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por ID
const product = productManager.getProductById(1);
console.log('Producto con ID 1:', product);

// Actualizar un producto
productManager.updateProduct(1, {
    title: 'Producto 1 Modificado',
    description: 'Descripción actualizada',
    price: 29.99,
    thumbnail: 'actualizado.jpg',
    code: 'XYZ456',
    stock: 5,
});

// Eliminar un producto
productManager.deleteProduct(1);
