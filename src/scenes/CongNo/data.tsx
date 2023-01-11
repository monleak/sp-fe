export const mockDataReceivable = [
    {
        id: "OD100",
        date: "2022-01-20",
        price: 200000,
        customer: {
            name: "Lê Đức Sơn",
            phone: "0123456789",
            address: {

            }
        }
    },
    {
        id: "OD101",
        date: "2022-01-20",
        price: 200000,
    }
]
export const mockDataCollected = [
    {
        id: "OD001",
        date: "2021-12-20",
        price: 200000,
    },
    {
        id: "OD002",
        date: "2021-12-20",
        price: 200000,
    },
    {
        id: "OD003",
        date: "2021-12-21",
        price: 300000,
    },
    {
        id: "OD004",
        date: "2021-12-21",
        price: 300000,
    },
    {
        id: "OD005",
        date: "2021-12-21",
        price: 300000,
    },
    {
        id: "OD006",
        date: "2021-12-21",
        price: 300000,
    },
    {
        id: "OD007",
        date: "2021-12-21",
        price: 300000,
    }
]
export const orders = [
    {
        "orderId": 1,
        "status": "chờ xác nhận",
        "userId": 1,
        "products": [
            {
                "_token": "gZkVq3QTcwxxHGwbPVFw7kxrzx1UKWpNTzonuYjA",
                "_flash": {
                    "old": [],
                    "new": []
                },
                "Cart": {
                    "product": {
                        "2": {
                            "quanty": "4",
                            "price": 520000,
                            "productInfo": {
                                "id": 2,
                                "name": "Guangzhou sweater",
                                "price": 130000,
                                "img": "product-2.jpg",
                                "size": "M",
                                "color": "Trắng"
                            }
                        },
                        "3": {
                            "quanty": 2,
                            "price": 680000,
                            "productInfo": {
                                "id": 3,
                                "name": "Guangzhou sweater",
                                "price": 340000,
                                "img": "product-3.jpg",
                                "size": "L",
                                "color": "Xanh lá cây"
                            }
                        },
                        "5": {
                            "quanty": 2,
                            "price": 880000,
                            "productInfo": {
                                "id": 5,
                                "name": "Men's Painted Hat",
                                "price": 440000,
                                "img": "product-5.jpg",
                                "size": "S",
                                "color": "Đỏ"
                            }
                        }
                    },
                    "totalPrice": 2080000,
                    "totalQuanty": 8
                },
                "_previous": {
                    "url": "http://127.0.0.1:8000/Cart"
                }
            }
        ],
        "created_at": "2022-12-05",
        "update_at": "2022-12-06",
        "ship_price": 18000,
        "total_price": 500000,
        "from_address": "Minh Khai",
        "to_address": "Cầu giấy",
        "payment_method": "shoppe pay",
        "order_time": "2022-15-12",
        "pay_time": "2022-16-12 15:01",
        "shiptime_start_at": "2022-16-12 15:01",
        "completed_at": "2022-18-12 15:01",
        "DistrictID": 1,
        "ProvinceID": 2,
        "WardCode": 3
    }
]