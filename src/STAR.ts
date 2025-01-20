import Runway from "./Runway.js";
import Beacon from "./Beacon.js";
import Fix from "./Fix.js";
import StarFix from "./StarFix.js";

/**
 * A Standard Terminal Arrival Route (STAR).
 */
export default class STAR {
	/**
	 * The name/identifier of this star.
	 * Usually this is the name of a fix, followed by a number and a letter.
	 */
	public readonly name: string;

	/**
	 * Pronunciation of this STAR’s name.
	 * @example "Aleso one hotel" // for ALESO 1H
	 */
	public readonly pronunciation: string;

	/**
	 * The runways for which this STAR is available.
	 */
	public readonly runways: Set<Runway>;

	/**
	 * The beacon at which this STAR begins.
	 */
	public readonly beacon: Beacon;

	/**
	 * The inbound heading of the STAR in decimal degrees. When there are
	 * multiple STARs with the same runway and beacon, the STAR selected is
	 * based on the closest inbound heading of the traffic.
	 */
	public readonly heading?: number;

	/**
	 * The route. Use {@link StarFix} to specify constraints.
	 */
	public readonly route: Fix[];

	/**
	 * End of STAR.
	 */
	public readonly end: {
		/**
		 * Enter holding pattern or proceed on heading.
		 */
		end: "hold" | number
	} | {
		/**
		 * Intercept ILS.
		 */
		ils: {
			/**
			 * DME from runway threshold.
			 */
			dme: number,

			/**
			 * Maximum altitude.
			 */
			altitude?: number,

			/**
			 * Maximum speed.
			 */
			speed?: number
		}
	};

	/**
	 * @param name The name/identifier of this star. Usually this is the name of
	 * 			a fix, followed by a number and a letter.
	 * @param pronunciation Pronunciation of this STAR’s name.
	 * @param runways The runways for which this STAR is available.
	 * @param beacon The beacon at which this STAR begins.
	 * @param heading The inbound heading of the STAR in decimal degrees. When
	 * 			there are multiple STARs with the same runway and beacon, the
	 * 			STAR selected is based on the closest inbound heading of the
	 * 			traffic.
	 * @param route The route. Use {@link StarFix} to specify constraints.
	 * @param end End of STAR.
	 */
	public constructor(
		name: string,
		pronunciation: string,
		runways: Iterable<Runway>,
		beacon: Beacon,
		heading: number | undefined,
		route: Iterable<Fix>,
		end: STAR["end"],
	) {
		this.name = name;
		this.pronunciation = pronunciation;
		this.runways = new Set(runways);
		this.beacon = beacon;
		this.heading = heading;
		this.route = Array.from(route);
		this.end = end;
	}

	public routeString(): string {
		return "\t" + [
				this.heading ?? 0,
				this.name,
				this.pronunciation
			].join(", ") + "\n" +
			this.route.map(fix => "\t" +
				[
					fix.toString(),
					...fix instanceof StarFix
					   ? [
						   fix.altitude === undefined
						   ? fix.speed === undefined
							 ? null
							 : 0
						   : fix.altitude,
						   fix.speed ?? null,
					   ].filter(o => o !== null)
					   : [],
				].join(", ")
			).join("\n") +
			"\n\t" +
			[..."end" in this.end
				? ["end", this.end.end]
				: [
					this.end.ils.dme,
					this.end.ils.altitude === undefined
					? this.end.ils.speed === undefined
					  ? null
					  : 0
					: this.end.ils.altitude,
				]].join(", ");
	}

	private static readonly pronunciation: Record<string, string> = {
		0: "zero",
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5: "five",
		6: "six",
		7: "seven",
		8: "eight",
		9: "niner",
		A: "alpha",
		B: "bravo",
		C: "charlie",
		D: "delta",
		E: "echo",
		F: "foxtrot",
		G: "golf",
		H: "hotel",
		I: "india",
		J: "juliet",
		K: "kilo",
		L: "lima",
		M: "mike",
		N: "november",
		O: "oscar",
		P: "papa",
		Q: "quebec",
		R: "romeo",
		S: "sierra",
		T: "tango",
		U: "uniform",
		V: "victor",
		W: "whiskey",
		X: "x-ray",
		Y: "yankee",
		Z: "zulu",
	};

	public static named(name: string): [name: string, pronunciation: string] {
		if (name.length === 0)
			throw new SyntaxError("Empty STAR name");
		const waypoint = name.slice(0, -2).trim();
		if (waypoint.length < 1) return [name.trim(), name[0]!.toUpperCase() + name.slice(1).toLowerCase()];
		const waypointName = waypoint[0]!.toUpperCase()
			+ waypoint.slice(1).toLowerCase();
		return [name.trim(), name.length <= 2
			? waypointName
			: waypointName + " " + this.pronounce(name.slice(-2))
		];
	}

	private static pronounce(string: string | Iterable<string>): string {
		return Array.from(string).map(char => char.toUpperCase() in this.pronunciation
					? this.pronunciation[char.toUpperCase()]!
					: char).join(" ");
	}
}
