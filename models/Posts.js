module.exports = (sequelize, DataTypes) => {
	const Posts = sequelize.define("Posts", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		body: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	})

	Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: 'cascade',
			onUpdate: 'cascade',
			hooks: true
    });
  };

	return Posts;
}