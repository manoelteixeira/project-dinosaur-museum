const dinosaurData = require("../data/dinosaurs");
const roomData = require("../data/rooms");
// const ticketData = require("../data/tickets");

const {
  convertMeterToFeet,
  isInRange,
  capitalizeWord,
  getDinosaur,
  getRoom,
  getPriceInCents,
} = require("../src/helper-functions");

describe("convertMeterToFeet()", () => {
  test("should return an number 3.281 bigger.", () => {
    const valueInMeters = 10;
    const actual = convertMeterToFeet(valueInMeters);

    expect(actual).toBe(valueInMeters * 3.281);
  });
});

describe("isInRange()", () => {
  test("should return true when given a target inside range", () => {
    const result1 = isInRange(10, [20, 0]);
    const restult2 = isInRange(1, [2, -2]);

    expect(result1).toBe(true);
    expect(restult2).toBe(true);
  });

  test("should return false when given a target outside range", () => {
    const result1 = isInRange(5, [20, 10]);
    const restult2 = isInRange(10, [2, -2]);

    expect(result1).toBe(false);
    expect(restult2).toBe(false);
  });

  test("should return true when given a range with only one element and the target equal or one less to the element", () => {
    const result1 = isInRange(4, [5]);
    const result2 = isInRange(5, [5]);
    const result3 = isInRange(6, [5]);

    expect(result1).toBe(true);
    expect(result2).toBe(true);
    expect(result3).toBe(false);
  });
});

describe("capitalizeWord()", () => {
  test("should return a capitalized string", () => {
    const str1 = "hello";
    const str2 = "HELLO";
    const str3 = "hELlO";
    const expected = "Hello";

    expect(capitalizeWord(str1)).toBe(expected);
    expect(capitalizeWord(str2)).toBe(expected);
    expect(capitalizeWord(str3)).toBe(expected);
  });
});

describe("getDinosaur()", () => {
  const testDino = {
    dinosaurId: "WHQcpcOj0G",
    name: "Dracorex",
    pronunciation: "dray-ko-rex",
    meaningOfName: "dragon king",
    diet: "herbivorous",
    lengthInMeters: 4,
    period: "Late Cretaceous",
    mya: [66],
    info: "Dracorex hogwartsia was a pachycephalosaur that did not have a domed head. Instead, its skull was adorned with spikes and frills reminiscent of a dragon. A skull was discovered in the Hell Creek Formation in South Dakota and donated to the Children's Museum of Indianapolis in 2004. Its name was inspired by J.K. Rowling's Harry Potter series and the young visitors to the children's museum.",
  };

  test("should return a message if the key provided is invalid", () => {
    const testKey = "Invalid";

    const actual = getDinosaur(dinosaurData, testKey, testDino.name);
    expect(actual).toEqual(`${testKey} is not a valid key.`);
  });

  test('should return a dinosaur object when key is equal to "name" and param is a valid dinosaur name.', () => {
    const actual = getDinosaur(dinosaurData, "name", testDino.name);

    expect(actual).toEqual(testDino);
    expect(actual).not.toBe(null);
  });

  test('should return a dinosaur object when key is equal to "dinosaurId" and param is a valid dinosaur id.', () => {
    const actual = getDinosaur(dinosaurData, "dinosaurId", testDino.dinosaurId);

    expect(actual).toEqual(testDino);
    expect(actual).not.toBe(null);
  });

  test("should return null when key is valid and param is invalid.", () => {
    const restult1 = getDinosaur(dinosaurData, "name", "InvalidDinoName");
    const restult2 = getDinosaur(dinosaurData, "dinosaurId", "InvalidDinoId");

    expect(restult1).toBe(null);
    expect(restult2).toBe(null);
  });
});

describe("getRoom()", () => {
  const testRoom = {
    roomId: "A6QaYdyKra", // 2
    name: "Ticket Center",
    requiredTicketPermissions: [],
    dinosaurs: [
      "iOVNUcv-ww", // Compsognathus
    ],
    connectsTo: [
      "zwfsfPU5u", // Entrance Room
      "aIA6tevTne", // Coat Check Room
      "dpQnu5wgaN", // Ellis Family Hall
      "L72moIRcrX", // Kit Hopkins Education Wing
    ],
  };

  test("should return a message if the key provided is invalid", () => {
    const testKey = "Invalid";
    const actual = getRoom(roomData, testKey, testRoom.name);

    expect(actual).toEqual(`${testKey} is not a valid key.`);
  });

  test('should return a room object when key is equal to "name" and param is a valid room name.', () => {
    const actual = getRoom(roomData, "name", testRoom.name);

    expect(actual).toEqual(testRoom);
    expect(actual).not.toBe(null);
  });

  test('should return a room object when key is equal to "roomId" and param is a valid room id.', () => {
    const actual = getRoom(roomData, "roomId", testRoom.roomId);

    expect(actual).toEqual(testRoom);
    expect(actual).not.toBe(null);
  });

  test("should return null when key is valid and param is a invalid.", () => {
    const restult1 = getRoom(roomData, "name", "InvalidRoomName");
    const restult2 = getRoom(roomData, "roomId", "InvalidRoomId");

    expect(restult1).toBe(null);
    expect(restult2).toBe(null);
  });
});

describe("getPriceInCents()", () => {
  const testObj = {
    description: "Movie Access",
    priceInCents: {
      child: 1000,
      adult: 1000,
      senior: 1000,
    },
  };

  test("should return an error message if entrant type is invalid", () => {
    const actual = getPriceInCents(testObj, "kid");

    expect(actual).toBe(null);
  });

  test("should return a number corresponding to preice in cents for the given entrant type", () => {
    const actual = getPriceInCents(testObj, "adult");

    expect(actual).toBe(testObj.priceInCents.adult);
  });
});
