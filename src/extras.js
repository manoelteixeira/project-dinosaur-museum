const dinosaurData = require("../data/dinosaurs");
const roomData = require("../data/rooms");
const ticketData = require("../data/tickets");

/**
 * Get all dinosaurs from a given period
 * @param {[Object]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of
 *                               the input.
 * @param {string} period - String containing the period. Example: "Cretaceous", "Jurassic", "Late Jurassic"
 * @returns {[Object]} - An array of dinosaur objects corresponding with the given period.
 */
function getDinosaurByPeriod(dinosaurs, period) {
  const stages = ["early", "late"];
  if (stages.includes(period.toLocaleLowerCase())) {
    return `${period} is not a valid period.`;
  }

  if (period.includes(" ")) {
    return dinosaurs.filter((dino) => dino.period == period);
  }
  return dinosaurs.filter((dino) => dino.period.includes(period));
}

/**
 *
 * @param {[Object]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of
 *                               the input.
 * @param {string} diet - String containing the diet. Example: "Carnivorous"
 * @returns
 */
function getDinosaurByDiet(dinosaurs, diet) {
  return dinosaurs.filter((dino) => dino.diet == diet);
}

module.exports = {
  getDinosaurByPeriod,
  getDinosaurByDiet,
};
