import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";
import SID from "../src/SID.js";
import NamedFix from "../src/NamedFix.js";
import fs from "node:fs/promises";

export default class EGSS {
	public async init() {
		await this.airport();
		this.star();
		this.sid();
	}

	private async airport() {
		Generator.getInstance().airport(
			new Airport(
				"London Stansted Airport",
				"Stansted",
				"EGSS",
				4,
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
					Generator.getInstance().beacon("BKY"),
					NamedFix.fromDMS("515054.50N", "0010851.32E", "CLN", "Clacton"),
					Generator.getInstance().beacon("DET"),
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
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().beacon("BKY", void 0, 220),
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
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().beacon("BKY", void 0, 220),
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
				Generator.getInstance().beacon("BKY", void 0, 220),
				Generator.getInstance().fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				Generator.getInstance().beacon("LOREL", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("BKY", "1X"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("BKY"),
			void 0,
			[
				Generator.getInstance().beacon("BKY", void 0, 220),
				Generator.getInstance().fix("ADNAM", "520616.98N", "0004418.84E", void 0, 220),
				Generator.getInstance().beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("BPK", "1X"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("BPK"),
			void 0,
			[
				Generator.getInstance().beacon("BPK", void 0, 250),
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
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().beacon("BKY", void 0, 220),
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
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().beacon("BKY", void 0, 220),
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
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().beacon("BKY", void 0, 220),
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
				Generator.getInstance().beacon("BKY", void 0, 220),
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
				Generator.getInstance().beacon("BKY", void 0, 220),
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
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().beacon("BKY", void 0, 220),
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
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().beacon("BKY", void 0, 220),
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
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().beacon("BKY", void 0, 220),
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
			...Generator.getInstance().pronounce("DET", "2A"),
			[Generator.getInstance().runway("ss")],
			true,
			Generator.getInstance().beacon("DET"),
			void 0,
			[
				Generator.getInstance().beacon("DET", 17000),
				Generator.getInstance().fix("LOFFO", "515012.00N", "0003556.37E", void 0, 250),
				Generator.getInstance().beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));

		// BARMI 2A omitted (BARMI→ABBOT)
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
				Generator.getInstance().beacon("BKY").destination(169, 8),
				Generator.getInstance().beacon("BKY").destination(169, 5),
				Generator.getInstance().beacon("BKY").destination(169, 2),
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
				Generator.getInstance().beacon("BKY").destination(169, 8),
				Generator.getInstance().beacon("BKY").destination(169, 5),
				Generator.getInstance().beacon("BKY").destination(169, 2),
				Generator.getInstance().fix("NUGBO")
			],
			false,
			4000
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("BKY", "5R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 3.1),
				Generator.getInstance().beacon("BKY").destination(169, 8),
				Generator.getInstance().beacon("BKY").destination(169, 5),
				Generator.getInstance().beacon("BKY").destination(169, 2),
				Generator.getInstance().beacon("BKY"),
				Generator.getInstance().beacon("BKY").destination(357, 3),
			],
			false,
			4000
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("UTAVA"), "1S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 2),
				Generator.getInstance().beacon("BKY").destination(99, 7),
				Generator.getInstance().beacon("BKY").destination(99, 5),
				Generator.getInstance().beacon("BKY").destination(99, 2),
				Generator.getInstance().beacon("BKY"),
				Generator.getInstance().fix("UTAVA")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("NUGBO"), "1S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 2),
				Generator.getInstance().beacon("BKY").destination(99, 7),
				Generator.getInstance().beacon("BKY").destination(99, 5),
				Generator.getInstance().beacon("BKY").destination(99, 2),
				Generator.getInstance().beacon("BKY"),
				Generator.getInstance().fix("NUGBO")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("BKY", "2S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 2),
				Generator.getInstance().beacon("BKY").destination(99, 7),
				Generator.getInstance().beacon("BKY").destination(99, 5),
				Generator.getInstance().beacon("BKY").destination(99, 2),
				Generator.getInstance().beacon("BKY").destination(357, 3),
				Generator.getInstance().beacon("BKY").destination(357, 7),
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
				rwy.position.destination(rwy.reverseLocalizer, 1).bearingIntersection(rwy.reverseLocalizer, Generator.getInstance().beacon("BKY"), 114),
				Generator.getInstance().beacon("BKY").destination(114, 14),
				Generator.getInstance().beacon("BKY").destination(114, 17),
				Generator.getInstance().fix("CLN").destination(265, 20),
				Generator.getInstance().fix("CLN").destination(265, 16),
				Generator.getInstance().fix("CLN").destination(265, 13),
				Generator.getInstance().fix("CLN")
			],
			true,
			6000
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("DET", "2R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 1.2),
				rev.position.destination(rwy.heading, 1.2).bearingIntersection(rwy.heading, Generator.getInstance().beacon("DET"), 333),
				Generator.getInstance().beacon("DET").destination(333, 32),
				Generator.getInstance().beacon("DET").destination(333, 25),
				Generator.getInstance().fix("NEPNA", "512958.33N", "0002656.55E"),
				Generator.getInstance().beacon("DET")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("DET", "2S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 0.8),
				rwy.position.destination(rwy.reverseLocalizer, 0.8)
				   .bearingIntersection(rwy.reverseLocalizer + 90, Generator.getInstance().beacon("LAM"), 24),
				Generator.getInstance().beacon("LAM").destination(24, 9),
				Generator.getInstance().beacon("DET").destination(333, 25),
				Generator.getInstance().fix("NEPNA", "512958.33N", "0002656.55E"),
				Generator.getInstance().beacon("DET")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("LAM", "4R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 1.2),
				rev.position.destination(rwy.heading, 1.2).bearingIntersection(rwy.heading, Generator.getInstance().beacon("BKY"), 153),
				Generator.getInstance().beacon("BKY").destination(153, 13.8),
				Generator.getInstance().fix("ROWAN", "514509N", "0001457E"),
				Generator.getInstance().beacon("LAM")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("LAM", "3S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 0.8),
				rwy.position.destination(rwy.reverseLocalizer, 0.8)
				   .bearingIntersection(rwy.reverseLocalizer + 90, Generator.getInstance().beacon("LAM"), 24),
				Generator.getInstance().beacon("LAM").destination(24, 9),
				Generator.getInstance().fix("LAM")
			],
			true
		));

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
}
