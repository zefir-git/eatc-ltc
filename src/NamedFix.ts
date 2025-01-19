import Fix from "./Fix.js";

/**
 * A fix with name and pronunciation.
 */
export default class NamedFix extends Fix {
	/**
	 * @param name Name and identifier of the beacon.
	 * @param pronunciation Pronunciation of the beacon name.
	 * @param latitude Latitude in decimal degrees.
	 * @param longitude Longitude in decimal degrees.
	 */
	public constructor(
		/**
		 * Name and identifier of the fix.
		 */
		public readonly name: string,
		/**
		 * Pronunciation of the fix name.
		 */
		public readonly pronunciation: string,
		latitude: number,
		longitude: number,
	) {
		super(latitude, longitude);
	}

	public override clone(): NamedFix {
		return new NamedFix(
			this.name, this.pronunciation, this.latitude, this.longitude
		);
	}
}
