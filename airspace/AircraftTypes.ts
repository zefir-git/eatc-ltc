import Aircraft from "../src/Aircraft.js";
import Generator from "../src/Generator.js";

export default class AircraftTypes {
    public static init() {
        const gen = Generator.getInstance();

        gen.aircraft(new Aircraft(
            "C42",
            "Ikarus",
            Aircraft.WTC.LIGHT,
            [80, 105],
            [55, 60],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "D140",
            "Jodel",
            Aircraft.WTC.LIGHT,
            [80, 130],
            [60, 65],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

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
            "DA42",
            "Diamond",
            Aircraft.WTC.LIGHT,
            [110, 200],
            [85, 90],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "DA62",
            "Diamond",
            Aircraft.WTC.LIGHT,
            [110, 190],
            [90, 95],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "DV20",
            "Diamond",
            Aircraft.WTC.LIGHT,
            [85, 160],
            [65, 70],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "EA50",
            "Eclipse",
            Aircraft.WTC.LIGHT,
            [160, 300],
            110,
            [1.2, 1.4],
            1400,
            3620,
            [25, 30],
            [3, 5],
            [2.9, 3.1],
        ));

        gen.aircraft(new Aircraft(
            "EV97",
            "Evektor",
            Aircraft.WTC.LIGHT,
            [80, 100],
            [60, 65],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
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
            "M600",
            "Piper",
            Aircraft.WTC.LIGHT,
            [130, 270],
            [110, 120],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "P180",
            "Piaggio",
            Aircraft.WTC.LIGHT,
            [160, 300],
            [130, 145],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 3000],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "PA34",
            "Piper",
            Aircraft.WTC.LIGHT,
            [140, 160],
            [100, 110],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "PUP",
            "Beagle",
            Aircraft.WTC.LIGHT,
            [80, 120],
            [65, 70],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "RF6",
            "Slingsby",
            Aircraft.WTC.LIGHT,
            [80, 150],
            [60, 65],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));
    }
}
