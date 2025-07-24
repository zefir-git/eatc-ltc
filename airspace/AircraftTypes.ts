import Aircraft from "../src/Aircraft.js";
import Generator from "../src/Generator.js";

export default class AircraftTypes {
    public static init() {
        const gen = Generator.getInstance();

        gen.aircraft(new Aircraft(
            "D228",
            "Dornier",
            Aircraft.WTC.LIGHT,
            [160, 300],
            140,
            [0.8, 1.2],
            1000,
            1500,
            [20, 25],
            [2.5, 3.5],
            [2.9, 3.1],
        ));

        gen.aircraft(new Aircraft(
            "GA6C",
            "Gulfstream",
            Aircraft.WTC.LOWER_MEDIUM,
            [160, 300],
            129,
            [1.2, 1.4],
            1400,
            3620,
            [25, 30],
            [3, 5],
            [2.9, 3.1],
        ));

        gen.aircraft(new Aircraft(
            "H25B",
            "Raytheon",
            Aircraft.WTC.LIGHT,
            [160, 300],
            125,
            [1.2, 1.3],
            [1500, 2500],
            [2000, 3100],
            [25, 30],
            [3, 5],
            [2.9, 3.1],
        ));

        gen.aircraft(new Aircraft(
            "F2TH",
            "Dassault Falcon",
            Aircraft.WTC.LOWER_MEDIUM,
            [160, 300],
            110,
            [1.2, 1.3],
            [1500, 4000],
            [2000, 3000],
            [25, 30],
            [3, 5],
            [2.9, 3.1],
        ));
    }
}
