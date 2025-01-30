import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";
import SID from "../src/SID.js";
import NamedFix from "../src/NamedFix.js";
import fs from "node:fs/promises";

export default class EGGW {
	public constructor(private readonly atc: Generator) {}

	public async init() {
		await this.airport();
		this.star();
		this.transition();
		this.sid();
	}

	private async airport() {
		this.atc.airport(
			new Airport(
				"London Luton Airport",
				"Luton",
				"EGGW",
				10,
				5000,
				[
					new Runway("gw", "25",
						Fix.fromDMS("515237.36N", "0002116.15W"),
						254.4, 508,
						2162 / Fix.FT, 82 / Fix.FT, 0,
						{name: "FITME", distance: 10.7},
						{name: "ODWAD", distance: 10.5},
						132.55,
						"Luton Tower",
						74.38
					)
				],
				[],
				Airport.Airline.raw(await fs.readFile("./airlines/EGGW.txt", "utf8")),
				[
					NamedFix.fromDMS("514645N", "0001500E", "MATCH", "Match"),
					this.atc.beacon("DET"),
					NamedFix.fromDMS("514257N", "0005142W", "RODNI", "Rodni"),
					NamedFix.fromDMS("520740N", "0004403W", "OLNEY", "Olney"),
				],
				this.atc.beacon("BKY")
			)
		);
	}

