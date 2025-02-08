import Runway from "./Runway.js";
import Beacon from "./Beacon.js";
import Fix from "./Fix.js";
import StarFix from "./StarFix.js";
import Generator from "./Generator.js";
import Airport from "./Airport.js";

/**
 * A Standard Terminal Arrival Route (STAR).
 */
class STAR {
	/**
	 * The name/identifier of this star.
	 * Usually this is the name of a fix, followed by a number and a letter.
	 */
	public readonly name: string;

	/**
	 * Pronunciation of this STAR’s name.
	 * @example "Aleso one hotel" // for ALESO 1H
	 */
	public readonly pronunciation: string;

	/**
	 * The runways for which this STAR is available.
	 */
	public readonly runways: Set<Runway>;

	/**
	 * Reversed runway end use for this STAR.
	 */
	public readonly reverse: boolean | "only";

	/**
	 * The beacon at which this STAR begins.
	 */
	public readonly beacon: Beacon;

	/**
	 * The inbound heading of the STAR in decimal degrees. When there are
	 * multiple STARs with the same runway and beacon, the STAR selected is
	 * based on the closest inbound heading of the traffic.
	 */
	public readonly heading?: number;

	/**
	 * The route. Use {@link StarFix} to specify constraints.
	 */
	public readonly route: Fix[];

	/**
	 * End of STAR.
	 */
	public readonly end: {
		/**
		 * Enter holding pattern or proceed on heading.
		 */
		end: "hold" | number
	} | {
		/**
		 * Intercept ILS.
		 */
		ils: {
			/**
			 * DME from runway threshold.
			 */
			dme: number,

			/**
			 * Maximum altitude.
			 */
			altitude?: number,

			/**
			 * Maximum speed.
			 */
			speed?: number
		}
	};

	/**
	 * @param name The name/identifier of this star. Usually this is the name of
	 * 			a fix, followed by a number and a letter.
	 * @param pronunciation Pronunciation of this STAR’s name.
	 * @param runways The runways for which this STAR is available.
	 * @param reverse Reversed runway end use for this STAR.
	 * @param beacon The beacon at which this STAR begins.
	 * @param heading The inbound heading of the STAR in decimal degrees. When
	 * 			there are multiple STARs with the same runway and beacon, the
	 * 			STAR selected is based on the closest inbound heading of the
	 * 			traffic.
	 * @param route The route. Use {@link StarFix} to specify constraints.
	 * @param end End of STAR.
	 */
	public constructor(
		name: string,
		pronunciation: string,
		runways: Iterable<Runway>,
		reverse: boolean | "only",
		beacon: Beacon,
		heading: number | undefined,
		route: Iterable<Fix>,
		end: STAR["end"],
	) {
		this.name = name;
		this.pronunciation = pronunciation;
		this.runways = new Set(runways);
		this.reverse = reverse;
		this.beacon = beacon;
		this.heading = heading;
		this.route = Array.from(route);
		this.end = end;
	}

	public entryPoint(altitude?: number, inboundHeading = this.heading): Airport.EntryPoint {
		const atc = Generator.getInstance();
		const airspace = atc.airspace();
		const boundary = airspace.boundary;
		if (boundary === undefined)
			throw new Error("A polygon airspace boundary is required to compute entry points.");

		if (inboundHeading === undefined)
			throw new Error("Cannot determine STAR inbound heading from entry point.");

		const reverseInboundHeading = (180 + inboundHeading) % 360;

		// bearing from centre to beacon
		const centreBearing = atc.airspace().center.bearing(this.beacon);

		const Δθ = (reverseInboundHeading - centreBearing + 180) % 360 - 180;

		const ε = 0.05;

		// inbound bearing is identical to centre bearing
		if (Math.abs(Δθ) <= ε)
			return new Airport.EntryPoint(reverseInboundHeading, this.beacon, altitude);

		let bearing = Math.round(centreBearing * 100) / 100;
		let closest: {deltaDistance: number, e: Fix} | null = null;
		for (let iteration = 0; iteration < 20000; ++iteration) {
			bearing += Δθ > 0 ? .0025 : -.0025;
			// intersect boundary on this headings
			const bi = boundary.intersection(airspace.center, bearing);
			if (bi === null)
				throw new Error(`Cannot find boundary intersection from ${airspace.center.toString()} on bearing ${bearing}°.`);
			// intersect inbound bearing and centre bearing
			const e = bi.bearingIntersection(bearing, this.beacon, reverseInboundHeading);
			const deltaDistance = Math.abs(e.distance(bi) / Fix.NMI - 12);
			if (closest === null) closest = {deltaDistance, e};
			else if (closest.deltaDistance > deltaDistance) closest = {deltaDistance, e};
			if (deltaDistance <= ε)
				return new Airport.EntryPoint(airspace.center.bearing(e), this.beacon, altitude);
		}
		if (closest !== null) {
			console.warn(`${this.name}: Using closest entry point at ε = ${closest.deltaDistance.toFixed(2)} NMI`);
			return new Airport.EntryPoint(airspace.center.bearing(closest.e), this.beacon, altitude);
		}
		throw new Error("Could not determine entry point.");
	}

	public withEntry(...params: Parameters<STAR["entryPoint"]>): STAR.StarWithEntry {
		return new STAR.StarWithEntry(this, process.argv.includes("--noentry") ? [] : this.entryPoint(...params));
	}

	public routeString(): string {
		return "\t" + [
				this.heading ?? 0,
				this.name,
				this.pronunciation
			].join(", ") + "\n" +
			this.route.map(fix => "\t" +
				[
					fix.toString(),
					...fix instanceof StarFix
					   ? [
						   fix.altitude === undefined
						   ? fix.speed === undefined
							 ? null
							 : 0
						   : fix.altitude,
						   fix.speed ?? null,
					   ].filter(o => o !== null)
					   : [],
				].join(", ")
			).join("\n") +
			"\n\t" +
			[..."end" in this.end
				? ["end", this.end.end]
				: [
					this.end.ils.dme,
					this.end.ils.altitude === undefined
					? this.end.ils.speed === undefined
					  ? null
					  : 0
					: this.end.ils.altitude,
					this.end.ils.speed ?? null
				]].filter(o => o !== null).join(", ");
	}
}

namespace STAR {
	export class StarWithEntry {
		public readonly entries: ReadonlyArray<Airport.EntryPoint>;
		public constructor(
			public readonly star: STAR,
			entries: Airport.EntryPoint | Airport.EntryPoint[]
		) {
			this.entries = Array.isArray(entries) ? entries : [entries];
		}

		public repeated(times: number): StarWithEntry {
			const entries = this.entries.flatMap(e => new Array(times).fill(e));
			return new StarWithEntry(this.star, entries);
		}
	}
}

export default STAR;
