"use strict";

const accountAccess = require("../../common/account-access");
const twitchApi = require("../client");

async function getTeams(broadcasterId) {
    const client = twitchApi.getClient();
    const teams = await client.kraken.channels.getChannelTeams(broadcasterId);

    if (teams == null) {
        return null;
    }

    return teams;
}

async function getMatchingTeams(userId, streamerId) {
    const userTeams = await getTeams(userId);
    const streamerTeams = await getTeams(streamerId);

    if (userTeams == null || streamerTeams == null) {
        return null;
    }

    const teams = [];
    for (let streamerTeam of streamerTeams) {
        for (let userTeam of userTeams) {
            if (streamerTeam.id === userTeam.id) {
                teams.push(streamerTeam);
            }
        }
    }

    return teams;
}

exports.getMatchingTeams = getMatchingTeams;