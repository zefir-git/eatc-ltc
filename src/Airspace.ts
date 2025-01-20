import Fix from "./Fix.js";
import Beacon from "./Beacon.js";
import Polygon from "./Polygon.js";

export default class Airspace {

	/**
	 * Airspace radius in NM.
	 */
	public readonly radius: number;

	/**
	 * Default zoom level, increase to zoom in.
	 */
	public readonly zoom: number;

	/**
	 * Ground altitude in feet.
	 */
	public readonly elevation: number;

	/**
	 * Minimum selectable altitude (1100 to 2500 above {@link elevation}).
	 */
	public readonly floor: number;

	/**
	 * Minimum initial altitude for arrivals (1000+ above {@link floor}).
	 */
	public readonly descentAltitude: number;

	/**
	 * Maximum selectable altitude (1000+ above {@link descentAltitude}).
	 */
	public readonly ceiling: number;

	/**
	 * Maximum departure altitude when SID is enabled (2000+ above
	 * {@link ceiling}).
	 */
	public readonly above: number;

	/**
	 * Airspace speed restriction.
	 */
	public readonly speedRestriction: {
		/**
		 * Maximum speed within radius.
		 */
		readonly radius?: {
			/**
			 * Radius in NM.
			 */
			readonly nm: number;

			/**
			 * Speed in knots.
			 */
			readonly kts: number;
		};

		/**
		 * Maximum speed below altitude.
		 */
		readonly altitude?: {
			/**
			 * Altitude in feet.
			 */
			readonly ft: number;

			/**
			 * Speed in knots.
			 */
			readonly kts: number;
		}
	};

	/**
	 * Speed restriction on localizers.
	 */
	public readonly localizerSpeed: {
		/**
		 * Distance to touchdown in NM.
		 */
		nm: number;

		/**
		 * Speed in knots.
		 */
		kts: number;
	};

	/**
	 * Maximum altitude at which departures will be a diversion at the boundary
	 * (defaults to {@link ceiling} altitude).
	 */
	public readonly diversionAltitude?: number;

	/**
	 * Highest altitude displayed in feet instead of flight level (for
	 * simplicity QNH is always 1013hPa).
	 */
	public readonly transitionAltitude: number;

	/**
	 * American-style callsign pronunciation and runway names.
	 */
	public readonly usa: boolean;

	/**
	 * Display altitudes in metres instead of feet.
	 */
	public readonly metric: boolean;

	/**
	 * Probability of letter occurrence in callsigns (ranging from 0 for never
	 * to 1 for always). Defaults to 50%, or 2% for the USA.
	 */
	public readonly letters?: number;

	/**
	 * Minimum allowed distance between aircraft in NM.
	 */
	public readonly separation: number;

	/**
	 * Entering arrivals will follow an approach route when flying inbound an
	 * approach beacon.
	 */
	public readonly automatic: boolean;

	/**
	 * Arrivals will spawn precisely at the entrypoints (no random deviation).
	 */
	public readonly strictSpawn: boolean;

	/**
	 * ATC callsign pronunciation.
	 */
	public readonly name: {
		readonly approach: string;
		readonly departure: string;
	};

	/**
	 * Location of center of radar display.
	 */
	public readonly center: Fix;

	/**
	 * Magnetic variance used to rotate lat/long coordinates and true headings.
	 * Positive for east, negative for west.
	 */
	public readonly magneticVar: number;

	/**
	 * List of beacons in the airspace. The first given beacon will be the
	 * default beacon for arrivals inbound the main airport.
	 */
	public readonly beacons: Readonly<Map<string, Beacon>>;

	/**
	 * Departure hand-off frequencies in MHz. The heading (in decimal degrees)
	 * determines which ATC station will be selected by a plane: the closest to
	 * the heading from the center of the airspace towards the plane’s last SID
	 * point.
	 */
	public readonly handoff: Readonly<Map<number, {
		readonly callsign: string,
		readonly pronunciation: string,
		readonly frequency: number
	}>>;

	/**
	 * Airspace boundary polygon. If undefined, airspace is circular with radius
	 * equal to {@link radius}.
	 */
	public readonly boundary?: Polygon;

