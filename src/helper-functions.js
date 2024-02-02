/**
 * This file contains all the helper functions for this project.
 */

/**
 * Convert Meters to Feets
 * @param {Number} value - A Number, value in meters.
 * @returns - A Number, the restult of the conversion from meters to Feets
 */
function convertMeterToFeet(value) {
  return value * 3.281;
}

/**
 * Check if a target Number is in range.
 * If rage contains only one Number check if target is equial or 1 less
 *
 * @param {Number} target - A Number
 * @param {[Number]} range - An array containing 1 or 2 values
 * @returns {bool}
 */
function isInRange(target, range) {
  if (range.length == 1) {
    const rangeValue = range[0];
    if (rangeValue == target || target == rangeValue - 1) {
      return true;
    }
  }

  const [start, end] = range[0] > range[1] ? range.reverse() : range;

  if (target <= end && target >= start) {
    return true;
  }
  return false;
}

/**
 * Capitalize a ginve string
 * @param {String} word - String to be capitalized
 * @returns {String} - Capitalized string
 */
function capitalizeWord(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Return a dinosaur with the given dinosaurId or name.
 *
 * @param {Object} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example
 *                        of the input.
 * @param {String} key - A string indicating if param is "name" or "dinosaurId"
 * @param {String} param - A string containg either a name or an Id
 * @returns - A dinosaut object if found, otherwise null
 */
function getDinosaur(dinosaurs, key, param) {
  const allowKeys = ["name", "dinosaurId"];
  if (allowKeys.includes(key)) {
    const dinosaur = dinosaurs.find((dino) => dino[key] == param);
    if (!dinosaur) {
      return null;
    }
    return dinosaur;
  }
  return `${key} is not a valid key.`;
}

/**
 * Return a room with the given roomId or name.
 * @param {Object} rooms - An array of room objects. See the `data/rooms.js` file for an example
 *                    of the input.
 * @param {String} key - A string indicating if param is "name" or "roomId"
 * @param {String} param - A string containg either a name or an Id
 * @returns - A room object if found, otherwise null
 */
function getRoom(rooms, key, param) {
  const allowKeys = ["name", "roomId"];
  if (allowKeys.includes(key)) {
    const room = rooms.find((room) => room[key] == param);
    if (!room) {
      return null;
    }
    return room;
  }
  return `${key} is not a valid key.`;
}

/**
 * Return the price in cents for a given ticket type or extra activity for a given entrant type
 * @param {Object} activity - An object representing either a ticket type or an exrta activity
 * @param {String} entrantType - A string representing the entrant type. Eg. child, adult, senior, etc.
 * @returns {Number} - The price for the given valid entrant type, otherwise return null
 */
function getPriceInCents(activity, entrantType) {
  return activity.priceInCents[entrantType] || null;
}

module.exports = {
  convertMeterToFeet,
  isInRange,
  capitalizeWord,
  getDinosaur,
  getRoom,
  getPriceInCents,
};
