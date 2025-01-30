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
	public constructor(private readonly atc: Generator) {}

	public async init() {
		await this.airport();
		this.star();
		this.sid();
	}

	private async airport() {
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
					new Airport.EntryPoint(220, this.atc.beacon("HAZEL"), 13000),
				],
				Airport.Airline.raw(await fs.readFile("./airlines/EGLL.txt", "utf8")),
				[
					NamedFix.fromDMS("512930N", "0011311W", "CPT", "Compton"),
					NamedFix.fromDMS("511459N", "0003343W", "MAXIT", "Maxit"),
					NamedFix.fromDMS("511401N", "0002910W", "MODMI", "Modmi"),
					this.atc.beacon("BPK"),
					NamedFix.fromDMS("514020N", "0004139W", "UMLAT", "Umlat"),
					NamedFix.fromDMS("513936N", "0001644W", "ULTIB", "Ultib"),
					this.atc.beacon("DET"),
					NamedFix.fromDMS("511727N", "0010002W", "GOGSI", "Gogsi"),
					NamedFix.fromDMS("511224N", "0005736W", "GASGU", "Gasgu"),
				],
				this.atc.beacon("LON")
			)
		);
	}

	private star() {
		this.atc.arrival(new STAR(
			...this.atc.pronounce("OTMET1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
			this.atc.beacon("BEGTO"),
			63,
			[
				this.atc.beacon("BEGTO"),
				this.atc.beacon("HAZEL", 13000),
				this.atc.fix("LLS01", "511021.99N", "0004108.43W", void 0, 250),
				this.atc.beacon("OCK", 7000, 220)
			],
			{end: "hold"}
		), 16000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("ROXOG1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
			this.atc.beacon("BEGTO"),
			17,
			[
				this.atc.beacon("BEGTO"),
				this.atc.beacon("HAZEL", 13000),
				this.atc.fix("LLS01", "511021.99N", "0004108.43W", void 0, 250),
				this.atc.beacon("OCK", 7000, 220)
			],
			{end: "hold"}
		), 16000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("ALESO1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
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
		), 19000);

		/**
		 * This arrival is to enable continuation on ALESO 1H if interrupted
		 * with HOLD at TIGER.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("ALESO1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
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
			...this.atc.pronounce("TANET", "1Z"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
			this.atc.beacon("TANET"),
			void 0,
			[
				this.atc.beacon("TANET"),
				this.atc.beacon("DET"),
				this.atc.fix("LLE02", "511857.68N", "0002109.87E", void 0, 250),
				this.atc.beacon("BIG", 7000, 220)
			],
			{end: "hold"}
		));

		// OCK 1Z omitted (OCK→BIG)

		this.atc.arrival(new STAR(
			...this.atc.pronounce("NUGRA1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
			this.atc.beacon("TOBID"),
			147,
			[
				this.atc.beacon("TOBID"),
				this.atc.fix("SOPIT", 15000),
				this.atc.beacon("WCO", void 0, 220),
				this.atc.beacon("BNN", 7000, 220)
			],
			{end: "hold"}
		), 15000);

		// LAM 1Z omitted (LAM→BNN)

		this.atc.arrival(new STAR(
			"HON1H",
			"Honiley one hotel",
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
			this.atc.beacon("TOBID"),
			139,
			[
				this.atc.beacon("TOBID"),
				this.atc.fix("SOPIT", 15000),
				this.atc.beacon("WCO", void 0, 220),
				this.atc.beacon("BNN", 7000, 220)
			],
			{end: "hold"}
		), 15000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("BARMI1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
			this.atc.beacon("LOGAN"),
			228,
			[
				this.atc.beacon("LOGAN", 25000),
				this.atc.fix("SABER", "514213.76N", "0005658.19E", 16000),
				this.atc.fix("BRASO", "514106.57N", "0004100.03E"),
				this.atc.fix("WESUL", "514015.29N", "0002909.27E", void 0, 250),
				this.atc.beacon("LAM", 7000, 220)
			],
			{end: "hold"}
		), 22000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("LOGAN", "2H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
			this.atc.beacon("LOGAN"),
			289,
			[
				this.atc.beacon("LOGAN", 25000),
				this.atc.fix("SABER", "514213.76N", "0005658.19E", 16000),
				this.atc.fix("BRASO", "514106.57N", "0004100.03E"),
				this.atc.fix("WESUL", "514015.29N", "0002909.27E", void 0, 250),
				this.atc.beacon("LAM", 7000, 220)
			],
			{end: "hold"}
		), 22000, 320);

		// TOBID 1X omitted (TOBID→OCK)

		this.atc.arrival(new STAR(
			...this.atc.pronounce("HAZEL", "1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
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
			...this.atc.pronounce("FITBO1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
			this.atc.beacon("SOPIT"),
			107,
			[
				this.atc.fix("SOPIT", 15000),
				this.atc.beacon("WCO", void 0, 220),
				this.atc.beacon("BNN", 7000, 220)
			],
			{end: "hold"}
		), 15000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("SIRIC", "1H"),
			[this.atc.runway("lln"), this.atc.runway("lls")],
			true,
			this.atc.beacon("SIRIC"),
			void 0,
			[
				this.atc.beacon("SIRIC", 14000),
				this.atc.fix("NIGIT", "511846.96N", "0011014.71W"),
				this.atc.fix("LLW03", "511832.83N", "0004556.94W", void 0, 250),
				this.atc.beacon("OCK", 7000, 220)
			],
			{end: "hold"}
		), 14000, 96);

		// SIRIC 1Z omitted (SIRIC→BNN)
	}

	private sid() {
		const lln = this.atc.runway("lln");
		const llnRev = lln.reverse();
		const lls = this.atc.runway("lls");
		const llsRev = lls.reverse();

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("CPT"), "3F"),
			lln,
			[
				llnRev.position.bearingIntersection(lln.heading, this.atc.beacon("LON"), 255),
				this.atc.beacon("LON").destination(255, 7),
				this.atc.fix("WOD", "512710N", "0005244W"),
				this.atc.fix("CPT").destination(100, 8),
				this.atc.fix("CPT")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("CPT"), "3G"),
			lls,
			[
				llsRev.position.bearingIntersection(lls.heading, this.atc.beacon("LON"), 255),
				this.atc.beacon("LON").destination(255, 7),
				this.atc.fix("WOD", "512710N", "0005244W"),
				this.atc.fix("CPT").destination(100, 8),
				this.atc.fix("CPT")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("CPT"), "5J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				new Fix(51.4500, -0.3280),
				new Fix(51.4300, -0.3280),
				lls.position.bearingIntersection(180, this.atc.fix("WOD", "512710N", "0005244W"), 101),
				this.atc.fix("WOD", "512710N", "0005244W"),
				this.atc.fix("CPT").destination(100, 8),
				this.atc.fix("CPT")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("CPT"), "4k"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				new Fix(51.4600, -0.3280),
				new Fix(51.4100, -0.3280),
				lln.position.bearingIntersection(180, this.atc.fix("WOD", "512710N", "0005244W"), 101),
				this.atc.fix("WOD", "512710N", "0005244W"),
				this.atc.fix("CPT").destination(100, 8),
				this.atc.fix("CPT")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("MAXIT"), "1F"),
			lln,
			[
				llnRev.position.bearingIntersection(lln.heading, this.atc.beacon("LON"), 255),
				this.atc.beacon("LON").destination(255, 5),
				this.atc.fix("BUR", "513108N", "0004038W").destination(161, 7.9),
				this.atc.fix("BUR", "513108N", "0004038W").destination(161, 10.5),
				this.atc.fix("BUR", "513108N", "0004038W").destination(161, 14),
				this.atc.fix("MAXIT")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("MAXIT"), "1G"),
			lls,
			[
				llsRev.position.bearingIntersection(lls.heading, this.atc.beacon("LON"), 239),
				this.atc.beacon("LON").destination(239, 5.5),
				this.atc.fix("BUR", "513108N", "0004038W").destination(161, 7.9),
				this.atc.fix("BUR", "513108N", "0004038W").destination(161, 10.5),
				this.atc.fix("BUR", "513108N", "0004038W").destination(161, 14),
				this.atc.fix("MAXIT")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("MODMI"), "1J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				this.atc.beacon("LON").destination(124, 3.5),
				this.atc.beacon("LON").bearingIntersection(124, this.atc.fix("MID", "510314.23N", "0003730.01W"), 25.6),
				this.atc.fix("MID", "510314.23N", "0003730.01W").destination(25.6, 18),
				this.atc.fix("MID", "510314.23N", "0003730.01W").destination(25.6, 15),
				this.atc.fix("MODMI")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("MODMI"), "1K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				this.atc.beacon("LON").destination(124, 3.5),
				this.atc.beacon("LON").bearingIntersection(124, this.atc.fix("MID", "510314.23N", "0003730.01W"), 25.6),
				this.atc.fix("MID", "510314.23N", "0003730.01W").destination(25.6, 18),
				this.atc.fix("MID", "510314.23N", "0003730.01W").destination(25.6, 15),
				this.atc.fix("MODMI")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("BPK", "7F"),
			lln,
			[
				this.atc.fix("BUR", "513108N", "0004038W").bearingIntersection(297 - 180, llnRev.position, lln.heading),
				this.atc.fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				this.atc.fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				this.atc.fix("BUR", "513108N", "0004038W"),
				this.atc.beacon("LON").bearingIntersection(304, this.atc.fix("CHT", "513723N", "0003107W"), 53 + 180),
				this.atc.beacon("LON").bearingIntersection(325, this.atc.fix("CHT", "513723N", "0003107W"), 53 + 180),
				this.atc.fix("CHT", "513723N", "0003107W"),
				this.atc.beacon("BPK")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("BPK", "7G"),
			lls,
			[
				llsRev.position.destination(lls.heading, 2),
				this.atc.fix("BUR", "513108N", "0004038W").bearingIntersection(297 - 180, llsRev.position, lls.heading),
				this.atc.fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				this.atc.fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				this.atc.fix("BUR", "513108N", "0004038W"),
				this.atc.beacon("LON").bearingIntersection(304, this.atc.fix("CHT", "513723N", "0003107W"), 53 + 180),
				this.atc.beacon("LON").bearingIntersection(325, this.atc.fix("CHT", "513723N", "0003107W"), 53 + 180),
				this.atc.fix("CHT", "513723N", "0003107W"),
				this.atc.beacon("BPK")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("BPK", "6J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				lls.position.destination(lls.reverseLocalizer, .4).bearingIntersection(50, this.atc.beacon("LON"), 70),
				this.atc.beacon("LON").destination(70, 10),
				this.atc.beacon("BPK").destination(196, 10),
				this.atc.beacon("BPK").destination(196, 6),
				this.atc.fix("BAPAG", "514305N", "0000724W"),
				this.atc.beacon("BPK")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("BPK", "6K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				lln.position.destination(lln.reverseLocalizer, .1).bearingIntersection(50, this.atc.beacon("LON"), 70),
				this.atc.beacon("LON").destination(70, 10),
				this.atc.beacon("BPK").destination(196, 10),
				this.atc.beacon("BPK").destination(196, 6),
				this.atc.fix("BAPAG", "514305N", "0000724W"),
				this.atc.beacon("BPK")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("UMLAT"), "1F"),
			lln,
			[
				this.atc.fix("BUR", "513108N", "0004038W").bearingIntersection(297 - 180, llsRev.position, lls.heading),
				this.atc.fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				this.atc.fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				this.atc.fix("BUR", "513108N", "0004038W"),
				this.atc.fix("UMLAT")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("UMLAT"), "1G"),
			lls,
			[
				llsRev.position.bearingIntersection(lls.heading, this.atc.fix("BUR", "513108N", "0004038W"), 297 - 180),
				this.atc.fix("BUR", "513108N", "0004038W").destination(297 - 180, 4.35),
				this.atc.fix("BUR", "513108N", "0004038W").destination(297 - 180, 2.2),
				this.atc.fix("BUR", "513108N", "0004038W"),
				this.atc.fix("UMLAT")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("ULTIB"), "1J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				lls.position.destination(lls.reverseLocalizer, .4).bearingIntersection(50, this.atc.beacon("LON"), 70),
				this.atc.beacon("LON").destination(70, 10),
				this.atc.beacon("LON").bearingIntersection(70, this.atc.beacon("BIG"), 328),
				this.atc.beacon("BIG").destination(328, 20),
				this.atc.fix("ULTIB")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("ULTIB"), "1K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				lln.position.destination(lln.reverseLocalizer, .1).bearingIntersection(50, this.atc.beacon("LON"), 70),
				this.atc.beacon("LON").destination(70, 10),
				this.atc.beacon("LON").bearingIntersection(70, this.atc.beacon("BIG"), 328),
				this.atc.beacon("BIG").destination(328, 20),
				this.atc.fix("ULTIB")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("DET", "2F"),
			lln,
			[
				llnRev.position.destination(lln.heading, 2),
				this.atc.fix("EPSOM", "511910N", "0002219W"),
				this.atc.beacon("DET").destination(270, 32),
				this.atc.beacon("DET").destination(270, 29),
				this.atc.beacon("DET").destination(270, 5),
				this.atc.beacon("DET")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("DET", "2G"),
			lls,
			[
				llsRev.position.destination(lls.heading, 1),
				this.atc.fix("EPSOM", "511910N", "0002219W"),
				this.atc.beacon("DET").destination(270, 32),
				this.atc.beacon("DET").destination(270, 29),
				this.atc.beacon("DET").destination(270, 5),
				this.atc.beacon("DET")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("DET", "1J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				lls.position.destination(lls.reverseLocalizer, .4).bearingIntersection(120, this.atc.beacon("DET"), 282),
				this.atc.beacon("DET").destination(282, 34),
				this.atc.beacon("DET").destination(282, 29),
				this.atc.beacon("DET").destination(282, 20),
				this.atc.beacon("DET").destination(282, 5),
				this.atc.beacon("DET")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("DET", "1K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				lln.position.destination(lln.reverseLocalizer, .1).bearingIntersection(121, this.atc.beacon("DET"), 282),
				this.atc.beacon("DET").destination(282, 34),
				this.atc.beacon("DET").destination(282, 29),
				this.atc.beacon("DET").destination(282, 20),
				this.atc.beacon("DET").destination(282, 5),
				this.atc.beacon("DET")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("GOGSI"), "2F"),
			lln,
			[
				llnRev.position.bearingIntersection(lln.heading, this.atc.beacon("LON"), 255),
				this.atc.beacon("LON").destination(255, 7),
				this.atc.fix("WOD", "512710N", "0005244W").destination(268 - 180, 1.65),
				this.atc.fix("WOD", "512710N", "0005244W").destination(268 - 180, .9),
				this.atc.beacon("SAM").destination(32, 32.8),
				this.atc.beacon("SAM").destination(32, 29.6),
				this.atc.fix("GOGSI")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("GOGSI"), "2G"),
			lls,
			[
				llsRev.position.bearingIntersection(lls.heading, this.atc.beacon("LON"), 255),
				this.atc.beacon("LON").destination(255, 7),
				this.atc.fix("WOD", "512710N", "0005244W").destination(268 - 180, 1.65),
				this.atc.fix("WOD", "512710N", "0005244W").destination(268 - 180, .9),
				this.atc.beacon("SAM").destination(32, 32.8),
				this.atc.beacon("SAM").destination(32, 29.6),
				this.atc.fix("GOGSI")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("GASGU"), "2J"),
			lls,
			[
				lls.position.destination(lls.reverseLocalizer, .4),
				this.atc.beacon("LON").destination(124, 5),
				this.atc.beacon("OCK").destination(42, 2),
				this.atc.beacon("OCK"),
				this.atc.beacon("OCK").destination(253, 1.4),
				this.atc.beacon("OCK").destination(253, 4.7),
				this.atc.fix("GASGU")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("GASGU"), "2K"),
			lln,
			[
				lln.position.destination(lln.reverseLocalizer, .1),
				this.atc.beacon("LON").destination(124, 5),
				this.atc.beacon("OCK").destination(42, 2),
				this.atc.beacon("OCK"),
				this.atc.beacon("OCK").destination(253, 1.4),
				this.atc.beacon("OCK").destination(253, 4.7),
				this.atc.fix("GASGU")
			],
			true
		));
	}
}
