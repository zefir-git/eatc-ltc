import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";

export default class EGSS {
	public constructor(private readonly atc: Generator) {
		this.airport();
		this.star();
	}

	private airport() {
		this.atc.airport(
			new Airport(
				"London Stansted Airport",
				"Stansted",
				"EGSS",
				10,
				4000,
				[
					new Runway("ss", "22",
						Fix.fromDMS("515342.57N", "0001500.16E"),
						222.89, 347,
						3049 / Fix.FT, 0, 298 / Fix.FT,
						{name: "TOTVO", distance: 10.4},
						{name: "EKVEG", distance: 10.4},
						123.805,
						"Stansted Tower",
						42.87
					)
				],
				[],
				[
					new Airport.Airline("RYR", 10, ["b738"], ["e"], "Ryanair"),
				],
				[],
				this.atc.beacon("ABBOT")
			)
		);
	}

	private star() {
		this.atc.arrival(new STAR(
			...STAR.named("TELTU1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("TELTU1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("LISTO1L"),
			[this.atc.runway("ss")],
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
			"BKY1X",
			"Barkway one x-ray",
			[this.atc.runway("ss")],
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
			"BPK1X",
			"Brookmans Park one x-ray",
			[this.atc.runway("ss")],
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
			...STAR.named("BANVA1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("BANVA1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("BANVA1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("ABBOT1Z"),
			[this.atc.runway("ss")],
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
			...STAR.named("FINMA1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("SILVA1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("AVANT1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("SIRIC1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("SIRIC1L"),
			[this.atc.runway("ss")],
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
			...STAR.named("LOGAN2A"),
			[this.atc.runway("ss")],
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
			"DET2A",
			"Detling two alpha",
			[this.atc.runway("ss")],
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
}
