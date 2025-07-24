import fs from "node:fs/promises";
import Airport from "../src/Airport.js";
import Fix from "../src/Fix.js";
import Generator from "../src/Generator.js";
import NamedFix from "../src/NamedFix.js";
import Runway from "../src/Runway.js";
import SID from "../src/SID.js";
import STAR from "../src/STAR.js";

export default class EGMC {
    public async init() {
        await this.airport();
        await this.star();
        await this.departures();
    }

    private async airport() {
        Generator.getInstance().airport(
            new Airport(
                "London Southend Airport",
                "Southend",
                "EGMC",
                1,
                3000,
                [
                    new Runway("mc", "23",
                        Fix.fromDMS("513427.71N", "0004207.48E"),
                        234.17, 38,
                        1856 / Fix.FT, 0, 0,
                        void 0,
                        void 0,
                        127.73,
                        "Southend Tower",
                        53,
                        3.5,
                        233,
                        3,
                    ),
                ],
                [
                    new Airport.EntryPoint(138, Generator.getInstance().beacon("SOXUX"), 12000),
                ],
                Airport.Airline.raw(await fs.readFile("./airlines/EGMC.txt", "utf8")),
                [
                    NamedFix.fromDMS("515054.50N", "0010851.32E", "CLN", "Clacton"),
                    NamedFix.fromDMS("510945N", "0012133E", "DVR", "Dover"),
                    NamedFix.fromDMS("505958.87N", "0005243.18E", "LYD", "Lydd"),
                    NamedFix.fromDMS("512930N", "0011311W", "CPT", "Compton"),
                    Generator.getInstance().beacon("BPK"),
                ],
                Generator.getInstance().beacon("SND"),
            ),
        );
    }

