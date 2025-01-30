import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";
import SID from "../src/SID.js";
import NamedFix from "../src/NamedFix.js";
import fs from "node:fs/promises";

export default class EGKK {
	public constructor(private readonly atc: Generator) {}

	public async init() {
		await this.airport();
		this.star();
		this.sid();
	}

	private async airport() {
		this.atc.airport(
			new Airport(
				"London Gatwick Airport",
				"Gatwick",
				"EGKK",
				10,
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
					new Airport.EntryPoint(105, this.atc.beacon("ARNUN"), 14000),
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
					this.atc.beacon("TIGER"),
					NamedFix.fromDMS("514919N", "0004739E", "DAGGA", "Dagga"),
				],
				this.atc.beacon("MAY")
			)
		);
	}

	private star() {
		this.atc.arrival(new STAR(
			...this.atc.pronounce("BARMI1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("TEBRA"),
			228,
			[
				this.atc.beacon("TEBRA"),
				this.atc.fix("ABTUM", "512603.66N", "0012228.98E", 14000),
				this.atc.beacon("ARNUN"),
				this.atc.fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				this.atc.fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		), 14000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("TEBRA", "2G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("TEBRA"),
			void 0,
			[
				this.atc.beacon("TEBRA"),
				this.atc.fix("ABTUM", "512603.66N", "0012228.98E", 14000),
				this.atc.beacon("ARNUN"),
				this.atc.fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				this.atc.fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		), 14000, 280);

		/**
		 * This arrival is to enable continuation on BARMI 1G TEBRA 2G if
		 * interrupted with HOLD at ARNUN. Since the original STAR was
		 * interrupted, it’s not possible to continue with the same name.
		 * Continuation after interruption at ARNUN will show as TEBRA 2G.
		 */
		this.atc.arrival(new STAR(
			...this.atc.pronounce("TEBRA", "2G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("ARNUN"),
			216,
			[
				this.atc.beacon("ARNUN"),
				this.atc.fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				this.atc.fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("KONAN", "2G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("ARNUN"),
			264,
			[
				this.atc.beacon("ARNUN"),
				this.atc.fix("KKE63", "505856.70N", "0004051.78E", void 0, 250),
				this.atc.fix("LARCK", "505441.83N", "0002647.93E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		// MID 1X omitted (MID→TIMBA)

		this.atc.arrival(new STAR(
			...this.atc.pronounce("NEVIL1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("AMDUT"),
			25,
			[
				this.atc.beacon("AMDUT"),
				this.atc.fix("KKE64", "504915.77N", "0003030.52E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		), 14000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("KUNAV1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("AMDUT"),
			312,
			[
				this.atc.beacon("AMDUT", 16000),
				this.atc.fix("KKE64", "504915.77N", "0003030.52E", void 0, 250),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		), 14000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("OTMET1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("ELDER"),
			91,
			[
				this.atc.beacon("ELDER"),
				this.atc.beacon("TELTU", 13000, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		), 13000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("VASUX1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("DISVO"),
			39,
			[
				this.atc.beacon("DISVO"),
				this.atc.beacon("TELTU", 13000, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		), 13000);

		// AMDUT 1G omitted (AMDUT→WILLO)
		// ARNUN 1G omitted (ARNUN→WILLO)

		this.atc.arrival(new STAR(
			...this.atc.pronounce("TELTU", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("TELTU"),
			void 0,
			[
				this.atc.beacon("TELTU", void 0, 250),
				this.atc.fix("SFD", "504538.48N", "0000718.89E", void 0, 220),
				this.atc.beacon("TIMBA", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("DISIT1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("KIDLI"),
			146,
			[
				this.atc.beacon("KIDLI", 15000),
				this.atc.fix("MID", "510314.23N", "0003730.01W"),
				this.atc.fix("TUFOZ", "510101.01N", "0003024.31W", void 0, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		), 15000);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("KIDLI", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("KIDLI"),
			void 0,
			[
				this.atc.beacon("KIDLI", 15000),
				this.atc.fix("MID", "510314.23N", "0003730.01W"),
				this.atc.fix("TUFOZ", "510101.01N", "0003024.31W", void 0, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		), 15000, 160);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("ABSAV", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("ABSAV"),
			void 0,
			[
				this.atc.beacon("ABSAV", 15000),
				this.atc.beacon("AVANT"),
				this.atc.beacon("GWC", 13000, 220),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		), 14000, 33);

		this.atc.arrival(new STAR(
			...this.atc.pronounce("GWC", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("GWC"),
			void 0,
			[
				this.atc.beacon("GWC", 13000, 220),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		));

		this.atc.arrival(new STAR(
			...this.atc.pronounce("SIRIC", "1G"),
			[this.atc.runway("kkn"), this.atc.runway("kks")],
			true,
			this.atc.beacon("SIRIC"),
			void 0,
			[
				this.atc.beacon("SIRIC", 14000),
				this.atc.fix("NIGIT", "511846.96N", "0011014.71W"),
				this.atc.fix("MID", "510314.23N", "0003730.01W"),
				this.atc.fix("TUFOZ", "510101.01N", "0003024.31W", void 0, 250),
				this.atc.fix("HOLLY", "505312.18N", "0000542.23W", void 0, 220),

				// course to fix path terminator approximation
				new Fix(50.9010, 0.0283),
				new Fix(50.9548, 0.0197),

				this.atc.beacon("WILLO", 7000, 220)
			],
			{end: "hold"}
		), 14000, 106);
	}

	private sid() {
		const kkn = this.atc.runway("kkn");
		const kks = this.atc.runway("kks");
		const kksRev = kks.reverse();

		this.atc.departure(new SID(
			...this.atc.pronounce("LAM", "5P"),
			kks,
			[
				kks.position.destination(kks.reverseLocalizer, 3.5),
				kks.position.destination(kks.reverseLocalizer, 3.5).bearingIntersection(51, this.atc.beacon("DET"), 258),
				this.atc.beacon("DET").destination(258, 20),
				this.atc.fix("ACORN", "511519N", "0001146E"),
				this.atc.beacon("DET").destination(258, 10.5),
				this.atc.beacon("DET").destination(258, 10.5).bearingIntersection(78, this.atc.beacon("LAM"), 156),
				this.atc.beacon("LAM").destination(156, 15),
				this.atc.beacon("LAM").destination(156, 10),
				this.atc.beacon("LAM")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("LAM", "5W"),
			kkn,
			[
				kks.position.destination(kks.reverseLocalizer, 3.5),
				kks.position.destination(kks.reverseLocalizer, 3.5).bearingIntersection(51, this.atc.beacon("DET"), 258),
				this.atc.beacon("DET").destination(258, 20),
				this.atc.fix("ACORN", "511519N", "0001146E"),
				this.atc.beacon("DET").destination(258, 10.5),
				this.atc.beacon("DET").destination(258, 10.5).bearingIntersection(78, this.atc.beacon("LAM"), 156),
				this.atc.beacon("LAM").destination(156, 15),
				this.atc.beacon("LAM").destination(156, 10),
				this.atc.beacon("LAM")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("LAM", "6M"),
			kks,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3).bearingIntersection(51, this.atc.beacon("DET"), 258),
				this.atc.beacon("DET").destination(258, 31),
				this.atc.beacon("DET").destination(258, 29),
				this.atc.fix("ACORN", "511519N", "0001146E"),
				this.atc.beacon("DET").destination(258, 10.5),
				this.atc.beacon("DET").destination(258, 10.5).bearingIntersection(78, this.atc.beacon("LAM"), 156),
				this.atc.beacon("LAM").destination(156, 15),
				this.atc.beacon("LAM").destination(156, 10),
				this.atc.beacon("LAM")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("LAM", "6V"),
			kkn,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3).bearingIntersection(51, this.atc.beacon("DET"), 258),
				this.atc.beacon("DET").destination(258, 31),
				this.atc.beacon("DET").destination(258, 29),
				this.atc.fix("ACORN", "511519N", "0001146E"),
				this.atc.beacon("DET").destination(258, 10.5),
				this.atc.beacon("DET").destination(258, 10.5).bearingIntersection(78, this.atc.beacon("LAM"), 156),
				this.atc.beacon("LAM").destination(156, 15),
				this.atc.beacon("LAM").destination(156, 10),
				this.atc.beacon("LAM")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("LAM", "1Z"),
			kks,
			[
				this.atc.fix("KKE02", "510953.05N", "0000410.13W"),
				this.atc.fix("KKE12", "511459.25N", "0000624.07E"),
				this.atc.fix("SUNAV", "511536.90N", "0001139.80E"),
				this.atc.fix("KKE35", "511659.04N", "0002316.22E"),
				this.atc.fix("KKN43", "512453.61N", "0001809.13E"),
				this.atc.fix("KKN48", "512931.14N", "0001508.68E"),
				this.atc.beacon("LAM")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("FRANE"), "1M"),
			kks,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3).bearingIntersection(51, this.atc.beacon("DET"), 258),
				this.atc.beacon("DET").destination(258, 31),
				this.atc.beacon("DET").destination(258, 29),
				this.atc.fix("ACORN", "511519N", "0001146E"),
				this.atc.fix("DVR").destination(276, 31.9),
				this.atc.beacon("DET"),
				this.atc.fix("FRANE")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("FRANE"), "1V"),
			kkn,
			[
				kksRev.position.destination(kks.heading, 2.3),
				kksRev.position.destination(kks.heading, 2.3).bearingIntersection(51, this.atc.beacon("DET"), 258),
				this.atc.beacon("DET").destination(258, 31),
				this.atc.beacon("DET").destination(258, 29),
				this.atc.fix("ACORN", "511519N", "0001146E"),
				this.atc.fix("DVR").destination(276, 31.9),
				this.atc.beacon("DET"),
				this.atc.fix("FRANE")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("FRANE"), "1P"),
			kks,
			[
				kks.position.bearingIntersection(kks.reverseLocalizer, this.atc.fix("DVR"), 269),
				this.atc.fix("TUNBY", "511008N", "0001929E"),
				this.atc.fix("DVR").destination(269, 31),
				this.atc.beacon("DET"),
				this.atc.fix("FRANE")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("FRANE"), "1W"),
			kkn,
			[
				kks.position.bearingIntersection(kks.reverseLocalizer, this.atc.fix("DVR"), 269),
				this.atc.fix("TUNBY", "511008N", "0001929E"),
				this.atc.fix("DVR").destination(269, 31),
				this.atc.beacon("DET"),
				this.atc.fix("FRANE")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("FRANE"), "1Z"),
			kks,
			[
				this.atc.fix("KKE04", "511008.38N", "0000218.83W"),
				this.atc.fix("KKE10", "510955.93N", "0000909.88E"),
				this.atc.fix("KKE17", "510957.12N", "0001937.59E"),
				this.atc.fix("KKE25", "510957.30N", "0003244.84E"),
				this.atc.beacon("DET"),
				this.atc.fix("FRANE")
			],
			true
		));

		// BOGNA 1M omitted (26L→BOGNA)

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("BOGNA"), "1V"),
			kks,
			[
				kksRev.position.destination(257, 6.4),
				this.atc.beacon("OCK").destination(175, 13),
				this.atc.beacon("OCK").destination(175, 18),
				this.atc.beacon("OCK").destination(175, 23),
				this.atc.beacon("OCK").destination(175, 28),
				this.atc.fix("BOGNA")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("BOGNA"), "1X"),
			kks,
			[
				this.atc.fix("KKW06", "510726.09N", "0002153.73W"),
				this.atc.fix("KKW08", "510656.84N", "0002522.88W"),
				this.atc.fix("KKS11", "510442.43N", "0002505.76W"),
				this.atc.fix("KKS17", "510022.73N", "0002432.75W"),
				this.atc.fix("KKS20", "505524.03N", "0002354.89W"),
				this.atc.fix("KKS25", "504958.32N", "0002313.74W"),
				this.atc.fix("BOGNA")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("HARDY"), "1X"),
			kks,
			[
				this.atc.fix("KKW06", "510726.09N", "0002153.73W"),
				this.atc.fix("KKW08", "510656.84N", "0002522.88W"),
				this.atc.fix("KKS11", "510442.43N", "0002505.76W"),
				this.atc.fix("KKS17", "510022.73N", "0002432.75W"),
				this.atc.fix("KKS20", "505524.03N", "0002354.89W"),
				this.atc.fix("KKS25", "504958.32N", "0002313.74W"),
				this.atc.fix("BOGNA"),
				this.atc.fix("HARDY")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("KENET"), "3P"),
			kks,
			[
				kks.position.destination(kksRev.reverseLocalizer, 3),
				this.atc.beacon("DET").destination(259, 26),
				this.atc.beacon("DET").destination(259, 36),
				this.atc.beacon("DET").destination(259, 43),
				this.atc.beacon("SAM").destination(66, 20),
				this.atc.beacon("SAM").destination(66, 20).bearingIntersection(246, this.atc.beacon("GWC"), 326),
				this.atc.fix("KENET")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("KENET"), "3W"),
			kkn,
			[
				kks.position.destination(kksRev.reverseLocalizer, 3),
				this.atc.beacon("DET").destination(259, 26),
				this.atc.beacon("DET").destination(259, 36),
				this.atc.beacon("DET").destination(259, 43),
				this.atc.beacon("SAM").destination(66, 20),
				this.atc.beacon("SAM").destination(66, 20).bearingIntersection(246, this.atc.beacon("GWC"), 326),
				this.atc.fix("KENET")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("NOVMA"), "1M"),
			kks,
			[
				kksRev.position.destination(257, 6.7),
				kksRev.position.destination(257, 8.7),
				this.atc.fix("MID", "510314.23N", "0003730.01W"),
				this.atc.fix("NOVMA")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("NOVMA"), "1V"),
			kks,
			[
				kksRev.position.destination(257, 6.7),
				kksRev.position.destination(257, 8.7),
				this.atc.fix("MID", "510314.23N", "0003730.01W"),
				this.atc.fix("NOVMA")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("SAM", "3P"),
			kks,
			[
				kks.position.destination(kksRev.reverseLocalizer, 3),
				this.atc.beacon("DET").destination(259, 26),
				this.atc.beacon("DET").destination(259, 36),
				this.atc.beacon("DET").destination(259, 43),
				this.atc.beacon("SAM").destination(66, 20),
				this.atc.beacon("SAM")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("SAM", "3W"),
			kkn,
			[
				kks.position.destination(kksRev.reverseLocalizer, 3),
				this.atc.beacon("DET").destination(259, 26),
				this.atc.beacon("DET").destination(259, 36),
				this.atc.beacon("DET").destination(259, 43),
				this.atc.beacon("SAM").destination(66, 20),
				this.atc.beacon("SAM")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("NOVMA"), "1X"),
			kks,
			[
				this.atc.fix("KKW07", "510717.20N", "0002300.00W"),
				this.atc.fix("KKW09", "510654.30N", "0002544.30W"),
				this.atc.fix("MID", "510314.23N", "0003730.01W"),
				this.atc.fix("NOVMA")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("IMVUR"), "1Z"),
			kks,
			[
				this.atc.fix("KKE05", "511005.90N", "0000235.70W"),
				this.atc.fix("KKN09", "511353.10N", "0000355.30W"),
				this.atc.fix("KKW19", "511158.00N", "0002034.30W"),
				this.atc.fix("IMVUR")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("SFD"), "5M"),
			kks,
			[
				kksRev.position.destination(257, 6.8),
				this.atc.fix("SFD").destination(310, 25),
				this.atc.fix("SFD").destination(310, 18),
				this.atc.fix("SFD").destination(310, 16),
				this.atc.fix("SFD")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("SFD"), "5V"),
			kkn,
			[
				kksRev.position.destination(257, 6.8),
				this.atc.fix("SFD").destination(310, 25),
				this.atc.fix("SFD").destination(310, 18),
				this.atc.fix("SFD").destination(310, 16),
				this.atc.fix("SFD")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("SFD"), "9W"),
			kks,
			[
				kks.position.destination(77, 2.5),
				this.atc.fix("SFD").destination(342, 21),
				this.atc.fix("SFD").destination(342, 17),
				this.atc.fix("SFD").destination(342, 13),
				this.atc.fix("SFD").destination(342, 7),
				this.atc.fix("SFD")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("SFD"), "9P"),
			kkn,
			[
				kks.position.destination(77, 2.5),
				this.atc.fix("SFD").destination(342, 21),
				this.atc.fix("SFD").destination(342, 17),
				this.atc.fix("SFD").destination(342, 13),
				this.atc.fix("SFD").destination(342, 7),
				this.atc.fix("SFD")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("SFD"), "4Z"),
			kks,
			[
				this.atc.fix("KKE03", "510958.00N", "0000334.10W"),
				this.atc.fix("KKS08", "510544.80N", "0000209.20W"),
				this.atc.fix("KKS12", "510155.10N", "0000020.40W"),
				this.atc.fix("KKS16", "505805.21N", "0000128.29E"),
				this.atc.fix("KKS22", "505220.70N", "0000410.60E"),
				this.atc.fix("SFD")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("SFD"), "1X"),
			kks,
			[
				this.atc.fix("KKW06", "510726.09N", "0002153.73W"),
				this.atc.fix("KKW10", "510648.64N", "0002621.35W"),
				this.atc.fix("KKW11", "510338.83N", "0002514.22W"),
				this.atc.fix("KKS13", "510205.06N", "0002223.13W"),
				this.atc.fix("KKS19", "505729.42N", "0001402.01W"),
				this.atc.fix("KKS21", "505610.56N", "0001139.14W"),
				this.atc.fix("SFD")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("WIZAD"), "4M"),
			kks,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, this.atc.beacon("MAY"), 282),
				this.atc.beacon("MAY").destination(228, 13),
				this.atc.beacon("MAY").destination(228, 9),
				this.atc.beacon("MAY"),
				this.atc.fix("DVR").destination(258, 36),
				this.atc.fix("WIZAD")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("WIZAD"), "4V"),
			kkn,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, this.atc.beacon("MAY"), 282),
				this.atc.beacon("MAY").destination(228, 13),
				this.atc.beacon("MAY").destination(228, 9),
				this.atc.beacon("MAY"),
				this.atc.fix("DVR").destination(258, 36),
				this.atc.fix("WIZAD")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("WIZAD"), "1X"),
			kks,
			[
				this.atc.fix("KKW04", "510750.70N", "0001857.30W"),
				this.atc.fix("KKS06", "510422.79N", "0001744.35W"),
				this.atc.fix("KKS09", "510347.42N", "0001043.34W"),
				this.atc.fix("KKS14", "510311.65N", "0000652.24W"),
				this.atc.beacon("MAY"),
				this.atc.fix("KKS33", "510327.27N", "0002657.12E"),
				this.atc.fix("WIZAD")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("MIMFO"), "1M"),
			kks,
			[
				kksRev.position.destination(kks.heading, 3.5),
				kksRev.position.destination(kks.heading, 3.5).bearingIntersection(51, this.atc.beacon("DET"), 258),
				this.atc.beacon("DET").destination(258, 20),
				this.atc.fix("ACORN", "511519N", "0001146E"),
				this.atc.fix("MIMFO")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("MIMFO"), "1V"),
			kkn,
			[
				kksRev.position.destination(kks.heading, 3.5),
				kksRev.position.destination(kks.heading, 3.5).bearingIntersection(51, this.atc.beacon("DET"), 258),
				this.atc.beacon("DET").destination(258, 20),
				this.atc.fix("ACORN", "511519N", "0001146E"),
				this.atc.fix("MIMFO")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("DVR"), "2P"),
			kks,
			[
				kks.position.bearingIntersection(kks.reverseLocalizer, this.atc.fix("DVR"), 269),
				this.atc.fix("TUNBY", "511008N", "0001929E"),
				this.atc.fix("DVR").destination(269, 33),
				this.atc.fix("DVR")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("DVR"), "2W"),
			kkn,
			[
				kks.position.bearingIntersection(kks.reverseLocalizer, this.atc.fix("DVR"), 269),
				this.atc.fix("TUNBY", "511008N", "0001929E"),
				this.atc.fix("DVR").destination(269, 33),
				this.atc.fix("DVR")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("ODVIK"), "2Z"),
			kks,
			[
				this.atc.fix("KKE04", "511008.38N", "0000218.83W"),
				this.atc.fix("KKE10", "510955.93N", "0000909.88E"),
				this.atc.fix("KKE17", "510957.12N", "0001937.59E"),
				this.atc.fix("ODVIK")
			],
			true
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("TIGER", "3M"),
			kks,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, this.atc.beacon("MAY"), 282),
				this.atc.beacon("MAY").destination(228, 13),
				this.atc.beacon("MAY").destination(228, 9),
				this.atc.beacon("MAY"),
				this.atc.beacon("TIGER"),
				this.atc.beacon("LAM")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("TIGER", "3V"),
			kkn,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, this.atc.beacon("MAY"), 282),
				this.atc.beacon("MAY").destination(228, 13),
				this.atc.beacon("MAY").destination(228, 9),
				this.atc.beacon("MAY"),
				this.atc.beacon("TIGER"),
				this.atc.beacon("LAM")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("DAGGA"), "1M"),
			kks,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, this.atc.beacon("MAY"), 282),
				this.atc.beacon("MAY").destination(228, 13),
				this.atc.beacon("MAY").destination(228, 9),
				this.atc.beacon("MAY"),
				this.atc.beacon("TIGER"),
				this.atc.beacon("DET"),
				this.atc.fix("DAGGA"),
				this.atc.fix("CLN", "515054.50N", "0010851.32E")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("DAGGA"), "1V"),
			kkn,
			[
				kksRev.position.destination(257, 2.3),
				kksRev.position.destination(257, 2.3).bearingIntersection(257, this.atc.beacon("MAY"), 282),
				this.atc.beacon("MAY").destination(228, 13),
				this.atc.beacon("MAY").destination(228, 9),
				this.atc.beacon("MAY"),
				this.atc.beacon("TIGER"),
				this.atc.beacon("DET"),
				this.atc.fix("DAGGA"),
				this.atc.fix("CLN", "515054.50N", "0010851.32E")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce("TIGER", "1X"),
			kks,
			[
				this.atc.fix("KKW04", "510750.70N", "0001857.30W"),
				this.atc.fix("KKS06", "510422.79N", "0001744.35W"),
				this.atc.fix("KKS09", "510347.42N", "0001043.34W"),
				this.atc.fix("KKS14", "510311.65N", "0000652.24W"),
				this.atc.beacon("MAY"),
				this.atc.fix("KKS36", "510503.33N", "0003055.89E"),
				this.atc.beacon("LAM")
			]
		));

		this.atc.departure(new SID(
			...this.atc.pronounce(this.atc.sidFix("DAGGA"), "1X"),
			kks,
			[
				this.atc.fix("KKW04", "510750.70N", "0001857.30W"),
				this.atc.fix("KKS06", "510422.79N", "0001744.35W"),
				this.atc.fix("KKS09", "510347.42N", "0001043.34W"),
				this.atc.fix("KKS14", "510311.65N", "0000652.24W"),
				this.atc.beacon("MAY"),
				this.atc.fix("KKS36", "510503.33N", "0003055.89E"),
				this.atc.beacon("DET"),
				this.atc.fix("DAGGA"),
				this.atc.fix("CLN", "515054.50N", "0010851.32E")
			]
		));
	}
}
