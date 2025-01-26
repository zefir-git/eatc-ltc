class Aircraft {
	/**
	 * Aircraft type (ICAO).
	 * @example "b737"
	 */
	public readonly type: string;

	/**
	 * Aircraft manufacturer.
	 * @example "Boeing"
	 */
	public readonly manufacturer: string;

	/**
	 * {@link Aircraft.WTC}
	 * @example Aircraft.WTC.UPPER_MEDIUM
	 */
	public readonly category: Aircraft.WTC;

	/**
	 * Minimum and maximum speed (KIAS) selectable in the game.
	 * @example [160, 250]
	 */
	public readonly speed: [min: number, max: number];

	/**
	 * Minimum and maximum final approach speed in KIAS.
	 * @example [131, 144]
	 */
	public readonly approachSpeed: [min: number, max: number];

	/**
	 * Minimum and maximum acceleration in kts/s².
	 * @example [1.2, 1.3]
	 */
	public readonly acceleration: [min: number, max: number];

	/**
	 * Minimum and maximum descent rate in ft/min.
	 * @example [1440, 1560]
	 */
	public readonly descentRate: [min: number, max: number];

	/**
	 * Minimum and maximum climb rate in ft/min.
	 * @example [3900, 4200]
	 */
	public readonly climbRate: [min: number, max: number];

	/**
	 * Minimum and maximum bank angle in °.
	 * @example [25, 30]
	 */
	public readonly bankAngle: [min: number, max: number];

	/**
	 * Minimum and maximum rate of bank angle change in °/s.
	 * @example [3, 5]
	 */
	public readonly bankRate: [min: number, max: number];

	/**
	 * Minimum and maximum turn rate in °/s.
	 * @example [2.9, 3.1]
	 */
	public readonly turnRate: [min: number, max: number];

	/**
	 * @param type Aircraft type (ICAO).
	 * @param manufacturer Aircraft manufacturer.
	 * @param category {@link Aircraft.WTC}
	 * @param speed Minimum and maximum speed (KIAS) selectable in the game.
	 * @param approachSpeed Minimum and maximum final approach speed in KIAS.
	 * @param acceleration Minimum and maximum acceleration in kts/s².
	 * @param descentRate Minimum and maximum descent rate in ft/min.
	 * @param climbRate Minimum and maximum climb rate in ft/min.
	 * @param bankAngle Minimum and maximum bank angle in °.
	 * @param bankRate Minimum and maximum rate of bank angle change in °/s.
	 * @param turnRate Minimum and maximum turn rate in °/s.
	 */
	public constructor(
		type: string,
		manufacturer: string,
		category: Aircraft.WTC,
		speed: [min: number, max: number] | number,
		approachSpeed: [min: number, max: number] | number,
		acceleration: [min: number, max: number] | number,
		descentRate: [min: number, max: number] | number,
		climbRate: [min: number, max: number] | number,
		bankAngle: [min: number, max: number] | number,
		bankRate: [min: number, max: number] | number,
		turnRate: [min: number, max: number] | number
	) {
		this.type = type;
		this.manufacturer = manufacturer;
		this.category = category;
		this.speed = Array.isArray(speed) ? speed : [speed, speed];
		this.approachSpeed = Array.isArray(approachSpeed) ? approachSpeed : [approachSpeed, approachSpeed];
		this.acceleration = Array.isArray(acceleration) ? acceleration : [acceleration, acceleration];
		this.descentRate = Array.isArray(descentRate) ? descentRate : [descentRate, descentRate];
		this.climbRate = Array.isArray(climbRate) ? climbRate : [climbRate, climbRate];
		this.bankAngle = Array.isArray(bankAngle) ? bankAngle : [bankAngle, bankAngle];
		this.bankRate = Array.isArray(bankRate) ? bankRate : [bankRate, bankRate];
		this.turnRate = Array.isArray(turnRate) ? turnRate : [turnRate, turnRate];
	}

	public toString(): string {
		return "\t" + [
			this.type.toLowerCase(),
			this.category,
			this.speed[0],
			this.speed[1],
			this.turnRate[0],
			this.turnRate[1],
			this.descentRate[0],
			this.descentRate[1],
			this.approachSpeed[0],
			this.approachSpeed[1],
			this.acceleration[0],
			this.acceleration[1],
			this.manufacturer,
			this.bankAngle[0],
			this.bankAngle[1],
			this.bankRate[0],
			this.bankRate[1],
			this.climbRate[0],
			this.climbRate[1],
		].join(", ");
	}
}

namespace Aircraft {
	/**
	 * Wake Turbulence Category.
	 */
	export const enum WTC {
		SUPER_HEAVY = 1,
		UPPER_HEAVY = 2,
		LOWER_HEAVY = 3,
		UPPER_MEDIUM = 4,
		LOWER_MEDIUM = 5,
		LIGHT = 6
	}
}

export default Aircraft;
