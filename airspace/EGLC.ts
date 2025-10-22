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

export default class EGLC {
	public async init() {
		await this.airport();
		this.star();
		this.transition();
		this.sid();
        this.ils();
	}

	private async airport() {
		Generator.getInstance().airport(
			new Airport(
				"London City Airport",
				"London City",
				"EGLC",
				3,
				3000,
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
				[
					new Airport.EntryPoint(138, Generator.getInstance().beacon("SOXUX"), 10000),
				],
				Airport.Airline.raw(await fs.readFile("./airlines/EGLC.txt", "utf8")),
				[
					NamedFix.fromDMS("513623.75N", "0002328.43E", "SOQQA", "Soqqa"),
					NamedFix.fromDMS("514459.05N", "0000624.25W", "BPK", "Brookmans Park"),
					NamedFix.fromDMS("514504.03N", "0001113.77W", "SAXBI", "Saxbi"),
					NamedFix.fromDMS("513531.78N", "0001715.47E", "ODUKU", "Oduku")
				],
				Generator.getInstance().beacon("LCY")
			)
		);
	}

	private star() {
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SUMUM1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("LOGAN"),
			289,
			[
				Generator.getInstance().beacon("LOGAN", void 0, 250),
				Generator.getInstance().beacon("JACKO", 9000, 210)
			],
			{end: "hold"})
		.withEntry(9000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("XAMAN1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("LOGAN"),
			264,
			[
				Generator.getInstance().beacon("LOGAN", void 0, 250),
				Generator.getInstance().beacon("JACKO", 9000, 210)
			],
			{end: "hold"})
		.withEntry(9000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SILVA", "1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("SILVA"),
			void 0,
			[
				Generator.getInstance().beacon("SILVA"),
				Generator.getInstance().fix("BOMBO", "515944.29N", "0002346.85W", void 0, 250),
				Generator.getInstance().fix("BKY", "515923N", "0000343E"),
				Generator.getInstance().fix("BRAIN", "514839.91N", "0003906.00E", void 0, 220),
				Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E"),
				Generator.getInstance().beacon("JACKO", 9000, 210)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("KONAN", "1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("KONAN"),
			void 0,
			[
				Generator.getInstance().beacon("KONAN"),
				// at least 3 fixes are needed due to a bug
				// roughly airspace boundary intersection
				Generator.getInstance().beacon("GODLU")
					.destination(94, 8.1),
				Generator.getInstance().beacon("GODLU", 10000, 210)
			],
			{end: "hold"})
		.withEntry(10000, 274));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SOVAT", "1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("SOVAT"),
			void 0,
			[
				Generator.getInstance().beacon("SOVAT"),
				Generator.getInstance().fix("ERKEX", "505240.62N", "0011936.96E", void 0, 250),
				Generator.getInstance().fix("OKVAP", "505748.96N", "0011955.98E", void 0, 250),
				Generator.getInstance().beacon("GODLU", 10000, 210)
			],
			{end: "hold"})
		.withEntry(10000, 318));

