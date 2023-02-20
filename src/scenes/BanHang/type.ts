export type Product =
    {
        productId?: number,
        productName?: string,
        productStatus?: number,
        price?: number,
        quantity?: number,
        img?: string
        size?: string,
        color?: string
    }
export type Receiver = {
    userId?: number,
    address?: {
        ward?: string,
        district?: string,
        province?: string,
        detail?: string
    }
}
export type Order = {
    orderId?: number,
    receiver?: Receiver,
    products?: Product[],
    status?: string,
    payment_method?: string,
    cod?: number,
    createdAt?: Date,
    updateAt?: Date,
    startAt?: Date,
    completedAt?: Date,
    payAt?: Date,
    orderAt?: Date
}