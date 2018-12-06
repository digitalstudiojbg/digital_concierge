import { AuthenticationError } from "apollo-server-express";

/**
 * check whether user is login
 */
export const checkUserLogin = async user => {
    if (!user) {
        throw new AuthenticationError("Unauthorized");
    }
};

/**
 * check whether user's venue belongs to one of the list of venues from category
 */
export const checkUserVenueByCategory = async (user, select_category) => {
    const venues = await select_category.getVenues();
    const userVenue = await user.getVenue();

    let checkUserVenue = false;

    venues.forEach(venue => {
        if (venue.id === userVenue.id) {
            checkUserVenue = true;
        }
    });

    if (!checkUserVenue) {
        throw new AuthenticationError(
            `User ${user.name} (user id: ${
                user.id
            }) does not have permission to ${select_category.name} (user id : ${
                select_category.id
            }) `
        );
    }
};
