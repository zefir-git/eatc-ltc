import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";
import SID from "../src/SID.js";
import NamedFix from "../src/NamedFix.js";
import fs from "node:fs/promises";
import Beacon from "../src/Beacon.js";

export default class EGKK {
	public async init() {
		await this.airport();
		this.star();
		this.sid();
		this.rnp();
	}

	private async airport() {
		Generator.getInstance().airport(
			new Airport(
				"London Gatwick Airport",
				"Gatwick",
				"EGKK",
				7,
				6000,
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
				[
					new Airport.EntryPoint(105, Generator.getInstance().beacon("ARNUN"), 14000),
				],
				Airport.Airline.raw(await fs.readFile("./airlines/EGKK.txt", "utf8")),
				[
					NamedFix.fromDMS("512306N", "0003739E", "FRANE", "Frane"),
					NamedFix.fromDMS("504207N", "0001506W", "BOGNA", "Bogna"),
					NamedFix.fromDMS("502816.00N", "0002928.00E", "HARDY", "Hardy"),
					NamedFix.fromDMS("510212N", "0004515W", "NOVMA", "Novma"),
					NamedFix.fromDMS("513114N", "0012718W", "KENET", "Kenet"),
					NamedFix.fromDMS("511028.90N", "0003156.40W", "IMVUR", "Imvur"),
					NamedFix.fromDMS("504538.48N", "0000718.89E", "SFD", "Seaford"),
					NamedFix.fromDMS("510700N", "0005711E", "WIZAD", "Wizad"),
					NamedFix.fromDMS("511358N", "0002930E", "MIMFO", "Mimfo"),
					NamedFix.fromDMS("510945N", "0012133E", "DVR", "Dover"),
					NamedFix.fromDMS("510957.40N", "0002909.33E", "ODVIK", "Odvik"),
					Generator.getInstance().beacon("TIGER"),
					NamedFix.fromDMS("514919N", "0004739E", "DAGGA", "Dagga"),
				],
				Generator.getInstance().beacon("MAY")
			)
		);
	}

