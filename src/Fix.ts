/**
 * Represents a geographic fix, which is a point defined by its coordinates.
 */
export default class Fix {
	/**
	 * @param latitude Latitude in decimal degrees.
	 * @param longitude Longitude in decimal degrees.
	 */
	public constructor(
		/**
		 * Latitude in decimal degrees.
		 */
		public readonly latitude: number,
		/**
		 * Longitude in decimal degrees.
		 */
		public readonly longitude: number
	) {
	}

	public clone(): Fix {
		return new Fix(this.latitude, this.longitude);
	}

	public toString(): string {
		return (this.latitude >= 0 ? "N" : "S")
			+ Math.abs(this.latitude).toFixed(6) + ", "
			+ (this.longitude >= 0 ? "E" : "W")
			+ Math.abs(this.longitude).toFixed(6);
	}

	private degToRad(degrees: number): number {
		return degrees * Math.PI / 180;
	}

	private radToDeg(radians: number): number {
		return radians * 180 / Math.PI;
	}

	/**
	 * Mean radius of Earth in meters.
	 */
	public static readonly R = 6371e3;

	/**
	 * m to NMI
	 */
	public static readonly NMI = 1852;

	/**
	 * ft to m
	 */
	public static readonly FT = 0.3048;

	/**
	 * Given a start point, initial bearing, and distance, this will calculate
	 * the destination point and final bearing travelling along a (shortest
	 * distance) great circle arc.
	 * @param bearing Bearing in decimal degrees.
	 * @param distance Distance in NM.
	 */
	public destination(bearing: number, distance: number): Fix {
		const φ1 = this.degToRad(this.latitude);
		const λ1 = this.degToRad(this.longitude);
		const θ = this.degToRad(bearing);
		/** distance in metres */
		const d = distance * Fix.NMI;
		/** angular distance **/
		const δ = d / Fix.R;

		const φ2 = Math.asin(
			Math.sin(φ1) * Math.cos(δ)
			+ Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
		);
		const λ2 = λ1 + Math.atan2(
			Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
			Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
		);

		return new Fix(this.radToDeg(φ2), this.radToDeg(λ2));
	}

	/**
	 * Create a new fix from DMS coordinates
	 * @param lon Longitude in DMS
	 * @param lat Latitude in DMS
	 */
	public static fromDMS(lon: string, lat: string): Fix {
		return new Fix(this.parseDMS(lon), this.parseDMS(lat));
	}

	private static parseDMS(dms: string): number {
		const sign = (/[NESW]/.exec(dms.toUpperCase())?.[0]
			?? (() => {
				throw new SyntaxError(
					`Invalid DMS coordinate direction in ${dms}`
				);
			})()) < "S" ? 1 : -1;
		const [
			nonDecimal,
			decimal
		] = dms.toUpperCase()
			   .replace(/[^\d.]/g, "")
			   .split(".", 2);
		const decimalSeconds = Number.parseInt(
			decimal ?? "0", 10
		) / 10 ** (decimal?.length ?? 0);
		const seconds = Number.parseInt(
			nonDecimal!.slice(-2), 10
		);
		if (seconds < 0 || seconds >= 60)
			throw new RangeError(`Seconds out of range in ${dms}`);
		const minutes = Number.parseInt(
			nonDecimal!.slice(-4, -2), 10
		);
		if (minutes < 0 || minutes >= 60)
			throw new RangeError(`Minutes out of range in ${dms}`);
		const degrees = Number.parseInt(
			nonDecimal!.slice(0, -4), 10
		);
		const final = (
			degrees + minutes / 60
			+ (seconds + decimalSeconds) / 3600
		) * sign;
		if (Number.isNaN(final) || !Number.isFinite(final))
			throw new SyntaxError(`Invalid DMS coordinate in ${dms}`);
		return final;
	}
}
