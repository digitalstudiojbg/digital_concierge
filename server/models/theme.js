"use strict";
module.exports = (sequelize, DataTypes) => {
    const theme = sequelize.define(
        "theme",
        {
            companyLogo: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            headerFont: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            subHeaderFont: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            bodyFont: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            captionFont: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour1Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour1Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour2Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour2Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour3Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour3Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour4Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour4Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour5Hex: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            colour5Alpha: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            defaultStartLayoutId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            defaultHomeLayoutId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            defaultDirListLayoutId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            defaultDirEntryLayoutId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {}
    );
    theme.associate = function(models) {
        theme.belongsTo(models.system, {
            foreignKey: { allowNull: false }
        });
    };
    return theme;
};
