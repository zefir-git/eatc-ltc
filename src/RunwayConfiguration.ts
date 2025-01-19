import Runway from "./Runway.js";

export default class RunwayConfiguration {
	/**
	 * The game score at which this entry becomes active.
	 */
	public readonly score: number;

	/**
	 * The runway this entry controls.
	 */
	public readonly runway: Runway;

	/**
	 * Whether this entry controls the reverse end of the runway.
	 */
	public readonly reverse: boolean;

	/**
	 * Whether the runway is active for arrivals
	 */
	public readonly arrivals: boolean;

	/**
	 * Whether the runway is active for departures
	 */
	public readonly departures: boolean;

	/**
	 * Whether to use intersection departures
	 * (takeoffs begins 30% down the runway)
	 */
	public readonly intersection: boolean;

	/**
	 * Whether arrivals need to backtrack after landing.
	 */
	public readonly backtrack: boolean;

	/**
	 * Whether departures should have SID **disabled** after takeoff.
	 */
	public readonly noSid: boolean;

	/**
	 * Heading for departures to fly after takeoff.
	 */
	public readonly offsetHeading?: number;

	public constructor(
		score: number,
		runway: Runway,
		options: Partial<{
			reverse: boolean,
			arrivals: boolean,
			departures: boolean,
			intersection: boolean,
			backtrack: boolean,
			noSid: boolean,
			offsetHeading?: number
		}>
	) {
		this.score = score;
		this.runway = runway;
		this.reverse = options.reverse ?? false;
		this.arrivals = options.arrivals ?? false;
		this.departures = options.departures ?? false;
		this.intersection = options.intersection ?? false;
		this.backtrack = options.backtrack ?? false;
		this.noSid = options.noSid ?? false;
		this.offsetHeading = options.offsetHeading;
	}

	public toString(): string {
		return [
			this.score,
			this.runway.id,
			[
				this.arrivals ? "land" : null,
				this.departures ? "start" : null,
				this.reverse ? "rev" : null,
				this.intersection ? "int" : null,
				this.backtrack ? "track" : null,
			].filter(o => o !== null).join(""),
			this.offsetHeading !== undefined
			? this.offsetHeading
			: this.noSid
			  ? this.runway.reverseLocalizer
			  : null,
			this.noSid ? "nosid" : null,
		].filter(o => o !== null).join(", ")
	}
}
