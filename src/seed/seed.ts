import { PrismaClient } from '../generated/prisma/client'
export const client = new PrismaClient()

async function createOrder(){
    await client.order.create({data: {
        customerName: "ASDjoijp;pa",
        customerPatronymic: "dsadsasss",
        customerPhoneNumber: "34312431",
        customerEmail: "421ss3234@email.com",
        customerComment: "adssafdfasd",
        deliveryMethod: "Nova Post",
        paymentMethod: "Privat Bank",
        totalPrice: 12040,
        totalDiscount: 2400,
        userId: 13,
        locationId:10,
        productForOrders: {
            create: {
                productId: 2,
                count: 20,
                discount: 120,
            }
        }
    }})
}

async function createProducts(){
    
    await client.product.createMany({
        data: [
            {
                name: "Drone!",
                description: "Oh no, an UAV!",
                price: 1000,
                discount: 120,
                media: "https://www.dronepilotgroundschool.com/wp-content/uploads/2024/11/drone-types-quadcopter.jpg",
                count: 10
            },
            {
                name: "Drone but even scarier!",
                description: "Oh no, help us! It is too fast and mobile!",
                price: 10000,
                discount: 10,
                media: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Reaper_UAV_Takes_to_the_Skies_of_Southern_Afghanistan_MOD_45151418.jpg/1280px-Reaper_UAV_Takes_to_the_Skies_of_Southern_Afghanistan_MOD_45151418.jpg",
                count: 100
            },
            {
                name: "Drone mothership!",
                description: "Oh dang, its UAV swarm with hive mind!",
                price: 100000,
                discount: 1200,
                media: "https://cdn.mos.cms.futurecdn.net/3ssHXye4tkCXqEVB6g8LPb-1920-80.jpg",
                count: 5
            },
        ]
    })
}

createProducts().then(() => {console.log("i finished")})