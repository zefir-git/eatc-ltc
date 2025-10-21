import Beacon from "../src/Beacon.js";
import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";
import SID from "../src/SID.js";
import NamedFix from "../src/NamedFix.js";
import fs from "node:fs/promises";
import StarFix from "../src/StarFix.js";

export default class EGSS {
	public async init() {
		await this.airport();
		this.star();
		this.sid();
        this.rnp();
	}

	private async airport() {
		Generator.getInstance().airport(
			new Airport(
				"London Stansted Airport",
				"Stansted",
				"EGSS",
				5.6,
				5000,
				[
					new Runway("ss", "22",
						Fix.fromDMS("515342.57N", "0001500.16E"),
						222.89, 347,
						3049 / Fix.FT, 0, 298 / Fix.FT,
						void 0,
						void 0,
						123.805,
						"Stansted Tower",
						42.87
					)
				],
				[],
				Airport.Airline.raw(await fs.readFile("./airlines/EGSS.txt", "utf8")),
				[
					NamedFix.fromDMS("515847N", "0000419W", "UTAVA", "Utava"),
					NamedFix.fromDMS("515822N", "0000412W", "NUGBO", "Nugbo"),
                    NamedFix.fromDMS("515923N", "0000343E", "BKY", "Barkway"),
					NamedFix.fromDMS("515054.50N", "0010851.32E", "CLN", "Clacton"),
                    NamedFix.fromDMS("511814.41N", "0003550.19E", "DET", "Detling"),
				],
				Generator.getInstance().beacon("ABBOT")
			)
		);
	}

