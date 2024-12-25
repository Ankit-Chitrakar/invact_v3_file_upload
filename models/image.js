module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define(
        'Image',
        {
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            secure_url: {
                type: DataTypes.STRING,
            },
            tags: {
                type: DataTypes.STRING,
            },
            uploaded_at: {
                type: DataTypes.DATE,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            }
        },
        {
            tableName: 'images',
        }
    );

    return Image;
};