const dinosaurData = require("../data/dinosaurs");

const { getDinosaurByPeriod, getDinosaurByDiet } = require("../src/extras");

describe("getDinosaurByPeriod()", () => {
  test('should return an error message when period is either "early" or "late"', () => {
    const earlyActual = getDinosaurByPeriod(dinosaurData, "Early");
    const lateActual = getDinosaurByPeriod(dinosaurData, "Late");

    expect(earlyActual).toBe("Early is not a valid period.");
    expect(lateActual).toBe("Late is not a valid period.");
  });

  test("should return an array containing only dinosaurs from a specific period.", () => {
    const period = "Late Cretaceous";
    const actual = getDinosaurByPeriod(dinosaurData, period);

    actual.forEach((dino) => {
      expect(dino.period).toBe(period);
    });
  });

  test("should return an array containing all dinosaurs from an period.", () => {
    const period = "Cretaceous";
    const actual = getDinosaurByPeriod(dinosaurData, period);

    actual.forEach((dino) => {
      expect(dino.period).toContain(period);
    });
  });

  test("should return an empty array if there are no dinosaurs on the given period", () => {
    const actual = getDinosaurByPeriod(dinosaurData, "Paleocene");

    expect(actual).toEqual([]);
  });
});

describe("getDinosaurByDiet()", () => {
  test("should return an empty array when given an invalid diet", () => {
    const actual = getDinosaurByDiet(dinosaurData, "invalidDiet");

    expect(actual).toEqual([]);
  });

  test("should return an array containing dinosaurs object with the given diet", () => {
    const testDiet = "carnivorous";
    const actual = getDinosaurByDiet(dinosaurData, testDiet);
    actual.forEach((dino) => {
      expect(dino.diet).toBe(testDiet);
    });
  });
});
