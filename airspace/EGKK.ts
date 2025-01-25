import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";

export default class EGKK {
	public constructor(private readonly atc: Generator) {
		this.airport();
		this.star();
	}

	private airport() {
		this.atc.airport(
			new Airport(
				"London Gatwick Airport",
				"Gatwick",
				"EGKK",
				10,
				4000,
				[
					new Runway("kkn", "26R",
						Fix.fromDMS("510903.69N", "0001057.40W"),
						257.65, 195,
						2561 / Fix.FT, 415 / Fix.FT, 321 / Fix.FT,
						void 0,
						void 0,
						124.23,
						"Gatwick Tower",
						77.63
					),
					new Runway("kks", "26L",
						Fix.fromDMS("510902.42N", "0001019.00W"),
						257.65, 196,
						3317 / Fix.FT, 425 / Fix.FT, 395 / Fix.FT,
						void 0,
						void 0,
						124.23,
						"Gatwick Tower",
						77.63
					),
				],
				[],
				[
					new Airport.Airline("EZY", 10, ["a320"], ["s"], "Easy"),
				],
				[],
				this.atc.beacon("MAY")
			)
		);
	}

	private star() {
		this.atc.arrival(new STAR(
			...this.atc.pronounce("BARMI1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("TEBRA"),
			228,
			[
				this.atc.beacon("TEBRA"),
				this.atc.fix("ABTUM", "512603.66N", "0012228.98E", 14000),
				this.atc.beacon("ARNUN"),
				this.atc.fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				this.atc.fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("TEBRA", "2G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("TEBRA"),
			void 0,
			[
				this.atc.beacon("TEBRA"),
				this.atc.fix("ABTUM", "512603.66N", "0012228.98E", 14000),
				this.atc.beacon("ARNUN"),
				this.atc.fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				this.atc.fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		/**
		 * This arrival is to enable continuation on BARMI 1G TEBRA 2G if
		 * interrupted with HOLD at ARNUN. Since the original STAR was
		 * interrupted, it’s not possible to continue with the same name.
		 * Continuation after interruption at ARNUN will show as TEBRA 2G.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("TEBRA", "2G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("ARNUN"),
			216,
			[
				this.atc.beacon("ARNUN"),
				this.atc.fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				this.atc.fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("KONAN", "2G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("ARNUN"),
			264,
			[
				this.atc.beacon("ARNUN"),
				this.atc.fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				this.atc.fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		// MID 1X omitted (MID→TIMBA)

		this.atc.arrival(new STAR(
			...this.atc.pronounce("NEVIL1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("AMDUT"),
			25,
			[
				this.atc.beacon("AMDUT"),
				this.atc.fix("KKE64", "504915.77N", "0003030.52E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("KUNAV1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("AMDUT"),
			312,
			[
				this.atc.beacon("AMDUT", 16000),
				this.atc.fix("KKE64", "504915.77N", "0003030.52E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("OTMET1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("ELDER"),
			91,
			[
				this.atc.beacon("ELDER"),
				this.atc.beacon("TELTU", 13000, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("VASUX1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("DISVO"),
			39,
			[
				this.atc.beacon("DISVO"),
				this.atc.beacon("TELTU", 13000, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		));

		// AMDUT 1G omitted (AMDUT→WILLO)
		// ARNUN 1G omitted (ARNUN→WILLO)

		this.atc.arrival(new STAR(
			...this.atc.pronounce("TELTU", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("TELTU"),
			void 0,
			[
				this.atc.beacon("TELTU", void 0, 250),
				this.atc.fix("SFD", "504538.48N", "0000718.89E", void 0, 220),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("DISIT1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("KIDLI"),
			146,
			[
				this.atc.beacon("KIDLI", 15000),
				this.atc.fix("MID", "510314.23N", "0003730.01W"),
				this.atc.fix("TUFOZ", "510101.01N", "0003024.31W", void 0, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("KIDLI", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("KIDLI"),
			void 0,
			[
				this.atc.beacon("KIDLI", 15000),
				this.atc.fix("MID", "510314.23N", "0003730.01W"),
				this.atc.fix("TUFOZ", "510101.01N", "0003024.31W", void 0, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("ABSAV", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("ABSAV"),
			void 0,
			[
				this.atc.beacon("ABSAV", 15000),
				this.atc.beacon("AVANT"),
				this.atc.beacon("GWC", 13000, 220),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("GWC", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("GWC"),
			void 0,
			[
				this.atc.beacon("GWC", 13000, 220),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("SIRIC", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("SIRIC"),
			void 0,
			[
				this.atc.beacon("SIRIC", 14000),
				this.atc.fix("NIGIT", "511846.96N", "0011014.71W"),
				this.atc.fix("MID", "510314.23N", "0003730.01W"),
				this.atc.fix("TUFOZ", "510101.01N", "0003024.31W", void 0, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		));
	}
}
