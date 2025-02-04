import NamedFix from "./NamedFix.js";
import Fix from "./Fix.js";

/**
 * A beacon is a visible named fix in the airspace. Has optional holding
 * pattern. All aircraft can DCT (direct) to this beacon.
 */
export default class Beacon extends NamedFix {

	/**
	 * Holding pattern for the beacon.
	 */
	public readonly holdingPattern?: {
		/**
		 * Left-hand turns. Inbound leg heading in decimal degrees.
		 */
		left: number
	} | {
		/**
		 * Right-hand turns. Inbound leg heading in decimal degrees.
		 */
		right: number
	};

	/**
	 * @param name Name and identifier of the beacon.
	 * @param pronunciation Pronunciation of the beacon name.
	 * @param latitude Latitude in decimal degrees.
	 * @param longitude Longitude in decimal degrees.
	 * @param [holdingPattern] Holding pattern for the beacon.
	 */
	public constructor(
		/**
		 * Name and identifier of the beacon.
		 */
		name: string,
		/**
		 * Pronunciation of the beacon name.
		 */
		pronunciation: string,
		latitude: number,
		longitude: number,
		holdingPattern?: {left: number} | {right: number} | number
	) {
		super(name, pronunciation, latitude, longitude);
		this.holdingPattern = typeof holdingPattern === "number"
							  ? holdingPattern >= 0
								? {right: holdingPattern}
								: {left: holdingPattern}
							  : holdingPattern;
	}

	public override clone(): Beacon {
		return new Beacon(
			this.name,
			this.pronunciation,
			this.latitude,
			this.longitude,
			this.holdingPattern
		);
	}

	public beaconString(): string {
		return [
			this.name,
			this.toString(),
			this.holdingPattern !== undefined
			? "right" in this.holdingPattern
			  ? this.holdingPattern.right
			  : -this.holdingPattern.left
			: 0,
			this.pronunciation
		].join(", ")
	}

	public static override fromDMS(lat: string, lon: string, name: string, pronunciation: string, holdingPattern?: {left: number} | {right: number} | number): Beacon {
		const fix = super.fromDMS(lat, lon, name, pronunciation);
		return new Beacon(fix.name, fix.pronunciation, fix.latitude, fix.longitude, holdingPattern);
	}

	public static from(name: string, pronunciation: string, fix: Fix, holdingPattern?: {left: number} | {right: number} | number): Beacon {
		return new Beacon(name, pronunciation, fix.latitude, fix.longitude, holdingPattern);
	}
}
