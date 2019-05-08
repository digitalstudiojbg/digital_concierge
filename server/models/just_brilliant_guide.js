"use strict";
module.exports = (sequelize, DataTypes) => {
    const just_brilliant_guide = sequelize.define(
        "just_brilliant_guide",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            welcomeFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            featureFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            informationFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            mapFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            galleryFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            marketFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            foodFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            attractionFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            eventFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            essentialFamilyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    just_brilliant_guide.associate = function(models) {
        just_brilliant_guide.belongsTo(models.jbg_welcome, {
            foreignKey: { allowNull: true }
        });
        just_brilliant_guide.hasMany(models.system);
        just_brilliant_guide.belongsToMany(models.jbg_map, {
            through: "jbg_maps_just_brilliant_guides"
        });
        just_brilliant_guide.belongsToMany(models.jbg_directory_list, {
            through: "jbg_directory_lists_just_brilliant_guides"
        });
        just_brilliant_guide.belongsToMany(models.media, {
            through: "just_brilliant_guides_media"
        });
        just_brilliant_guide.hasMany(models.advertiser);
        just_brilliant_guide.hasMany(models.article);
    };
    return just_brilliant_guide;
};
