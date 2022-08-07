module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
      validate: {
        len: [6]
      }
		},
		profileUrl: {
			type: DataTypes.TEXT,
		}
	})

	User.associate = (models) => {
    User.hasMany(models.Posts, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
      hooks: true
    })
    User.hasMany(models.Comments, {
      onDelete: 'cascade',
			onUpdate: 'cascade',
			hooks: true
    });
    User.hasMany(models.Likes, {
      onDelete: 'cascade',
      hooks: true
    })
  };

	return User;
}