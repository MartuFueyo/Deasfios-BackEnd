class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
        this.path = "Products.json"
        this.createfile();
    }

    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }

    addProduct(product) {
        if (this.validateCode(product.code)) {
            console.log("Error! Code exists!");
        } else {
            const producto = {
                id: this.generateId(),
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock
            };
            this.products = this.getProducts();
            this.products.push(producto);
            this.saveProducts();
            console.log("Product added!");
        }
    }

    deleteProduct(id) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products.splice(pos, 1);
            (0, 1)
            this.saveProducts();
            console.log("Product #" + id + " deleted!");
        } else {
            console.log("Not found!");
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find((p) => p.id === id) || "Not Found";
    }


    validateCode(code) {
        return this.product.some(item => item.code === code);
    }

    generateId() {
        let max = 0

        this.products.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });
    }
};

return max + 1

export default ProductManager;