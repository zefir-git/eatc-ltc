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
	 * Reversed runway end use for this STAR.
	 */
	public readonly reverse: boolean | "only";

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
	 * @param reverse Reversed runway end use for this STAR.
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
		reverse: boolean | "only",
		beacon: Beacon,
		heading: number | undefined,
		route: Iterable<Fix>,
		end: STAR["end"],
	) {
		this.name = name;
		this.pronunciation = pronunciation;
		this.runways = new Set(runways);
		this.reverse = reverse;
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
}
