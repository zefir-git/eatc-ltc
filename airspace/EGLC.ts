import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";

export default class EGLC {
	public constructor(private readonly atc: Generator) {
		this.airport();
		this.star();
		this.transition();
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
			...this.atc.pronounce("SUMUM1C"),
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
			...this.atc.pronounce("XAMAN1C"),
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
			...this.atc.pronounce("SILVA", "1C"),
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
			...this.atc.pronounce("KONAN", "1C"),
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
			...this.atc.pronounce("SOVAT", "1C"),
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
			...this.atc.pronounce("LISTO1C"),
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
			...this.atc.pronounce("LISTO1C"),
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
			...this.atc.pronounce("KATHY1C"),
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
			...this.atc.pronounce("SAM", "1C"),
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
			...this.atc.pronounce("AVANT", "1C"),
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
			...this.atc.pronounce("NEVIL1C"),
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
			...this.atc.pronounce("SIRIC", "1C"),
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

	private transition() {
		this.atc.arrival(new STAR(
			...this.atc.pronounce("LAVNO1G"),
			[this.atc.runway("lc")],
			false,
			this.atc.beacon("GODLU"),
			void 0,
			[
				this.atc.beacon("GODLU", 10000, 210),
				this.atc.fix("ELMIV", "512033.08N", "0011533.36E"),
				this.atc.fix("LCE11", "512504.57N", "0011834.81E"),
				this.atc.fix("LCE12", "512958.17N", "0011906.68E"),
				this.atc.fix("LCE13", "513442.46N", "0011704.79E", 10000),
				this.atc.beacon("RAVSA", 6000),
				this.atc.fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				this.atc.fix("ATPEV", "512918.05N", "0003322.74E"),
				this.atc.fix("LCE07", "512929.22N", "0002807.69E", 4000),
				this.atc.fix("TOPDU", "512945.72N", "0002009.82E", void 0, 210),
			],
			// LAVNO
			{ils: {dme: 6, altitude: 3000, speed: 185}}
		));

		/**
		 * On LAVNO 1G, you can give a shortcut ELMIV→RAVSA.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("LAVNO1G"),
			[this.atc.runway("lc")],
			false,
			this.atc.beacon("RAVSA"),
			302,
			[
				this.atc.beacon("RAVSA", 6000),
				this.atc.fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				this.atc.fix("ATPEV", "512918.05N", "0003322.74E"),
				this.atc.fix("LCE07", "512929.22N", "0002807.69E", 4000),
				this.atc.fix("TOPDU", "512945.72N", "0002009.82E", void 0, 210),
			],
			// LAVNO
			{ils: {dme: 6, altitude: 3000, speed: 185}}
		));


		this.atc.arrival(new STAR(
			...this.atc.pronounce("LAVNO1J"),
			[this.atc.runway("lc")],
			false,
			this.atc.beacon("JACKO"),
			void 0,
			[
				this.atc.beacon("JACKO", 9000, 210),
				this.atc.fix("NONVA", "513846.45N", "0012144.31E"),
				this.atc.fix("BABKU", "513519.59N", "0011916.23E"),
				this.atc.fix("LCE21", "513006.82N", "0012130.07E"),
				this.atc.fix("LCE22", "512443.87N", "0012054.73E"),
				this.atc.fix("LCE23", "511945.28N", "0011734.94E", 9000),
				this.atc.beacon("RAVSA", 6000),
				this.atc.fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				this.atc.fix("ATPEV", "512918.05N", "0003322.74E"),
				this.atc.fix("LCE07", "512929.22N", "0002807.69E", 4000),
				this.atc.fix("TOPDU", "512945.72N", "0002009.82E", void 0, 210),
			],
			// LAVNO
			{ils: {dme: 6, altitude: 3000, speed: 185}}
		));

		/**
		 * On LAVNO 1J, you can give a shortcut BABKU→RAVSA.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("LAVNO1J"),
			[this.atc.runway("lc")],
			false,
			this.atc.beacon("RAVSA"),
			245,
			[
				this.atc.beacon("RAVSA", 6000),
				this.atc.fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				this.atc.fix("ATPEV", "512918.05N", "0003322.74E"),
				this.atc.fix("LCE07", "512929.22N", "0002807.69E", 4000),
				this.atc.fix("TOPDU", "512945.72N", "0002009.82E", void 0, 210),
			],
			// LAVNO
			{ils: {dme: 6, altitude: 3000, speed: 185}}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("ODLEG1G"),
			[this.atc.runway("lc")],
			"only",
			this.atc.beacon("GODLU"),
			void 0,
			[
				this.atc.beacon("GODLU", 10000, 210),
				this.atc.fix("ELMIV", "512033.08N", "0011533.36E"),
				this.atc.fix("LCE11", "512504.57N", "0011834.81E"),
				this.atc.fix("LCE12", "512958.17N", "0011906.68E"),
				this.atc.fix("LCE13", "513442.46N", "0011704.79E", 10000),
				this.atc.beacon("RAVSA", 6000),
				this.atc.fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				this.atc.fix("ATPEV", "512918.05N", "0003322.74E"),
				this.atc.fix("LCE07", "512929.22N", "0002807.69E", 4000),
				this.atc.fix("OSVEV", "512549.36N", "0001808.59E", 3000, 210),
				this.atc.fix("LCS01", "512603.37N", "0001109.39E", 3000, 185),
				this.atc.fix("LCS02", "512619.24N", "0000259.13E", 2000),
				this.atc.fix("TODBI", "512636.35N", "0000611.78W", 2000),
				this.atc.fix("ODLEG", "512925.35N", "0000716.56W", 2000, 185),
			],
			{end: 48}
		));

		/**
		 * On ODLEG 1G, you can give a shortcut ELMIV→RAVSA.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("ODLEG1G"),
			[this.atc.runway("lc")],
			"only",
			this.atc.beacon("RAVSA"),
			302,
			[
				this.atc.beacon("RAVSA", 6000),
				this.atc.fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				this.atc.fix("ATPEV", "512918.05N", "0003322.74E"),
				this.atc.fix("LCE07", "512929.22N", "0002807.69E", 4000),
				this.atc.fix("OSVEV", "512549.36N", "0001808.59E", 3000, 210),
				this.atc.fix("LCS01", "512603.37N", "0001109.39E", 3000, 185),
				this.atc.fix("LCS02", "512619.24N", "0000259.13E", 2000),
				this.atc.fix("TODBI", "512636.35N", "0000611.78W", 2000),
				this.atc.fix("ODLEG", "512925.35N", "0000716.56W", 2000, 185),
			],
			{end: 48}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("ODLEG1J"),
			[this.atc.runway("lc")],
			"only",
			this.atc.beacon("JACKO"),
			void 0,
			[
				this.atc.beacon("JACKO", 9000, 210),
				this.atc.fix("NONVA", "513846.45N", "0012144.31E"),
				this.atc.fix("BABKU", "513519.59N", "0011916.23E"),
				this.atc.fix("LCE21", "513006.82N", "0012130.07E"),
				this.atc.fix("LCE22", "512443.87N", "0012054.73E"),
				this.atc.fix("LCE23", "511945.28N", "0011734.94E", 9000),
				this.atc.beacon("RAVSA", 6000),
				this.atc.fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				this.atc.fix("ATPEV", "512918.05N", "0003322.74E"),
				this.atc.fix("LCE07", "512929.22N", "0002807.69E", 4000),
				this.atc.fix("OSVEV", "512549.36N", "0001808.59E", 3000, 210),
				this.atc.fix("LCS01", "512603.37N", "0001109.39E", 3000, 185),
				this.atc.fix("LCS02", "512619.24N", "0000259.13E", 2000),
				this.atc.fix("TODBI", "512636.35N", "0000611.78W", 2000),
				this.atc.fix("ODLEG", "512925.35N", "0000716.56W", 2000, 185),
			],
			{end: 48}
		));

		/**
		 * On ODLEG 1J, you can give a shortcut BABKU→RAVSA.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("ODLEG1J"),
			[this.atc.runway("lc")],
			"only",
			this.atc.beacon("RAVSA"),
			245,
			[
				this.atc.beacon("RAVSA", 6000),
				this.atc.fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				this.atc.fix("ATPEV", "512918.05N", "0003322.74E"),
				this.atc.fix("LCE07", "512929.22N", "0002807.69E", 4000),
				this.atc.fix("OSVEV", "512549.36N", "0001808.59E", 3000, 210),
				this.atc.fix("LCS01", "512603.37N", "0001109.39E", 3000, 185),
				this.atc.fix("LCS02", "512619.24N", "0000259.13E", 2000),
				this.atc.fix("TODBI", "512636.35N", "0000611.78W", 2000),
				this.atc.fix("ODLEG", "512925.35N", "0000716.56W", 2000, 185),
			],
			{end: 48}
		));
	}
}
