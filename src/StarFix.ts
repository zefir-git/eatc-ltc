import Fix from "./Fix.js";

/**
 * A fix in a STAR, with optional altitude and speed constraints.
 */
export default class StarFix extends Fix {
	/**
	 * Altitude (maximum) constraint in feet.
	 */
	public readonly altitude?: number;

	/**
	 * Speed (maximum) constraint in knots.
	 */
	public readonly speed?: number;

	public constructor(latitude: number, longitude: number, ft?: number, kts?: number) {
		super(latitude, longitude);
		this.altitude = ft;
		this.speed = kts;
	}

	public static override fromDMS(lat: string, lon: string, altitude?: number, speed?: number): StarFix {
		const fix = super.fromDMS(lat, lon);
		return new StarFix(fix.latitude, fix.longitude, altitude, speed);
	}

	public static from(fix: Fix, ft?: number, kts?: number): StarFix {
		return new StarFix(fix.latitude, fix.longitude, ft, kts);
	}
}
