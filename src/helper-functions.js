/**
 * This file contains all the helper functions for this project.
 */

function convertMeterToFeet(value) {
  return value * 3.281;
}

function isInRange(value, range) {
  if (range.length == 1) {
    const rangeValue = range[0];

    if (rangeValue == value || value == rangeValue - 1) {
      return true;
    }
  }
  const [end, start] = range;
  if (value <= end && value >= start) {
    return true;
  }
  return false;
}

module.exports = {
  convertMeterToFeet,
  isInRange,
};
