const fs = require('fs')

//función útil que se llama varias veces(por eso hacerla acá y así evitar tanto código)
const readFile = async (path) =>{
const getProds = await fs.promises.readFile(path)
const parseProds = JSON.parse(getProds)
return parseProds
}

//función para crear el archivo
const writeFile = (path, products)=> fs.promises.writeFile(path, JSON.stringify({products}))

class ProductManager {

    constructor(path) {
        this.products = []
        this.path = path
    }

    init = async ()=>{
            const existingFile = fs.existsSync(this.path)
            if(existingFile){
                console.log("FILE ALREADY EXISTS")
                const {products} = await readFile(this.path) // está entre {} para desestructurar
                this.products = products
            }else{
                    await writeFile(this.path, this.products)
                    console.log('FILE CREATED CORRECTLY')
            }
    }

    getProducts = async ()=>{
        const jsonData = await readFile(this.path)   
        return jsonData
    }

    addProduct = async({title, description, price, thumbnail, code, stock})  =>{
        const foundProduct = this.products.find((product)=> product.title === title || product.code === code)
            if(foundProduct){
                console.log(`PRODUCT ALREADY EXISTS ${title} - ${code}`)
            } else{
                const id = this.products.length + 1
                this.products.push({id, title, description, price, thumbnail, code, stock})
                await writeFile(this.path, this.products)
                console.log("PRODUCT CREATED SUCCESSFULLY")
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
 
updateProduct = async (id, newProduct)=>{
    const checkIndexProduct = this.products.findIndex(
        (product)=> product.id === id
    )
    if(checkIndexProduct != -1){
        
        const id = this.products[checkIndexProduct].id
        this.products[checkIndexProduct] = {
            id,
            ...newProduct,
        }

        await writeFile(this.path, this.products)
        console.log("UPDATED")
        
    } else{
        console.log("ERROR: CAN'T FIND A PRODUCT WITH SAME ID")
    }
}

deleteProduct = async (id) =>{
    const checkIndexProduct = this.products.findIndex(
        (product)=> product.id === id)
        if(checkIndexProduct != -1){
             
            const filteredProds = this.products.filter(product => product.id =! id)

            await writeFile(this.path, filteredProds)
            console.log("PRODUCT DELETED SUCCESSFULLY")

        }else{
            console.log("PRODUCT DOES NOT MATCH ANY ID")
        }
}
}

async function main(){
    const productManager = new ProductManager('./assets/data.json')
    await productManager.init()

    let products = await productManager.getProducts()


//     const newProduct = {
//     title: 'P1',
//     description: 'D1',
//     price: 'P1',
//     thumbnail: 'T1',
//     code : 'C1',
//     stock: 'S1'
// }


            const UpdatingProduct = {
            title: 'UPD 1',
            description: 'UPD 1',
            price: 'UPD 1',
            thumbnail: 'UPD 1',
            code : 'UPD 1',
            stock: 'UPD 1'
        }

// await productManager.addProduct(newProduct)
products = await productManager.getProducts()
console.log(products)

await productManager.updateProduct(1, UpdatingProduct )
await productManager.deleteProduct(1)
}

main()


// //ops//



// productManager.addProduct(newProduct1)
// productManager.addProduct(newProduct2)



// console.log(productManager.getProductById(1))