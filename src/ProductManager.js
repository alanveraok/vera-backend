
class ProductManager {

    constructor() {
        this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct({title, description, price, thumbnail, code, stock}) {
        const foundProduct = this.products.find((product)=> product.title === title || product.code === code)
            if(foundProduct){
                console.log(`Product already exists ${title} - ${code}`)
            } else{
                const id = this.products.length + 1
                this.products.push({id, title, description, price, thumbnail, code, stock})
            }

    }    

    getProductById(id) {
        const foundProduct = this.products.find((product) => product.id === id)   //mejor usar find() que map()   
        if(foundProduct){      
         console.log("PRODUCT FOUND!")      
         console.log(foundProduct)      
         return foundProduct      
        }else{      
         console.log("PRODUCT NOT FOUND!")     
        }     
       }
 

}

const productManager = new ProductManager()

//ops//
const newProduct1 = {
    title: 'P1',
    description: 'D1',
    price: 'P1',
    thumbnail: 'T1',
    code : 'C1',
    stock: 'S1'
}

const newProduct2 = {
title: 'P2',
  description: 'D2',
  price: 'P2',
  thumbnail: 'T2',
  code : 'C2',
  stock: 'S2'

}
productManager.addProduct(newProduct1)
productManager.addProduct(newProduct2)

console.log(productManager.getProductById(1))