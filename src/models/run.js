module.exports = (connection, DataTypes) => {
    const schema = {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'Date cannot be empty'
                },
                notNull: {
                    args: [true],
                    msg: 'We need a date'
                },
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'Duration cannot be empty'
                },
                notNull: {
                    args: [true],
                    msg: 'We need a duration'
                },
            }
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'Distance cannot be empty'
                },
                notNull: {
                    args: [true],
                    msg: 'We need a distance'
                },
            }
            
        }
    };

    const RunModel = connection.define('Run', schema);
    return RunModel;
}