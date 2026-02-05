import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database.js';

import User from './users.js';
import Admin from './admin.js';
import Caretaker from './caretaker.js';
import Tenant from './tenants.js';
import Unit from './units.js';

User.hasOne(Admin, { foreignKey: 'userID' });
Admin.belongsTo(User, { foreignKey: 'userID' });

User.hasOne(Caretaker, { foreignKey: 'user_id' });
Caretaker.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Tenant, { foreignKey: 'user_id' });
Tenant.belongsTo(User, { foreignKey: 'user_id' });

Unit.hasOne(Tenant, { foreignKey: 'unit_id' });
Tenant.belongsTo(Unit, { foreignKey: 'unit_id' });

export {
  sequelize,
  Sequelize,
  User,
  Admin,
  Caretaker,
  Tenant,
  Unit
};