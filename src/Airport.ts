import Runway from "./Runway.js";
import NamedFix from "./NamedFix.js";
import Beacon from "./Beacon.js";

class Airport {
	/**
	 * Full name of the airport.
	 */
	public readonly name: string;

	/**
	 * Airport name used in speech, i.e. pronunciation. Can be a shorter/common
	 * name.
	 */
	public readonly pronunciation: string;

	/**
	 * ICAO code of the airport. The airspace code is derived from this
	 * identifier of the first/primary airport.
	 */
	public readonly code: string;

	/**
	 * The default initial beacon for arrivals.
	 */
	public readonly beacon?: Beacon;

	/**
	 * The default climb altitude in feet for departures.
	 */
	public readonly climbAltitude: number;

	/**
	 * Traffic flow per active runway, measured in planes per hour (approximate; it increases slightly at higher scores).
	 */
	public readonly flow: number;

	/**
	 * Runways.
	 */
	public readonly runways: Map<string, Runway>;

	/**
	 * A list of named fixes to display as SID markers.
	 */
	public readonly sidMarkers: Readonly<Map<string, NamedFix>>;

	/**
	 * Entry points. Including the same entry point several times will increase
	 * the amount of traffic that spawns at that entry point.
	 */
	public readonly entryPoints: ReadonlyArray<Airport.EntryPoint>;

	/**
	 * List of airline configuration entries for spawning traffic.
	 */
	public readonly airlines: ReadonlyArray<Airport.Airline>;

	/**
	 * @param name Full name of the airport.
	 * @param pronunciation Pronunciation of the airport name. Can be a shorter/
	 * 			common name.
	 * @param code ICAO code of the airport. The airspace code is derived from
	 * 			this identifier of the first/primary airport.
	 * @param flow Traffic flow per active runway, measured in planes per hour
	 * 			(approximate; it increases slightly at higher scores).
	 * @param climbAltitude The default climb altitude in feet for departures.
	 * @param runways Runways.
	 * @param entryPoints Entry points. Including the same entry point several
	 * 			times will increase the amount of traffic that spawns at that
	 * 			entry point.
	 * @param airlines List of airline configuration entries for spawning
	 *			traffic.
	 * @param [sidMarkers] A list of named fixes to display as SID markers.
	 * @param [beacon] The default initial beacon for arrivals.
	 */
	public constructor(
		name: string,
		pronunciation: string,
		code: string,
		flow: number,
		climbAltitude: number,
		runways: Iterable<Runway>,
		entryPoints: Airport.EntryPoint[],
		airlines: Airport.Airline[],
		sidMarkers?: Iterable<NamedFix>,
		beacon?: Beacon
	) {
		this.name = name;
		this.pronunciation = pronunciation;
		this.code = code;
		this.beacon = beacon;
		this.flow = flow;
		this.climbAltitude = climbAltitude;
		this.runways = new Map();
		for (const runway of runways)
			this.runways.set(runway.id, runway);
		this.entryPoints = entryPoints;
		this.airlines = airlines;
		this.sidMarkers = new Map();
		for (const marker of sidMarkers ?? [])
			this.sidMarkers.set(marker.name, marker);
	}

	public toString(): string {
		return [
			"code = " + this.code,
			`name = ${this.name}, ${this.pronunciation}`,
			this.beacon !== undefined ? "beacon = " + this.beacon.name : null,
			"flow = " + this.flow,
			"climbaltitude = " + this.climbAltitude,
			"runways =\n" +
			Array.from(this.runways.values())
				 .map(runway => "\t" + runway.toString())
				 .join("\n"),
			"entrypoints =\n" +
				Array.from(this.entryPoints)
					.map(e => "\t" + [
						e.heading,
						e.beacon?.name === undefined ? e.altitude === undefined ? null : 0 : e.beacon.name,
						e.altitude ?? null,
					].join(", ")).join("\n"),
			this.sidMarkers.size === 0 ? null : "sids =\n" +
				Array.from(this.sidMarkers.values())
					 .map(marker => "\t" + [
						 marker.name,
						 marker.toString(),
						 marker.pronunciation,
					 ].join(", ")).join("\n"),
			"airlines =\n" +
			Array.from(this.airlines)
				 .map(a => "\t" + [
					 a.name,
					 a.frequency,
					 Array.from(a.type)
						  .map(t => t.toLowerCase())
						  .sort((a, b) => b.localeCompare(a))
						  .join("/"),
					 a.pronunciation,
					 Array.from(a.direction as Iterable<string | number>)
						 .map(t => t.toString().toLowerCase())
						 .sort((a, b) => b.localeCompare(a))
						 .join("/"),
				 ].join(", ")).join("\n"),
		].filter(l => l !== null).join("\n");
	}
}

