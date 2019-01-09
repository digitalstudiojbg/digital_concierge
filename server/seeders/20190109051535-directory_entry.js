"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "directory_entries",
            [
                {
                    name: "CHECK-OUT TIME",
                    title: "CHECK-OUT TIME",
                    description:
                        "Check-out time is 11am, if you wish to extend beyond this time, please contact Reception (dial 9). IHG® Rewards Club Members can enjoy complimentary extended check out. Subject to availability.",
                    layoutId: 1
                },
                {
                    name: "IRON & IRONING BOARD",
                    title: "IRON & IRONING BOARD",
                    description:
                        "An iron and ironing board are located in the wardrobe for your convenience.",
                    layoutId: 1
                },
                {
                    name: "BREAD MENU",
                    title: "BREAD MENU",
                    description:
                        "BREAD MENU Rosemary and Sea Salt Focaccia (V) (DF) 900 VT Balsamic Vinegar, Extra Virgin Olive Oil Garlic & Cheese Pizza Bread (GF*) 900 VT Confit Garlic, Rosemary, Mozzarella Tomato Bruschetta (V) (DF) (GF*) 1,200 VT Ciabatta, Tomato Salsa, Pickled Red Onion, Extra Virgin Olive Oil",
                    layoutId: 1
                },
                {
                    name: "SALAD MENU",
                    title: "SALAD MENU",
                    description:
                        "SALAD MENU Garden Salad (V) (DF) (GF) 1,200 VT Roma Tomato, Cucumber, Spanish, Red Onion, Balsamic Vinaigrette Tomato Salad (V) (GF) (DF*) 1,500 VT Roma Tomato, Spanish Red Onion, Capers, Mozzarella, Basil, Red Wine, Vinegar, Extra Virgin Olive Oil Cucumber Ribbon Salad (V) (GF) (DF) 1,500 VT Cucumber, Mint, Walnuts, Red Grape, Toasted Nori, Rice Wine Dressing Caesar Salad (GF*) 1,800 VT Cos Lettuce, Anchovies, Bacon Wafer, Ciabatta, Grana Padano + Add Poached Chicken 600 VT",
                    layoutId: 1
                },
                {
                    name: "DRINK MENU",
                    title: "DRINK MENU",
                    description: "DRINK MENU",
                    layoutId: 1
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("directory_entries", null, {});
    }
};
