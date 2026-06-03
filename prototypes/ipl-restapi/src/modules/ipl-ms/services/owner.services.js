import ApiError from "../../../common/utils/api-error.js";
import Owner from "../models/owner.model.js";

const createOwner = async (name, company) => {
    try {
        const owner = await Owner.create({ name, company });
        return owner;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

const getAllOwners = async () => {
    try {
        const owners = await Owner.find();
        return owners;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

const getOwnerById = async (id) => {
    try {
        const owner = await Owner.findById(id);
        if (!owner) {
            throw new ApiError(404, "Owner not found");
        }
        return owner;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

const updateOwner = async (id, data) => {
    try {
        const owner = await Owner.findByIdAndUpdate(id, data, {
            new: true, runValidators: true
        });
        if (!owner) {
            throw new ApiError(404, "Owner not found");
        }
        return owner;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

const deleteOwner = async (id) => {
    try {
        const owner = await Owner.findByIdAndDelete(id);
        if (!owner) {
            throw new ApiError(404, "Owner not found");
        }
        return owner;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

export default {
    createOwner,
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner
};