	/**
	 * @param radius Airspace radius in NM.
	 * @param zoom Default zoom level, increase to zoom in.
	 * @param elevation Ground altitude in feet.
	 * @param floor Minimum selectable altitude (1100 to 2500 above
	 * 			{@link elevation}).
	 * @param descentAltitude Minimum initial altitude for arrivals (1000+ above
	 * 			{@link floor}).
	 * @param ceiling Maximum selectable altitude (1000+ above
	 * 			{@link descentAltitude}).
	 * @param above Maximum departure altitude when SID is enabled (2000+ above
	 * 			{@link ceiling}).
	 * @param [speedRestriction] Airspace speed restriction.
	 * @param [localizerSpeed] Speed restriction on localizers.
	 * @param [diversionAltitude] Maximum altitude at which departures will be a
	 * 			diversion at the boundary (defaults to {@link ceiling}
	 * 			altitude).
	 * @param [diversionAltitude] Maximum altitude at which departures will be a
	 * 			diversion at the boundary (defaults to {@link ceiling}
	 * 			altitude).
	 * @param transitionAltitude Highest altitude displayed in feet instead of
	 * 			flight level (for simplicity QNH is always 1013hPa).
	 * @param usa American-style callsign pronunciation and runway names.
	 * @param metric Display altitudes in metres instead of feet.
	 * @param [letters] Probability of letter occurrence in callsigns (ranging
	 * 			from 0 for never to 1 for always). Defaults to 50%, or 2% for
	 * 			the USA.
	 * @param separation Minimum allowed distance between aircraft in NM.
	 * @param automatic Entering arrivals will follow an approach route when
	 * 			flying inbound an approach beacon.
	 * @param strictSpawn Arrivals will spawn precisely at the entrypoints (no
	 * 			random deviation).
	 * @param name ATC callsign pronunciation.
	 * @param center Location of center of radar display.
	 * @param magneticVar Magnetic variance used to rotate lat/long coordinates
	 * 			and true headings. Positive for east, negative for west.
	 * @param beacons List of beacons in the airspace. The first given beacon
	 * 			will be the default beacon for arrivals inbound the main
	 * 			airport.
	 * @param handoff Departure hand-off frequencies in MHz. The heading (in
	 * 			decimal degrees) determines which ATC station will be selected
	 * 			by a plane: the closest to the heading from the center of the
	 * 			airspace towards the plane’s last SID point.
	 * @param boundary Airspace boundary polygon. If undefined, airspace is
	 * 			circular with radius equal to {@link radius}.
	 */
	public constructor(
		radius: number,
		zoom: number,
		elevation: number,
		floor: number,
		speedRestriction: {
			radius?: {
				nm: number;
				kts: number;
			};
			altitude?: {
				ft: number;
				kts: number;
			};
		} | undefined,
		localizerSpeed: {
			nm: number;
			kts: number;
		} | undefined,
		descentAltitude: number,
		ceiling: number,
		above: number,
		diversionAltitude: number | undefined,
		transitionAltitude: number,
		usa: boolean,
		metric: boolean,
		letters: number | undefined,
		separation: number,
		automatic: boolean,
		strictSpawn: boolean,
		name: {
			readonly approach: string;
			readonly departure: string;
		},
		center: Fix,
		magneticVar: number,
		beacons: Iterable<Beacon>,
		handoff: Readonly<Map<number, {
			readonly callsign: string,
			readonly pronunciation: string,
			readonly frequency: number
		}>>,
		boundary: Polygon | undefined,
	) {
		this.radius = radius;
		this.zoom = zoom;
		this.elevation = elevation;
		this.floor = floor;
		this.speedRestriction = speedRestriction ?? {};
		this.localizerSpeed = localizerSpeed ?? {nm: 0, kts: 0};
		this.descentAltitude = descentAltitude;
		this.ceiling = ceiling;
		this.above = above;
		this.diversionAltitude = diversionAltitude ?? ceiling;
		this.transitionAltitude = transitionAltitude;
		this.usa = usa;
		this.metric = metric;
		this.letters = letters;
		this.separation = separation;
		this.automatic = automatic;
		this.strictSpawn = strictSpawn;
		this.name = name;
		this.center = center;
		this.magneticVar = magneticVar;
		this.beacons = new Map();
		for (const beacon of beacons)
			this.beacons.set(beacon.name, beacon);
		this.handoff = handoff;
		this.boundary = boundary;
	}

