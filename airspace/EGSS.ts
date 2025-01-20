import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";
import STAR from "../src/STAR.js";

export default class EGSS {
	public constructor(private readonly atc: Generator) {
		this.airport();
		this.star();
	}

	private airport() {
		this.atc.airport(
			new Airport(
				"London Stansted Airport",
				"Stansted",
				"EGSS",
				10,
				4000,
				[
					new Runway("ss", "22",
						Fix.fromDMS("515342.57N", "0001500.16E"),
						222.89, 347,
						3049 / Fix.FT, 0, 298 / Fix.FT,
						{name: "TOTVO", distance: 10.4},
						{name: "EKVEG", distance: 10.4},
						123.805,
						"Stansted Tower",
						42.87
					)
				],
				[],
				[
					new Airport.Airline("RYR", 10, ["b738"], ["e"], "Ryanair"),
				],
				[],
				this.atc.beacon("BKY")
			)
		);
	}

	private star() {
	}
}