	private star() {
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("BARMI1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("TEBRA"),
			228,
			[
				Generator.getInstance().beacon("TEBRA"),
				Generator.getInstance().fix("ABTUM", "512603.66N", "0012228.98E", 14000),
				Generator.getInstance().beacon("ARNUN"),
				Generator.getInstance().fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				Generator.getInstance().fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				Generator.getInstance().beacon("TIMBA", 7000, 220)
			],
			{end: "hold"})
		.withEntry(14000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("TEBRA", "2G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("TEBRA"),
			void 0,
			[
				Generator.getInstance().beacon("TEBRA"),
				Generator.getInstance().fix("ABTUM", "512603.66N", "0012228.98E", 14000),
				Generator.getInstance().beacon("ARNUN"),
				Generator.getInstance().fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				Generator.getInstance().fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				Generator.getInstance().beacon("TIMBA", 7000, 220)
			],
			{end: "hold"})
		.withEntry(14000, 280));

		/**
		 * This arrival is to enable continuation on BARMI 1G TEBRA 2G if
		 * interrupted with HOLD at ARNUN. Since the original STAR was
		 * interrupted, it’s not possible to continue with the same name.
		 * Continuation after interruption at ARNUN will show as TEBRA 2G.
		 */
		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("TEBRA", "2G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("ARNUN"),
			216,
			[
				Generator.getInstance().beacon("ARNUN"),
				Generator.getInstance().fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				Generator.getInstance().fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				Generator.getInstance().beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("KONAN", "2G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("ARNUN"),
			264,
			[
				Generator.getInstance().beacon("ARNUN"),
				Generator.getInstance().fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				Generator.getInstance().fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				Generator.getInstance().beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		// MID 1X omitted (MID→TIMBA)

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("NEVIL1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("AMDUT"),
			25,
			[
				Generator.getInstance().beacon("AMDUT"),
				Generator.getInstance().fix("KKE64", "504915.77N", "0003030.52E", void 0, 250),
				Generator.getInstance().beacon("TIMBA", 7000, 220)
			],
			{end: "hold"})
		.withEntry(14000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("KUNAV1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("AMDUT"),
			312,
			[
				Generator.getInstance().beacon("AMDUT", 16000),
				Generator.getInstance().fix("KKE64", "504915.77N", "0003030.52E", void 0, 250),
				Generator.getInstance().beacon("TIMBA", 7000, 220)
			],
			{end: "hold"})
		.withEntry(14000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("OTMET1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("ELDER"),
			91,
			[
				Generator.getInstance().beacon("ELDER"),
				Generator.getInstance().beacon("TELTU", 13000, 250),
				Generator.getInstance().fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				Generator.getInstance().beacon("WILLO", 7000, 220)
			],
			{end: "hold"})
		.withEntry(13000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("VASUX1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("DISVO"),
			39,
			[
				Generator.getInstance().beacon("DISVO"),
				Generator.getInstance().beacon("TELTU", 13000, 250),
				Generator.getInstance().fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				Generator.getInstance().beacon("WILLO", 7000, 220)
			],
			{end: "hold"})
		.withEntry(13000));

		// AMDUT 1G omitted (AMDUT→WILLO)
		// ARNUN 1G omitted (ARNUN→WILLO)

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("TELTU", "1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("TELTU"),
			void 0,
			[
				Generator.getInstance().beacon("TELTU", void 0, 250),
				Generator.getInstance().fix("SFD", "504538.48N", "0000718.89E", void 0, 220),
				Generator.getInstance().beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("DISIT1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("KIDLI"),
			146,
			[
				Generator.getInstance().beacon("KIDLI", 15000),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W"),
				Generator.getInstance().fix("TUFOZ", "510101.01N", "0003024.31W", void 0, 250),
				Generator.getInstance().fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				Generator.getInstance().beacon("WILLO", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("KIDLI", "1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("KIDLI"),
			void 0,
			[
				Generator.getInstance().beacon("KIDLI", 15000),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W"),
				Generator.getInstance().fix("TUFOZ", "510101.01N", "0003024.31W", void 0, 250),
				Generator.getInstance().fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				Generator.getInstance().beacon("WILLO", 7000, 220)
			],
			{end: "hold"})
		.withEntry(15000, 160));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("ABSAV", "1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("ABSAV"),
			void 0,
			[
				Generator.getInstance().beacon("ABSAV", 15000),
				Generator.getInstance().beacon("AVANT"),
				Generator.getInstance().beacon("GWC", 13000, 220),
				Generator.getInstance().fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				Generator.getInstance().beacon("WILLO", 7000, 220)
			],
			{end: "hold"})
		.withEntry(14000, 33));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("GWC", "1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("GWC"),
			void 0,
			[
				Generator.getInstance().beacon("GWC", 13000, 220),
				Generator.getInstance().fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				Generator.getInstance().beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		));

		Generator.getInstance().arrival(new STAR(
			...Generator.getInstance().pronounce("SIRIC", "1G"),
			[Generator.getInstance().runway("kkn"), Generator.getInstance().runway("kks")],
			true,
			Generator.getInstance().beacon("SIRIC"),
			void 0,
			[
				Generator.getInstance().beacon("SIRIC", 14000),
				Generator.getInstance().fix("NIGIT", "511846.96N", "0011014.71W"),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W"),
				Generator.getInstance().fix("TUFOZ", "510101.01N", "0003024.31W", void 0, 250),
				Generator.getInstance().fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				Generator.getInstance().beacon("WILLO", 7000, 220)
			],
			{end: "hold"})
		.withEntry(14000, 106));
	}

	private sid() {
		const kkn = Generator.getInstance().runway("kkn");
		const kks = Generator.getInstance().runway("kks");
		const kksRev = kks.reverse();

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("LAM", "5P"),
			kks,
			[
				kks.position.destination(kks.reverseLocalizer, 3.5),
				kks.position.destination(kks.reverseLocalizer, 3.5).bearingIntersection(51, Generator.getInstance().beacon("DET"), 258),
				Generator.getInstance().beacon("DET").destination(258, 20),
				Generator.getInstance().fix("ACORN", "511519N", "0001146E"),
				Generator.getInstance().beacon("DET").destination(258, 10.5),
				Generator.getInstance().beacon("DET").destination(258, 10.5).bearingIntersection(78, Generator.getInstance().beacon("LAM"), 156),
				Generator.getInstance().beacon("LAM").destination(156, 15),
				Generator.getInstance().beacon("LAM").destination(156, 10),
				Generator.getInstance().beacon("LAM")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("LAM", "5W"),
			kkn,
			[
				kks.position.destination(kks.reverseLocalizer, 3.5),
				kks.position.destination(kks.reverseLocalizer, 3.5).bearingIntersection(51, Generator.getInstance().beacon("DET"), 258),
				Generator.getInstance().beacon("DET").destination(258, 20),
				Generator.getInstance().fix("ACORN", "511519N", "0001146E"),
				Generator.getInstance().beacon("DET").destination(258, 10.5),
				Generator.getInstance().beacon("DET").destination(258, 10.5).bearingIntersection(78, Generator.getInstance().beacon("LAM"), 156),
				Generator.getInstance().beacon("LAM").destination(156, 15),
				Generator.getInstance().beacon("LAM").destination(156, 10),
				Generator.getInstance().beacon("LAM")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("LAM", "6M"),
			kks,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3)
					.bearingIntersection(kks.heading + 90, Generator.getInstance().beacon("DET"), 258),
				Generator.getInstance().beacon("DET").destination(258, 31),
				Generator.getInstance().beacon("DET").destination(258, 29),
				Generator.getInstance().fix("ACORN", "511519N", "0001146E"),
				Generator.getInstance().beacon("DET").destination(258, 10.5),
				Generator.getInstance().beacon("DET").destination(258, 10.5).bearingIntersection(78, Generator.getInstance().beacon("LAM"), 156),
				Generator.getInstance().beacon("LAM").destination(156, 15),
				Generator.getInstance().beacon("LAM").destination(156, 10),
				Generator.getInstance().beacon("LAM")
			],
			false,
			5000,
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("LAM", "6V"),
			kkn,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3)
					.bearingIntersection(kks.heading + 90, Generator.getInstance().beacon("DET"), 258),
				Generator.getInstance().beacon("DET").destination(258, 31),
				Generator.getInstance().beacon("DET").destination(258, 29),
				Generator.getInstance().fix("ACORN", "511519N", "0001146E"),
				Generator.getInstance().beacon("DET").destination(258, 10.5),
				Generator.getInstance().beacon("DET").destination(258, 10.5).bearingIntersection(78, Generator.getInstance().beacon("LAM"), 156),
				Generator.getInstance().beacon("LAM").destination(156, 15),
				Generator.getInstance().beacon("LAM").destination(156, 10),
				Generator.getInstance().beacon("LAM")
			],
			false,
			5000,
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("LAM", "1Z"),
			kks,
			[
				Generator.getInstance().fix("KKE02", "510953.05N", "0000410.13W"),
				Generator.getInstance().fix("KKE12", "511459.25N", "0000624.07E"),
				Generator.getInstance().fix("SUNAV", "511536.90N", "0001139.80E"),
				Generator.getInstance().fix("KKE35", "511659.04N", "0002316.22E"),
				Generator.getInstance().fix("KKN43", "512453.61N", "0001809.13E"),
				Generator.getInstance().fix("KKN48", "512931.14N", "0001508.68E"),
				Generator.getInstance().beacon("LAM")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("FRANE"), "1M"),
			kks,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3)
					.bearingIntersection(kks.heading + 90, Generator.getInstance().beacon("DET"), 258),
				Generator.getInstance().beacon("DET").destination(258, 31),
				Generator.getInstance().beacon("DET").destination(258, 29),
				Generator.getInstance().fix("ACORN", "511519N", "0001146E"),
				Generator.getInstance().fix("DVR").destination(276, 31.9),
				Generator.getInstance().beacon("DET"),
				Generator.getInstance().fix("FRANE")
			],
			false,
			5000,
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("FRANE"), "1V"),
			kkn,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3)
					.bearingIntersection(kks.heading + 90, Generator.getInstance().beacon("DET"), 258),
				Generator.getInstance().beacon("DET").destination(258, 31),
				Generator.getInstance().beacon("DET").destination(258, 29),
				Generator.getInstance().fix("ACORN", "511519N", "0001146E"),
				Generator.getInstance().fix("DVR").destination(276, 31.9),
				Generator.getInstance().beacon("DET"),
				Generator.getInstance().fix("FRANE")
			],
			false,
			5000,
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("FRANE"), "1P"),
			kks,
			[
				Generator.getInstance().fix("DVR").destination(269, 52.7),
				Generator.getInstance().fix("TUNBY", Generator.getInstance().fix("DVR").destination(269, 39.1)),
				Generator.getInstance().fix("DVR").destination(269, 31),
				Generator.getInstance().beacon("DET"),
				Generator.getInstance().fix("FRANE")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("FRANE"), "1W"),
			kkn,
			[
				Generator.getInstance().fix("DVR").destination(269, 52.7),
				Generator.getInstance().fix("TUNBY", Generator.getInstance().fix("DVR").destination(269, 39.1)),
				Generator.getInstance().fix("DVR").destination(269, 31),
				Generator.getInstance().beacon("DET"),
				Generator.getInstance().fix("FRANE")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("FRANE"), "1Z"),
			kks,
			[
				Generator.getInstance().fix("KKE04", "511008.38N", "0000218.83W"),
				Generator.getInstance().fix("KKE10", "510955.93N", "0000909.88E"),
				Generator.getInstance().fix("KKE17", "510957.12N", "0001937.59E"),
				Generator.getInstance().fix("KKE25", "510957.30N", "0003244.84E"),
				Generator.getInstance().beacon("DET"),
				Generator.getInstance().fix("FRANE")
			],
			true
		));

