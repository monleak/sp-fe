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
    status?: string,
    payment_method?: string,
    userId?: number,
    created_at?: Date,
    update_at?: Date,
    shiptime_start_at?: Date,
    completed_at?: Date,
    paytime?: Date,
    order_time?: Date,
    DistrictID?: string,
    ProvinceID?: string,
    WardCode?: string,
    detailAddress?: string,
    total_price?: number,
    comment?: string,
    rate?: number,
    products?: Product[],
    receiver?: Receiver
}