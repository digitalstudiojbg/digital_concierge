"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "tb_directories",
            [
                {
                    name: "CHECK-OUT TIME",
                    body:
                        "Check-out time is 11am, if you wish to extend beyond this time, please contact Reception (dial 9). IHG® Rewards Club Members can enjoy complimentary extended check out. Subject to availability.",
                    tbDirectoryTypeId: 1
                },
                {
                    name: "IRON & IRONING BOARD",
                    body:
                        "An iron and ironing board are located in the wardrobe for your convenience.",
                    tbDirectoryTypeId: 2
                },
                {
                    name: "BREAD MENU",
                    body:
                        "BREAD MENU Rosemary and Sea Salt Focaccia (V) (DF) 900 VT Balsamic Vinegar, Extra Virgin Olive Oil Garlic & Cheese Pizza Bread (GF*) 900 VT Confit Garlic, Rosemary, Mozzarella Tomato Bruschetta (V) (DF) (GF*) 1,200 VT Ciabatta, Tomato Salsa, Pickled Red Onion, Extra Virgin Olive Oil",
                    tbDirectoryTypeId: 4
                },
                {
                    name: "SALAD MENU",
                    body:
                        "SALAD MENU Garden Salad (V) (DF) (GF) 1,200 VT Roma Tomato, Cucumber, Spanish, Red Onion, Balsamic Vinaigrette Tomato Salad (V) (GF) (DF*) 1,500 VT Roma Tomato, Spanish Red Onion, Capers, Mozzarella, Basil, Red Wine, Vinegar, Extra Virgin Olive Oil Cucumber Ribbon Salad (V) (GF) (DF) 1,500 VT Cucumber, Mint, Walnuts, Red Grape, Toasted Nori, Rice Wine Dressing Caesar Salad (GF*) 1,800 VT Cos Lettuce, Anchovies, Bacon Wafer, Ciabatta, Grana Padano + Add Poached Chicken 600 VT",
                    tbDirectoryTypeId: 3
                },
                {
                    name: "DRINK MENU",
                    body: "DRINK MENU",
                    tbDirectoryTypeId: 3
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("tb_directories", null, {});
    }
};
