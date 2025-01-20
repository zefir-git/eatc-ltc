import Generator from "../src/Generator.js";
import STAR from "../src/STAR.js";
import StarFix from "../src/StarFix.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";

export default class EGLL {
	public constructor(private readonly atc: Generator) {
		this.airport();
		this.star();
	}

	private airport() {
		this.atc.airport(
			new Airport(
				"London Heathrow Airport",
				"Heathrow",
				"TEST",
				80,
				6000,
				[
					new Runway("lln", "27R",
						Fix.fromDMS("512839.63N", "0002559.82W"),
						269.71, 77,
						3901 / Fix.FT, 0, 309 / Fix.FT,
						{name: "IVLAR", distance: 10},
						{name: "ABAVI", distance: 10},
						118.7,
						"Tower",
						89.67
					),
					new Runway("lls", "27L",
						Fix.fromDMS("512753.82N", "0002602.76W"),
						269.72, 75,
						3658 / Fix.FT, 0, 308 / Fix.FT,
						{name: "NEKSA", distance: 10},
						{name: "BENPA", distance: 10},
						118.5,
						"Tower",
						89.68
					),
				],
				[],
				[
					new Airport.Airline("BAW", 10, ["a320"], ["e"], "Speedbird"),
				],
				[],
				this.atc.beacon("LON")
			)
		);
	}

	private star() {
		this.atc.arrival(new STAR(
			...STAR.named("OTMET1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("BEGTO"),
			63,
			[
				this.atc.beacon("BEGTO"),
				this.atc.beacon("HAZEL", 13000),
				this.atc.fix("LLS01", "511021.99N", "0004108.43W", void 0, 250),
				this.atc.beacon("OCK", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("ROXOG1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("BEGTO"),
			17,
			[
				this.atc.beacon("BEGTO"),
				this.atc.beacon("HAZEL", 13000),
				this.atc.fix("LLS01", "511021.99N", "0004108.43W", void 0, 250),
				this.atc.beacon("OCK", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("ALESO1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("ROTNO"),
			314,
			[
				this.atc.beacon("ROTNO"),
				this.atc.fix("ETVAX", "505806.99N", "0003556.27E", 18000),
				this.atc.beacon("TIGER"),
				this.atc.fix("LLE01", "511113.96N", "0001521.68E", void 0, 250),
				this.atc.beacon("BIG", 7000, 220)
			],
			{end: "hold"}
		));

		/**
		 * This arrival is to enable continuation on ALESO 1H if interrupted
		 * with HOLD at TIGER.
		 */
		this.atc.arrival(new STAR(
			...STAR.named("ALESO1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("TIGER"),
			314,
			[
				this.atc.beacon("TIGER"),
				this.atc.fix("LLE01", "511113.96N", "0001521.68E", void 0, 250),
				StarFix.from(this.atc.beacon("BIG"), 7000, 220)
			],
			{end: "hold"}
		));

		// LAM 1X omitted (LAM→BIG)

		this.atc.arrival(new STAR(
			...STAR.named("TANET1Z"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("TANET"),
			void 0,
			[
				this.atc.beacon("TANET"),
				this.atc.fix("DET", "511814.41N", "0003550.19E"),
				this.atc.fix("LLE02", "511857.68N", "0002109.87E", void 0, 250),
				this.atc.beacon("BIG", 7000, 220)
			],
			{end: "hold"}
		));

		// OCK 1Z omitted (OCK→BIG)

		this.atc.arrival(new STAR(
			...STAR.named("NUGRA1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("TOBID"),
			147,
			[
				this.atc.beacon("TOBID"),
				this.atc.fix("SOPIT", 15000),
				this.atc.beacon("WCO", void 0, 220),
				this.atc.beacon("BNN", 7000, 220)
			],
			{end: "hold"}
		));

		// LAM 1Z omitted (LAM→BNN)

		this.atc.arrival(new STAR(
			"HON1H",
			"Honiley one hotel",
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("TOBID"),
			139,
			[
				this.atc.beacon("TOBID"),
				this.atc.fix("SOPIT", 15000),
				this.atc.beacon("WCO", void 0, 220),
				this.atc.beacon("BNN", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("BARMI1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("LOGAN"),
			228,
			[
				this.atc.beacon("LOGAN", 25000),
				this.atc.fix("SABER", "514213.76N", "0005658.19E", 16000),
				this.atc.fix("BRASO", "514106.57N", "0004100.03E"),
				this.atc.fix("WESUL", "514015.29N", "0002909.27E", void 0, 250),
				this.atc.beacon("LAM", 7000, 250)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("LOGAN2H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("LOGAN"),
			void 0,
			[
				this.atc.beacon("LOGAN", 25000),
				this.atc.fix("SABER", "514213.76N", "0005658.19E", 16000),
				this.atc.fix("BRASO", "514106.57N", "0004100.03E"),
				this.atc.fix("WESUL", "514015.29N", "0002909.27E", void 0, 250),
				this.atc.beacon("LAM", 7000, 250)
			],
			{end: "hold"}
		));

		// TOBID 1X omitted (TOBID→OCK)

		this.atc.arrival(new STAR(
			...STAR.named("HAZEL1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("HAZEL"),
			void 0,
			[
				this.atc.beacon("HAZEL", 13000),
				this.atc.fix("LLS01", "511021.99N", "0004108.43W", void 0, 250),
				this.atc.beacon("OCK", 7000, 220)
			],
			{end: "hold"}
		));

		// BIG 1Z omitted (BIG→OCK)
		// LAM 1Y omitted (LAM→OCK)

		this.atc.arrival(new STAR(
			...STAR.named("FITBO1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("SOPIT"),
			107,
			[
				this.atc.fix("SOPIT", 15000),
				this.atc.beacon("WCO", void 0, 220),
				this.atc.beacon("BNN", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("SIRIC1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			this.atc.beacon("SIRIC"),
			void 0,
			[
				this.atc.beacon("SIRIC", 14000),
				this.atc.fix("NIGIT", "511846.96N", "0011014.71W"),
				this.atc.fix("LLW03", "511832.83N", "0004556.94W", void 0, 250),
				this.atc.beacon("OCK", 7000, 220)
			],
			{end: "hold"}
		));

		// SIRIC 1Z omitted (SIRIC→BNN)
	}
}
