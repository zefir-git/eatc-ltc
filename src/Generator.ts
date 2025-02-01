import Airspace from "./Airspace.js";
import Airport from "./Airport.js";
import Beacon from "./Beacon.js";
import NamedFix from "./NamedFix.js";
import RunwayConfiguration from "./RunwayConfiguration.js";
import Runway from "./Runway.js";
import STAR from "./STAR.js";
import Fix from "./Fix.js";
import StarFix from "./StarFix.js";
import SID from "./SID.js";
import Aircraft from "./Aircraft.js";
import Polygon from "./Polygon.js";
import Line from "./Line.js";

export default class Generator {
	static #instance: Generator | null = null;
	public static getInstance(): Generator {
		return this.#instance ??= new Generator();
	}
	private constructor() {
	}

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
	public airport(runway: Runway): Airport;
	public airport(a: Airport | Runway | string): Airport | typeof this {
		if (typeof a === "string") {
			const airport = this.#airports.get(a);
			if (airport === undefined)
				throw new Error(`Airport ${a} not found`);
			return airport;
		}
		else if (a instanceof Runway) {
			const airport = Array.from(this.#airports.values()).find(f => f.runways.has(a.id));
			if (airport === undefined)
				throw new Error(`No airport found for runway ${a.id}`);
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

	#aircraft = new Map<string, Aircraft>;

	public aircraft(aircraft: Aircraft) {
		this.#aircraft.set(aircraft.type.toLowerCase(), aircraft);
	}

	#lines: Polygon[] = [];

	public line(...line: Polygon[]) {
		this.#lines.push(...line);
	}

	// Map<runway, Map<beacon, STAR[]>>
	#arrivals = new Map<string, Map<string, STAR[]>>;

	public arrival(a: STAR | STAR.StarWithEntry): typeof this {
		const star = a instanceof STAR ? a : a.star;
		const entries = a instanceof STAR.StarWithEntry ? a.entries : [];
		const runways = Array.from(star.runways);
		const runwayIds =
			star.reverse === "only"
			? runways.map(r => r.id + ", rev")
			: star.reverse
			  ? runways.flatMap(r => [r.id, r.id + ", rev"])
			  : runways.map(r => r.id);
		for (const runway of runwayIds) {
			if (!this.#arrivals.has(runway))
				this.#arrivals.set(runway, new Map<string, STAR[]>([[star.beacon.name, []]]));
			else if (!this.#arrivals.get(runway)!.has(star.beacon.name))
				this.#arrivals.get(runway)!.set(star.beacon.name, []);

			this.#arrivals.get(runway)!
				.get(star.beacon.name)!
				.push(star);
		}

		for (const entry of entries) {
			const airports = Array.from(new Map(Array.from(star.runways.values()).map(r => {
				const f = this.airport(r);
				return [f.code, f];
			})).values());
			for (const airport of airports)
				airport.entryPoints.push(entry);
		}

		return this;
	}

	// Map<runway, SID[]>
	#departures = new Map<string, SID[]>;

	public departure(sid: SID): typeof this {
		const rwy = sid.reverse ? sid.runway.id + ", rev" : sid.runway.id;
		if (!this.#departures.has(rwy))
			this.#departures.set(rwy, []);
		this.#departures.get(rwy)!.push(sid);
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
			catch (ignored) {
			}
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
			catch (ignored) {
			}
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
		catch (ignored) {
		}
		if (existing !== null && (existing.latitude !== fix.latitude || existing.longitude !== fix.longitude))
			throw new Error(`Trying to overwrite ${args[0]} (${existing.toString()}) with different coordinates: ${fix.toString()}`);

		this.#fixes.set(args[0], fix);
		return fix;
	}

	public sidFix(name: string): NamedFix {
		for (const airport of this.#airports.values()) {
			const fix = airport.sidMarkers.get(name);
			if (fix !== undefined)
				return fix;
		}
		throw new Error(`Cannot find SID marker ${name}`);
	}

	private static readonly pronunciation: Record<string, string> = {
		0: "zero",
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5: "five",
		6: "six",
		7: "seven",
		8: "eight",
		9: "niner",
		A: "alpha",
		B: "bravo",
		C: "charlie",
		D: "delta",
		E: "echo",
		F: "foxtrot",
		G: "golf",
		H: "hotel",
		I: "india",
		J: "juliet",
		K: "kilo",
		L: "lima",
		M: "mike",
		N: "november",
		O: "oscar",
		P: "papa",
		Q: "quebec",
		R: "romeo",
		S: "sierra",
		T: "tango",
		U: "uniform",
		V: "victor",
		W: "whiskey",
		X: "x-ray",
		Y: "yankee",
		Z: "zulu",
	};

	public pronounce(beacon: NamedFix | string, suffix: string): [name: string, pronunciation: string];
	public pronounce(name: string): [name: string, pronunciation: string];
	public pronounce(...args: [NamedFix | string, string] | [string]): [name: string, pronunciation: string] {
		if (args.length === 1) {
			const name = args[0];
			if (name.length === 0)
				throw new SyntaxError("Empty name");
			const waypoint = name.slice(0, -2).trim();
			if (waypoint.length < 1) return [
				name.trim(),
				name[0]!.toUpperCase() + name.slice(1).toLowerCase()
			];
			const waypointName = waypoint[0]!.toUpperCase()
				+ waypoint.slice(1).toLowerCase();
			return [
				name.trim(),
				name.length <= 2
				? waypointName
				: waypointName + " "
					+ name.slice(-2)
						  .toUpperCase()
						  .split("")
						  .map(c => Generator.pronunciation[c] ?? c).join(" ")
			];
		}

		const beacon = typeof args[0] === "string"
					   ? this.beacon(args[0])
					   : args[0];
		const suffix = args[1];
		return [
			beacon.name + suffix,
			beacon.pronunciation + " "
			+ suffix
				.toUpperCase()
				.split("")
				.map(c => Generator.pronunciation[c] ?? c).join(" ")
		]
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
				 ).map((e, i) => `[approach${i + 1}]\n${e}`).join("\n\n"),

			Array.from(this.#departures.entries())
				 .map(([rwy, routes], i) =>
					 [
						 `[departure${i + 1}]`,
						 `runway = ${rwy}`,
					 ].join("\n") + "\n"
					 + routes.map((route, i) => `route${i + 1} =\n${route.routeString()}`).join("\n")
				 ).join("\n\n"),

			this.#aircraft.size === 0 ? null : [
				"[planetypes]",
				"types =",
				...Array.from(this.#aircraft.values()).map(a => a.toString()),
			].join("\n"),

			this.#lines.length === 0 ? null : [
				"[background]",
				this.#lines.reverse().map((line, i) => [
					`line${i + 1} =`,
					line instanceof Line ? line.lineString() : line.toString()
				].join("\n")).join("\n")
			].join("\n")
		].filter(l => l !== null).join("\n\n");
	}
}
