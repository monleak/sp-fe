export type StatisticsData = {
    totalRevenue: number,
    totalCapital: number,
    totalPrices: number,
    totalQuantities: number,
    growthPercentage: {
        totalRevenue: number,
        totalCapital: number,
        totalPrices: number,
    }
}
export type StatisticsQuery = {
    type?: string,
    month?: number,
    year?: number,
}
export type StatisticsPerMonth = {
    month: number,
    discount?: number,
    returnNum?: number,
    sippingFee?: number,
    quantity: number,
    totalRevenue: number,
    totalCapital: number,
    totalPrices: number,
}