		// BOGNA 1M omitted (26L→BOGNA)

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("BOGNA"), "1V"),
			kks,
			[
				kksRev.position.destination(257, 6.4),
				Generator.getInstance().beacon("OCK").destination(175, 13),
				Generator.getInstance().beacon("OCK").destination(175, 18),
				Generator.getInstance().beacon("OCK").destination(175, 23),
				Generator.getInstance().beacon("OCK").destination(175, 28),
				Generator.getInstance().fix("BOGNA")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("BOGNA"), "1X"),
			kks,
			[
				Generator.getInstance().fix("KKW06", "510726.09N", "0002153.73W"),
				Generator.getInstance().fix("KKW08", "510656.84N", "0002522.88W"),
				Generator.getInstance().fix("KKS11", "510442.43N", "0002505.76W"),
				Generator.getInstance().fix("KKS17", "510022.73N", "0002432.75W"),
				Generator.getInstance().fix("KKS20", "505524.03N", "0002354.89W"),
				Generator.getInstance().fix("KKS25", "504958.32N", "0002313.74W"),
				Generator.getInstance().fix("BOGNA")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("HARDY"), "1X"),
			kks,
			[
				Generator.getInstance().fix("KKW06", "510726.09N", "0002153.73W"),
				Generator.getInstance().fix("KKW08", "510656.84N", "0002522.88W"),
				Generator.getInstance().fix("KKS11", "510442.43N", "0002505.76W"),
				Generator.getInstance().fix("KKS17", "510022.73N", "0002432.75W"),
				Generator.getInstance().fix("KKS20", "505524.03N", "0002354.89W"),
				Generator.getInstance().fix("KKS25", "504958.32N", "0002313.74W"),
				Generator.getInstance().fix("BOGNA"),
				Generator.getInstance().fix("HARDY")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("KENET"), "3P"),
			kks,
			[
				kks.position.destination(kks.reverseLocalizer, 3),
				Generator.getInstance().beacon("DET").destination(259, 26),
				Generator.getInstance().beacon("DET").destination(259, 36),
				Generator.getInstance().beacon("DET").destination(259, 43),
				Generator.getInstance().beacon("SAM").destination(66, 20),
				Generator.getInstance().beacon("SAM").destination(66, 20).bearingIntersection(246, Generator.getInstance().beacon("GWC"), 326),
				Generator.getInstance().fix("KENET")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("KENET"), "3W"),
			kkn,
			[
				kks.position.destination(kks.reverseLocalizer, 3),
				Generator.getInstance().beacon("DET").destination(259, 26),
				Generator.getInstance().beacon("DET").destination(259, 36),
				Generator.getInstance().beacon("DET").destination(259, 43),
				Generator.getInstance().beacon("SAM").destination(66, 20),
				Generator.getInstance().beacon("SAM").destination(66, 20).bearingIntersection(246, Generator.getInstance().beacon("GWC"), 326),
				Generator.getInstance().fix("KENET")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("NOVMA"), "1M"),
			kks,
			[
				kksRev.position.destination(257, 6.7),
				kksRev.position.destination(257, 8.7),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W"),
				Generator.getInstance().fix("NOVMA")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("NOVMA"), "1V"),
			kks,
			[
				kksRev.position.destination(257, 6.7),
				kksRev.position.destination(257, 8.7),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W"),
				Generator.getInstance().fix("NOVMA")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("SAM", "3P"),
			kks,
			[
				kks.position.destination(kks.reverseLocalizer, 3),
				Generator.getInstance().beacon("DET").destination(259, 26),
				Generator.getInstance().beacon("DET").destination(259, 36),
				Generator.getInstance().beacon("DET").destination(259, 43),
				Generator.getInstance().beacon("SAM").destination(66, 20),
				Generator.getInstance().beacon("SAM")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("SAM", "3W"),
			kkn,
			[
				kks.position.destination(kks.reverseLocalizer, 3),
				Generator.getInstance().beacon("DET").destination(259, 26),
				Generator.getInstance().beacon("DET").destination(259, 36),
				Generator.getInstance().beacon("DET").destination(259, 43),
				Generator.getInstance().beacon("SAM").destination(66, 20),
				Generator.getInstance().beacon("SAM")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("NOVMA"), "1X"),
			kks,
			[
				Generator.getInstance().fix("KKW07", "510717.20N", "0002300.00W"),
				Generator.getInstance().fix("KKW09", "510654.30N", "0002544.30W"),
				Generator.getInstance().fix("MID", "510314.23N", "0003730.01W"),
				Generator.getInstance().fix("NOVMA")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("IMVUR"), "1Z"),
			kks,
			[
				Generator.getInstance().fix("KKE05", "511005.90N", "0000235.70W"),
				Generator.getInstance().fix("KKN09", "511353.10N", "0000355.30W"),
				Generator.getInstance().fix("KKW19", "511158.00N", "0002034.30W"),
				Generator.getInstance().fix("IMVUR")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SFD"), "5M"),
			kks,
			[
				kksRev.position.destination(257, 6.8),
				Generator.getInstance().fix("SFD").destination(310, 25),
				Generator.getInstance().fix("SFD").destination(310, 18),
				Generator.getInstance().fix("SFD").destination(310, 16),
				Generator.getInstance().fix("SFD")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SFD"), "5V"),
			kkn,
			[
				kksRev.position.destination(257, 6.8),
				Generator.getInstance().fix("SFD").destination(310, 25),
				Generator.getInstance().fix("SFD").destination(310, 18),
				Generator.getInstance().fix("SFD").destination(310, 16),
				Generator.getInstance().fix("SFD")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SFD"), "9W"),
			kks,
			[
				kks.position.destination(77, 2.5),
				Generator.getInstance().fix("SFD").destination(342, 21),
				Generator.getInstance().fix("SFD").destination(342, 17),
				Generator.getInstance().fix("SFD").destination(342, 13),
				Generator.getInstance().fix("SFD").destination(342, 7),
				Generator.getInstance().fix("SFD")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SFD"), "9P"),
			kkn,
			[
				kks.position.destination(77, 2.5),
				Generator.getInstance().fix("SFD").destination(342, 21),
				Generator.getInstance().fix("SFD").destination(342, 17),
				Generator.getInstance().fix("SFD").destination(342, 13),
				Generator.getInstance().fix("SFD").destination(342, 7),
				Generator.getInstance().fix("SFD")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SFD"), "4Z"),
			kks,
			[
				Generator.getInstance().fix("KKE03", "510958.00N", "0000334.10W"),
				Generator.getInstance().fix("KKS08", "510544.80N", "0000209.20W"),
				Generator.getInstance().fix("KKS12", "510155.10N", "0000020.40W"),
				Generator.getInstance().fix("KKS16", "505805.21N", "0000128.29E"),
				Generator.getInstance().fix("KKS22", "505220.70N", "0000410.60E"),
				Generator.getInstance().fix("SFD")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("SFD"), "1X"),
			kks,
			[
				Generator.getInstance().fix("KKW06", "510726.09N", "0002153.73W"),
				Generator.getInstance().fix("KKW10", "510648.64N", "0002621.35W"),
				Generator.getInstance().fix("KKW11", "510338.83N", "0002514.22W"),
				Generator.getInstance().fix("KKS13", "510205.06N", "0002223.13W"),
				Generator.getInstance().fix("KKS19", "505729.42N", "0001402.01W"),
				Generator.getInstance().fix("KKS21", "505610.56N", "0001139.14W"),
				Generator.getInstance().fix("SFD")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("WIZAD"), "4M"),
			kks,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, Generator.getInstance().beacon("MAY"), 282),
				Generator.getInstance().beacon("MAY").destination(282, 13),
				Generator.getInstance().beacon("MAY").destination(282, 9),
				Generator.getInstance().beacon("MAY"),
				Generator.getInstance().fix("DVR").destination(258, 36),
				Generator.getInstance().fix("WIZAD")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("WIZAD"), "4V"),
			kkn,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, Generator.getInstance().beacon("MAY"), 282),
				Generator.getInstance().beacon("MAY").destination(282, 13),
				Generator.getInstance().beacon("MAY").destination(282, 9),
				Generator.getInstance().beacon("MAY"),
				Generator.getInstance().fix("DVR").destination(258, 36),
				Generator.getInstance().fix("WIZAD")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("WIZAD"), "1X"),
			kks,
			[
				Generator.getInstance().fix("KKW04", "510750.70N", "0001857.30W"),
				Generator.getInstance().fix("KKS06", "510422.79N", "0001744.35W"),
				Generator.getInstance().fix("KKS09", "510347.42N", "0001043.34W"),
				Generator.getInstance().fix("KKS14", "510311.65N", "0000652.24W"),
				Generator.getInstance().beacon("MAY"),
				Generator.getInstance().fix("KKS33", "510327.27N", "0002657.12E"),
				Generator.getInstance().fix("WIZAD")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("MIMFO"), "1M"),
			kks,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3)
					.bearingIntersection(kks.heading + 90, Generator.getInstance().beacon("DET"), 258),
				Generator.getInstance().beacon("DET").destination(258, 20),
				Generator.getInstance().fix("ACORN", "511519N", "0001146E"),
				Generator.getInstance().fix("MIMFO")
			],
			false,
			5000,
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("MIMFO"), "1V"),
			kkn,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3)
					.bearingIntersection(kks.heading + 90, Generator.getInstance().beacon("DET"), 258),
				Generator.getInstance().beacon("DET").destination(258, 20),
				Generator.getInstance().fix("ACORN", "511519N", "0001146E"),
				Generator.getInstance().fix("MIMFO")
			],
			false,
			5000,
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("DVR"), "2P"),
			kks,
			[
				Generator.getInstance().fix("DVR").destination(269, 52.7),
				Generator.getInstance().fix("TUNBY", Generator.getInstance().fix("DVR").destination(269, 39.1)),
				Generator.getInstance().fix("DVR").destination(269, 33),
				Generator.getInstance().fix("DVR")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("DVR"), "2W"),
			kkn,
			[
				Generator.getInstance().fix("DVR").destination(269, 52.7),
				Generator.getInstance().fix("TUNBY", Generator.getInstance().fix("DVR").destination(269, 39.1)),
				Generator.getInstance().fix("DVR").destination(269, 33),
				Generator.getInstance().fix("DVR")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("ODVIK"), "2Z"),
			kks,
			[
				Generator.getInstance().fix("KKE04", "511008.38N", "0000218.83W"),
				Generator.getInstance().fix("KKE10", "510955.93N", "0000909.88E"),
				Generator.getInstance().fix("KKE17", "510957.12N", "0001937.59E"),
				Generator.getInstance().fix("ODVIK")
			],
			true
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("TIGER", "3M"),
			kks,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, Generator.getInstance().beacon("MAY"), 282),
				Generator.getInstance().beacon("MAY").destination(282, 13),
				Generator.getInstance().beacon("MAY").destination(282, 9),
				Generator.getInstance().beacon("MAY"),
				Generator.getInstance().beacon("TIGER"),
				Generator.getInstance().beacon("LAM")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("TIGER", "3V"),
			kkn,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, Generator.getInstance().beacon("MAY"), 282),
				Generator.getInstance().beacon("MAY").destination(282, 13),
				Generator.getInstance().beacon("MAY").destination(282, 9),
				Generator.getInstance().beacon("MAY"),
				Generator.getInstance().beacon("TIGER"),
				Generator.getInstance().beacon("LAM")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("DAGGA"), "1M"),
			kks,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, Generator.getInstance().beacon("MAY"), 282),
				Generator.getInstance().beacon("MAY").destination(282, 13),
				Generator.getInstance().beacon("MAY").destination(282, 9),
				Generator.getInstance().beacon("MAY"),
				Generator.getInstance().beacon("TIGER"),
				Generator.getInstance().beacon("DET"),
				Generator.getInstance().fix("DAGGA"),
				Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("DAGGA"), "1V"),
			kkn,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, Generator.getInstance().beacon("MAY"), 282),
				Generator.getInstance().beacon("MAY").destination(282, 13),
				Generator.getInstance().beacon("MAY").destination(282, 9),
				Generator.getInstance().beacon("MAY"),
				Generator.getInstance().beacon("TIGER"),
				Generator.getInstance().beacon("DET"),
				Generator.getInstance().fix("DAGGA"),
				Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce("TIGER", "1X"),
			kks,
			[
				Generator.getInstance().fix("KKW04", "510750.70N", "0001857.30W"),
				Generator.getInstance().fix("KKS06", "510422.79N", "0001744.35W"),
				Generator.getInstance().fix("KKS09", "510347.42N", "0001043.34W"),
				Generator.getInstance().fix("KKS14", "510311.65N", "0000652.24W"),
				Generator.getInstance().beacon("MAY"),
				Generator.getInstance().fix("KKS36", "510503.33N", "0003055.89E"),
				Generator.getInstance().beacon("LAM")
			]
		));

		Generator.getInstance().departure(new SID(
			...Generator.getInstance().pronounce(Generator.getInstance().sidFix("DAGGA"), "1X"),
			kks,
			[
				Generator.getInstance().fix("KKW04", "510750.70N", "0001857.30W"),
				Generator.getInstance().fix("KKS06", "510422.79N", "0001744.35W"),
				Generator.getInstance().fix("KKS09", "510347.42N", "0001043.34W"),
				Generator.getInstance().fix("KKS14", "510311.65N", "0000652.24W"),
				Generator.getInstance().beacon("MAY"),
				Generator.getInstance().fix("KKS36", "510503.33N", "0003055.89E"),
				Generator.getInstance().beacon("DET"),
				Generator.getInstance().fix("DAGGA"),
				Generator.getInstance().fix("CLN", "515054.50N", "0010851.32E")
			]
		));
	}

	private rnp() {
		const rwy26r = Generator.getInstance().runway("kkn");
		const rwy08l = rwy26r.reverse();

		Generator.getInstance().fix("ARPIT", rwy26r.position.destination(rwy26r.reverseLocalizer, 10.6));
		Generator.getInstance().fix("MEBIG", rwy08l.position.destination(rwy08l.reverseLocalizer, 10.6));

		Generator.getInstance().arrival(new STAR(
			"RNP",
			"R-N-P",
			[rwy26r],
			false,
			Beacon.from("ARPIT", "Arpit", Generator.getInstance().fix("ARPIT")),
			void 0,
			[
				Generator.getInstance().fix("ARPIT", 3000)
			],
			// K26RF
			{ils: {dme: 8.6, altitude: 3000}}
		));

		Generator.getInstance().arrival(new STAR(
			"RNP",
			"R-N-P",
			[rwy26r],
			"only",
			Beacon.from("MEBIG", "Mebig", Generator.getInstance().fix("MEBIG")),
			void 0,
			[
				Generator.getInstance().fix("MEBIG", 3000)
			],
			// K08LF
			{ils: {dme: 8.6, altitude: 3000}}
		));
	}
}