	private star() {
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("TELTU", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("TELTU"),
			void 0,
			[
				Generator.getInstance().beacon("TELTU", 19000),
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"})
		.withEntry(19000, 8));

		/**
		 * This arrival is to enable continuation on TELTU 1L AVANT 1L if
		 * interrupted with HOLD at VATON. Since the original STAR was
		 * interrupted, it’s not possible to continue with the same name.
		 * Continuation after interruption at VATON will show as TELTU 1L.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("TELTU", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("VATON"),
			25,
			[
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LISTO1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("FINMA"),
			149,
			[
				Generator.getInstance().beacon("FINMA", 15000),
				Generator.getInstance().fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000));

		Generator.getInstance().arrival(new STAR(
			"BKY1X",
            `Barkway ${Generator.alphabet("1X")}`,
			[Generator.getInstance().runway("ss")],
			true,
            Beacon.fromDMS("515923N", "0000343E", "BKY", "Barkway"),
			void 0,
			[
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("ADNAM", "520616.98N", "0004418.84E", void 0, 220),
				Generator.getInstance().beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			"BPK1X",
            `Brookmans Park ${Generator.alphabet("1X")}`,
			[Generator.getInstance().runway("ss")],
			true,
            Beacon.fromDMS("514459.05N", "0000624.25W", "BPK", "Brookmans Park"),
			void 0,
			[
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W", void 0, 250),
				Generator.getInstance().fix("ADNAM", "520616.98N", "0004418.84E", void 0, 220),
				Generator.getInstance().beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("BANVA", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("BANVA"),
			void 0,
			[
				Generator.getInstance().beacon("BANVA"),
				Generator.getInstance().beacon("UNDUG"),
				Generator.getInstance().beacon("MAY", 20000),
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"})
		.withEntry(20000, 319));

		/**
		 * This arrival is to enable continuation on BANVA 1L if interrupted
		 * with HOLD at UNDUG.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("BANVA", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("UNDUG"),
			319,
			[
				Generator.getInstance().beacon("UNDUG"),
				Generator.getInstance().beacon("MAY", 20000),
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		/**
		 * This arrival is to enable continuation on BANVA 1L if interrupted
		 * with HOLD at VATON.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("BANVA", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("VATON"),
			325,
			[
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ABBOT", "1Z"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("ABBOT"),
			void 0,
			[
				Generator.getInstance().beacon("ABBOT", void 0, 220),
				Generator.getInstance().fix("TABIS", "520031.75N", "0002643.90E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("FINMA", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("FINMA"),
			void 0,
			[
				Generator.getInstance().beacon("FINMA", 15000),
				Generator.getInstance().fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000, 143));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SILVA", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("SILVA"),
			void 0,
			[
				Generator.getInstance().beacon("SILVA"),
				Generator.getInstance().fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000, 50));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("AVANT", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("AVANT"),
			void 0,
			[
				Generator.getInstance().beacon("AVANT", 19000),
				Generator.getInstance().beacon("OCK"),
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"})
		.withEntry(19000, 10));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SIRIC", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("SIRIC"),
			void 0,
			[
				Generator.getInstance().beacon("SIRIC", 18000),
				Generator.getInstance().fix("NIGIT", "511846.96N", "0011014.71W"),
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"})
		.withEntry(18000, 107));

		/**
		 * This arrival is to enable continuation on SIRIC 1L if interrupted
		 * with HOLD at VATON.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SIRIC", "1L"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("VATON"),
			76,
			[
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LOGAN", "2A"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("LOGAN"),
			void 0,
			[
				Generator.getInstance().beacon("LOGAN", 10000),
				Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E", void 0, 250),
				Generator.getInstance().beacon("ABBOT", 8000, 220)
			],
			{end: "hold"})
		.withEntry(10000, 290));

		Generator.getInstance().arrival(new STAR(
			"DET2A",
            `Detling ${Generator.alphabet("2A")}`,
			[Generator.getInstance().runway("ss")],
			true,
            Beacon.fromDMS("511814.41N", "0003550.19E", "DET", "Detling"),
			void 0,
			[
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E", 17000),
				Generator.getInstance().fix("LOFFO", "515012.00N", "0003556.37E", void 0, 250),
				Generator.getInstance().beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("MEGEL1A"),
            [Generator.getInstance().runway("ss")],
            true,
            Generator.getInstance().beacon("LARPA"),
            void 0,
            [
                Generator.getInstance().beacon("LARPA", 12000, 250),
                Generator.getInstance().beacon("ABBOT", 8000, 220),
            ],
            {end: "hold"},
        ).withEntry(12000, 246));

        // RINIS 1A omitted (RINIS→ABBOT)
		// XAMAN 1A omitted (XAMAN→ABBOT)
		// TOSVA 1A omitted (TOSVA→ABBOT)
	}

	private sid() {
		const rwy = Generator.getInstance().runway("ss");
		const rev = rwy.reverse();

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("UTAVA"), "1R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 3.1),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(169, 8),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(169, 5),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(169, 2),
				Generator.getInstance().fix("UTAVA")
			],
			false,
			4000
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("NUGBO"), "1R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 3.1),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(169, 8),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(169, 5),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(169, 2),
				Generator.getInstance().fix("NUGBO")
			],
			false,
			4000
		));

		Generator.getInstance().departure(new SID(
			"BKY5R",
            `Barkway ${Generator.alphabet("5R")}`,
			rwy,
			[
				rev.position.destination(rwy.heading, 3.1),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(169, 8),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(169, 5),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(169, 2),
				Generator.getInstance().fix("BKY", "515923N", "0000343E"),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(357, 3),
			],
			false,
			4000
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("UTAVA"), "1S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 2),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(99, 7),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(99, 5),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(99, 2),
				Generator.getInstance().fix("BKY", "515923N", "0000343E"),
				Generator.getInstance().fix("UTAVA")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("NUGBO"), "1S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 2),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(99, 7),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(99, 5),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(99, 2),
				Generator.getInstance().fix("BKY", "515923N", "0000343E"),
				Generator.getInstance().fix("NUGBO")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			"BKY2S",
            `Barkway ${Generator.alphabet("2S")}`,
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 2),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(99, 7),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(99, 5),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(99, 2),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(357, 3),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(357, 7),
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("CLN"), "9R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 1.2),
				Generator.getInstance().fix("XIGAR", "514850N", "0001546E"),
				Generator.getInstance().fix("CLN").destination(265, 28),
				Generator.getInstance().fix("CLN").destination(265, 21),
				Generator.getInstance().fix("CLN").destination(265, 20),
				Generator.getInstance().fix("CLN").destination(265, 16),
				Generator.getInstance().fix("CLN").destination(265, 13),
				Generator.getInstance().fix("CLN")
			],
			false,
			6000
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("CLN"), "5S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 1),
				rwy.position.destination(rwy.reverseLocalizer, 1).bearingIntersection(rwy.reverseLocalizer, Generator.getInstance().fix("BKY", "515923N", "0000343E"), 114),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(114, 14),
				Generator.getInstance().fix("BKY", "515923N", "0000343E").destination(114, 17),
				Generator.getInstance().fix("CLN").destination(265, 20),
				Generator.getInstance().fix("CLN").destination(265, 16),
				Generator.getInstance().fix("CLN").destination(265, 13),
				Generator.getInstance().fix("CLN")
			],
			true,
			6000
		));

		Generator.getInstance().departure(new SID(
			"DET2R",
            `Detling ${Generator.alphabet("2R")}`,
			rwy,
			[
				rev.position.destination(rwy.heading, 1.2),
				rev.position.destination(rwy.heading, 1.2).bearingIntersection(rwy.heading, Generator.getInstance().fix("DET", "511814.41N", "0003550.19E"), 333),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(333, 32),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(333, 25),
				Generator.getInstance().fix("NEPNA", "512958.33N", "0002656.55E"),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E")
			]
		));

		Generator.getInstance().departure(new SID(
			"DET2S",
            `Detling ${Generator.alphabet("2S")}`,
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 0.8),
				rwy.position.destination(rwy.reverseLocalizer, 0.8)
				   .bearingIntersection(rwy.reverseLocalizer + 90, Generator.getInstance().beacon("LAM"), 24),
				Generator.getInstance().beacon("LAM").destination(24, 9),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(333, 25),
				Generator.getInstance().fix("NEPNA", "512958.33N", "0002656.55E"),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E")
			],
			true
		));

		// LAM 4R 3S omitted (for landing at Heathrow only)

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("CLN"), "2E"),
			rwy,
			[
				Generator.getInstance().fix("SSW01", "515146.36N", "0001205.90E"),
				Generator.getInstance().fix("SSS03", "514938.12N", "0001213.68E"),
				Generator.getInstance().fix("SSE06", "514850.07N", "0001553.31E"),
				Generator.getInstance().fix("SSE11", "514910.19N", "0002348.04E"),
				Generator.getInstance().fix("SSE18", "514937.86N", "0003502.87E"),
				Generator.getInstance().fix("SSE23", "514957.00N", "0004306.08E"),
				Generator.getInstance().fix("SSE26", "515008.21N", "0004755.61E"),
				Generator.getInstance().fix("CLN")
			],
			false,
			6000
		));
	}

    private rnp() {
        const rwy = Generator.getInstance().runway("ss");

        const EKVEG = Beacon.fromDMS("514458.16N", "0000156.61E", "EKVEG", "Ekveg");
        const TOTVO = Beacon.fromDMS("520118.82N", "0002627.79E", "TOTVO", "Totvo");

        Generator.getInstance().arrival(new STAR(
            "RNP Z",
            "R-N-P Zulu",
            [rwy],
            "only",
            EKVEG,
            void 0,
            [StarFix.from(EKVEG, 2500, 200)],
            // SS04F
            {ils: {dme: 6.6, altitude: 2500}}
        ));

        // RNP Y 04 omitted (maintenance THR)

        Generator.getInstance().arrival(new STAR(
            "RNP Z",
            "R-N-P Zulu",
            [rwy],
            false,
            TOTVO,
            void 0,
            [StarFix.from(TOTVO, 2500, 200)],
            // SS22F
            {ils: {dme: 6.6, altitude: 2500}}
        ));

        // RNP Y 22 omitted (maintenance THR)
    }
}
