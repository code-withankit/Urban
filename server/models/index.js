import { Address } from "./address.model.js";
import { User } from "./user.model.js";

User.hasMany(Address, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Address.belongsTo(User, {
    foreignKey: "userId",
});

export { User, Address };