namespace Airport {
	/**
	 * A spawn point for inbound traffic.
	 */
	export class EntryPoint {
		/**
		 * The true heading, in decimal degrees, used to extend a vector from
		 * {@link Airspace#center}. The entry point lies 12 NMI beyond the
		 * intersection of the vector with the airspace boundary.
		 */
		public readonly heading: number;

		/**
		 * The beacon name that inbound traffic on this entry point will DCT.
		 * If the beacon has an approach route and {@link Airspace#automatic} is
		 * true, inbound traffic will follow the approach route. If undefined,
		 * the game defaults to the first beacon in {@link Airspace#beacons}.
		 */
		public readonly beacon?: Beacon;

		/**
		 * Descent altitude for this entry point in feet. If undefined, the game
		 * defaults to {@link Airspace#descentAltitude}.
		 */
		public readonly altitude?: number;

		/**
		 * @param heading The true heading, in decimal degrees, used to extend a
		 * 			vector from {@link Airspace#center}. The entry point lies 12
		 * 			NMI beyond the intersection of the vector with the airspace
		 * 			boundary.
		 * @param [beacon] The beacon name that inbound traffic on this entry
		 * 			point will DCT. If the beacon has an approach route and
		 * 			{@link Airspace#automatic} is true, inbound traffic will
		 * 			follow the approach route. If undefined, the game defaults
		 * 			to the first beacon in {@link Airspace#beacons}.
		 * @param [altitude] Descent altitude for this entry point in feet. If
		 * 			undefined, the game defaults to
		 * 			{@link Airspace#descentAltitude}.
		 */
		public constructor(
			heading: number,
			beacon?: Beacon,
			altitude?: number
		) {
			this.heading = heading;
			this.beacon = beacon;
			this.altitude = altitude;
		}
	}

	/**
	 * An airlines configuration entry.
	 */
	export class Airline {
		/**
		 * The 3 letter airline ICAO code, or a private registration (with a
		 * land code, dash(-), and then the format).
		 * @example "AIR" // might spawn flight AIR123A
		 * @example "PH-ABC" // might spawn flight PHKRL
		 * @example "N-123AB" // might spawn flight N204AP
		 * @example "AF1-" // will spawn flight AF1
		 */
		public readonly name: string;

		/**
		 * Relative likelihood of appearance from 0 never to 10 frequently.
		 */
		public readonly frequency: number;

		/**
		 * ICAO aircraft types. One is picked randomly with equal probability
		 * for each flight for this {@link Airline}.
		 */
		public readonly type: Set<string>;

		/**
		 * Pronunciation of the airline callsign. Leave undefined for private
		 * registrations.
		 */
		public readonly pronunciation?: string;

		/**
		 * Preferred direction for arrivals/departures. You can use NESW for
		 * very roughly north, east, south, and west. You can also instead
		 * for more precision (± 20°) specify headings (from
		 * {@link Airspace#center}). Make sure there are available
		 * {@link Airport#entryPoints} near the specified direction.
		 */
		public readonly direction: Set<"n" | "e" | "s" | "w"> | Set<number>;

		/**
		 * @param name The 3 letter airline ICAO code, or a private registration
		 * 			(with a land code, dash(-), and then the format).
		 * @param frequency Relative likelihood of appearance from 0 never to
		 * 			10 frequently.
		 * @param type ICAO aircraft types. One is picked randomly with equal
		 * 			probability for each flight for this {@link Airline}.
		 * @param direction Preferred direction for arrivals/departures. You can
		 * 			use NESW for very roughly north, east, south, and west. You
		 * 			can also instead for more precision (± 20°) specify headings
		 * 			(from {@link Airspace#center}). Make sure there are
		 * 			available {@link Airport#entryPoints} near the specified
		 * 			direction.
		 * @param [pronunciation] Pronunciation of the airline callsign. Leave
		 * 			undefined for private registrations.
		 */
		public constructor(
			name: string,
			frequency: number,
			type: Iterable<string>,
			direction: Iterable<"n" | "e" | "s" | "w"> | Iterable<number>,
			pronunciation?: string
		) {
			this.name = name;
			this.frequency = frequency;
			this.type = new Set(type);
			this.direction = new Set(direction as any) as any;
			this.pronunciation = pronunciation;
		}
	}
}

export default Airport;
