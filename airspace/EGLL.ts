import Generator from "../src/Generator.js";
import STAR from "../src/STAR.js";
import StarFix from "../src/StarFix.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import SID from "../src/SID.js";
import NamedFix from "../src/NamedFix.js";
import fs from "node:fs/promises";

export default class EGLL {
	public async init() {
		await this.airport();
		this.star();
		this.sid();
	}

	private async airport() {
		Generator.getInstance().airport(
			new Airport(
				"London Heathrow Airport",
				"Heathrow",
				"LTCC",
				57.7,
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
					...new Array(3).fill(new Airport.EntryPoint(220, Generator.getInstance().beacon("HAZEL"), 13000)),
				],
				Airport.Airline.raw(await fs.readFile("./airlines/EGLL.txt", "utf8")),
				[
					NamedFix.fromDMS("512930N", "0011311W", "CPT", "Compton"),
					NamedFix.fromDMS("511459N", "0003343W", "MAXIT", "Maxit"),
					NamedFix.fromDMS("511401N", "0002910W", "MODMI", "Modmi"),
					Generator.getInstance().beacon("BPK"),
					NamedFix.fromDMS("514020N", "0004139W", "UMLAT", "Umlat"),
					NamedFix.fromDMS("513936N", "0001644W", "ULTIB", "Ultib"),
					Generator.getInstance().beacon("DET"),
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
			{end: "hold"})
		.withEntry(16000).repeated(3));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ROXOG1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("BEGTO"),
			17,
			[
				Generator.getInstance().beacon("BEGTO"),
				Generator.getInstance().beacon("HAZEL", 13000),
				Generator.getInstance().fix("LLS01", "511021.99N", "0004108.43W", void 0, 250),
				Generator.getInstance().beacon("OCK", 7000, 220)
			],
			{end: "hold"})
		.withEntry(16000).repeated(3));

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
		.withEntry(19000).repeated(3));

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

		// LAM 1X omitted (LAM→BIG)

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("TANET", "1Z"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("TANET"),
			void 0,
			[
				Generator.getInstance().beacon("TANET"),
				Generator.getInstance().beacon("DET"),
				Generator.getInstance().fix("LLE02", "511857.68N", "0002109.87E", void 0, 250),
				Generator.getInstance().beacon("BIG", 7000, 220)
			],
			{end: "hold"}
		));

		// OCK 1Z omitted (OCK→BIG)

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("NUGRA1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("TOBID"),
			147,
			[
				Generator.getInstance().beacon("TOBID"),
				Generator.getInstance().fix("SOPIT", 15000),
				Generator.getInstance().beacon("WCO", void 0, 220),
				Generator.getInstance().beacon("BNN", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000).repeated(3));

		// LAM 1Z omitted (LAM→BNN)

		Generator.getInstance().arrival(new STAR(
			"HON1H",
			"Honiley one hotel",
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("TOBID"),
			139,
			[
				Generator.getInstance().beacon("TOBID"),
				Generator.getInstance().fix("SOPIT", 15000),
				Generator.getInstance().beacon("WCO", void 0, 220),
				Generator.getInstance().beacon("BNN", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000).repeated(3));

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
		.withEntry(22000).repeated(3));

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
		.withEntry(22000, 320).repeated(3));

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

		// BIG 1Z omitted (BIG→OCK)
		// LAM 1Y omitted (LAM→OCK)

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("FITBO1H"),
			[Generator.getInstance().runway("lln"), Generator.getInstance().runway("lls")],
			true,
			Generator.getInstance().beacon("SOPIT"),
			107,
			[
				Generator.getInstance().fix("SOPIT", 15000),
				Generator.getInstance().beacon("WCO", void 0, 220),
				Generator.getInstance().beacon("BNN", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000).repeated(3));

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
		.withEntry(14000, 96).repeated(3));

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
				Generator.getInstance().fix("CPT")
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
				Generator.getInstance().fix("CPT")
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
				Generator.getInstance().fix("CPT")
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
				Generator.getInstance().fix("CPT")
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
				Generator.getInstance().fix("MAXIT")
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
				Generator.getInstance().fix("MAXIT")
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
				Generator.getInstance().fix("MODMI")
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
				Generator.getInstance().fix("MODMI")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("BPK", "7F"),
			lln,
			[
				Generator.getInstance().fix("BUR", "513108N", "0004038W").bearingIntersection(297 - 180, llnRev.position, lln.heading),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				Generator.getInstance().fix("BUR", "513108N", "0004038W"),
				Generator.getInstance().beacon("LON").bearingIntersection(304, Generator.getInstance().fix("CHT", "513723N", "0003107W"), 53 + 180),
				Generator.getInstance().beacon("LON").bearingIntersection(325, Generator.getInstance().fix("CHT", "513723N", "0003107W"), 53 + 180),
				Generator.getInstance().fix("CHT", "513723N", "0003107W"),
				Generator.getInstance().beacon("BPK")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("BPK", "7G"),
			lls,
			[
				Generator.getInstance().fix("BUR", "513108N", "0004038W").bearingIntersection(297 - 180, llsRev.position, lls.heading),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				Generator.getInstance().fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				Generator.getInstance().fix("BUR", "513108N", "0004038W"),
				Generator.getInstance().beacon("LON").bearingIntersection(304, Generator.getInstance().fix("CHT", "513723N", "0003107W"), 53 + 180),
				Generator.getInstance().beacon("LON").bearingIntersection(325, Generator.getInstance().fix("CHT", "513723N", "0003107W"), 53 + 180),
				Generator.getInstance().fix("CHT", "513723N", "0003107W"),
				Generator.getInstance().beacon("BPK")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("BPK", "6J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				lls.position.destination(lls.reverseLocalizer, .4).bearingIntersection(50, Generator.getInstance().beacon("LON"), 70),
				Generator.getInstance().beacon("LON").destination(70, 10),
				Generator.getInstance().beacon("BPK").destination(196, 10),
				Generator.getInstance().beacon("BPK").destination(196, 6),
				Generator.getInstance().fix("BAPAG", "514305N", "0000724W"),
				Generator.getInstance().beacon("BPK")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("BPK", "6K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				lln.position.destination(lln.reverseLocalizer, .1).bearingIntersection(50, Generator.getInstance().beacon("LON"), 70),
				Generator.getInstance().beacon("LON").destination(70, 10),
				Generator.getInstance().beacon("BPK").destination(196, 10),
				Generator.getInstance().beacon("BPK").destination(196, 6),
				Generator.getInstance().fix("BAPAG", "514305N", "0000724W"),
				Generator.getInstance().beacon("BPK")
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
				Generator.getInstance().fix("UMLAT")
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
				Generator.getInstance().fix("UMLAT")
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
				Generator.getInstance().fix("ULTIB")
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
				Generator.getInstance().fix("ULTIB")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("DET", "2F"),
			lln,
			[
				llnRev.position.destination(lln.heading, 2),
				Generator.getInstance().fix("EPSOM", "511910N", "0002219W"),
				Generator.getInstance().beacon("DET").destination(270, 32),
				Generator.getInstance().beacon("DET").destination(270, 29),
				Generator.getInstance().beacon("DET").destination(270, 5),
				Generator.getInstance().beacon("DET")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("DET", "2G"),
			lls,
			[
				llsRev.position.destination(lls.heading, 1),
				Generator.getInstance().fix("EPSOM", "511910N", "0002219W"),
				Generator.getInstance().beacon("DET").destination(270, 32),
				Generator.getInstance().beacon("DET").destination(270, 29),
				Generator.getInstance().beacon("DET").destination(270, 5),
				Generator.getInstance().beacon("DET")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("DET", "1J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				Generator.getInstance().beacon("DET").destination(282, 34),
				Generator.getInstance().beacon("DET").destination(282, 29),
				Generator.getInstance().beacon("DET").destination(282, 20),
				Generator.getInstance().beacon("DET").destination(282, 5),
				Generator.getInstance().beacon("DET")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("DET", "1K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				Generator.getInstance().beacon("DET").destination(282, 34),
				Generator.getInstance().beacon("DET").destination(282, 29),
				Generator.getInstance().beacon("DET").destination(282, 20),
				Generator.getInstance().beacon("DET").destination(282, 5),
				Generator.getInstance().beacon("DET")
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
				Generator.getInstance().fix("GOGSI")
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
				Generator.getInstance().fix("GOGSI")
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
				Generator.getInstance().fix("GASGU")
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
				Generator.getInstance().fix("GASGU")
			],
			true
		));
	}
}
