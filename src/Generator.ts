import Airspace from "./Airspace.js";
import Airport from "./Airport.js";
import Beacon from "./Beacon.js";
import NamedFix from "./NamedFix.js";
import RunwayConfiguration from "./RunwayConfiguration.js";
import Runway from "./Runway.js";

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
	public beacon(name: string): Beacon {
		const beacon = this.airspace().beacons.get(name);
		if (beacon === undefined)
			throw new Error(`Beacon ${name} not found`);
		return beacon;
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

	/**
	 * Get a fix by name/identifier.
	 */
	public fix(name: string): NamedFix {
		const beacon = this.airspace().beacons.get(name);
		if (beacon !== undefined)
			return beacon;
		for (const airport of this.#airports.values()) {
			const sid = airport.sidMarkers.get(name);
			if (sid !== undefined)
				return sid;
		}
		throw new Error(`Fix ${name} not found`);
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
		].filter(l => l !== null).join("\n\n");
	}
}