	public toString() {
		/*return `[airspace]
		 name = ${this.name.approach}, ${this.name.departure}
		 usa = ${this.usa}
		 metric = ${this.metric}
		 automatic = ${this.automatic}
		 strictspawn = ${this.strictSpawn}
		 decimaldegrees = false
		 center = ${this.center.toString()}
		 magneticvar = ${this.magneticVar}
		 radius = ${this.radius}
		 zoom = ${this.zoom}
		 letters = ${this.letters}
		 separation = ${this.separation}
		 elevation = ${this.elevation}
		 floor = ${this.floor}
		 diversionaltitude = ${this.diversionAltitude}
		 transitionaltitude = ${this.transitionAltitude}
		 descentaltitude = ${this.descentAltitude}
		 ceiling = ${this.ceiling}
		 above = ${this.above}
		 speedrestriction = ${[
		 this.speedRestriction.radius?.nm ?? 0,
		 this.speedRestriction.radius?.kts ?? 0,
		 this.speedRestriction.altitude?.ft ?? 0,
		 this.speedRestriction.altitude?.kts ?? 0,
		 ].join(", ")}
		 localizerspeed = ${this.localizerSpeed.nm}, ${this.localizerSpeed.kts}

		 handoff =
		 ${
		 Array.from(this.handoff.entries())
		 .map(([dir, handoff]) =>
		 "\t" +
		 [dir, handoff.callsign, handoff.pronunciation, handoff.frequency]
		 .join(", ")
		 )
		 .join("\n")
		 }

		 beacons =
		 ${
		 Array.from(this.beacons.values())
		 .map(beacon => `\t${beacon.name}, ${beacon.toString()}, ${
		 beacon.holdingPattern !== undefined
		 ? "right" in beacon.holdingPattern
		 ? beacon.holdingPattern.right
		 : -beacon.holdingPattern.left
		 : 0
		 }, ${beacon.pronunciation}`).join("\n")
		 }
		 ${this.boundary !== undefined
		 ? `\nboundary = \n${this.boundary.toString()}`
		 : ""}
		 `;*/
		return [
			"[airspace]",
			"name = " + [
				this.name.approach,
				this.name.departure
			].join(", "),
			"usa = " + this.usa,
			"metric = " + this.metric,
			"automatic = " + this.automatic,
			"strictspawn = " + this.strictSpawn,
			"decimaldegrees = false",
			"center = " + this.center.toString(),
			"magneticvar = " + this.magneticVar,
			"radius = " + this.radius,
			"zoom = " + this.zoom,
			"letters = " + this.letters,
			"separation = " + this.separation,
			"elevation = " + this.elevation,
			"floor = " + this.floor,
			"diversionaltitude = " + this.diversionAltitude,
			"transitionaltitude = " + this.transitionAltitude,
			"descentaltitude = " + this.descentAltitude,
			"ceiling = " + this.ceiling,
			"above = " + this.above,
			"speedrestriction = " + [
				this.speedRestriction.radius?.nm ?? 0,
				this.speedRestriction.radius?.kts ?? 0,
				this.speedRestriction.altitude?.ft ?? 0,
				this.speedRestriction.altitude?.kts ?? 0,
			].join(", "),
			"localizerspeed = " + [
				this.localizerSpeed.nm,
				this.localizerSpeed.kts
			].join(", "),
			"handoff = \n" +
			Array.from(this.handoff.entries())
				 .map(([dir, handoff]) =>
						 "\t" + [
							 dir,
							 handoff.callsign,
							 handoff.pronunciation,
							 handoff.frequency
						 ].join(", ")
				 ).join("\n"),
			"beacons = \n" +
			Array.from(this.beacons.values())
				 .map(beacon => "\t" + beacon.beaconString()).join("\n"),
			this.boundary === undefined
			? null
			: "boundary = \n" + this.boundary.toString()
		].filter(l => l !== null).join("\n");
	}
}
