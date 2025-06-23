import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Project from './project';

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Task.belongsTo(Project, { foreignKey: 'projectId' });
Project.hasMany(Task, { foreignKey: 'projectId' });

export default Task;
