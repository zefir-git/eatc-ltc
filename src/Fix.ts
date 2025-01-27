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

	public static degToRad(degrees: number): number {
		return degrees * Math.PI / 180;
	}

	public static radToDeg(radians: number): number {
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
		const φ1 = Fix.degToRad(this.latitude);
		const λ1 = Fix.degToRad(this.longitude);
		const θ = Fix.degToRad(bearing);
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

		return new Fix(Fix.radToDeg(φ2), Fix.radToDeg(λ2));
	}

	/**
	 * Intersection of two paths given start points and bearings
	 * @param bearing Initial bearing from this point in decimal degrees.
	 * @param other The other point.
	 * @param otherBearing Initial bearing from the other point in decimal degrees.
	 */
	public bearingIntersection(bearing: number, other: Fix, otherBearing: number) {
		const φ1 = Fix.degToRad(this.latitude);
		const λ1 = Fix.degToRad(this.longitude);

		const φ2 = Fix.degToRad(other.latitude);
		const λ2 = Fix.degToRad(other.longitude);

		const Δφ = φ2 - φ1;
		const Δλ = λ2 - λ1;

		const θ13 = Fix.degToRad(bearing);
		const θ23 = Fix.degToRad(otherBearing);

		/** angular distance **/
		const δ12 = 2 * Math.asin(
			Math.sqrt(
				Math.sin(Δφ / 2) ** 2
				+ Math.cos(φ1)
				* Math.cos(φ2)
				* Math.sin(Δλ / 2) ** 2
			)
		);

		/** initial/final bearings between points **/
		const θa = Math.acos(
			(Math.sin(φ2) - Math.sin(φ1) * Math.cos(δ12))
			/
			(Math.sin(δ12) * Math.cos(φ1))
		);
		const θb = Math.acos(
			(Math.sin(φ1) - Math.sin(φ2) * Math.cos(δ12))
			/
			(Math.sin(δ12) * Math.cos(φ2))
		);

		let θ12: number;
		let θ21: number;
		if (Math.sin(λ2 - λ1) > 0) {
			θ12 = θa;
			θ21 = 2 * Math.PI - θb;
		}
		else {
			θ12 = 2 * Math.PI - θa;
			θ21 = θb;
		}

		const α1 = θ13 - θ12;
		const α2 = θ21 - θ23;

		const α3 = Math.acos(
			-Math.cos(α1) * Math.cos(α2)
			+ Math.sin(α1) * Math.sin(α2) * Math.cos(δ12)
		);

		/** angular distance **/
		const δ13 = Math.atan2(
			Math.sin(δ12) * Math.sin(α1) * Math.sin(α2),
			Math.cos(α2)
			+ Math.cos(α1) * Math.cos(α3)
		);

		const φ3 = Math.asin(
			Math.sin(φ1) * Math.cos(δ13)
			+ Math.cos(φ1) * Math.sin(δ13) * Math.cos(θ13)
		);

		const Δλ13 = Math.atan2(
			Math.sin(θ13) * Math.sin(δ13) * Math.cos(φ1),
			Math.cos(δ13) - Math.sin(φ1) * Math.sin(φ3)
		);

		const λ3 = λ1 + Δλ13;

		return new Fix(Fix.radToDeg(φ3), Fix.radToDeg(λ3));
	}

	/**
	 * Calculate great circle distance between two fixes.
	 * @param other The other fix.
	 * @return Distance in metres.
	 */
	public distance(other: Fix): number {
		const φ1 = Fix.degToRad(this.latitude);
		const φ2 = Fix.degToRad(other.latitude);
		const Δφ = φ2 - φ1;
		const Δλ = Fix.degToRad(other.longitude - this.longitude);

		const a = Math.sin(Δφ / 2) ** 2
			+ Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return Fix.R * c;
	}

	/**
	 * To cartesian coordinates.
	 */
	public cartesian(): [x: number, y: number, z: number] {
		const φ = Fix.degToRad(this.latitude);
		const λ = Fix.degToRad(this.longitude);
		return [
			Fix.R * Math.cos(φ) * Math.cos(λ),
			Fix.R * Math.cos(φ) * Math.sin(λ),
			Fix.R * Math.sin(φ)
		];
	}

	/**
	 * Create a new fix from DMS coordinates
	 * @param lon Longitude in DMS
	 * @param lat Latitude in DMS
	 */
	public static fromDMS(lat: string, lon: string, ..._: any[]): Fix {
		return new Fix(this.parseDMS(lat), this.parseDMS(lon));
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
