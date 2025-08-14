import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";
import SID from "../src/SID.js";
import NamedFix from "../src/NamedFix.js";
import fs from "node:fs/promises";

export default class EGGW {
	public async init() {
		await this.airport();
		this.star();
		this.transition();
		this.sid();
	}

	private async airport() {
		Generator.getInstance().airport(
			new Airport(
				"London Luton Airport",
				"Luton",
				"EGGW",
				4,
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
					Generator.getInstance().beacon("DET"),
					NamedFix.fromDMS("514257N", "0005142W", "RODNI", "Rodni"),
					NamedFix.fromDMS("520740N", "0004403W", "OLNEY", "Olney"),
				],
				Generator.getInstance().beacon("LUT")
			)
		);
	}

	private star() {
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("UNDUG", "1N"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("UNDUG"),
			void 0,
			[
				Generator.getInstance().beacon("UNDUG"),
				Generator.getInstance().beacon("MAY", 20000),
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().fix("ILLOC", "515517.20N", "0001056.60E"),
				Generator.getInstance().fix("OXDUF", "520636.20N", "0001900.00E"),
				Generator.getInstance().fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				Generator.getInstance().fix("JUMZI", "521943.58N", "0002430.31W"),
				Generator.getInstance().beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		).withEntry(20000, 319));

		/**
		 * This arrival is to enable continuation on UNDUG 1N if interrupted
		 * with HOLD at VATON.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("UNDUG", "1N"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("VATON"),
			325,
			[
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().fix("ILLOC", "515517.20N", "0001056.60E"),
				Generator.getInstance().fix("OXDUF", "520636.20N", "0001900.00E"),
				Generator.getInstance().fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				Generator.getInstance().fix("JUMZI", "521943.58N", "0002430.31W"),
				Generator.getInstance().beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SIRIC", "1N"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("SIRIC"),
			void 0,
			[
				Generator.getInstance().beacon("SIRIC", 18000),
				Generator.getInstance().fix("NIGIT", "511846.96N", "0011014.71W"),
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().fix("ILLOC", "515517.20N", "0001056.60E"),
				Generator.getInstance().fix("OXDUF", "520636.20N", "0001900.00E"),
				Generator.getInstance().fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				Generator.getInstance().fix("JUMZI", "521943.58N", "0002430.31W"),
				Generator.getInstance().beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		).withEntry(18000, 96));

		/**
		 * This arrival is to enable continuation on SIRIC 1N if interrupted
		 * with HOLD at VATON.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SIRIC", "1N"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("VATON"),
			76,
			[
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().fix("ILLOC", "515517.20N", "0001056.60E"),
				Generator.getInstance().fix("OXDUF", "520636.20N", "0001900.00E"),
				Generator.getInstance().fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				Generator.getInstance().fix("JUMZI", "521943.58N", "0002430.31W"),
				Generator.getInstance().beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("TELTU", "1N"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("TELTU"),
			void 0,
			[
				Generator.getInstance().beacon("TELTU", 19000),
				Generator.getInstance().fix("MOREZ", "511233.91N", "0002948.60W"),
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().fix("ILLOC", "515517.20N", "0001056.60E"),
				Generator.getInstance().fix("OXDUF", "520636.20N", "0001900.00E"),
				Generator.getInstance().fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				Generator.getInstance().fix("JUMZI", "521943.58N", "0002430.31W"),
				Generator.getInstance().beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"})
		.withEntry(19000, 5));

		/**
		 * This arrival is to enable continuation on TELTU 1N if interrupted
		 * with HOLD at VATON.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("TELTU", "1N"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("VATON"),
			22,
			[
				Generator.getInstance().beacon("VATON"),
				Generator.getInstance().fix("OZZOT", "514028.93N", "0000952.93W", 15000),
				Generator.getInstance().beacon("BPK", void 0, 250),
				Generator.getInstance().fix("ILLOC", "515517.20N", "0001056.60E"),
				Generator.getInstance().fix("OXDUF", "520636.20N", "0001900.00E"),
				Generator.getInstance().fix("COCCU", "521604.34N", "0000322.02W", void 0, 220),
				Generator.getInstance().fix("JUMZI", "521943.58N", "0002430.31W"),
				Generator.getInstance().beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		));

		// MEGEL 1N omitted (MEGEL→ZAGZO)
		// RINIS 1N omitted (RINIS→ZAGZO)
		// XAMAN 1N omitted (XAMAN→ZAGZO)
		// TOSVA 1N omitted (TOSVA→ZAGZO)

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("FINMA", "1N"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("FINMA"),
			void 0,
			[
				Generator.getInstance().beacon("FINMA", 15000),
				Generator.getInstance().fix("WOBUN", "520110.27N", "0004400.00W", void 0, 250),
				Generator.getInstance().fix("EDCOX", "521259.68N", "0002419.92W", void 0, 220),
				Generator.getInstance().fix("JUMZI", "521943.58N", "0002430.31W"),
				Generator.getInstance().beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"})
		.withEntry(15000, 147));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SILVA", "1N"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("SILVA"),
			void 0,
			[
				Generator.getInstance().beacon("SILVA"),
				Generator.getInstance().fix("WOBUN", "520110.27N", "0004400.00W", void 0, 250),
				Generator.getInstance().fix("EDCOX", "521259.68N", "0002419.92W", void 0, 220),
				Generator.getInstance().fix("JUMZI", "521943.58N", "0002430.31W"),
				Generator.getInstance().beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LISTO1N"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("FINMA"),
			149,
			[
				Generator.getInstance().beacon("FINMA", 15000),
				Generator.getInstance().fix("WOBUN", "520110.27N", "0004400.00W", void 0, 250),
				Generator.getInstance().fix("EDCOX", "521259.68N", "0002419.92W", void 0, 220),
				Generator.getInstance().fix("JUMZI", "521943.58N", "0002430.31W"),
				Generator.getInstance().beacon("ZAGZO", 8000, 220)
			],
			{end: "hold"})
		.withEntry(15000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("LOGAN", "2A"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("LOGAN"),
			void 0,
			[
				Generator.getInstance().beacon("LOGAN", 10000),
				Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E", void 0, 250),
				Generator.getInstance().beacon("ABBOT", 8000, 220)
			],
			{end: "hold"})
		.withEntry(10000, 290));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("DET", "2A"),
			[Generator.getInstance().runway("gw")],
			true,
			Generator.getInstance().beacon("DET"),
			void 0,
			[
				Generator.getInstance().beacon("DET", 17000),
				Generator.getInstance().fix("LOFFO", "515012.00N", "0003556.37E", void 0, 250),
				Generator.getInstance().beacon("ABBOT", 8000, 220)
			],
			{end: "hold"}
		));
	}

	private transition() {
		const rwy25 = Generator.getInstance().runway("gw");
		const rwy07 = rwy25.reverse();
		Generator.getInstance().fix("FITME", rwy25.position.destination(rwy25.reverseLocalizer, 10.7));
		Generator.getInstance().fix("ODWAD", rwy07.position.destination(rwy07.reverseLocalizer, 10.5));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ZAGZO", "1T"),
			[Generator.getInstance().runway("gw")],
			false,
			Generator.getInstance().beacon("ZAGZO"),
			void 0,
			[
				Generator.getInstance().beacon("ZAGZO", 8000, 220),
				Generator.getInstance().fix("EFFUT", "521142.36N", "0001200.36W", 8000),
				Generator.getInstance().fix("GWN30", "520606.88N", "0001154.11W", 6000),
				Generator.getInstance().fix("GWN26", "520307.39N", "0001807.70W", 5000),
				Generator.getInstance().fix("GWN22", "515948.29N", "0001637.97W"),
				Generator.getInstance().fix("GWE17", "520016.82N", "0000645.79W", 5000, 185),
				Generator.getInstance().fix("FITME", 3000)
			],
			{ils: {dme: 7.7, altitude: 3000}}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ZAGZO", "1Q"),
			[Generator.getInstance().runway("gw")],
			"only",
			Generator.getInstance().beacon("ZAGZO"),
			void 0,
			[
				Generator.getInstance().beacon("ZAGZO", 8000, 220),
				Generator.getInstance().fix("EFFUT", "521142.36N", "0001200.36W", 8000),
				Generator.getInstance().fix("GWN45", "520607.61N", "0001015.06W", 6000),
				Generator.getInstance().fix("GWN39", "520225.12N", "0001700.84W", 5000),
				Generator.getInstance().fix("GWN35", "515950.08N", "0002142.52W"),
				Generator.getInstance().fix("GWN32", "515852.03N", "0002656.67W"),
				Generator.getInstance().fix("GWW24", "515404.06N", "0003649.52W"),
				Generator.getInstance().fix("GWW18", "515230.10N", "0004544.14W", 5000, 185),
				Generator.getInstance().fix("GWW14", "514839.58N", "0004358.20W", 4000),
				Generator.getInstance().fix("ODWAD", 3000)
			],
			{ils: {dme: 4.5, altitude: 2000}}
		));
	}

	private sid() {
		const rwy = Generator.getInstance().runway("gw");
		const rev = rwy.reverse();

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("MATCH"), "3B"),
			rwy,
			[
				Generator.getInstance().beacon("BNN").destination(31, 7),
				Generator.getInstance().beacon("BPK").destination(284, 10),
				Generator.getInstance().beacon("BPK").destination(284, 6),
				Generator.getInstance().beacon("BPK").destination(284, 3),
				Generator.getInstance().beacon("BPK"),
				Generator.getInstance().fix("CLN").destination(262, 40),
				Generator.getInstance().fix("MATCH")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("MATCH"), "2C"),
			rwy,
			[
				Generator.getInstance().fix("LUT", "515341N", "0001509W"),
				Generator.getInstance().fix("LUT", "515341N", "0001509W").bearingIntersection(rwy.reverseLocalizer, Generator.getInstance().beacon("BPK"), 336),
				Generator.getInstance().beacon("BPK").destination(336, 6),
				Generator.getInstance().beacon("BPK").destination(336, 3),
				Generator.getInstance().beacon("BPK"),
				Generator.getInstance().fix("CLN").destination(262, 40),
				Generator.getInstance().fix("MATCH")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("DET", "8B"),
			rwy,
			[
				Generator.getInstance().beacon("BNN").destination(31, 7),
				Generator.getInstance().beacon("BPK").destination(284, 10),
				Generator.getInstance().beacon("BPK").destination(284, 6),
				Generator.getInstance().beacon("BPK").destination(284, 3),
				Generator.getInstance().beacon("BPK"),
				Generator.getInstance().beacon("BPK").destination(97, 7),
				Generator.getInstance().beacon("BPK").destination(97, 7).bearingIntersection(97, Generator.getInstance().beacon("DET"), 333),
				Generator.getInstance().fix("NEPNA", "512958.33N", "0002656.55E"),
				Generator.getInstance().beacon("DET")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("DET", "7C"),
			rwy,
			[
				Generator.getInstance().fix("LUT", "515341N", "0001509W"),
				Generator.getInstance().fix("LUT", "515341N", "0001509W").bearingIntersection(rwy.reverseLocalizer, Generator.getInstance().beacon("BPK"), 336),
				Generator.getInstance().beacon("BPK").destination(336, 6),
				Generator.getInstance().beacon("BPK").destination(336, 3),
				Generator.getInstance().beacon("BPK"),
				Generator.getInstance().beacon("BPK").destination(97, 7),
				Generator.getInstance().beacon("BPK").destination(97, 7).bearingIntersection(97, Generator.getInstance().beacon("DET"), 333),
				Generator.getInstance().fix("NEPNA", "512958.33N", "0002656.55E"),
				Generator.getInstance().beacon("DET")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("MATCH"), "3Y"),
			rwy,
			[
				Generator.getInstance().fix("GWS01", "515119.98N", "0002514.51W")
					.bearingIntersection(31, rev.position, 254),
				Generator.getInstance().fix("GWS01", "515119.98N", "0002514.51W"),
				Generator.getInstance().fix("GWS06", "514705.83N", "0002928.41W"),
				Generator.getInstance().fix("GWS12", "514656.85N", "0001944.38W"),
				Generator.getInstance().fix("GWE16", "514622.04N", "0001546.78W"),
				Generator.getInstance().fix("GWE19", "514540.56N", "0001104.88W"),
				Generator.getInstance().beacon("BPK"),
				Generator.getInstance().fix("MATCH")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("DET", "3Y"),
			rwy,
			[
				Generator.getInstance().fix("GWS01", "515119.98N", "0002514.51W")
					.bearingIntersection(31, rev.position, 254),
				Generator.getInstance().fix("GWS01", "515119.98N", "0002514.51W"),
				Generator.getInstance().fix("GWS06", "514705.83N", "0002928.41W"),
				Generator.getInstance().fix("GWS12", "514656.85N", "0001944.38W"),
				Generator.getInstance().fix("GWE16", "514622.04N", "0001546.78W"),
				Generator.getInstance().fix("GWE19", "514540.56N", "0001104.88W"),
				Generator.getInstance().beacon("BPK"),
				Generator.getInstance().fix("GWE37", "514259.91N", "0001658.25E"),
				Generator.getInstance().fix("NEPNA", "512958.33N", "0002656.55E"),
				Generator.getInstance().beacon("DET")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("RODNI"), "1B"),
			rwy,
			[
				Generator.getInstance().beacon("BNN").destination(31, 7),
				Generator.getInstance().beacon("BNN").destination(31, 7).bearingIntersection(211, Generator.getInstance().fix("HEN", "514535.07N", "0004725.05W"), 255 - 180),
				Generator.getInstance().fix("HEN", "514535.07N", "0004725.05W"),
				Generator.getInstance().fix("RODNI")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("RODNI"), "1C"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 3.8),
				rwy.position.destination(rwy.reverseLocalizer, 3.8)
				   .bearingIntersection(rwy.reverseLocalizer + 90, Generator.getInstance().fix("HEN", "514535.07N", "0004725.05W"), 256 - 180),
				Generator.getInstance().fix("HEN", "514535.07N", "0004725.05W"),
				Generator.getInstance().fix("RODNI")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("OLNEY"), "2B"),
			rwy,
			[
				Generator.getInstance().beacon("BNN").destination(31, 7),
				Generator.getInstance().beacon("BNN").bearingIntersection(3, Generator.getInstance().fix("HEN", "514535.07N", "0004725.05W"), 255 - 180),
				Generator.getInstance().beacon("BNN").destination(344, 6),
				Generator.getInstance().beacon("BNN").destination(344, 9),
				Generator.getInstance().beacon("BNN").destination(344, 15),
				Generator.getInstance().fix("OLNEY")
			],
			false,
			6000
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("OLNEY"), "2C"),
			rwy,
			[
				rwy.position.destination(rwy.reverseLocalizer, 3.4),
				Generator.getInstance().beacon("BPK").destination(314, 15),
				Generator.getInstance().beacon("BPK").destination(314, 21),
				Generator.getInstance().fix("OLNEY")
			],
			true,
			6000
		));
	}
}
