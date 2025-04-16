export const mockProducts = [
  {
    id: 1,
    name: "Nostalgie T-Shirt",
    price: 25000.0,
    images: [
      "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Fashion",
    condition: "Brand New",
    location: "Lagos",
    localGvt: "Ikeja",
    rating: 5,
    reviews: 450,
    isHot: false,
    isVerified: true,
    hasVideo: true,
    colors: [
      { name: "White", code: "#f8f9fa" },
      { name: "Black", code: "#212529" },
      { name: "Gray", code: "#adb5bd" },
      { name: "Blue", code: "#4361ee" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Lorem ipsum dolor sit amet consectetur. Non pretium tellus libero hendrerit aliquam eget volutpat. Vel nullam a. Consequat amet orci tincidunt molestie at morbi. Eget est sit purus sodales. Vulputate eget habitant aenean ipsum non. Egestas quis sit nisi et nunc interdum. At ultrices dolor porttitor eget. Felis non purus sed gravida. Consequat dignissim suspendisse massa id commodo consequat blandit imperdiet. Vitae sollicitudin eu eget nunc et molestie risus interdum. Accumsan sit id dui amet amet. Tincidunt vulputate quis amet egestas suscipit mattis quis nulla. Ut euismod proin vitae purus cras vitae. Ac in tellus consequat morbi molestie. A viverra et interdum nunc dignissim egestas. Vulputate penatibus elementum gravida morbi vel neque sagittis sed. A vitae aliquam a quis in lectus. In viverra et consequat nunc et bibendum cras consectetur neque. Porttitor maecenas sed vitae ligula quam. Vitae adipiscing pretium feugiat gravida.",
    details: [
      "100% cotton material",
      "Machine washable",
      "Available in multiple colors",
      "Comfortable fit",
      "Durable stitching",
    ],
    specifications: {
      Material: "100% Cotton",
      Care: "Machine wash cold",
      Fit: "Regular",
      Collar: "Round neck",
      Sleeve: "Short sleeve",
      Pattern: "Solid",
      "Country of Origin": "Nigeria",
    },
    reviewsList: [
      {
        id: 1,
        user: {
          name: "Mide Ayo",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        rating: 5,
        date: "2 days ago",
        comment:
          "Lorem ipsum dolor sit amet consectetur. Id. Lorem ipsum dolor sit amet consectetur. Id.",
      },
      {
        id: 2,
        user: {
          name: "Tunde Owolabi",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        rating: 5,
        date: "3 days ago",
        comment:
          "Great quality t-shirt, very comfortable and fits perfectly. The material is soft and breathable.",
      },
      {
        id: 3,
        user: {
          name: "Amina Ibrahim",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        rating: 4,
        date: "1 week ago",
        comment:
          "Nice shirt, good quality but the color was slightly different from what I expected.",
      },
      {
        id: 4,
        user: {
          name: "Mide Ayo",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        rating: 5,
        date: "2 days ago",
        comment:
          "Lorem ipsum dolor sit amet consectetur. Id. Lorem ipsum dolor sit amet consectetur. Id.",
      },
    ],
    seller: {
      name: "Destiny Janet",
      isVerified: true,
      avatar: null,
      country: "Nigeria",
      state: "Lagos State",
      lga: "Ikeja",
      address: "Lorem ipsum dolor sit amet",
    },
  },
  {
    id: 2,
    name: "Nike Super Fast Sneaker | Phantom Black",
    price: 50000.0,
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Fashion",
    condition: "Used",
    location: "Oyo",
    localGvt: "Ibadan",
    rating: 4.4,
    reviews: 120,
    isHot: false,
    isVerified: false,
    hasVideo: false,
    colors: [
      { name: "Black", code: "#212529" },
      { name: "Red", code: "#dc3545" },
    ],
    sizes: ["40", "41", "42", "43", "44"],
    description:
      "Premium quality Nike sneakers with excellent comfort and durability. Perfect for casual wear and sports activities.",
    details: [
      "Breathable mesh upper",
      "Cushioned insole",
      "Durable rubber outsole",
      "Lace-up closure",
      "Padded collar and tongue",
    ],
    specifications: {
      Brand: "Nike",
      Material: "Mesh and synthetic",
      Sole: "Rubber",
      Closure: "Lace-up",
      Style: "Athletic",
      "Country of Origin": "Vietnam",
    },
    reviewsList: [
      {
        id: 1,
        user: {
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        rating: 4,
        date: "1 week ago",
        comment:
          "Good sneakers, comfortable for daily use. The only issue is they run a bit small.",
      },
      {
        id: 2,
        user: {
          name: "Sarah James",
          avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        },
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Absolutely love these sneakers! They're stylish and super comfortable for long walks.",
      },
      {
        id: 3,
        user: {
          name: "Michael Chen",
          avatar: "https://randomuser.me/api/portraits/men/91.jpg",
        },
        rating: 4,
        date: "3 weeks ago",
        comment:
          "Great quality for the price. I've been wearing them daily for two weeks with no issues.",
      },
    ],
    seller: {
      name: "John Doe",
      isVerified: false,
      avatar: null,
      country: "Nigeria",
      state: "Oyo State",
      lga: "Ibadan",
      address: "123 Main Street",
    },
  },
  {
    id: 3,
    name: "Lux Kids Wrist Watch | Phantom Black",
    price: 15000.0,
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Accessories",
    condition: "Brand New",
    location: "Oyo",
    localGvt: "Ibadan",
    rating: 4.3,
    reviews: 78,
    isHot: true,
    isVerified: true,
    hasVideo: true,
    description:
      "Elegant wrist watch for kids with durable materials and water resistance. Perfect gift for special occasions.",
    details: [
      "Water resistant up to 30m",
      "Adjustable strap",
      "Quartz movement",
      "Scratch-resistant glass",
      "1 year warranty",
    ],
    specifications: {
      Brand: "Lux",
      Movement: "Quartz",
      "Case Material": "Stainless Steel",
      "Band Material": "Silicone",
      "Water Resistance": "30m",
      "Battery Life": "Approximately 2 years",
      "Country of Origin": "Japan",
    },
    reviewsList: [
      {
        id: 1,
        user: {
          name: "Funke Adebayo",
          avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        },
        rating: 5,
        date: "3 days ago",
        comment:
          "My son loves this watch! It's durable and has survived several falls already.",
      },
      {
        id: 2,
        user: {
          name: "Emeka Obi",
          avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        },
        rating: 4,
        date: "1 week ago",
        comment:
          "Good quality watch for kids. The strap is adjustable and comfortable.",
      },
      {
        id: 3,
        user: {
          name: "Zainab Mohammed",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        },
        rating: 4,
        date: "2 weeks ago",
        comment:
          "Nice watch, my daughter loves it. The only issue is the clasp is a bit difficult for small hands.",
      },
    ],
    seller: {
      name: "Watch Emporium",
      isVerified: true,
      avatar: null,
      country: "Nigeria",
      state: "Oyo State",
      lga: "Ibadan",
      address: "45 Clock Tower Road",
    },
  },
  {
    id: 4,
    name: "OGOO Hero Bus | White & Black",
    price: 12500000.0,
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Vehicles",
    condition: "Brand New",
    location: "Sokoto",
    localGvt: "Kaba",
    rating: 4.5,
    reviews: 12,
    isHot: false,
    isVerified: true,
    hasVideo: true,
    colors: [
      { name: "White", code: "#f8f9fa" },
      { name: "Black", code: "#212529" },
    ],
    description:
      "Spacious and comfortable bus with modern features. Ideal for transportation businesses and large families.",
    details: [
      "Seating capacity: 18 passengers",
      "Fuel efficient diesel engine",
      "Air conditioning system",
      "Entertainment system included",
      "5-year warranty",
    ],
    specifications: {
      Make: "OGOO",
      Model: "Hero",
      Year: "2023",
      Engine: "2.5L Diesel",
      Transmission: "Automatic",
      "Fuel Type": "Diesel",
      "Seating Capacity": "18",
      "Country of Origin": "Nigeria",
    },
    reviewsList: [
      {
        id: 1,
        user: {
          name: "Ibrahim Musa",
          avatar: "https://randomuser.me/api/portraits/men/77.jpg",
        },
        rating: 5,
        date: "1 month ago",
        comment:
          "Excellent bus for our transport business. Fuel efficient and comfortable for passengers.",
      },
      {
        id: 2,
        user: {
          name: "Chioma Eze",
          avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        },
        rating: 4,
        date: "2 months ago",
        comment:
          "Good vehicle, spacious and comfortable. The AC works perfectly even in hot weather.",
      },
    ],
    seller: {
      name: "Auto Dealership Ltd",
      isVerified: true,
      avatar: null,
      country: "Nigeria",
      state: "Sokoto State",
      lga: "Kaba",
      address: "78 Highway Junction",
    },
  },
  {
    id: 5,
    name: "New Sky Blue Baby Winter Shoes",
    price: 8500.0,
    images: [
      "https://images.unsplash.com/photo-1594150878496-a921e5af8907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFieSUyMHdpbnRlciUyMHNob2V8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1594150878496-a921e5af8907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFieSUyMHdpbnRlciUyMHNob2V8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1594150878496-a921e5af8907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFieSUyMHdpbnRlciUyMHNob2V8ZW58MHx8MHx8fDA%3D",
    ],
    category: "Babies",
    condition: "Used",
    location: "Lagos",
    localGvt: "Yaba",
    rating: 4.2,
    reviews: 45,
    isHot: true,
    isVerified: false,
    hasVideo: false,
    sizes: ["0-6M", "6-12M", "12-18M"],
    colors: [
      { name: "Blue", code: "#4361ee" },
      { name: "Pink", code: "#ff6b6b" },
    ],
    description:
      "Warm and cozy winter shoes for babies. Soft material that's gentle on your baby's feet with non-slip soles.",
    details: [
      "Soft plush lining",
      "Non-slip rubber sole",
      "Easy velcro closure",
      "Machine washable",
      "Suitable for indoor and outdoor use",
    ],
    specifications: {
      Material: "Cotton and synthetic",
      Sole: "Rubber",
      Closure: "Velcro",
      "Age Range": "0-18 months",
      Care: "Machine washable",
      "Country of Origin": "China",
    },
    reviewsList: [
      {
        id: 1,
        user: {
          name: "Blessing Okafor",
          avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        rating: 5,
        date: "1 week ago",
        comment:
          "These shoes are perfect for my baby! They stay on well and keep his feet warm.",
      },
      {
        id: 2,
        user: {
          name: "Taiwo Adeyemi",
          avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        },
        rating: 4,
        date: "2 weeks ago",
        comment:
          "Good quality shoes, but they run a bit small. Order a size up.",
      },
      {
        id: 3,
        user: {
          name: "Fatima Bello",
          avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        },
        rating: 3,
        date: "3 weeks ago",
        comment:
          "The shoes are cute but the velcro doesn't stick well after a few uses.",
      },
    ],
    seller: {
      name: "Baby Essentials",
      isVerified: false,
      avatar: null,
      country: "Nigeria",
      state: "Lagos State",
      lga: "Yaba",
      address: "15 Children's Avenue",
    },
  },
  {
    id: 6,
    name: "Circo Deep Freezer | Green Lever",
    price: 185000.0,
    images: [
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Electronics",
    condition: "Brand New",
    location: "Rivers",
    localGvt: "Rumora",
    rating: 4.6,
    reviews: 32,
    isHot: false,
    isVerified: true,
    hasVideo: true,
    description:
      "Energy-efficient deep freezer with large capacity. Perfect for storing frozen foods for long periods with consistent temperature control.",
    details: [
      "300L capacity",
      "Energy-efficient operation",
      "Temperature control system",
      "Fast freezing function",
      "3-year warranty",
    ],
    specifications: {
      Brand: "Circo",
      Model: "Green Lever",
      Capacity: "300L",
      "Energy Rating": "A++",
      Dimensions: "120 x 60 x 85 cm",
      Weight: "65 kg",
      "Temperature Range": "-18°C to -24°C",
      "Country of Origin": "South Korea",
    },
    reviewsList: [
      {
        id: 1,
        user: {
          name: "Chinedu Okoro",
          avatar: "https://randomuser.me/api/portraits/men/18.jpg",
        },
        rating: 5,
        date: "2 weeks ago",
        comment:
          "This freezer is excellent! Very energy efficient and maintains temperature perfectly.",
      },
      {
        id: 2,
        user: {
          name: "Aisha Bala",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        },
        rating: 4,
        date: "1 month ago",
        comment:
          "Good capacity and works well. The only issue is it's a bit noisy sometimes.",
      },
      {
        id: 3,
        user: {
          name: "David Okonkwo",
          avatar: "https://randomuser.me/api/portraits/men/62.jpg",
        },
        rating: 5,
        date: "2 months ago",
        comment:
          "Perfect for my small business. Keeps everything frozen solid and uses less electricity than my old one.",
      },
    ],
    seller: {
      name: "Appliance Hub",
      isVerified: true,
      avatar: null,
      country: "Nigeria",
      state: "Rivers State",
      lga: "Rumora",
      address: "56 Electronic Way",
    },
  },
  {
    id: 7,
    name: "New Polo Shirt | Phantom Black",
    price: 12000.0,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Fashion",
    condition: "Brand New",
    location: "Lagos",
    localGvt: "Ago",
    rating: 4.1,
    reviews: 89,
    isHot: false,
    isVerified: false,
    hasVideo: false,
    colors: [
      { name: "Black", code: "#212529" },
      { name: "Navy", code: "#0a2472" },
      { name: "Green", code: "#2a9d8f" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Classic polo shirt made from premium cotton. Comfortable fit with excellent breathability for everyday wear.",
    details: [
      "100% premium cotton",
      "Button-up collar",
      "Short sleeves",
      "Embroidered logo",
      "Machine washable",
    ],
    specifications: {
      Material: "100% Cotton",
      Care: "Machine wash cold",
      Fit: "Regular",
      Collar: "Button-up",
      Sleeve: "Short sleeve",
      Pattern: "Solid",
      "Country of Origin": "Nigeria",
    },
    reviewsList: [
      {
        id: 1,
        user: {
          name: "Oluwaseun Adeleke",
          avatar: "https://randomuser.me/api/portraits/men/29.jpg",
        },
        rating: 4,
        date: "1 week ago",
        comment:
          "Good quality polo shirt. The material is soft and comfortable.",
      },
      {
        id: 2,
        user: {
          name: "Ngozi Eze",
          avatar: "https://randomuser.me/api/portraits/women/54.jpg",
        },
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Excellent shirt! The fit is perfect and the color doesn't fade after washing.",
      },
      {
        id: 3,
        user: {
          name: "Yusuf Ibrahim",
          avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        },
        rating: 3,
        date: "3 weeks ago",
        comment:
          "The shirt is okay but runs a bit small. Consider ordering a size up.",
      },
    ],
    seller: {
      name: "Fashion World",
      isVerified: false,
      avatar: null,
      country: "Nigeria",
      state: "Lagos State",
      lga: "Ago",
      address: "23 Style Street",
    },
  },
  {
    id: 8,
    name: "Slider Nike Sneaker | Phantom White",
    price: 35000.0,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    ],
    category: "Fashion",
    condition: "Brand New",
    location: "Abuja",
    localGvt: "Lugbe",
    rating: 4.7,
    reviews: 156,
    isHot: true,
    isVerified: true,
    hasVideo: false,
    colors: [
      { name: "White", code: "#f8f9fa" },
      { name: "Red", code: "#dc3545" },
      { name: "Blue", code: "#4361ee" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    description:
      "Stylish and comfortable Nike sneakers with excellent cushioning and support. Perfect for casual wear and light sports activities.",
    details: [
      "Breathable mesh upper",
      "Cushioned insole",
      "Durable rubber outsole",
      "Slip-on design",
      "Padded collar for comfort",
    ],
    specifications: {
      Brand: "Nike",
      Model: "Slider",
      Material: "Mesh and synthetic",
      Sole: "Rubber",
      Closure: "Slip-on",
      Style: "Casual",
      "Country of Origin": "Vietnam",
    },
    reviewsList: [
      {
        id: 1,
        user: {
          name: "Mide Ayo",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        rating: 5,
        date: "2 days ago",
        comment:
          "These are the most comfortable sneakers I've ever worn! Perfect for everyday use.",
      },
      {
        id: 2,
        user: {
          name: "Folake Adeyemi",
          avatar: "https://randomuser.me/api/portraits/women/17.jpg",
        },
        rating: 5,
        date: "1 week ago",
        comment:
          "Love these shoes! They look exactly like the pictures and are very comfortable.",
      },
      {
        id: 3,
        user: {
          name: "Emmanuel Okafor",
          avatar: "https://randomuser.me/api/portraits/men/72.jpg",
        },
        rating: 4,
        date: "2 weeks ago",
        comment:
          "Great sneakers, good quality and stylish. They run true to size.",
      },
      {
        id: 4,
        user: {
          name: "Mide Ayo",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        rating: 5,
        date: "2 days ago",
        comment:
          "Lorem ipsum dolor sit amet consectetur. Id. Lorem ipsum dolor sit amet consectetur. Id.",
      },
    ],
    seller: {
      name: "Footwear Plus",
      isVerified: true,
      avatar: null,
      country: "Nigeria",
      state: "Abuja",
      lga: "Lugbe",
      address: "12 Sneaker Boulevard",
    },
  },
];
