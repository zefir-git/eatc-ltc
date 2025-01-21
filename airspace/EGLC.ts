import Generator from "../src/Generator.js";
import Airport from "../src/Airport.js";
import Runway from "../src/Runway.js";
import Fix from "../src/Fix.js";

export default class EGLC {
	public constructor(private readonly atc: Generator) {
		this.airport();
		this.star();
	}

	private airport() {
		this.atc.airport(
			new Airport(
				"London City Airport",
				"London City",
				"EGLC",
				10,
				4000,
				[
					new Runway("lc", "27",
						Fix.fromDMS("513017.60N", "0000357.68E"),
						272.89, 20,
						1508 / Fix.FT, 70 / Fix.FT, 96 / Fix.FT,
						{name: "LAVNO", distance: 6},
						void 0,
						118.08,
						"City Tower",
						92.87,
						5.5,
						272.89,
						5.5
					)
				],
				[],
				[
					new Airport.Airline("CFE", 10, ["e190"], ["e"], "Flyer"),
				],
				[],
				this.atc.beacon("LON")
			)
		);
	}

	private star() {
	}
}
