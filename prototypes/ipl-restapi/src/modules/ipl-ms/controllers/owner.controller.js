import * as ownerService from "../services/owner.services.js";
import ApiResponse from "../../../common/utils/api-response.js";

const createOwner = async (req, res) => {
    try {
        const owner = await ownerService.createOwner(req.body.name, req.body.company);
        ApiResponse.created(res, "Owner created successfully", owner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getAllOwners = async (req, res) => {
    try {
        const owners = await ownerService.getAllOwners();
        ApiResponse.ok(res, "Owners fetched successfully", owners);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getOwnerById = async (req, res) => {
    try {
        const owner = await ownerService.getOwnerById(req.params.id);
        if (!owner) {
            res.status(404).json({ error: "Owner not found" });
        } else {
            ApiResponse.ok(res, "Owner fetched successfully", owner);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateOwner = async (req, res) => {
    try {
        const owner = await ownerService.updateOwner(req.params.id, req.body);
        if (!owner) {
            res.status(404).json({ error: "Owner not found" });
        } else {
            ApiResponse.ok(res, "Owner updated successfully", owner);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteOwner = async (req, res) => {
    try {
        const owner = await ownerService.deleteOwner(req.params.id);
        if (!owner) {
            res.status(404).json({ error: "Owner not found" });
        } else {
            ApiResponse.ok(res, "Owner deleted successfully");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    createOwner,
    getAllOwners,
    getOwnerById,
    updateOwner,
    deleteOwner,
};