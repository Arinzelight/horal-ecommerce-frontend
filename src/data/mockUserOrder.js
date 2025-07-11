
export const orders = [
  {
    orderId: "HOR12345678",
    status: "Success",
    price: 500.0,
    transactionDate: "2023-05-06",
    date: "2023-05-06",
    progress: [
      {
        stage: "Order Confirmed",
        completed: true,
        current: false,
        date: "2023-05-06",
      },
      { stage: "Shipped", completed: true, current: true, date: "2023-05-08" },
      {
        stage: "Out For Delivery",
        completed: false,
        current: false,
        expectedDate: "Expected by Mon 15th",
      },
      {
        stage: "Delivered",
        completed: false,
        current: false,
        expectedDate: "Expected by Mon 16th",
      },
    ],
    orderInfo: {
      shipping: "Horal Logistics",
      paymentMethod: "PayPal",
    },
    deliveryInfo: {
      address: "10 Allen Avenue, Ikeja, Lagos",
      deliveryMethod: "Horal Logistics / Self Pickup",
      pickupLocation: "3rd Avenue, London Street",
    },
    items: [
      {
        name: "Nike Air Max 270",
        productId: "#HOR12345678",
        price: 180.0,
        quantity: 2,
      },
      {
        name: "Adidas Ultraboost 22",
        productId: "#HOR12345679",
        price: 220.0,
        quantity: 1,
      },
      {
        name: "Puma RS-X3",
        productId: "#HOR12345680",
        price: 150.0,
        quantity: 1,
      },
    ],
    summary: {
      subtotal: 730.0,
      shippingFee: 25.0,
      total: 755.0,
    },
  },
  {
    orderId: "HOR87654321",
    status: "Processing",
    price: 1551.0,
    transactionDate: "2023-05-10",
    date: "2023-05-10",
    progress: [
      {
        stage: "Order Confirmed",
        completed: true,
        current: false,
        date: "2023-05-10",
      },
      {
        stage: "Processing",
        completed: false,
        current: true,
        expectedDate: "Expected by Wed 12th",
      },
      {
        stage: "Shipped",
        completed: false,
        current: false,
        expectedDate: "Expected by Thu 13th",
      },
      {
        stage: "Delivered",
        completed: false,
        current: false,
        expectedDate: "Expected by Fri 14th",
      },
    ],
    orderInfo: {
      shipping: "Express Delivery",
      paymentMethod: "Credit Card",
    },
    deliveryInfo: {
      address: "25 Victoria Island, Lagos",
      deliveryMethod: "Express Delivery",
      pickupLocation: "Main Warehouse, Victoria Island",
    },
    items: [
      {
        name: "iPhone 14 Pro",
        productId: "#HOR87654321",
        price: 999.0,
        quantity: 1,
      },
      {
        name: "AirPods Pro 2nd Gen",
        productId: "#HOR87654322",
        price: 249.0,
        quantity: 2,
      },
      {
        name: "MagSafe Charger",
        productId: "#HOR87654323",
        price: 39.0,
        quantity: 1,
      },
    ],
    summary: {
      subtotal: 1536.0,
      shippingFee: 15.0,
      total: 1551.0,
    },
  },
  {
    orderId: "HOR11223344",
    status: "Shipped",
    price: 2286.0,
    transactionDate: "2023-05-08",
    date: "2023-05-10",
    progress: [
      {
        stage: "Order Confirmed",
        completed: true,
        current: false,
        date: "2023-05-08",
      },
      { stage: "Packed", completed: true, current: false, date: "2023-05-09" },
      { stage: "Shipped", completed: true, current: true, date: "2023-05-10" },
      {
        stage: "Delivered",
        completed: false,
        current: false,
        expectedDate: "Expected by Mon 12th",
      },
    ],
    orderInfo: {
      shipping: "DHL Express",
      paymentMethod: "Bank Transfer",
    },
    deliveryInfo: {
      address: "15 Lekki Phase 1, Lagos",
      deliveryMethod: "DHL Express",
      pickupLocation: "DHL Service Point, Lekki",
    },
    items: [
      {
        name: 'MacBook Pro 14"',
        productId: "#HOR11223344",
        price: 1999.0,
        quantity: 1,
      },
      {
        name: "Magic Mouse",
        productId: "#HOR11223345",
        price: 79.0,
        quantity: 1,
      },
      {
        name: "USB-C Hub",
        productId: "#HOR11223346",
        price: 89.0,
        quantity: 2,
      },
    ],
    summary: {
      subtotal: 2256.0,
      shippingFee: 30.0,
      total: 2286.0,
    },
  },
  {
    orderId: "HOR55667788",
    status: "Delivered",
    price: 1155.0,
    transactionDate: "2023-05-01",
    date: "2023-05-04",
    progress: [
      {
        stage: "Order Confirmed",
        completed: true,
        current: false,
        date: "2023-05-01",
      },
      { stage: "Shipped", completed: true, current: false, date: "2023-05-02" },
      {
        stage: "Out For Delivery",
        completed: true,
        current: false,
        date: "2023-05-03",
      },
      {
        stage: "Delivered",
        completed: true,
        current: true,
        date: "2023-05-04",
      },
    ],
    orderInfo: {
      shipping: "Standard Shipping",
      paymentMethod: "PayPal",
    },
    deliveryInfo: {
      address: "8 Surulere, Lagos",
      deliveryMethod: "Standard Shipping",
      pickupLocation: "Local Post Office",
    },
    items: [
      {
        name: "Samsung Galaxy S23",
        productId: "#HOR55667788",
        price: 799.0,
        quantity: 1,
      },
      {
        name: "Galaxy Buds Pro",
        productId: "#HOR55667789",
        price: 199.0,
        quantity: 1,
      },
      {
        name: "Wireless Charger",
        productId: "#HOR55667790",
        price: 49.0,
        quantity: 3,
      },
    ],
    summary: {
      subtotal: 1145.0,
      shippingFee: 10.0,
      total: 1155.0,
    },
  },
  {
    orderId: "HOR99887766",
    status: "Processing",
    price: 736.0,
    transactionDate: "2023-05-12",
    date: "2023-05-12",
    progress: [
      {
        stage: "Order Confirmed",
        completed: true,
        current: false,
        date: "2023-05-12",
      },
      {
        stage: "Processing",
        completed: false,
        current: true,
        expectedDate: "Expected by Sat 14th",
      },
      {
        stage: "Shipped",
        completed: false,
        current: false,
        expectedDate: "Expected by Sun 15th",
      },
      {
        stage: "Delivered",
        completed: false,
        current: false,
        expectedDate: "Expected by Mon 16th",
      },
    ],
    orderInfo: {
      shipping: "Premium Logistics",
      paymentMethod: "Debit Card",
    },
    deliveryInfo: {
      address: "42 Gbagada, Lagos",
      deliveryMethod: "Premium Logistics",
      pickupLocation: "Premium Hub, Gbagada",
    },
    items: [
      {
        name: "Sony WH-1000XM4",
        productId: "#HOR99887766",
        price: 349.0,
        quantity: 1,
      },
      {
        name: "Kindle Paperwhite",
        productId: "#HOR99887767",
        price: 139.0,
        quantity: 2,
      },
      {
        name: "Bluetooth Speaker",
        productId: "#HOR99887768",
        price: 89.0,
        quantity: 1,
      },
    ],
    summary: {
      subtotal: 716.0,
      shippingFee: 20.0,
      total: 736.0,
    },
  },
];
