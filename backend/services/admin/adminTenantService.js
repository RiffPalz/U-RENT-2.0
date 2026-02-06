import { User, Tenant, Unit, sequelize } from "../../models/index.js";
import { v4 as uuidv4 } from "uuid";

export const createTenant = async (tenantData) => {
    const transaction = await sequelize.transaction();

    try {
        const {
            fullName,
            emailAddress,
            contactNumber,
            unitNumber,
            numberOfTenants,
            userName,
            password,
            moveInDate,
            leaseEndDate
        } = tenantData;

        // 1. Find the Unit to get its ID
        const unit = await Unit.findOne({ where: { unit_number: unitNumber } });
        if (!unit) throw new Error("Unit not found");
        if (unit.status !== 'Vacant') throw new Error("Unit is not available");

        // 2. Create the User record (Login credentials)
        const newUser = await User.create({
            publicUserID: uuidv4(),
            fullName,
            emailAddress,
            contactNumber,
            unitNumber,
            numberOfTenants,
            userName,
            passwordHash: password, // Hooks will hash this
            role: 'user'
        }, { transaction });

        // 3. Create the Tenant record (Lease details)
        const newTenant = await Tenant.create({
            user_id: newUser.ID,
            unit_id: unit.unit_id,
            occupancy_count: numberOfTenants,
            move_in_date: moveInDate,
            lease_end_date: leaseEndDate
        }, { transaction });

        // 4. Update Unit status to Occupied
        unit.status = 'Occupied';
        await unit.save({ transaction });

        await transaction.commit();

        return {
            message: "Tenant created successfully",
            tenant: {
                id: newUser.ID,
                fullName: newUser.fullName,
                unit: unit.unit_number
            }
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getAllTenants = async () => {
    return await Tenant.findAll({
        include: [
            { model: User, attributes: ['fullName', 'emailAddress', 'contactNumber'] },
            { model: Unit, attributes: ['unit_number'] }
        ]
    });
};