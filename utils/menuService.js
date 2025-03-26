const fs = require("fs");

const menu = JSON.parse(fs.readFileSync("./data/menu.json", "utf8"));

const compareWithMenu = (order) => {
    return order.items.map(item => {
        const menuItem = menu[item.name];

        return menuItem
            ? { name: item.name, quantity: item.quantity, price: menuItem.price, available: menuItem.in_stock, ...(menuItem.in_stock ? {} : { not_in_stock: true }) }
            : { name: item.name, quantity: item.quantity, price: null, available: false, not_in_stock: true };
    });
};

module.exports = { compareWithMenu };
