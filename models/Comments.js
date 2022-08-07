module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define("Comments", {
		commentBody: {
			type: DataTypes.STRING,
			allowNull: false,
		},
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileUrl: {
			type: DataTypes.TEXT,
		}
	})
  
  Comments.associate = (models) => {
    Comments.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
    Comments.belongsTo(models.Posts, {
      foreignKey: {
        allowNull: false
      }
    }),
    Comments.hasMany(models.Likes, {
      onDelete: 'cascade',
      hooks: true
    })
  }

	return Comments;
}