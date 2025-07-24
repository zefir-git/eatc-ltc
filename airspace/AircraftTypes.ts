import Aircraft from "../src/Aircraft.js";
import Generator from "../src/Generator.js";

export default class AircraftTypes {
    public static init() {
        const gen = Generator.getInstance();

        gen.aircraft(new Aircraft(
            "AA5",
            "Grumman",
            Aircraft.WTC.LIGHT,
            [90, 130],
            [65, 70],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "AC11",
            "Commander",
            Aircraft.WTC.LIGHT,
            [100, 150],
            [70, 75],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "ASTR",
            "Gulfstream",
            Aircraft.WTC.LIGHT,
            [160, 300],
            [120, 130],
            [1.1, 1.2],
            [1500, 2000],
            [2500, 3000],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "BOLT",
            "Steen",
            Aircraft.WTC.LIGHT,
            [100, 160],
            [55, 60],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "BT36",
            "Beech",
            Aircraft.WTC.LIGHT,
            [115, 200],
            [75, 85],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "C303",
            "Cessna",
            Aircraft.WTC.LIGHT,
            [115, 180],
            [90, 95],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

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
            "C82S",
            "Cessna",
            Aircraft.WTC.LIGHT,
            [90, 140],
            [65, 70],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
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
            "DR2",
            "Robin",
            Aircraft.WTC.LIGHT,
            [80, 120],
            [60, 65],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "DR30",
            "Robin",
            Aircraft.WTC.LIGHT,
            [80, 120],
            [60, 65],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "DR40",
            "Robin",
            Aircraft.WTC.LIGHT,
            [100, 140],
            [65, 70],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
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
            "EUPA",
            "Europa",
            Aircraft.WTC.LIGHT,
            [90, 160],
            [65, 70],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
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
            "F406",
            "Cessna",
            Aircraft.WTC.LIGHT,
            [130, 240],
            [95, 100],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "G115",
            "Grob",
            Aircraft.WTC.LIGHT,
            [95, 130],
            [60, 65],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
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
            "HR20",
            "Robin",
            Aircraft.WTC.LIGHT,
            [90, 120],
            [60, 105],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "HURI",
            "Hawker",
            Aircraft.WTC.LIGHT,
            [160, 290],
            [75, 85],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "JAB4",
            "Jabiru",
            Aircraft.WTC.LIGHT,
            [90, 130],
            [65, 70],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "K100",
            "Daher",
            Aircraft.WTC.LIGHT,
            [120, 180],
            [78, 65],
            [1.1, 1.2],
            [1300, 1400],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "L8",
            "Luscombe",
            Aircraft.WTC.LIGHT,
            [90, 100],
            [60, 70],
            [1.1, 1.2],
            [1300, 1400],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "LANC",
            "Avro",
            Aircraft.WTC.LIGHT,
            [160, 240],
            [110, 120],
            [1.1, 1.2],
            [1300, 1400],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "M20P",
            "Mooney",
            Aircraft.WTC.LIGHT,
            [150, 240],
            [60, 65],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
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
            "P32R",
            "Piper",
            Aircraft.WTC.LIGHT,
            [105, 160],
            [75, 80],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "P46T",
            "Piper",
            Aircraft.WTC.LIGHT,
            [110, 220],
            [75, 80],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "P68",
            "Partenavia",
            Aircraft.WTC.LIGHT,
            [100, 170],
            [75, 85],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "PA32",
            "Piper",
            Aircraft.WTC.LIGHT,
            [120, 150],
            [100, 105],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
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
            "PIVI",
            "Pipistrel",
            Aircraft.WTC.LIGHT,
            [85, 150],
            [60, 90],
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
            "R90R",
            "Ruschmeyer",
            Aircraft.WTC.LIGHT,
            [150, 180],
            [85, 90],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "R100",
            "Robin",
            Aircraft.WTC.LIGHT,
            [80, 140],
            [60, 65],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "R200",
            "Alpha",
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
            "R722",
            "Boeing",
            Aircraft.WTC.UPPER_MEDIUM,
            [160, 300],
            [130, 150],
            [1.1, 1.2],
            [1400, 1600],
            [2700, 4000],
            [25, 30],
            [3, 5],
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

        gen.aircraft(new Aircraft(
            "RV7",
            "Van's Aircraft",
            Aircraft.WTC.LIGHT,
            [80, 190],
            [60, 65],
            [1.1, 1.2],
            [1400, 1600],
            [1900, 2100],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "S05R",
            "Marchetti",
            Aircraft.WTC.LIGHT,
            [90, 140],
            [55, 60],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "S22T",
            "Cirrus",
            Aircraft.WTC.LIGHT,
            [110, 180],
            [75, 90],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "SR20",
            "Cirrus",
            Aircraft.WTC.LIGHT,
            [85, 160],
            [75, 90],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "SPIT",
            "Supermarine",
            Aircraft.WTC.LIGHT,
            [130, 300],
            [100, 110],
            [1.2, 1.3],
            [1600, 2000],
            [2200, 2500],
            [30, 25],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "T210",
            "Cessna",
            Aircraft.WTC.LIGHT,
            [90, 200],
            [75, 85],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "TAMP",
            "Socata",
            Aircraft.WTC.LIGHT,
            [100, 120],
            [65, 70],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "TOBA",
            "Socata",
            Aircraft.WTC.LIGHT,
            [80, 100],
            [65, 70],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "TWEN",
            "Tecnam",
            Aircraft.WTC.LIGHT,
            [90, 140],
            [75, 80],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "VELO",
            "Velocity",
            Aircraft.WTC.LIGHT,
            [120, 200],
            [85, 90],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));

        gen.aircraft(new Aircraft(
            "Y18T",
            "Yakolev",
            Aircraft.WTC.LIGHT,
            [90, 160],
            [70, 80],
            [1.1, 1.2],
            [1400, 1600],
            [2000, 2200],
            [25, 30],
            [5, 7],
            [2.9, 3.1]
        ));
    }
}
