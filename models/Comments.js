module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define("Comments", {
		commentBody: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	})
  
  Comments.associate = (models) => {
    Comments.belongsTo(models.Posts, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'cascade'
    })
  }

	return Comments;
}