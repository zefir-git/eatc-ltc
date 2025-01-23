import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";

export default class EGLC {
	public constructor(private readonly atc: Generator) {
		this.airport();
		this.star();
	}

	private airport() {
		this.atc.airport(
			new Airport(
				"London City Airport",
				"London City",
				"EGLC",
				10,
				4000,
				[
					new Runway("lc", "27",
						Fix.fromDMS("513017.60N", "0000357.68E"),
						272.89, 20,
						1508 / Fix.FT, 70 / Fix.FT, 96 / Fix.FT,
						{name: "LAVNO", distance: 6},
						void 0,
						118.08,
						"City Tower",
						92.87,
						5.5,
						272.89,
						5.5
					)
				],
				[],
				[
					new Airport.Airline("CFE", 10, ["e190"], ["e"], "Flyer"),
				],
				[],
				this.atc.beacon("LON")
			)
		);
	}

	private star() {
		this.atc.arrival(new STAR(
			...STAR.named("SUMUM1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("LOGAN"),
			289,
			[
				this.atc.beacon("LOGAN", void 0, 250),
				this.atc.beacon("JACKO", 9000, 210)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("XAMAN1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("LOGAN"),
			264,
			[
				this.atc.beacon("LOGAN", void 0, 250),
				this.atc.beacon("JACKO", 9000, 210)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("SILVA1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("SILVA"),
			void 0,
			[
				this.atc.beacon("SILVA"),
				this.atc.fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
				this.atc.beacon("BKY"),
				this.atc.fix("BRAIN", "514839.91N", "0003906.00E", void 0, 220),
				this.atc.fix("CLN", "515054.50N", "0010851.32E"),
				this.atc.beacon("JACKO", 9000, 210)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("KONAN1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("KONAN"),
			void 0,
			[
				this.atc.beacon("KONAN"),
				// at least 3 fixes are needed due to a bug
				// roughly airspace boundary intersection
				this.atc.beacon("GODLU")
					.destination(94, 8.1),
				this.atc.beacon("GODLU", 10000, 210)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("SOVAT1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("SOVAT"),
			void 0,
			[
				this.atc.beacon("SOVAT"),
				this.atc.fix("ERKEX", "505240.62N", "0011936.96E", void 0, 250),
				this.atc.fix("OKVAP", "505748.96N", "0011955.98E", void 0, 250),
				this.atc.beacon("GODLU", 10000, 210)
			],
			{end: "hold"}
		));

		// XAMAN 1X omitted (XAMAN→GODLU)
		// SUMUM 1X omitted (SUMUM→GODLU)
		// HON 1C omitted (HON→JACKO)

		this.atc.arrival(new STAR(
			...STAR.named("LISTO1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("TIXEX"),
			129,
			[
				this.atc.beacon("TIXEX"),
				this.atc.fix("ODVOD", "520755.98N", "0000852.98E"),
				this.atc.beacon("ROPMU"),
				this.atc.fix("NUDNA", "520354.90N", "0005016.56E", void 0, 250),
				this.atc.fix("INLIM", "515422.98N", "0011912.90E", 12000, 250),
				this.atc.beacon("JACKO", 9000, 210)
			],
			{end: "hold"}
		));

		/**
		 * This arrival is to enable continuation on LISTO 1C if interrupted
		 * with HOLD at ROPMU.
		 */
		this.atc.arrival(new STAR(
			...STAR.named("LISTO1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("ROPMU"),
			97,
			[
				this.atc.beacon("ROPMU"),
				this.atc.fix("NUDNA", "520354.90N", "0005016.56E", void 0, 250),
				this.atc.fix("INLIM", "515422.98N", "0011912.90E", 12000, 250),
				this.atc.beacon("JACKO", 9000, 210)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("KATHY1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("BIDVA"),
			47,
			[
				this.atc.beacon("BIDVA", 13000),
				this.atc.fix("EVEXU", "504115.78N", "0003440.86W"),
				this.atc.beacon("SOXUX"),
				this.atc.fix("OKVAP", "505748.96N", "0011955.98E", void 0, 250),
				this.atc.beacon("GODLU", 10000, 210)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			"SAM1C",
			"Southampton one charlie",
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("SAM"),
			void 0,
			[
				this.atc.beacon("SAM"),
				this.atc.beacon("BIDVA", 13000),
				this.atc.fix("EVEXU", "504115.78N", "0003440.86W"),
				this.atc.beacon("SOXUX"),
				this.atc.fix("OKVAP", "505748.96N", "0011955.98E", void 0, 250),
				this.atc.beacon("GODLU", 10000, 210)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("AVANT1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("AVANT"),
			void 0,
			[
				this.atc.beacon("AVANT", 19000),
				this.atc.beacon("BIG", 16000),
				this.atc.fix("UMTUM", "511227.30N", "0010102.78E", void 0, 250),
				this.atc.beacon("GODLU", 10000, 210)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("NEVIL1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("SOXUX"),
			57,
			[
				this.atc.beacon("SOXUX"),
				this.atc.fix("OKVAP", "505748.96N", "0011955.98E", void 0, 250),
				this.atc.beacon("GODLU", 10000, 210)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...STAR.named("SIRIC1C"),
			[this.atc.runway("lc")],
			true,
			this.atc.beacon("SIRIC"),
			void 0,
			[
				this.atc.beacon("SIRIC", 18000),
				this.atc.beacon("BIG", 16000),
				this.atc.fix("UMTUM", "511227.30N", "0010102.78E", void 0, 250),
				this.atc.beacon("GODLU", 10000, 210)
			],
			{end: "hold"}
		));
	}
}
