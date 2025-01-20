import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";

export default class EGKK {
	public constructor(private readonly atc: Generator) {
		this.airport();
	}

	private airport() {
		this.atc.airport(
			new Airport(
				"London Gatwick Airport",
				"Gatwick",
				"EGKK",
				10,
				4000,
				[
					new Runway("kkn", "26R",
						Fix.fromDMS("510903.69N", "0001057.40W"),
						257.65, 195,
						2561 / Fix.FT, 415 / Fix.FT, 321 / Fix.FT,
						{name: "ARPIT", distance: 10.6},
						{name: "MEBIG", distance: 10.6},
						124.23,
						"Gatwick Tower",
						77.63
					).reverse(),
					new Runway("kks", "26L",
						Fix.fromDMS("510902.42N", "0001019.00W"),
						257.65, 196,
						3317 / Fix.FT, 425 / Fix.FT, 395 / Fix.FT,
						{name: "OEVI", distance: 10.6},
						{name: "ABIBI", distance: 10.6},
						124.23,
						"Gatwick Tower",
						77.63
					),
				],
				[],
				[
					new Airport.Airline("EZY", 10, ["a320"], ["s"], "Easy"),
				],
				[],
				this.atc.beacon("LON")
			)
		);
	}
}
