import Runway from "./Runway.js";
import Fix from "./Fix.js";

/**
 * Standard Instrument Departure (SID)
 */
export default class SID {
	/**
	 * The name of this SID.
	 * Usually this is the name of a fix, followed by a number and a letter.
	 */
	public readonly name: string;

	/**
	 * Pronunciation of this SID’s name.
	 * @example "Compton three golf" // for CPT 3G
	 */
	public readonly pronunciation: string;

	/**
	 * The runway from which this SID is available.
	 */
	public readonly runway: Runway;

	/**
	 * Whether this SID applies to the reverse end of the runway or not.
	 */
	public readonly reverse: boolean;

	/**
	 * Override airport’s initial climb altitude.
	 */
	public readonly altitude?: number;

	/**
	 * The route.
	 */
	public readonly route: Fix[];

	public routeString(): string {
		return "\t" + [
				this.name,
				this.pronunciation
			].join(", ") + "\n"
			+ this.route.map(fix => "\t" + fix.toString()).join("\n");
	}

	/**
	 * @param name The name/identifier of this SID. Usually this is the name of
	 * 				a fix, followed by a number and a letter.
	 * @param pronunciation Pronunciation of this SID’s name.
	 * @param runway The runway from which this SID is available.
	 * @param route The route.
	 * @param [reverse] Reversed runway end use for this SID.
	 * @param [altitude] Override airport’s initial climb altitude.
	 */
	public constructor(
		name: string,
		pronunciation: string,
		runway: Runway,
		route: Fix[],
		reverse?: boolean,
		altitude?: number
	) {
		this.name = name;
		this.pronunciation = pronunciation;
		this.runway = runway;
		this.route = route;
		this.reverse = reverse ?? false;
		this.altitude = altitude;
	}
}
