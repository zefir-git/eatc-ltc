import fs from "node:fs/promises";
import Airport from "../src/Airport.js";
import Beacon from "../src/Beacon.js";
import Fix from "../src/Fix.js";
import Generator from "../src/Generator.js";
import NamedFix from "../src/NamedFix.js";
import Runway from "../src/Runway.js";
import SID from "../src/SID.js";
import STAR from "../src/STAR.js";
import StarFix from "../src/StarFix.js";

export default class EGLL {
	public async init() {
		await this.airport();
        this.rnp();
		this.star();
		this.sid();
	}

	private async airport() {
        Generator.getInstance().fix("ARP-LL", "512839N", "0002741W");

		Generator.getInstance().airport(
			new Airport(
				"London Heathrow Airport",
				"Heathrow",
				process.env.NODE_ENV === "development" ? "TEST" : "LTCC",
				60,
				6000,
				[
					new Runway("lln", "27R",
						Fix.fromDMS("512839.63N", "0002559.82W"),
						269.71, 77,
						3901 / Fix.FT, 0, 309 / Fix.FT,
						void 0,
						void 0,
						118.7,
						"Tower",
						89.67
					),
					new Runway("lls", "27L",
						Fix.fromDMS("512753.82N", "0002602.76W"),
						269.72, 75,
						3658 / Fix.FT, 0, 308 / Fix.FT,
						void 0,
						void 0,
						118.5,
						"Tower",
						89.68
					),
				],
				[
					new Airport.EntryPoint(220, Generator.getInstance().beacon("HAZEL"), 13000),
					new Airport.EntryPoint(319, Generator.getInstance().beacon("TOBID"), 15000),
					new Airport.EntryPoint(217, Generator.getInstance().beacon("BEGTO"), 16000),
					new Airport.EntryPoint(213, Generator.getInstance().beacon("BEGTO"), 16000),
                    ...(process.argv.includes("--debug-entry") ? Array.from({length: 360}, (_, i) => new Airport.EntryPoint(i)) : []),
				],
				Airport.Airline.raw(await fs.readFile("./airlines/EGLL.txt", "utf8")),
				[
					NamedFix.fromDMS("512930N", "0011311W", "CPT", "Compton"),
					NamedFix.fromDMS("511459N", "0003343W", "MAXIT", "Maxit"),
					NamedFix.fromDMS("511401N", "0002910W", "MODMI", "Modmi"),
					NamedFix.fromDMS("514459.05N", "0000624.25W", "BPK", "Brookmans Park"),
					NamedFix.fromDMS("514020N", "0004139W", "UMLAT", "Umlat"),
					NamedFix.fromDMS("513936N", "0001644W", "ULTIB", "Ultib"),
					NamedFix.fromDMS("511814.41N", "0003550.19E", "DET", "Detling"),
					NamedFix.fromDMS("511727N", "0010002W", "GOGSI", "Gogsi"),
					NamedFix.fromDMS("511224N", "0005736W", "GASGU", "Gasgu"),
				],
				Generator.getInstance().beacon("LON")
			)
		);
	}