    private async star() {
        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("SUMUM1S"),
            [Generator.getInstance().runway("mc")],
            true,
            Generator.getInstance().beacon("LOGAN"),
            289,
            [
                Generator.getInstance().beacon("LOGAN", void 0, 250),
                Generator.getInstance().beacon("JACKO"),
                Generator.getInstance().beacon("GEGMU", 6000, 195),
            ],
            {end: "hold"})
            .withEntry(8000));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("XAMAN1S"),
            [Generator.getInstance().runway("mc")],
            true,
            Generator.getInstance().beacon("LOGAN"),
            264,
            [
                Generator.getInstance().beacon("LOGAN", void 0, 250),
                Generator.getInstance().beacon("JACKO"),
                Generator.getInstance().beacon("GEGMU", 6000, 195),
            ],
            {end: "hold"})
            .withEntry(8000));


        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("KATHY1S"),
            [Generator.getInstance().runway("mc")],
            true,
            Generator.getInstance().beacon("BIDVA"),
            47,
            [
                Generator.getInstance().beacon("BIDVA", 13000),
                Generator.getInstance().fix("EVEXU", "504115.78N", "0003440.86W"),
                Generator.getInstance().beacon("SOXUX"),
                Generator.getInstance().fix("OKVAP", "505748.96N", "0011955.98E", 9000, 250),
                Generator.getInstance().fix("ATSAP", "512715.96N", "0013016.98E", 7000, 220),
                Generator.getInstance().fix("ADVAS", "514053.03N", "0012633.13E"),
                Generator.getInstance().beacon("GEGMU", 6000, 195),
            ],
            {end: "hold"},
        ));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("NEVIL1S"),
            [Generator.getInstance().runway("mc")],
            true,
            Generator.getInstance().beacon("SOXUX"),
            57,
            [
                Generator.getInstance().beacon("SOXUX"),
                Generator.getInstance().fix("OKVAP", "505748.96N", "0011955.98E", 9000, 250),
                Generator.getInstance().fix("ATSAP", "512715.96N", "0013016.98E", 7000, 220),
                Generator.getInstance().fix("ADVAS", "514053.03N", "0012633.13E"),
                Generator.getInstance().beacon("GEGMU", 6000, 195),
            ],
            {end: "hold"})
        );

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("SAM", "1S"),
            [Generator.getInstance().runway("mc")],
            true,
            Generator.getInstance().beacon("SAM"),
            void 0,
            [
                Generator.getInstance().beacon("SAM"),
                Generator.getInstance().beacon("BIDVA", 13000),
                Generator.getInstance().fix("EVEXU", "504115.78N", "0003440.86W"),
                Generator.getInstance().beacon("SOXUX"),
                Generator.getInstance().fix("OKVAP", "505748.96N", "0011955.98E", 9000, 250),
                Generator.getInstance().fix("ATSAP", "512715.96N", "0013016.98E", 7000, 220),
                Generator.getInstance().fix("ADVAS", "514053.03N", "0012633.13E"),
                Generator.getInstance().beacon("GEGMU", 6000, 195),
            ],
            {end: "hold"},
        ));


        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("SOVAT", "1S"),
            [Generator.getInstance().runway("mc")],
            true,
            Generator.getInstance().beacon("SOVAT"),
            void 0,
            [
                Generator.getInstance().beacon("SOVAT", 12000),
                Generator.getInstance().fix("ERKEX", "505240.62N", "0011936.96E"),
                Generator.getInstance().fix("OKVAP", "505748.96N", "0011955.98E", 9000, 250),
                Generator.getInstance().fix("ATSAP", "512715.96N", "0013016.98E", 7000, 220),
                Generator.getInstance().fix("ADVAS", "514053.03N", "0012633.13E"),
                Generator.getInstance().beacon("GEGMU", 6000, 195),
            ],
            {end: "hold"})
            .withEntry(12000, 317));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("FINMA", "1S"),
            [Generator.getInstance().runway("mc")],
            true,
            Generator.getInstance().beacon("FINMA"),
            void 0,
            [
                Generator.getInstance().beacon("FINMA", 15000),
                Generator.getInstance().fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
                Generator.getInstance().beacon("BKY"),
                Generator.getInstance().fix("BRAIN", "514839.91N", "0003906.00E", void 0, 220),
                Generator.getInstance().fix("BRAIN", "514839.91N", "0003906.00E")
                    .bearingIntersection(
                        115,
                        Generator.getInstance().fix("MAYLA", "513740.76N", "0004311.80E"),
                        13,
                    ),
                Generator.getInstance().fix("MAYLA", "513740.76N", "0004311.80E"),
                Generator.getInstance().beacon("SND", 5000, 195),
            ],
            {end: "hold"})
            .withEntry(15000, 147));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("LISTO1S"),
            [Generator.getInstance().runway("mc")],
            true,
            Generator.getInstance().beacon("FINMA"),
            149,
            [
                Generator.getInstance().beacon("FINMA", 15000),
                Generator.getInstance().fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
                Generator.getInstance().beacon("BKY"),
                Generator.getInstance().fix("BRAIN", "514839.91N", "0003906.00E", void 0, 220),
                Generator.getInstance().fix("BRAIN", "514839.91N", "0003906.00E")
                    .bearingIntersection(
                        115,
                        Generator.getInstance().fix("MAYLA", "513740.76N", "0004311.80E"),
                        13,
                    ),
                Generator.getInstance().fix("MAYLA", "513740.76N", "0004311.80E"),
                Generator.getInstance().beacon("SND", 5000, 195),
            ],
            {end: "hold"})
            .withEntry(15000, 149));


        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("SILVA", "1S"),
            [Generator.getInstance().runway("mc")],
            true,
            Generator.getInstance().beacon("SILVA"),
            void 0,
            [
                Generator.getInstance().beacon("SILVA"),
                Generator.getInstance().fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
                Generator.getInstance().beacon("BKY"),
                Generator.getInstance().fix("BRAIN", "514839.91N", "0003906.00E", void 0, 220),
                Generator.getInstance().fix("BRAIN", "514839.91N", "0003906.00E")
                    .bearingIntersection(
                        115,
                        Generator.getInstance().fix("MAYLA", "513740.76N", "0004311.80E"),
                        13,
                    ),
                Generator.getInstance().fix("MAYLA", "513740.76N", "0004311.80E"),
                Generator.getInstance().beacon("SND", 5000, 195),
            ],
            {end: "hold"},
        ));
    }

    private async departures() {
        const rwy = Generator.getInstance().runway("mc");

        Generator.getInstance().departure(new SID(
            Generator.getInstance().sidFix("CLN").name,
            Generator.getInstance().sidFix("CLN").pronunciation,
            rwy,
            [
                rwy.reverse().position.destination(rwy.heading, 1.5),
                Generator.getInstance().sidFix("CLN"),
            ],
        ));

        Generator.getInstance().departure(new SID(
            Generator.getInstance().sidFix("DVR").name,
            Generator.getInstance().sidFix("DVR").pronunciation,
            rwy,
            [
                rwy.reverse().position.destination(rwy.heading, 1.5),
                Generator.getInstance().beacon("DET"),
                Generator.getInstance().sidFix("DVR"),
            ],
        ));

        Generator.getInstance().departure(new SID(
            Generator.getInstance().sidFix("LYD").name,
            Generator.getInstance().sidFix("LYD").pronunciation,
            rwy,
            [
                rwy.reverse().position.destination(rwy.heading, 1.5),
                Generator.getInstance().beacon("DET"),
                Generator.getInstance().sidFix("LYD"),
            ],
        ));

        Generator.getInstance().departure(new SID(
            Generator.getInstance().sidFix("CPT").name,
            Generator.getInstance().sidFix("CPT").pronunciation,
            rwy,
            [
                rwy.reverse().position.destination(rwy.heading, 1.5),
                Generator.getInstance().fix("EVNAS", "514004.25N", "0002638.37E"),
                Generator.getInstance().beacon("LAM"),
                Generator.getInstance().beacon("BPK"),
                Generator.getInstance().fix("HEN", "514535.07N", "0004725.05W"),
                Generator.getInstance().sidFix("CPT"),
            ],
        ));

        Generator.getInstance().departure(new SID(
            Generator.getInstance().sidFix("BPK").name,
            Generator.getInstance().sidFix("BPK").pronunciation,
            rwy,
            [
                rwy.reverse().position.destination(rwy.heading, 1.5),
                Generator.getInstance().fix("EVNAS", "514004.25N", "0002638.37E"),
                Generator.getInstance().beacon("LAM"),
                Generator.getInstance().sidFix("BPK"),
            ],
        ));
    }
}
