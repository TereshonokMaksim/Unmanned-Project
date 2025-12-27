import { PrismaClient } from '../generated/prisma/client'
export const client = new PrismaClient()

async function createOrder(){
    await client.order.create({data: {
        customerName: "asd",
        customerPatronymic: "das",
        customerPhoneNumber: "asdds",
        customerEmail: "dsaqu@email.com",
        customerComment: "joj",
        deliveryMethod: "Nova Post",
        paymentMethod: "Privat Bank",
        totalPrice: 2000,
        totalDiscount: 1203,
        userId: 13,
        locationId: 9,
        productForOrders: {
            create: {
                productId: 2,
                count: 20,
                discount: 120,
            }
        }
    }})
}

createOrder().then(() => {console.log("asd")})