import Airspace from "./Airspace.js";
import Airport from "./Airport.js";
import Beacon from "./Beacon.js";
import NamedFix from "./NamedFix.js";
import RunwayConfiguration from "./RunwayConfiguration.js";
import Runway from "./Runway.js";
import STAR from "./STAR.js";
import Fix from "./Fix.js";
import StarFix from "./StarFix.js";

export default class Generator {
	#airspace: Airspace | null = null;

	/**
	 * Get airspace.
	 */
	public airspace(): Airspace;

	/**
	 * Set airspace.
	 */
	public airspace(airspace: Airspace): typeof this;
	public airspace(airspace?: Airspace): Airspace | typeof this {
		if (airspace !== undefined) {
			this.#airspace = airspace;
			return this;
		}
		if (this.#airspace === null)
			throw new Error("No airspace set");
		return this.#airspace!;
	}

	/**
	 * Get beacon by name.
	 */
	public beacon(name: string): Beacon;
	public beacon(name: string, altitude: number | undefined, speed?: number): StarFix;
	public beacon(...args: any[]): any {
		if (args.length === 1) {
			const beacon = this.airspace().beacons.get(args[0]);
			if (beacon === undefined)
				throw new Error(`Beacon ${args[0]} not found`);
			return beacon;
		}
		const beacon = this.beacon(args[0]);
		return StarFix.from(beacon, args[1], args[2]);
	}

	/**
	 * Get beacons by name. Non-existent beacons are ignored.
	 */
	public beacons(...names: string[]): Beacon[] {
		return names.map(this.airspace().beacons.get)
					.filter(n => n !== undefined) as Beacon[];
	}

	#airports = new Map<string, Airport>;

	/**
	 * Get airport.
	 * @param code ICAO code.
	 */
	public airport(code: string): Airport;
	/**
	 * Add airport.
	 */
	public airport(airport: Airport): typeof this;
	public airport(a: Airport | string): Airport | typeof this {
		if (typeof a === "string") {
			const airport = this.#airports.get(a);
			if (airport === undefined)
				throw new Error(`Airport ${a} not found`);
			return airport;
		}
		this.#airports.set(a.code, a);
		return this;
	}

	readonly #configurations: RunwayConfiguration[][] = [];

	/**
	 * Get a runway by identifier.
	 * @param id Runway ID.
	 */
	public runway(id: string): Runway;
	public runway(config: RunwayConfiguration[]): typeof this;
	public runway(arg: string | RunwayConfiguration[]): any {
		if (typeof arg === "string") {
			for (const airport of this.#airports.values()) {
				const runway = airport.runways.get(arg);
				if (runway !== undefined)
					return runway;
			}
			throw new Error(`Runway ${arg} not found`);
		}
		this.#configurations.push(arg
			.sort((a, b) =>
				a.score - b.score
			)
		);
		return this;
	}

	// Map<runway, Map<beacon, STAR[]>>
	#arrivals = new Map<string, Map<string, STAR[]>>;

	public arrival(star: STAR): typeof this {
		for (const runway of star.runways) {
			if (!this.#arrivals.has(runway.id))
				this.#arrivals.set(runway.id, new Map<string, STAR[]>([[star.beacon.name, []]]));
			else if (!this.#arrivals.get(runway.id)!.has(star.beacon.name))
				this.#arrivals.get(runway.id)!.set(star.beacon.name, []);

			this.#arrivals.get(runway.id)!
				.get(star.beacon.name)!
				.push(star);
		}
		return this;
	}

	#fixes = new Map<string, Fix>;

	public fix(name: string): Fix;
	public fix(fix: NamedFix): NamedFix;
	public fix(name: string, fix: Fix): Fix;
	public fix(name: string, altitude: number | undefined, speed?: number): StarFix;
	public fix(name: string, lat: string, lon: string, altitude?: number, speed?: number): Fix | StarFix;
	public fix(...args: any[]): Fix {
		if (args.length === 1) {
			if (typeof args[0] === "string") {
				let fix: Fix | undefined = this.#fixes.get(args[0]);
				if (fix !== undefined)
					return fix;
				fix = this.airspace().beacons.get(args[0]);
				if (fix !== undefined)
					return fix;
				for (const airport of this.#airports.values()) {
					fix = airport.sidMarkers.get(args[0]);
					if (fix !== undefined)
						return fix;
				}
				throw new Error(`Cannot find fix ${args[0]}`);
			}

			let existing: Fix | null = null;
			try {
				existing = this.fix(args[0].name);
			}
			catch (ignored) {}
			if (existing !== null && (existing.latitude !== args[0].latitude || existing.longitude !== args[0].longitude))
				throw new Error(`Trying to overwrite ${args[0].name} (${existing.toString()}) with different coordinates: ${args[0].toString()}`);

			this.#fixes.set(args[0].name, args[0]);
			return args[0];
		}
		if (args.length === 2 && typeof args[1] !== "number") {
			let existing: Fix | null = null;
			try {
				existing = this.fix(args[1].name);
			}
			catch (ignored) {}
			if (existing !== null && (existing.latitude !== args[1].latitude || existing.longitude !== args[1].longitude))
				throw new Error(`Trying to overwrite ${args[0]} (${existing.toString()}) with different coordinates: ${args[1].toString()}`);

			this.#fixes.set(args[0], args[1]);
			return args[1];
		}
		if (typeof args[1] !== "string") {
			const fix = this.fix(args[0]);
			return StarFix.from(fix, args[1], args[2]);
		}

		const fix =
			args.length > 2
			? StarFix.fromDMS(args[1], args[2], args[3], args[4])
			: Fix.fromDMS(args[1], args[2]);

		let existing: Fix | null = null;
		try {
			existing = this.fix(args[0]);
		}
		catch (ignored) {}
		if (existing !== null && (existing.latitude !== fix.latitude || existing.longitude !== fix.longitude))
			throw new Error(`Trying to overwrite ${args[0]} (${existing.toString()}) with different coordinates: ${fix.toString()}`);

		this.#fixes.set(args[0], fix);
		return fix;
	}

	/**
	 * Generate Endless ATC configuration
	 * @param [header] Data to prepend. Prefix lines with # for comments.
	 */
	public generate(header?: string): string {
		return [
			header?.trim() ?? null,
			this.airspace().toString(),
			Array.from(this.#airports.values())
				 .map((airport, i) =>
					 `[airport${i + 1}]\n` +
					 airport.toString()
				 )
				 .join("\n"),

			this.#configurations.length === 0 ? null : "[configurations]\n" +
				this.#configurations.map(
					(config, i) =>
						`config${i + 1} = \n` +
						config.map(c => "\t" + c.toString())
							  .join("\n")
				).join("\n"),

			Array.from(this.#arrivals.entries())
				 .flatMap(([rwy, beacons]) =>
					 Array.from(beacons.entries())
						  .map(([beacon, stars]) =>
							  [
								  "runway = " + rwy,
								  "beacon = " + (
									  this.airspace().beacons.has(beacon)
									  ? beacon
									  : stars[0]!.beacon.beaconString()
								  ),
								  stars.map((star, i) => `route${i + 1} =\n${star.routeString()}`).join("\n"),
							  ].join("\n")
						  )
				 ).map((e, i) => `[approach${i + 1}]\n${e}`).join("\n\n")
		].filter(l => l !== null).join("\n\n");
	}
}
