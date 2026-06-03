import Team from "../models/team.model.js"
import ApiError from "../../../common/utils/api-error.js";
import Player from "../models/player.model.js";

const transferPlayer = async(playerId, newTeamId) => {
    const team = await Team.findById(newTeamId)

    if (!team) {
        throw new ApiError.notFound("Team not found");
    }

    const player = await Player.findByIdAndUpdate(
        playerId,
        {teamId: newTeamId},
        {new: true , runValidators: true}
    )

    if (!player) {
        throw new ApiError.notFound("Player not found");
    }

    return player
}

const updatePlayerRole = async(playerId, role) => {
    const player = await Player.findByIdAndUpdate(
        playerId,
        {role},
        {new: true , runValidators: true}
    ).populate("teamId", "name");

    if (!player) {
        throw new ApiError.notFound("Player not found");
    }

    return player
}

export {
    transferPlayer,
    updatePlayerRole,
}