import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";
import SID from "../src/SID.js";
import Beacon from "../src/Beacon.js";
import NamedFix from "../src/NamedFix.js";

export default class EGSS {
	public constructor(private readonly atc: Generator) {
		this.airport();
		this.star();
		this.sid();
	}

	private airport() {
		this.atc.airport(
			new Airport(
				"London Stansted Airport",
				"Stansted",
				"EGSS",
				10,
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
				[
					new Airport.Airline("RYR", 10, ["b738"], ["e"], "Ryanair"),
				],
				[
					NamedFix.fromDMS("515847N", "0000419W", "UTAVA", "Utava"),
					NamedFix.fromDMS("515822N", "0000412W", "NUGBO", "Nugbo"),
					this.atc.beacon("BKY"),
					NamedFix.fromDMS("515054.50N", "0010851.32E", "CLN", "Clacton"),
					this.atc.beacon("DET"),
					this.atc.beacon("LAM"),
				],
				this.atc.beacon("ABBOT")
			)
		);
	}

	private star() {
		this.atc.arrival(new STAR(
			...this.atc.pronounce("TELTU", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("TELTU"),
			void 0,
			[
				this.atc.beacon("TELTU", 19000),
				this.atc.beacon("VATON"),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		/**
		 * This arrival is to enable continuation on TELTU 1L AVANT 1L if
		 * interrupted with HOLD at VATON. Since the original STAR was
		 * interrupted, it’s not possible to continue with the same name.
		 * Continuation after interruption at VATON will show as TELTU 1L.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("TELTU", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("VATON"),
			25,
			[
				this.atc.beacon("VATON"),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("LISTO1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("FINMA"),
			149,
			[
				this.atc.beacon("FINMA", 15000),
				this.atc.fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("BKY", "1X"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("BKY"),
			void 0,
			[
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("ADNAM", "520616.98N", "0004418.84E", void 0, 220),
				this.atc.beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("BPK", "1X"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("BPK"),
			void 0,
			[
				this.atc.beacon("BPK", void 0, 250),
				this.atc.fix("ADNAM", "520616.98N", "0004418.84E", void 0, 220),
				this.atc.beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("BANVA", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("BANVA"),
			void 0,
			[
				this.atc.beacon("BANVA"),
				this.atc.beacon("UNDUG"),
				this.atc.beacon("MAY", 20000),
				this.atc.beacon("VATON"),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		/**
		 * This arrival is to enable continuation on BANVA 1L if interrupted
		 * with HOLD at UNDUG.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("BANVA", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("UNDUG"),
			319,
			[
				this.atc.beacon("UNDUG"),
				this.atc.beacon("MAY", 20000),
				this.atc.beacon("VATON"),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		/**
		 * This arrival is to enable continuation on BANVA 1L if interrupted
		 * with HOLD at VATON.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("BANVA", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("VATON"),
			325,
			[
				this.atc.beacon("VATON"),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("ABBOT", "1Z"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("ABBOT"),
			void 0,
			[
				this.atc.beacon("ABBOT", void 0, 220),
				this.atc.fix("TABIS", "520031.75N", "0002643.90E", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("FINMA", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("FINMA"),
			void 0,
			[
				this.atc.beacon("FINMA", 15000),
				this.atc.fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("SILVA", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("SILVA"),
			void 0,
			[
				this.atc.beacon("SILVA"),
				this.atc.fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("AVANT", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("AVANT"),
			void 0,
			[
				this.atc.beacon("AVANT", 19000),
				this.atc.beacon("OCK"),
				this.atc.beacon("VATON"),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("SIRIC", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("SIRIC"),
			void 0,
			[
				this.atc.beacon("SIRIC", 18000),
				this.atc.fix("NIGIT", "511846.96N", "0011014.71W"),
				this.atc.beacon("VATON"),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		/**
		 * This arrival is to enable continuation on SIRIC 1L if interrupted
		 * with HOLD at VATON.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("SIRIC", "1L"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("VATON"),
			76,
			[
				this.atc.beacon("VATON"),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.beacon("BKY", void 0, 220),
				this.atc.fix("BUSTA", "520534.45N", "0000403.92E", void 0, 220),
				this.atc.beacon("LOREL", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("LOGAN", "2A"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("LOGAN"),
			void 0,
			[
				this.atc.beacon("LOGAN", 10000),
				this.atc.fix("CLN", "515054.50N", "0010851.32E", void 0, 250),
				this.atc.beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("DET", "2A"),
			[this.atc.runway("ss")],
			true,
			this.atc.beacon("DET"),
			void 0,
			[
				this.atc.beacon("DET", 17000),
				this.atc.fix("LOFFO", "515012.00N", "0003556.37E", void 0, 250),
				this.atc.beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));

		// BARMI 2A omitted (BARMI→ABBOT)
		// RINIS 1A omitted (RINIS→ABBOT)
		// XAMAN 1A omitted (XAMAN→ABBOT)
		// TOSVA 1A omitted (TOSVA→ABBOT)
	}

	private sid() {
		const rwy = this.atc.runway("ss");
		const rev = rwy.reverse();

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("UTAVA"), "1R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 3.1),
				this.atc.beacon("BKY").destination(169, 8),
				this.atc.beacon("BKY").destination(169, 5),
				this.atc.beacon("BKY").destination(169, 2),
				this.atc.fix("UTAVA")
			],
			false,
			4000
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("NUGBO"), "1R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 3.1),
				this.atc.beacon("BKY").destination(169, 8),
				this.atc.beacon("BKY").destination(169, 5),
				this.atc.beacon("BKY").destination(169, 2),
				this.atc.fix("NUGBO")
			],
			false,
			4000
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("BKY", "5R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 3.1),
				this.atc.beacon("BKY").destination(169, 8),
				this.atc.beacon("BKY").destination(169, 5),
				this.atc.beacon("BKY").destination(169, 2),
				this.atc.beacon("BKY"),
				this.atc.beacon("BKY").destination(357, 3),
			],
			false,
			4000
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("UTAVA"), "1S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 2),
				this.atc.beacon("BKY").destination(99, 7),
				this.atc.beacon("BKY").destination(99, 5),
				this.atc.beacon("BKY").destination(99, 2),
				this.atc.beacon("BKY"),
				this.atc.fix("UTAVA")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("NUGBO"), "1S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 2),
				this.atc.beacon("BKY").destination(99, 7),
				this.atc.beacon("BKY").destination(99, 5),
				this.atc.beacon("BKY").destination(99, 2),
				this.atc.beacon("BKY"),
				this.atc.fix("NUGBO")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("BKY", "2S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 2),
				this.atc.beacon("BKY").destination(99, 7),
				this.atc.beacon("BKY").destination(99, 5),
				this.atc.beacon("BKY").destination(99, 2),
				this.atc.beacon("BKY").destination(357, 3),
				this.atc.beacon("BKY").destination(357, 7),
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("CLN"), "9R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 1.2),
				this.atc.fix("XIGAR", "514850N", "0001546E"),
				this.atc.fix("CLN").destination(265, 28),
				this.atc.fix("CLN").destination(265, 21),
				this.atc.fix("CLN").destination(265, 20),
				this.atc.fix("CLN").destination(265, 16),
				this.atc.fix("CLN").destination(265, 13),
				this.atc.fix("CLN")
			],
			false,
			6000
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("CLN"), "5S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 1),
				rwy.position.destination(rwy.reverseLocalizer, 1).bearingIntersection(rwy.reverseLocalizer, this.atc.beacon("BKY"), 114),
				this.atc.beacon("BKY").destination(114, 14),
				this.atc.beacon("BKY").destination(114, 17),
				this.atc.fix("CLN").destination(265, 20),
				this.atc.fix("CLN").destination(265, 16),
				this.atc.fix("CLN").destination(265, 13),
				this.atc.fix("CLN")
			],
			true,
			6000
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("DET", "2R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 1.2),
				rev.position.destination(rwy.heading, 1.2).bearingIntersection(rwy.heading, this.atc.beacon("DET"), 333),
				this.atc.beacon("DET").destination(333, 32),
				this.atc.beacon("DET").destination(333, 25),
				this.atc.fix("NEPNA", "512958N", "0002657E"),
				this.atc.beacon("DET")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("DET", "2S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 0.8),
				rwy.position.destination(rwy.reverseLocalizer, 0.8).bearingIntersection(rwy.reverseLocalizer, this.atc.beacon("LAM"), 24),
				this.atc.beacon("LAM").destination(24, 9),
				this.atc.beacon("DET").destination(333, 25),
				this.atc.fix("NEPNA", "512958N", "0002657E"),
				this.atc.beacon("DET")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("LAM", "4R"),
			rwy,
			[
				rev.position.destination(rwy.heading, 1.2),
				rev.position.destination(rwy.heading, 1.2).bearingIntersection(rwy.heading, this.atc.beacon("BKY"), 153),
				this.atc.beacon("BKY").destination(153, 13.8),
				this.atc.fix("ROWAN", "514509N", "0001457E"),
				this.atc.beacon("LAM")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("LAM", "3S"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 0.8),
				rwy.position.destination(rwy.reverseLocalizer, 0.8).bearingIntersection(rwy.reverseLocalizer, this.atc.beacon("LAM"), 24),
				this.atc.beacon("LAM").destination(24, 9),
				this.atc.fix("LAM")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("CLN"), "2E"),
			rwy,
			[
				this.atc.fix("SSW01", "515146.36N", "0001205.90E"),
				this.atc.fix("SSS03", "514938.12N", "0001213.68E"),
				this.atc.fix("SSE06", "514850.07N", "0001553.31E"),
				this.atc.fix("SSE11", "514910.19N", "0002348.04E"),
				this.atc.fix("SSE18", "514937.86N", "0003502.87E"),
				this.atc.fix("SSE23", "514957.00N", "0004306.08E"),
				this.atc.fix("SSE26", "515008.21N", "0004755.61E"),
				this.atc.fix("CLN")
			],
			false,
			6000
		));
	}
}
