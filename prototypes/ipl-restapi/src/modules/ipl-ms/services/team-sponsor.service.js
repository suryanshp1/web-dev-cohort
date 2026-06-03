import Team from "../models/team.model.js"
import ApiError from "../../../common/utils/api-error.js";
import Sponsor from "../models/sponsor.model.js";
import TeamSponsor from "../models/team-sponsor.model.js"

const attachSponsor = async(teamId, sponsorId) => {
    const team = await Team.findById(newTeamId)

    if (!team) {
        throw new ApiError.notFound("Team not found");
    }

    const sponsor = await Sponsor.findById(newTeamId)

    if (!sponsor) {
        throw new ApiError.notFound("Sponsor not found");
    }

    const existing = await TeamSponsor.findOne({teamId, sponsorId})

    if (existing) {
        throw ApiError.conflict("Sponsor already attached to this team")
    }

    const teamSponsor = await TeamSponsor.create({teamId, sponsorId})

    return teamSponsor
}

export {
    attachSponsor
}