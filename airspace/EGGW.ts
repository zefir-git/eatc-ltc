import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";

export default class EGGW {
	public constructor(private readonly atc: Generator) {
		this.airport();
		this.star();
	}

	private airport() {
		this.atc.airport(
			new Airport(
				"London Luton Airport",
				"Luton",
				"EGGW",
				10,
				4000,
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
				[
					new Airport.Airline("WUK", 10, ["a21n"], ["e"], "Wizz Go"),
				],
				[],
				this.atc.beacon("BKY")
			)
		);
	}

	private star() {
	}
}