	private star() {
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("OTMET1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("BEGTO"),
			63,
			[
				Generator.getInstance().beacon("BEGTO"),
				Generator.getInstance().beacon("HAZEL", 13000),
				Generator.getInstance().fix("LLS01", "511021.99N", "0004108.43W", void 0, 250),
				Generator.getInstance().beacon("OCK", 7000, 220)
			],
			{end: "hold"}));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ROXOG1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("BEGTO"),
			28,
			[
				Generator.getInstance().beacon("BEGTO"),
				Generator.getInstance().beacon("HAZEL", 13000),
				Generator.getInstance().fix("LLS01", "511021.99N", "0004108.43W", void 0, 250),
				Generator.getInstance().beacon("OCK", 7000, 220)
			],
			{end: "hold"}));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ALESO1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("ROTNO"),
			314,
			[
				Generator.getInstance().beacon("ROTNO"),
				Generator.getInstance().fix("ETVAX", "505806.99N", "0003556.27E", 18000),
				Generator.getInstance().beacon("TIGER"),
				Generator.getInstance().fix("LLE01", "511113.96N", "0001521.68E", void 0, 250),
				Generator.getInstance().beacon("BIG", 7000, 220)
			],
			{end: "hold"})
		.withEntry(19000));

		/**
		 * This arrival is to enable continuation on ALESO 1H if interrupted
		 * with HOLD at TIGER.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ALESO1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("TIGER"),
			314,
			[
				Generator.getInstance().beacon("TIGER"),
				Generator.getInstance().fix("LLE01", "511113.96N", "0001521.68E", void 0, 250),
				StarFix.from(Generator.getInstance().beacon("BIG"), 7000, 220)
			],
			{end: "hold"}
		));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("LAM", "1X"),
            [Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
            true,
            Beacon.fromDMS("512006.04N", "0001437.38E", "HILLY", "Hilly"),
            169,
            [
                Generator.getInstance().fix("HILLY", "512006.04N", "0001437.38E", void 0, 220),
                Generator.getInstance().fix("HILLY", "512006.04N", "0001437.38E"),
                Generator.getInstance().beacon("BIG", 7000, 220),
            ],
            {end: "hold"},
        ));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("TANET", "1Z"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("TANET"),
			void 0,
			[
				Generator.getInstance().beacon("TANET"),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E"),
				Generator.getInstance().fix("LLE02", "511857.68N", "0002109.87E", void 0, 250),
				Generator.getInstance().beacon("BIG", 7000, 220)
			],
			{end: "hold"}
		));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("OCK", "1Z"),
            [Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
            true,
            Beacon.fromDMS("511633.00N", "0001552.00W", "DORKI", "Dorky"),
            104,
            [
                Generator.getInstance().fix("DORKI", "511633.00N", "0001552.00W", void 0, 250),
                Generator.getInstance().fix("HILLY", "512006.04N", "0001437.38E", void 0, 220),
                Generator.getInstance().fix("HILLY", "512006.04N", "0001437.38E"),
                Generator.getInstance().fix("HILLY").bearingIntersection(180, Generator.getInstance().beacon("BIG"),
                    302 - 180),
                Generator.getInstance().beacon("BIG", 7000, 220),
            ],
            {end: "hold"},
        ));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("NUGRA2H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("TOBID"),
			147,
			[
				Generator.getInstance().beacon("TOBID"),
				Generator.getInstance().fix("SOPIT", 15000, 220),
				Generator.getInstance().beacon("WEZKO", void 0, 220),
				Generator.getInstance().beacon("BNN", 7000, 220)
			],
			{end: "hold"}));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("LAM", "1Z"),
            [Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
            true,
            Beacon.fromDMS("514200.38N", "0004437.04W", "DONNA", "Donna"),
            275,
            [
                Generator.getInstance().fix("DONNA", "514200.38N", "0004437.04W", void 0, 220),
                Generator.getInstance().fix("DONNA", "514200.38N", "0004437.04W"),
                Generator.getInstance().beacon("BNN", 7000, 220),
            ],
            {end: "hold"},
        ));


        Generator.getInstance().arrival(new STAR(
			"HON2H",
			`Honiley ${Generator.alphabet("2H")}`,
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("TOBID"),
			139,
			[
				Generator.getInstance().beacon("TOBID"),
				Generator.getInstance().fix("SOPIT", 15000, 220),
				Generator.getInstance().beacon("WEZKO", void 0, 220),
				Generator.getInstance().beacon("BNN", 7000, 220)
			],
			{end: "hold"}));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("BARMI1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("LOGAN"),
			228,
			[
				Generator.getInstance().beacon("LOGAN", 25000),
				Generator.getInstance().fix("SABER", "514213.76N", "0005658.19E", 16000),
				Generator.getInstance().fix("BRASO", "514106.57N", "0004100.03E"),
				Generator.getInstance().fix("WESUL", "514015.29N", "0002909.27E", void 0, 250),
				Generator.getInstance().beacon("LAM", 7000, 220)
			],
			{end: "hold"})
		.withEntry(22000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LOGAN", "2H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("LOGAN"),
			289,
			[
				Generator.getInstance().beacon("LOGAN", 25000),
				Generator.getInstance().fix("SABER", "514213.76N", "0005658.19E", 16000),
				Generator.getInstance().fix("BRASO", "514106.57N", "0004100.03E"),
				Generator.getInstance().fix("WESUL", "514015.29N", "0002909.27E", void 0, 250),
				Generator.getInstance().beacon("LAM", 7000, 220)
			],
			{end: "hold"})
		.withEntry(22000, 320));

		// TOBID 1X omitted (TOBID→OCK)

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("HAZEL", "1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("HAZEL"),
			void 0,
			[
				Generator.getInstance().beacon("HAZEL", 13000),
				Generator.getInstance().fix("LLS01", "511021.99N", "0004108.43W", void 0, 250),
				Generator.getInstance().beacon("OCK", 7000, 220)
			],
			{end: "hold"}
		));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("BIG", "1Z"),
            [Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
            true,
            Beacon.fromDMS("511633.00N", "0001552.00W", "DORKI", "Dorky"),
            253,
            [
                Generator.getInstance().fix("DORKI", "511633.00N", "0001552.00W"),
                Generator.getInstance().beacon("OCK", 7000, 220)
            ],
            {end: "hold"},
        ));

        Generator.getInstance().arrival(new STAR(
            ...Generator.getInstance().pronounce("LAM", "1Y"),
            [Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
            true,
            Beacon.fromDMS("511633.00N", "0001552.00W", "DORKI", "Dorky"),
            215,
            [
                Generator.getInstance().fix("DORKI", "511633.00N", "0001552.00W"),
                Generator.getInstance().beacon("OCK", 7000, 220)
            ],
            {end: "hold"},
        ));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("FITBO2H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("SOPIT"),
			107,
			[
				Generator.getInstance().fix("SOPIT", 15000, 220),
				Generator.getInstance().beacon("WEZKO", void 0, 220),
				Generator.getInstance().beacon("BNN", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SIRIC", "1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("SIRIC"),
			void 0,
			[
				Generator.getInstance().beacon("SIRIC", 14000),
				Generator.getInstance().fix("NIGIT", "511846.96N", "0011014.71W"),
				Generator.getInstance().fix("LLW03", "511832.83N", "0004556.94W", void 0, 250),
				Generator.getInstance().beacon("OCK", 7000, 220)
			],
			{end: "hold"})
		.withEntry(14000, 96));

		// SIRIC 1Z omitted (SIRIC→BNN)
	}

	private sid() {
		const lln = Generator.getInstance().runway("lln");
		const llnRev = lln.reverse();
		const lls = Generator.getInstance().runway("lls");
		const llsRev = lls.reverse();

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("CPT"), "3F"),
			lln,
			[
				llnRev.position.bearingIntersection(lln.heading, Generator.getInstance().beacon("LON"), 255),
				Generator.getInstance().beacon("LON").destination(255, 7),
				Generator.getInstance().fix("WOD", "512710N", "0005244W"),
				Generator.getInstance().fix("CPT").destination(100, 8),
				Generator.getInstance().fix("CPT"),
                Generator.getInstance().fix("HEKXA", "513103.61N", "0012026.55W"), // Q63
                Generator.getInstance().fix("SAWPE", "513504.67N", "0013916.42W"), // Q63
                Generator.getInstance().fix("ASHUM", "513607.25N", "0015336.46W") // Q63
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("CPT"), "3G"),
			lls,
			[
				llsRev.position.bearingIntersection(lls.heading, Generator.getInstance().beacon("LON"), 255),
				Generator.getInstance().beacon("LON").destination(255, 7),
				Generator.getInstance().fix("WOD", "512710N", "0005244W"),
				Generator.getInstance().fix("CPT").destination(100, 8),
				Generator.getInstance().fix("CPT"),
                Generator.getInstance().fix("HEKXA", "513103.61N", "0012026.55W"), // Q63
                Generator.getInstance().fix("SAWPE", "513504.67N", "0013916.42W"), // Q63
                Generator.getInstance().fix("ASHUM", "513607.25N", "0015336.46W") // Q63
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("CPT"), "5J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				new Fix(51.4500, -0.3280),
				new Fix(51.4300, -0.3280),
				lls.position.bearingIntersection(180, Generator.getInstance().fix("WOD", "512710N", "0005244W"), 101),
				Generator.getInstance().fix("WOD", "512710N", "0005244W"),
				Generator.getInstance().fix("CPT").destination(100, 8),
				Generator.getInstance().fix("CPT"),
                Generator.getInstance().fix("HEKXA", "513103.61N", "0012026.55W"), // Q63
                Generator.getInstance().fix("SAWPE", "513504.67N", "0013916.42W"), // Q63
                Generator.getInstance().fix("ASHUM", "513607.25N", "0015336.46W") // Q63
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("CPT"), "4k"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				new Fix(51.4600, -0.3280),
				new Fix(51.4100, -0.3280),
				lln.position.bearingIntersection(180, Generator.getInstance().fix("WOD", "512710N", "0005244W"), 101),
				Generator.getInstance().fix("WOD", "512710N", "0005244W"),
				Generator.getInstance().fix("CPT").destination(100, 8),
				Generator.getInstance().fix("CPT"),
                Generator.getInstance().fix("HEKXA", "513103.61N", "0012026.55W"), // Q63
                Generator.getInstance().fix("SAWPE", "513504.67N", "0013916.42W"), // Q63
                Generator.getInstance().fix("ASHUM", "513607.25N", "0015336.46W") // Q63
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("MAXIT"), "1F"),
			lln,
			[
				llnRev.position.bearingIntersection(lln.heading, Generator.getInstance().beacon("LON"), 255),
				Generator.getInstance().beacon("LON").destination(255, 5),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(161, 7.9),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(161, 10.5),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(161, 14),
				Generator.getInstance().fix("MAXIT"),
                Generator.getInstance().fix("MID", "510314.23N", "0003730.01W") // Y803
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("MAXIT"), "1G"),
			lls,
			[
				llsRev.position.bearingIntersection(lls.heading, Generator.getInstance().beacon("LON"), 239),
				Generator.getInstance().beacon("LON").destination(239, 5.5),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(161, 7.9),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(161, 10.5),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(161, 14),
				Generator.getInstance().fix("MAXIT"),
                Generator.getInstance().fix("MID", "510314.23N", "0003730.01W") // Y803
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("MODMI"), "1J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				Generator.getInstance().beacon("LON").destination(124, 3.5),
				Generator.getInstance().beacon("LON").bearingIntersection(124, Generator.getInstance().fix("MID", "510314.23N", "0003730.01W"), 25.6),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W").destination(25.6, 18),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W").destination(25.6, 15),
				Generator.getInstance().fix("MODMI"),
                Generator.getInstance().fix("MID", "510314.23N", "0003730.01W") // M185
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("MODMI"), "1K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				Generator.getInstance().beacon("LON").destination(124, 3.5),
				Generator.getInstance().beacon("LON").bearingIntersection(124, Generator.getInstance().fix("MID", "510314.23N", "0003730.01W"), 25.6),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W").destination(25.6, 18),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W").destination(25.6, 15),
				Generator.getInstance().fix("MODMI"),
                Generator.getInstance().fix("MID", "510314.23N", "0003730.01W") // M185
			],
			true
		));

		Generator.getInstance().departure(new SID(
			"BPK7F",
            `Brookmans Park ${Generator.alphabet("7F")}`,
			lln,
			[
				Generator.getInstance().fix("BUR", "513108N", "0004038W").bearingIntersection(297 - 180, llnRev.position, lln.heading),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				Generator.getInstance().fix("BUR", "513108N", "0004038W"),
				Generator.getInstance().beacon("LON").bearingIntersection(304, Generator.getInstance().fix("CHT", "513723N", "0003107W"), 53 + 180),
				Generator.getInstance().beacon("LON").bearingIntersection(325, Generator.getInstance().fix("CHT", "513723N", "0003107W"), 53 + 180),
				Generator.getInstance().fix("CHT", "513723N", "0003107W"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W"),
                Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E"), // L620,
                Generator.getInstance().fix("REDFA", "520652.75N", "0022916.81E") // L620
			]
		));

		Generator.getInstance().departure(new SID(
			"BPK7G",
            `Brookmans Park ${Generator.alphabet("7G")}`,
			lls,
			[
				Generator.getInstance().fix("BUR", "513108N", "0004038W").bearingIntersection(297 - 180, llsRev.position, lls.heading),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				Generator.getInstance().fix("BUR", "513108N", "0004038W"),
				Generator.getInstance().beacon("LON").bearingIntersection(304, Generator.getInstance().fix("CHT", "513723N", "0003107W"), 53 + 180),
				Generator.getInstance().beacon("LON").bearingIntersection(325, Generator.getInstance().fix("CHT", "513723N", "0003107W"), 53 + 180),
				Generator.getInstance().fix("CHT", "513723N", "0003107W"),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W"),
                Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E"), // L620,
                Generator.getInstance().fix("REDFA", "520652.75N", "0022916.81E") // L620
			]
		));

		Generator.getInstance().departure(new SID(
			"BPK6J",
            `Brookmans Park ${Generator.alphabet("6J")}`,
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				lls.position.destination(lls.reverseLocalizer, .4).bearingIntersection(50, Generator.getInstance().beacon("LON"), 70),
				Generator.getInstance().beacon("LON").destination(70, 10),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W").destination(196, 10),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W").destination(196, 6),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W"),
                Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E"), // L620,
                Generator.getInstance().fix("REDFA", "520652.75N", "0022916.81E") // L620
			],
			true
		));

		Generator.getInstance().departure(new SID(
			"BPK6K",
            `Brookmans Park ${Generator.alphabet("5K")}`,
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				lln.position.destination(lln.reverseLocalizer, .1).bearingIntersection(50, Generator.getInstance().beacon("LON"), 70),
				Generator.getInstance().beacon("LON").destination(70, 10),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W").destination(196, 10),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W").destination(196, 6),
				Generator.getInstance().fix("BPK", "514459.05N", "0000624.25W"),
                Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E"), // L620,
                Generator.getInstance().fix("REDFA", "520652.75N", "0022916.81E") // L620
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("UMLAT"), "1F"),
			lln,
			[
				llnRev.position.bearingIntersection(lln.heading, Generator.getInstance().fix("BUR", "513108N", "0004038W"), 297 - 180),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				Generator.getInstance().fix("BUR", "513108N", "0004038W"),
				Generator.getInstance().fix("UMLAT"),
                Generator.getInstance().fix("WOBUN", "520110.27N", "0004400.00W") // T418
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("UMLAT"), "1G"),
			lls,
			[
				llsRev.position.bearingIntersection(lls.heading, Generator.getInstance().fix("BUR", "513108N", "0004038W"), 297 - 180),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				Generator.getInstance().fix("BUR", "513108N", "0004038W"),
				Generator.getInstance().fix("UMLAT"),
                Generator.getInstance().fix("WOBUN", "520110.27N", "0004400.00W") // T418
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("ULTIB"), "1J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				lls.position.destination(lls.reverseLocalizer, .4).bearingIntersection(50, Generator.getInstance().beacon("LON"), 70),
				Generator.getInstance().beacon("LON").bearingIntersection(70, Generator.getInstance().beacon("BIG"), 328),
				Generator.getInstance().beacon("BIG").destination(328, 20),
				Generator.getInstance().fix("ULTIB"),
                Generator.getInstance().fix("BUZAD", "515632.08N", "0003308.21W") // T420
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("ULTIB"), "1K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				lln.position.destination(lln.reverseLocalizer, .1).bearingIntersection(50, Generator.getInstance().beacon("LON"), 70),
				Generator.getInstance().beacon("LON").bearingIntersection(70, Generator.getInstance().beacon("BIG"), 328),
				Generator.getInstance().beacon("BIG").destination(328, 20),
				Generator.getInstance().fix("ULTIB"),
                Generator.getInstance().fix("BUZAD", "515632.08N", "0003308.21W") // T420
			],
			true
		));

		Generator.getInstance().departure(new SID(
			"DET2F",
            `Detling ${Generator.alphabet("2F")}`,
			lln,
			[
				llnRev.position.destination(lln.heading, 2),
				Generator.getInstance().fix("EPSOM", "511910N", "0002219W"),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(270, 32),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(270, 29),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(270, 5),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E"),
                Generator.getInstance().fix("DVR", "510945.44N", "0012132.71E") // L6
			]
		));

		Generator.getInstance().departure(new SID(
			"DET2G",
            `Detling ${Generator.alphabet("2G")}`,
			lls,
			[
				llsRev.position.destination(lls.heading, 1),
				Generator.getInstance().fix("EPSOM", "511910N", "0002219W"),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(270, 32),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(270, 29),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(270, 5),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E"),
                Generator.getInstance().fix("DVR", "510945.44N", "0012132.71E") // L6
			]
		));

		Generator.getInstance().departure(new SID(
			"DET1J",
            `Detling ${Generator.alphabet("1J")}`,
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(282, 34),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(282, 29),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(282, 20),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(282, 5),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E"),
                Generator.getInstance().fix("DVR", "510945.44N", "0012132.71E") // L6
			],
			true
		));

		Generator.getInstance().departure(new SID(
			"DET1K",
            `Detling ${Generator.alphabet("1K")}`,
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(282, 34),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(282, 29),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(282, 20),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E").destination(282, 5),
				Generator.getInstance().fix("DET", "511814.41N", "0003550.19E"),
                Generator.getInstance().fix("DVR", "510945.44N", "0012132.71E") // L6
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("GOGSI"), "2F"),
			lln,
			[
				llnRev.position.bearingIntersection(lln.heading, Generator.getInstance().beacon("LON"), 255),
				Generator.getInstance().beacon("LON").destination(255, 7),
				Generator.getInstance().fix("WOD", "512710N", "0005244W").destination(268 - 180, 1.65),
				Generator.getInstance().fix("WOD", "512710N", "0005244W").destination(268 - 180, .9),
				Generator.getInstance().beacon("SAM").destination(32, 32.8),
				Generator.getInstance().beacon("SAM").destination(32, 29.6),
				Generator.getInstance().fix("GOGSI"),
                Generator.getInstance().beacon("SAM"), // N621
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("GOGSI"), "2G"),
			lls,
			[
				llsRev.position.bearingIntersection(lls.heading, Generator.getInstance().beacon("LON"), 255),
				Generator.getInstance().fix("WOD", "512710N", "0005244W").destination(268 - 180, 1.65),
				Generator.getInstance().fix("WOD", "512710N", "0005244W").destination(268 - 180, .9),
				Generator.getInstance().beacon("SAM").destination(32, 32.8),
				Generator.getInstance().beacon("SAM").destination(32, 29.6),
				Generator.getInstance().fix("GOGSI"),
                Generator.getInstance().beacon("SAM"), // N621
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("GASGU"), "2J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				Generator.getInstance().beacon("LON").destination(124, 5),
				Generator.getInstance().beacon("OCK").destination(41, 2),
				Generator.getInstance().beacon("OCK"),
				Generator.getInstance().beacon("OCK").destination(253, 1.4),
				Generator.getInstance().beacon("OCK").destination(253, 4.7),
				Generator.getInstance().fix("GASGU"),
                Generator.getInstance().beacon("SAM"), // N866
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("GASGU"), "2K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				Generator.getInstance().beacon("LON").destination(124, 5),
				Generator.getInstance().beacon("OCK").destination(42, 2),
				Generator.getInstance().beacon("OCK"),
				Generator.getInstance().beacon("OCK").destination(253, 1.4),
				Generator.getInstance().beacon("OCK").destination(253, 4.7),
				Generator.getInstance().fix("GASGU"),
                Generator.getInstance().beacon("SAM"), // N866
			],
			true
		));
	}

    private rnp() {
        const lln = Generator.getInstance().runway("lln");
        const lls = Generator.getInstance().runway("lls");

        const ABAVI = Beacon.fromDMS("512834.45N", "0004505.67W", "ABAVI", "Abavi");
        const BEMPA = Beacon.fromDMS("512748.76N", "0004455.76W", "BENPA", "Benpa");
        const NEKSA = Beacon.fromDMS("512755.72N", "0001001.89W", "NEKSA", "Neksa");
        const IVLAR = Beacon.fromDMS("512841.57N", "0001000.08W", "IVLAR", "Ivlar");

        Generator.getInstance().arrival(new STAR(
            "RNP",
            "R-N-P",
            [lln],
            "only",
            ABAVI,
            void 0,
            [
                StarFix.from(ABAVI, 3000),
                Generator.getInstance().fix("L09LF", "512836.05N", "0004015.82W", 2500),
            ],
            {ils: {dme: 4, altitude: 1400}}
        ));

        Generator.getInstance().arrival(new STAR(
            "RNP",
            "R-N-P",
            [lls],
            "only",
            BEMPA,
            void 0,
            [
                StarFix.from(BEMPA, 3000),
                Generator.getInstance().fix("L09RF", "512750.34N", "0004007.13W", 2500),
            ],
            {ils: {dme: 4, altitude: 1400}}
        ));

        Generator.getInstance().arrival(new STAR(
            "RNP",
            "R-N-P",
            [lls],
            false,
            NEKSA,
            void 0,
            [
                StarFix.from(NEKSA, 3000),
                Generator.getInstance().fix("L27LF", "512755.40N", "0001452.50W", 2500)
            ],
            {ils: {dme: 4, altitude: 1400}}
        ));

        Generator.getInstance().arrival(new STAR(
            "RNP",
            "R-N-P",
            [lln],
            false,
            IVLAR,
            void 0,
            [
                StarFix.from(IVLAR, 3000),
                Generator.getInstance().fix("L27RF", "512841.22N", "0001449.66W", 2500),
            ],
            {ils: {dme: 4, altitude: 1410}}
        ));
    }
}
