const generateTestOrder = () => {
    const sampleDishes = [
        { name: "Burger", price: 9.99 },
        { name: "Pizza", price: 14.99 },
        { name: "Pasta", price: 12.49 },
        { name: "Sushi", price: 18.99 },
        { name: "Salad", price: 7.99 },
        { name: "Tacos", price: 10.49 },
        { name: "Fried Chicken", price: 11.99 }
    ];

    const orderId = `ORD-${Date.now()}`;


    // Randomly pick 2-4 items for the order
    const items = [];
    const numItems = Math.floor(Math.random() * 3) + 2; // 2 to 4 items

    for (let i = 0; i < numItems; i++) {
        const randomIndex = Math.floor(Math.random() * sampleDishes.length);
        const dish = sampleDishes[randomIndex];

        items.push({
            name: dish.name,
            quantity: Math.floor(Math.random() * 3) + 1, // Quantity between 1-3
            price: dish.price,
            available: Math.random() > 0.1 // 90% chance it's available
        });
    }

    return {
        orderId,
        items,
        createdAt: new Date()
    };
};

module.exports = { generateTestOrder };
