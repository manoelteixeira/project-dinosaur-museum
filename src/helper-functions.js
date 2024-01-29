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

function getDinossaur(dinosaurs, key, param) {
  const allowKeys = ["name", "dinosaurId"];
  if (allowKeys.includes(key)) {
    const dinosaur = dinosaurs.find((dino) => dino[key] == param);
    if (!dinosaur) {
      return null;
    }
    return dinosaur;
  }
  return ` ${key} is not a valid key.`;
}

function getRoom(rooms, key, param) {
  const allowKeys = ["name", "roomId"];
  if (allowKeys.includes(key)) {
    const room = rooms.find((room) => room[key] == param);
    if (!room) {
      return null;
    }
    return room;
  }
  return ` ${key} is not a valid key.`;
}

module.exports = {
  convertMeterToFeet,
  isInRange,
  getDinossaur,
  getRoom,
};