		// XAMAN 1X omitted (XAMAN→GODLU)
		// SUMUM 1X omitted (SUMUM→GODLU)
		// HON 1C omitted (HON→JACKO)

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LISTO1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("TIXEX"),
			129,
			[
				Generator.getInstance().beacon("TIXEX"),
				Generator.getInstance().fix("ODVOD", "520755.98N", "0000852.98E"),
				Generator.getInstance().beacon("ROPMU"),
				Generator.getInstance().fix("NUDNA", "520354.90N", "0005016.56E", void 0, 250),
				Generator.getInstance().fix("INLIM", "515422.98N", "0011912.90E", 12000, 250),
				Generator.getInstance().beacon("JACKO", 9000, 210)
			],
			{end: "hold"})
		.withEntry(22000));

		/**
		 * This arrival is to enable continuation on LISTO 1C if interrupted
		 * with HOLD at ROPMU.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LISTO1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("ROPMU"),
			97,
			[
				Generator.getInstance().beacon("ROPMU"),
				Generator.getInstance().fix("NUDNA", "520354.90N", "0005016.56E", void 0, 250),
				Generator.getInstance().fix("INLIM", "515422.98N", "0011912.90E", 12000, 250),
				Generator.getInstance().beacon("JACKO", 9000, 210)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("KATHY1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("BIDVA"),
			47,
			[
				Generator.getInstance().beacon("BIDVA", 13000),
				Generator.getInstance().fix("EVEXU", "504115.78N", "0003440.86W"),
				Generator.getInstance().beacon("SOXUX"),
				Generator.getInstance().fix("OKVAP", "505748.96N", "0011955.98E", void 0, 250),
				Generator.getInstance().beacon("GODLU", 10000, 210)
			],
			{end: "hold"}
		));

		// Not possible to have spawn point as aircraft will need to cross into
		// the boundary at SAM→BIDVA and then leave it to re-enter later on.
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SAM", "1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("SAM"),
			void 0,
			[
				Generator.getInstance().beacon("SAM"),
				Generator.getInstance().beacon("BIDVA", 13000),
				Generator.getInstance().fix("EVEXU", "504115.78N", "0003440.86W"),
				Generator.getInstance().beacon("SOXUX"),
				Generator.getInstance().fix("OKVAP", "505748.96N", "0011955.98E", void 0, 250),
				Generator.getInstance().beacon("GODLU", 10000, 210)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("AVANT", "1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("AVANT"),
			void 0,
			[
				Generator.getInstance().beacon("AVANT", 19000),
				Generator.getInstance().beacon("BIG", 16000),
				Generator.getInstance().fix("UMTUM", "511227.30N", "0010102.78E", void 0, 250),
				Generator.getInstance().beacon("GODLU", 10000, 210)
			],
			{end: "hold"})
		.withEntry(19000, 91));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("NEVIL1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("SOXUX"),
			57,
			[
				Generator.getInstance().beacon("SOXUX"),
				Generator.getInstance().fix("OKVAP", "505748.96N", "0011955.98E", void 0, 250),
				Generator.getInstance().beacon("GODLU", 10000, 210)
			],
			{end: "hold"})
		);

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SIRIC", "1C"),
			[Generator.getInstance().runway("lc")],
			true,
			Generator.getInstance().beacon("SIRIC"),
			void 0,
			[
				Generator.getInstance().beacon("SIRIC", 18000),
				Generator.getInstance().beacon("BIG", 16000),
				Generator.getInstance().fix("UMTUM", "511227.30N", "0010102.78E", void 0, 250),
				Generator.getInstance().beacon("GODLU", 10000, 210)
			],
			{end: "hold"})
		.withEntry(18000, 90));
	}

	private transition() {
        const rwy = Generator.getInstance().runway("lc");

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LAVNO1G"),
			[Generator.getInstance().runway("lc")],
			false,
			Generator.getInstance().beacon("GODLU"),
			void 0,
			[
				Generator.getInstance().beacon("GODLU", 10000, 210),
				Generator.getInstance().fix("ELMIV", "512033.08N", "0011533.36E"),
				Generator.getInstance().fix("LCE11", "512504.57N", "0011834.81E"),
				Generator.getInstance().fix("LCE12", "512958.17N", "0011906.68E"),
				Generator.getInstance().fix("LCE13", "513442.46N", "0011704.79E", 10000),
				Generator.getInstance().fix("RAVSA", "512829.01N", "0005513.72E", 6000),
				Generator.getInstance().fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				Generator.getInstance().fix("ATPEV", "512918.05N", "0003322.74E"),
				Generator.getInstance().fix("LCE07", "512929.22N", "0002807.69E", 4000),
				Generator.getInstance().fix("TOPDU", "512945.72N", "0002009.82E", void 0, 210),
                Generator.getInstance().fix("LAVNO", StarFix.from(rwy.position.destination(rwy.localizer - 180, 6), 3000, 185)),
			],
			{end: rwy.localizer}
		));

		/**
		 * On LAVNO 1G, you can give a shortcut ELMIV→RAVSA.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LAVNO1G"),
			[Generator.getInstance().runway("lc")],
			false,
			Beacon.fromDMS("512829.01N", "0005513.72E", "RAVSA", "Ravsa"),
			302,
			[
				Generator.getInstance().fix("RAVSA", "512829.01N", "0005513.72E", 6000),
				Generator.getInstance().fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				Generator.getInstance().fix("ATPEV", "512918.05N", "0003322.74E"),
				Generator.getInstance().fix("LCE07", "512929.22N", "0002807.69E", 4000),
				Generator.getInstance().fix("TOPDU", "512945.72N", "0002009.82E", void 0, 210),
                Generator.getInstance().fix("LAVNO", StarFix.from(rwy.position.destination(rwy.localizer - 180, 6), 3000, 185)),
			],
			{end: rwy.localizer}
		));


		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LAVNO1J"),
			[Generator.getInstance().runway("lc")],
			false,
			Generator.getInstance().beacon("JACKO"),
			void 0,
			[
				Generator.getInstance().beacon("JACKO", 9000, 210),
				Generator.getInstance().fix("NONVA", "513846.45N", "0012144.31E"),
				Generator.getInstance().fix("BABKU", "513519.59N", "0011916.23E"),
				Generator.getInstance().fix("LCE21", "513006.82N", "0012130.07E"),
				Generator.getInstance().fix("LCE22", "512443.87N", "0012054.73E"),
				Generator.getInstance().fix("LCE23", "511945.28N", "0011734.94E", 9000),
				Generator.getInstance().fix("RAVSA", "512829.01N", "0005513.72E", 6000),
				Generator.getInstance().fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				Generator.getInstance().fix("ATPEV", "512918.05N", "0003322.74E"),
				Generator.getInstance().fix("LCE07", "512929.22N", "0002807.69E", 4000),
				Generator.getInstance().fix("TOPDU", "512945.72N", "0002009.82E", void 0, 210),
                Generator.getInstance().fix("LAVNO", StarFix.from(rwy.position.destination(rwy.localizer - 180, 6), 3000, 185)),
			],
			{end: rwy.localizer}
		));

		/**
		 * On LAVNO 1J, you can give a shortcut BABKU→RAVSA.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LAVNO1J"),
			[Generator.getInstance().runway("lc")],
			false,
			Beacon.fromDMS("512829.01N", "0005513.72E", "RAVSA", "Ravsa"),
			245,
			[
				Generator.getInstance().fix("RAVSA", "512829.01N", "0005513.72E", 6000),
				Generator.getInstance().fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				Generator.getInstance().fix("ATPEV", "512918.05N", "0003322.74E"),
				Generator.getInstance().fix("LCE07", "512929.22N", "0002807.69E", 4000),
				Generator.getInstance().fix("TOPDU", "512945.72N", "0002009.82E", void 0, 210),
                Generator.getInstance().fix("LAVNO", StarFix.from(rwy.position.destination(rwy.localizer - 180, 6), 3000, 185)),
			],
			{end: rwy.localizer}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ODLEG1G"),
			[Generator.getInstance().runway("lc")],
			"only",
			Generator.getInstance().beacon("GODLU"),
			void 0,
			[
				Generator.getInstance().beacon("GODLU", 10000, 210),
				Generator.getInstance().fix("ELMIV", "512033.08N", "0011533.36E"),
				Generator.getInstance().fix("LCE11", "512504.57N", "0011834.81E"),
				Generator.getInstance().fix("LCE12", "512958.17N", "0011906.68E"),
				Generator.getInstance().fix("LCE13", "513442.46N", "0011704.79E", 10000),
				Generator.getInstance().fix("RAVSA", "512829.01N", "0005513.72E", 6000),
				Generator.getInstance().fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				Generator.getInstance().fix("ATPEV", "512918.05N", "0003322.74E"),
				Generator.getInstance().fix("LCE07", "512929.22N", "0002807.69E", 4000),
				Generator.getInstance().fix("OSVEV", "512549.36N", "0001808.59E", 3000, 210),
				Generator.getInstance().fix("LCS01", "512603.37N", "0001109.39E", 3000, 185),
				Generator.getInstance().fix("LCS02", "512619.24N", "0000259.13E", 2000),
				Generator.getInstance().fix("TODBI", "512636.35N", "0000611.78W", 2000),
				Generator.getInstance().fix("ODLEG", "512925.35N", "0000716.56W", 2000, 185),
			],
			{end: 48}
		));

		/**
		 * On ODLEG 1G, you can give a shortcut ELMIV→RAVSA.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ODLEG1G"),
			[Generator.getInstance().runway("lc")],
			"only",
			Beacon.fromDMS("512829.01N", "0005513.72E", "RAVSA", "Ravsa"),
			302,
			[
				Generator.getInstance().fix("RAVSA", "512829.01N", "0005513.72E", 6000),
				Generator.getInstance().fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				Generator.getInstance().fix("ATPEV", "512918.05N", "0003322.74E"),
				Generator.getInstance().fix("LCE07", "512929.22N", "0002807.69E", 4000),
				Generator.getInstance().fix("OSVEV", "512549.36N", "0001808.59E", 3000, 210),
				Generator.getInstance().fix("LCS01", "512603.37N", "0001109.39E", 3000, 185),
				Generator.getInstance().fix("LCS02", "512619.24N", "0000259.13E", 2000),
				Generator.getInstance().fix("TODBI", "512636.35N", "0000611.78W", 2000),
				Generator.getInstance().fix("ODLEG", "512925.35N", "0000716.56W", 2000, 185),
			],
			{end: 48}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ODLEG1J"),
			[Generator.getInstance().runway("lc")],
			"only",
			Generator.getInstance().beacon("JACKO"),
			void 0,
			[
				Generator.getInstance().beacon("JACKO", 9000, 210),
				Generator.getInstance().fix("NONVA", "513846.45N", "0012144.31E"),
				Generator.getInstance().fix("BABKU", "513519.59N", "0011916.23E"),
				Generator.getInstance().fix("LCE21", "513006.82N", "0012130.07E"),
				Generator.getInstance().fix("LCE22", "512443.87N", "0012054.73E"),
				Generator.getInstance().fix("LCE23", "511945.28N", "0011734.94E", 9000),
				Generator.getInstance().fix("RAVSA", "512829.01N", "0005513.72E", 6000),
				Generator.getInstance().fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				Generator.getInstance().fix("ATPEV", "512918.05N", "0003322.74E"),
				Generator.getInstance().fix("LCE07", "512929.22N", "0002807.69E", 4000),
				Generator.getInstance().fix("OSVEV", "512549.36N", "0001808.59E", 3000, 210),
				Generator.getInstance().fix("LCS01", "512603.37N", "0001109.39E", 3000, 185),
				Generator.getInstance().fix("LCS02", "512619.24N", "0000259.13E", 2000),
				Generator.getInstance().fix("TODBI", "512636.35N", "0000611.78W", 2000),
				Generator.getInstance().fix("ODLEG", "512925.35N", "0000716.56W", 2000, 185),
			],
			{end: 48}
		));

		/**
		 * On ODLEG 1J, you can give a shortcut BABKU→RAVSA.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ODLEG1J"),
			[Generator.getInstance().runway("lc")],
			"only",
			Beacon.fromDMS("512829.01N", "0005513.72E", "RAVSA", "Ravsa"),
			245,
			[
				Generator.getInstance().fix("RAVSA", "512829.01N", "0005513.72E", 6000),
				Generator.getInstance().fix("GAPGI", "512844.89N", "0004820.99E", 6000),
				Generator.getInstance().fix("ATPEV", "512918.05N", "0003322.74E"),
				Generator.getInstance().fix("LCE07", "512929.22N", "0002807.69E", 4000),
				Generator.getInstance().fix("OSVEV", "512549.36N", "0001808.59E", 3000, 210),
				Generator.getInstance().fix("LCS01", "512603.37N", "0001109.39E", 3000, 185),
				Generator.getInstance().fix("LCS02", "512619.24N", "0000259.13E", 2000),
				Generator.getInstance().fix("TODBI", "512636.35N", "0000611.78W", 2000),
				Generator.getInstance().fix("ODLEG", "512925.35N", "0000716.56W", 2000, 185),
			],
			{end: 48}
		));
	}

	private sid() {
		const rwy = Generator.getInstance().runway("lc");

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SOQQA"), "1A"),
			rwy,
			[
				Generator.getInstance().fix("LCW01", "513024.40N", "0000020.78E"),
				Generator.getInstance().fix("LCN02", "513408.09N", "0000016.11W"),
				Generator.getInstance().fix("LCN06", "513608.68N", "0001118.82E"),
				Generator.getInstance().fix("SOQQA"),
                Generator.getInstance().fix("SODVU", "513515.48N", "0003446.80E"), // M87
                Generator.getInstance().fix("EKNIV", "512425.62N", "0003731.08E"), // M87
                Generator.getInstance().fix("UMTUM", "511227.30N", "0010102.78E"), // M87
                Generator.getInstance().fix("DVR") // L9
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SOQQA"), "1H"),
			rwy,
			[
				Generator.getInstance().fix("LCE01", "513014.67N", "0000529.91E"),
				Generator.getInstance().fix("LCE02", "513316.42N", "0000950.44E"),
				Generator.getInstance().fix("LCE03", "513346.90N", "0001436.66E"),
				Generator.getInstance().fix("SOQQA"),
                Generator.getInstance().fix("SODVU", "513515.48N", "0003446.80E"), // M87
                Generator.getInstance().fix("EKNIV", "512425.62N", "0003731.08E"), // M87
                Generator.getInstance().fix("UMTUM", "511227.30N", "0010102.78E"), // M87
                Generator.getInstance().fix("DVR") // L9
			],
			true
		));

		Generator.getInstance().departure(new SID(
			"BPK1A",
            `Brookmans Park ${Generator.alphabet("1A")}`,
			rwy,
			[
				Generator.getInstance().fix("LCW01", "513024.40N", "0000020.78E"),
				Generator.getInstance().fix("LCN01", "513332.44N", "0000109.21W"),
				Generator.getInstance().fix("LCN04", "513436.75N", "0000056.79E"),
				Generator.getInstance().fix("LCN05", "513538.42N", "0000257.77E"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W"),
                Generator.getInstance().fix("POTON", "520504.32N", "0002537.78W") // N601
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SAXBI"), "1A"),
			rwy,
			[
				Generator.getInstance().fix("LCW01", "513024.40N", "0000020.78E"),
				Generator.getInstance().fix("LCN01", "513332.44N", "0000109.21W"),
				Generator.getInstance().fix("LCN04", "513436.75N", "0000056.79E"),
				Generator.getInstance().fix("LCN05", "513538.42N", "0000257.77E"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W"),
				Generator.getInstance().fix("SAXBI"),
                Generator.getInstance().fix("HEN", "514535.07N", "0004725.05W"), // N27
                Generator.getInstance().fix("ICTAM", "513137.37N", "0010948.12W"), // N27
                Generator.getInstance().fix("DIDZA", "513627.71N", "0012343.46W") // L9
			]
		));

		Generator.getInstance().departure(new SID(
			"BPK1H",
            `Brookmans Park ${Generator.alphabet("1H")}`,
			rwy,
			[
				Generator.getInstance().fix("LCE01", "513014.67N", "0000529.91E"),
				Generator.getInstance().fix("LCN03", "513424.02N", "0000750.39E"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W"),
                Generator.getInstance().fix("POTON", "520504.32N", "0002537.78W") // N601
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SAXBI"), "1H"),
			rwy,
			[
				Generator.getInstance().fix("LCE01", "513014.67N", "0000529.91E"),
				Generator.getInstance().fix("LCN03", "513424.02N", "0000750.39E"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W"),
				Generator.getInstance().fix("SAXBI"),
                Generator.getInstance().fix("HEN", "514535.07N", "0004725.05W"), // N27
                Generator.getInstance().fix("ICTAM", "513137.37N", "0010948.12W"), // N27
                Generator.getInstance().fix("DIDZA", "513627.71N", "0012343.46W") // L9
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("ODUKU"), "1A"),
			rwy,
			[
				Generator.getInstance().fix("LCW01", "513024.40N", "0000020.78E"),
				Generator.getInstance().fix("LCN02", "513408.09N", "0000016.11W"),
				Generator.getInstance().fix("LCE04", "513619.70N", "0001222.73E"),
				Generator.getInstance().fix("ODUKU"),
                Generator.getInstance().fix("CLN") // M84
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("ODUKU"), "1H"),
			rwy,
			[
				Generator.getInstance().fix("LCE01", "513014.67N", "0000529.91E"),
				Generator.getInstance().fix("LCE02", "513316.42N", "0000950.44E"),
				Generator.getInstance().fix("ODUKU"),
                Generator.getInstance().fix("CLN") // M84
			],
			true
		));
	}

    private ils() {
        const rwy = Generator.getInstance().runway("lc");

        Generator.getInstance().arrival(new STAR(
            "ILS",
            "I-L-S",
            [rwy],
            false,
            Generator.getInstance().beacon("LCY"),
            void 0,
            [
                Generator.getInstance().beacon("LCY", 2000),
                Generator.getInstance().beacon("LCY"),
                new Fix(51.5397, 0.0678),
                rwy.position.destination(rwy.localizer - 180, 6)
                    .bearingIntersection(360, new Fix(51.5397, 0.0678), 92),
                rwy.position.destination(rwy.localizer - 180, 6)
                    .bearingIntersection(360, new Fix(51.5397, 0.0678), 92),
                rwy.position.destination(rwy.localizer - 180, 6),
            ],
            {ils: {dme: 6}}
        ));

        Generator.getInstance().arrival(new STAR(
            "ILS",
            "I-L-S",
            [rwy],
            "only",
            Generator.getInstance().beacon("LCY"),
            void 0,
            [
                Generator.getInstance().beacon("LCY", 2000),
                Generator.getInstance().beacon("LCY")
                    .destination(304, 5), // technically D is from I-LST…
                Generator.getInstance().beacon("LCY")
                    .destination(304, 5),
                rwy.reverse().position.destination(rwy.reverseLocalizer + 180, 4.9),
            ],
            {ils: {dme: 4.9}}
        ));
    }
}