	private star() {
		this.atc.arrival(new STAR(
			...this.atc.pronounce("UNDUG", "1N"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("UNDUG"),
			void 0,
			[
				this.atc.beacon("UNDUG"),
				this.atc.beacon("MAY", 20000),
				this.atc.beacon("VATON"),
				this.atc.fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.fix("ILLOC", "515517.20N", "0001056.60E"),
				this.atc.fix("OXDUF", "520636.20N", "0001900.00E"),
				this.atc.fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				this.atc.fix("JUMZI", "521943.58N", "0002430.31W"),
				this.atc.beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		), 20000, 319);

		/**
		 * This arrival is to enable continuation on UNDUG 1N if interrupted
		 * with HOLD at VATON.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("UNDUG", "1N"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("VATON"),
			325,
			[
				this.atc.beacon("VATON"),
				this.atc.fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.fix("ILLOC", "515517.20N", "0001056.60E"),
				this.atc.fix("OXDUF", "520636.20N", "0001900.00E"),
				this.atc.fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				this.atc.fix("JUMZI", "521943.58N", "0002430.31W"),
				this.atc.beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("SIRIC", "1N"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("SIRIC"),
			void 0,
			[
				this.atc.beacon("SIRIC", 18000),
				this.atc.fix("NIGIT", "511846.96N", "0011014.71W"),
				this.atc.beacon("VATON"),
				this.atc.fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.fix("ILLOC", "515517.20N", "0001056.60E"),
				this.atc.fix("OXDUF", "520636.20N", "0001900.00E"),
				this.atc.fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				this.atc.fix("JUMZI", "521943.58N", "0002430.31W"),
				this.atc.beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		), 18000, 96);

		/**
		 * This arrival is to enable continuation on SIRIC 1N if interrupted
		 * with HOLD at VATON.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("SIRIC", "1N"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("VATON"),
			76,
			[
				this.atc.beacon("VATON"),
				this.atc.fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.fix("ILLOC", "515517.20N", "0001056.60E"),
				this.atc.fix("OXDUF", "520636.20N", "0001900.00E"),
				this.atc.fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				this.atc.fix("JUMZI", "521943.58N", "0002430.31W"),
				this.atc.beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("TELTU", "1N"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("TELTU"),
			void 0,
			[
				this.atc.beacon("TELTU", 19000),
				this.atc.fix("MOREZ", "511233.91N", "0002948.60W"),
				this.atc.beacon("VATON"),
				this.atc.fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.fix("ILLOC", "515517.20N", "0001056.60E"),
				this.atc.fix("OXDUF", "520636.20N", "0001900.00E"),
				this.atc.fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				this.atc.fix("JUMZI", "521943.58N", "0002430.31W"),
				this.atc.beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		), 19000, 5);

		/**
		 * This arrival is to enable continuation on TELTU 1N if interrupted
		 * with HOLD at VATON.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("TELTU", "1N"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("VATON"),
			22,
			[
				this.atc.beacon("VATON"),
				this.atc.fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				this.atc.beacon("BPK", void 0, 250),
				this.atc.fix("ILLOC", "515517.20N", "0001056.60E"),
				this.atc.fix("OXDUF", "520636.20N", "0001900.00E"),
				this.atc.fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				this.atc.fix("JUMZI", "521943.58N", "0002430.31W"),
				this.atc.beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		));

		// BARMI 1N omitted (BARMI→ZAGZO)
		// RINIS 1N omitted (RINIS→ZAGZO)
		// XAMAN 1N omitted (XAMAN→ZAGZO)
		// TOSVA 1N omitted (TOSVA→ZAGZO)

		this.atc.arrival(new STAR(
			...this.atc.pronounce("FINMA", "1N"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("FINMA"),
			void 0,
			[
				this.atc.beacon("FINMA", 15000),
				this.atc.fix("WOBUN", "520110.27N", "0004400.00W", void 0, 250),
				this.atc.fix("EDCOX", "521259.68N", "0002419.92W", void 0, 220),
				this.atc.fix("JUMZI", "521943.58N", "0002430.31W"),
				this.atc.beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		), 15000, 147);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("SILVA", "1N"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("SILVA"),
			void 0,
			[
				this.atc.beacon("SILVA"),
				this.atc.fix("WOBUN", "520110.27N", "0004400.00W", void 0, 250),
				this.atc.fix("EDCOX", "521259.68N", "0002419.92W", void 0, 220),
				this.atc.fix("JUMZI", "521943.58N", "0002430.31W"),
				this.atc.beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("LISTO1N"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("FINMA"),
			149,
			[
				this.atc.beacon("FINMA", 15000),
				this.atc.fix("WOBUN", "520110.27N", "0004400.00W", void 0, 250),
				this.atc.fix("EDCOX", "521259.68N", "0002419.92W", void 0, 220),
				this.atc.fix("JUMZI", "521943.58N", "0002430.31W"),
				this.atc.beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		), 15000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("LOGAN", "2A"),
			[this.atc.runway("gw")],
			true,
			this.atc.beacon("LOGAN"),
			void 0,
			[
				this.atc.beacon("LOGAN", 10000),
				this.atc.fix("CLN", "515054.50N", "0010851.32E", void 0, 250),
				this.atc.beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		), 10000, 290);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("DET", "2A"),
			[this.atc.runway("gw")],
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
	}

	private transition() {
		const rwy25 = this.atc.runway("gw");
		const rwy07 = rwy25.reverse();
		this.atc.fix("FITME", rwy25.position.destination(rwy25.reverseLocalizer, 10.7));
		this.atc.fix("ODWAD", rwy07.position.destination(rwy07.reverseLocalizer, 10.5));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("ZAGZO", "1T"),
			[this.atc.runway("gw")],
			false,
			this.atc.beacon("ZAGZO"),
			void 0,
			[
				this.atc.beacon("ZAGZO", 8000, 220),
				this.atc.fix("EFFUT", "521142.36N", "0001200.36W", 8000),
				this.atc.fix("GWN30", "520606.88N", "0001154.11W", 6000),
				this.atc.fix("GWN26", "520307.39N", "0001807.70W", 5000),
				this.atc.fix("GWN22", "515948.29N", "0001637.97W"),
				this.atc.fix("GWE17", "520016.82N", "0000645.79W", 5000, 185),
				this.atc.fix("FITME", 3000)
			],
			{ils: {dme: 7.7, altitude: 3000}}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("ZAGZO", "1Q"),
			[this.atc.runway("gw")],
			"only",
			this.atc.beacon("ZAGZO"),
			void 0,
			[
				this.atc.beacon("ZAGZO", 8000, 220),
				this.atc.fix("EFFUT", "521142.36N", "0001200.36W", 8000),
				this.atc.fix("GWN45", "520607.61N", "0001015.06W", 6000),
				this.atc.fix("GWN39", "520225.12N", "0001700.84W", 5000),
				this.atc.fix("GWN35", "515950.08N", "0002142.52W"),
				this.atc.fix("GWN32", "515852.03N", "0002656.67W"),
				this.atc.fix("GWW24", "515404.06N", "0003649.52W"),
				this.atc.fix("GWW18", "515230.10N", "0004544.14W", 5000, 185),
				this.atc.fix("GWW14", "514839.58N", "0004358.20W", 4000),
				this.atc.fix("ODWAD", 3000)
			],
			{ils: {dme: 4.5, altitude: 2000}}
		));
	}

	private sid() {
		const rwy = this.atc.runway("gw");
		const rev = rwy.reverse();

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("MATCH"), "3B"),
			rwy,
			[
				this.atc.beacon("BNN").destination(31, 7),
				this.atc.beacon("BPK").destination(284, 10),
				this.atc.beacon("BPK").destination(284, 6),
				this.atc.beacon("BPK").destination(284, 3),
				this.atc.beacon("BPK"),
				this.atc.fix("CLN").destination(262, 40),
				this.atc.fix("MATCH")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("MATCH"), "2C"),
			rwy,
			[
				this.atc.fix("LUT", "515341N", "0001509W"),
				this.atc.fix("LUT", "515341N", "0001509W").bearingIntersection(rwy.reverseLocalizer, this.atc.beacon("BPK"), 336),
				this.atc.beacon("BPK").destination(336, 6),
				this.atc.beacon("BPK").destination(336, 3),
				this.atc.beacon("BPK"),
				this.atc.fix("CLN").destination(262, 40),
				this.atc.fix("MATCH")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("DET", "8B"),
			rwy,
			[
				this.atc.beacon("BNN").destination(31, 7),
				this.atc.beacon("BPK").destination(284, 10),
				this.atc.beacon("BPK").destination(284, 6),
				this.atc.beacon("BPK").destination(284, 3),
				this.atc.beacon("BPK"),
				this.atc.beacon("BPK").destination(97, 7),
				this.atc.beacon("BPK").destination(97, 7).bearingIntersection(97, this.atc.beacon("DET"), 333),
				this.atc.fix("NEPNA", "512958.33N", "0002656.55E"),
				this.atc.beacon("DET")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("DET", "7C"),
			rwy,
			[
				this.atc.fix("LUT", "515341N", "0001509W"),
				this.atc.fix("LUT", "515341N", "0001509W").bearingIntersection(rwy.reverseLocalizer, this.atc.beacon("BPK"), 336),
				this.atc.beacon("BPK").destination(336, 6),
				this.atc.beacon("BPK").destination(336, 3),
				this.atc.beacon("BPK"),
				this.atc.beacon("BPK").destination(97, 7),
				this.atc.beacon("BPK").destination(97, 7).bearingIntersection(97, this.atc.beacon("DET"), 333),
				this.atc.fix("NEPNA", "512958.33N", "0002656.55E"),
				this.atc.beacon("DET")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("MATCH"), "3Y"),
			rwy,
			[
				rev.position.bearingIntersection(254, this.atc.fix("GWS01", "515119.98N", "0002514.51W"), 180 - 211),
				this.atc.fix("GWS01", "515119.98N", "0002514.51W"),
				this.atc.fix("GWS06", "514705.83N", "0002928.41W"),
				this.atc.fix("GWS12", "514656.85N", "0001944.38W"),
				this.atc.fix("GWE16", "514622.04N", "0001546.78W"),
				this.atc.fix("GWE19", "514540.56N", "0001104.88W"),
				this.atc.beacon("BPK"),
				this.atc.fix("MATCH")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("DET", "3Y"),
			rwy,
			[
				rev.position.bearingIntersection(254, this.atc.fix("GWS01", "515119.98N", "0002514.51W"), 180 - 211),
				this.atc.fix("GWS01", "515119.98N", "0002514.51W"),
				this.atc.fix("GWS06", "514705.83N", "0002928.41W"),
				this.atc.fix("GWS12", "514656.85N", "0001944.38W"),
				this.atc.fix("GWE16", "514622.04N", "0001546.78W"),
				this.atc.fix("GWE19", "514540.56N", "0001104.88W"),
				this.atc.beacon("BPK"),
				this.atc.fix("GWE37", "514259.91N", "0001658.25E"),
				this.atc.fix("NEPNA", "512958.33N", "0002656.55E"),
				this.atc.beacon("DET")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("RODNI"), "1B"),
			rwy,
			[
				this.atc.beacon("BNN").destination(31, 7),
				this.atc.beacon("BNN").destination(31, 7).bearingIntersection(211, this.atc.fix("HEN", "514535N", "0004725W"), 255 - 180),
				this.atc.fix("HEN", "514535N", "0004725W"),
				this.atc.fix("RODNI")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("RODNI"), "1C"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 3.8),
				rwy.position.destination(rwy.reverseLocalizer, 3.8).bearingIntersection(rwy.reverseLocalizer + 45, this.atc.fix("HEN", "514535N", "0004725W"), 256),
				this.atc.fix("HEN", "514535N", "0004725W"),
				this.atc.fix("RODNI")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("OLNEY"), "2B"),
			rwy,
			[
				this.atc.beacon("BNN").destination(31, 7),
				this.atc.beacon("BNN").bearingIntersection(3, this.atc.fix("HEN", "514535N", "0004725W"), 255 - 180),
				this.atc.beacon("BNN").destination(344, 6),
				this.atc.beacon("BNN").destination(344, 9),
				this.atc.beacon("BNN").destination(344, 15),
				this.atc.fix("OLNEY")
			],
			false,
			6000
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("OLNEY"), "2C"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 3.4),
				this.atc.beacon("BPK").destination(314, 15),
				this.atc.beacon("BPK").destination(314, 21),
				this.atc.fix("OLNEY")
			],
			true,
			6000
		));
	}
}
