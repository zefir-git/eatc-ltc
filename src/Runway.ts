import Fix from "./Fix.js";

/**
 * A runway end/side
 */
export default class Runway {
	/**
	 * Unique runway identifier.
	 */
	public readonly id: string;

	/**
	 * Name of this runway end. The name for the reverse side is calculated
	 * automatically. One or two digits, optionally suffixed with an L, R or C
	 * character.
	 * @example "27L"
	 * @example "6"
	 */
	public readonly name: string;

	/**
	 * The location of the beginning of the runway (this side), including
	 * displaced threshold.
	 */
	public readonly position: Fix;

	/**
	 * Runway true heading from this side.
	 */
	public readonly heading: number;

	/**
	 * Runway length in feet.
	 */
	public readonly length: number;

	/**
	 * Displaced threshold in feet on this runway end.
	 */
	public readonly displacedThreshold: number;

	/**
	 * Displaced threshold in feet on the reverse side.
	 */
	public readonly reverseDisplacedThreshold: number;

	/**
	 * Elevation in feet. Must be within 1000 feet difference from
	 * @link Airspace#elevation}.
	 */
	public readonly elevation: number;

	/**
	 * Glideslope angle in decimal degrees for arrivals towards this runway end.
	 */
	public readonly glideslope: number;

	/**
	 * Localizer true heading in decimal degrees for arrivals towards this
	 * runway end.
	 */
	public readonly localizer: number;

	/**
	 * Glideslope angle in decimal degrees for arrivals towards the reverse end.
	 */
	public readonly reverseGlideslope: number;

	/**
	 * Localizer true heading in decimal degrees for arrivals towards the
	 * reverse end.
	 */
	public readonly reverseLocalizer: number;

	/**
	 * Initial Fix that arrivals can DCT (direct) to.
	 */
	public readonly initialFix?: {
		/**
		 * Distance from runway touchdown in NM.
		 */
		readonly distance: number;

		/**
		 * Name of the fix.
		 */
		readonly name: string;
	}

	/**
	 * Initial Fix for the reverse end that arrivals can DCT (direct) to.
	 */
	public readonly reverseInitialFix?: {
		/**
		 * Distance from runway touchdown in NM.
		 */
		readonly distance: number;

		/**
		 * Name of the fix.
		 */
		readonly name: string;
	}

	/**
	 * Tower frequency in MHz.
	 */
	public readonly frequency?: number;

	/**
	 * Tower callsign pronunciation.
	 */
	public readonly tower?: string;

	/**
	 * @param id Unique runway identifier.
	 * @param name Name of this runway end. The name for the reverse side is
	 * 			calculated automatically.
	 * @param position The location of the beginning of the runway (this side),
	 * 			including displaced threshold.
	 * @param heading Runway true heading from this side.
	 * @param elevation Elevation in feet. Must be within 1000 feet difference
	 * 			from {@link Airspace#elevation}.
	 * @param length Runway length in feet.
	 * @param [displacedThreshold] Displaced threshold in feet on this runway
	 * 			end.
	 * @param [reverseDisplacedThreshold] Displaced threshold in feet on the
	 * 			reverse side.
	 * @param glideslope Glideslope angle in decimal degrees for arrivals
	 * 			towards this runway end.
	 * @param localizer Localizer true heading in decimal degrees for arrivals
	 * 			towards this runway end.
	 * @param reverseGlideslope Glideslope angle in decimal degrees for
	 * 			arrivals towards the reverse end.
	 * @param reverseLocalizer Localizer true heading in decimal degrees for
	 * 			arrivals towards the reverse end.
	 * @param [initialFix] Initial Fix that arrivals can DCT (direct) to.
	 * @param [reverseInitialFix] Initial Fix for the reverse end that arrivals
	 * 			can DCT (direct) to.
	 * @param [frequency] Tower frequency in MHz.
	 * @param [tower] Tower callsign pronunciation.
	 */
	public constructor(
		id: string,
		name: string,
		position: Fix,
		heading: number,
		elevation: number,
		length: number,
		displacedThreshold?: number,
		reverseDisplacedThreshold?: number,
		initialFix?: {
			readonly distance: number;
			readonly name: string;
		},
		reverseInitialFix?: {
			readonly distance: number;
			readonly name: string;
		},
		frequency?: number,
		tower?: string,
		reverseLocalizer?: number,
		reverseGlideslope?: number,
		localizer?: number,
		glideslope?: number,
	) {
		this.id = id;
		this.name = name;
		this.position = position;
		this.heading = heading;
		this.elevation = elevation;
		this.length = length;
		this.displacedThreshold = displacedThreshold ?? 0;
		this.reverseDisplacedThreshold = reverseDisplacedThreshold ?? 0;
		this.glideslope = glideslope ?? 3;
		this.localizer = localizer ?? heading;
		this.reverseGlideslope = reverseGlideslope ?? 3;
		this.reverseLocalizer = reverseLocalizer ?? (heading + 180) % 360;
		this.initialFix = initialFix;
		this.reverseInitialFix = reverseInitialFix;
		this.frequency = frequency;
		this.tower = tower;
	}


	/**
	 * Get the reverse end of this runway.
	 */
	public reverse(): Runway {
		const revNumber = (
			Number.parseInt(this.name.match(/^\d{1,2}/)![0]) + 18
		) % 36;
		const letter = this.name.slice(-1).toUpperCase();
		const revName =
			revNumber.toString().padStart(2, "0")
			+ (letter === "L"
			? "R"
			: letter === "R"
			  ? "L"
			  : letter);
		return new Runway(
			this.id,
			revName,
			this.position.destination(
				this.heading,
				(
					this.length
					- this.displacedThreshold
					- this.reverseDisplacedThreshold
				) * Fix.FT / Fix.NMI
			),
			(this.heading + 180) % 360,
			this.elevation,
			this.length,
			this.reverseDisplacedThreshold,
			this.displacedThreshold,
			this.reverseInitialFix,
			this.initialFix,
			this.frequency,
			this.tower,
			this.localizer,
			this.glideslope,
			this.reverseLocalizer,
			this.reverseGlideslope,
		);
	}

	public toString(): string {
		return [
			this.id,
			this.name,
			this.position,
			this.heading.toPrecision(2),
			this.length.toPrecision(2),
			this.displacedThreshold.toPrecision(2),
			this.reverseDisplacedThreshold.toPrecision(2),
			this.elevation,
			this.glideslope,
			this.localizer.toPrecision(2),
			this.reverseGlideslope,
			this.reverseLocalizer.toPrecision(2),
			this.initialFix?.name ?? 0,
			this.initialFix?.distance ?? 0,
			this.reverseInitialFix?.name ?? 0,
			this.reverseInitialFix?.distance ?? 0,
			this.frequency,
			this.tower
		].join(", ");
	}
}
