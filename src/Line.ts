import Polygon from "./Polygon.js";
import Fix from "./Fix.js";

class Line extends Polygon {
	public readonly colour: Line.Colour

	/**
	 * Create new line.
	 * @param vertices The vertices of the line.
	 * @param colour Line colour.
	 */
	public constructor(
		vertices: ReadonlyArray<Fix>,
		colour: Line.Colour = Line.ColourType.AIRSPACE
	) {
		super(vertices);
		this.colour = colour;
	}

	public append(fix: Fix) {
		this._vertices.push(fix);
		return this;
	}

	public prepend(fix: Fix) {
		this._vertices.unshift(fix);
		return this;
	}

	public join(line: Line) {
		this._vertices.push(...line.vertices);
		return this;
	}

	public lineString(): string {
		return "\t"
			+ (typeof this.colour === "string" ? this.colour : this.colour.join(", ")) + "\n"
			+ this.toString();
	}

	/**
	 * Get lines from GeoJSON
	 */
	public static fromGeoJSON(data: any, colour?: Line.Colour): Line[] {
		const lines: Line[] = [];

		// Ensure valid GeoJSON structure
		if (!data || data.type !== "FeatureCollection" || !Array.isArray(data.features)) {
			return lines; // Early return if the structure is invalid
		}

		// Iterate over each feature in the GeoJSON
		for (const feature of data.features) {
			if (!feature.geometry) continue; // Skip if no geometry is present
			const {type, coordinates} = feature.geometry;

			switch (type) {
				case "LineString":
					lines.push(new Line(coordinates.map(([lon, lat]: [number, number]) => new Fix(lat, lon)), colour));
					break;

				case "MultiLineString":
					lines.push(...coordinates.map((lineCoords: [number, number][]) =>
						new Line(lineCoords.map(([lon, lat]: [number, number]) => new Fix(lat, lon)), colour)
					));
					break;

				case "Polygon":
					lines.push(...coordinates.map((ring: [number, number][]) =>
						new Line(ring.map(([lon, lat]: [number, number]) => new Fix(lat, lon)), colour)
					));
					break;

				case "MultiPolygon":
					lines.push(...coordinates.map((polygon: [number, number][][]) =>
						polygon.map((ring: [number, number][]) =>
							new Line(ring.map(([lon, lat]: [number, number]) => new Fix(lat, lon)), colour)
						)
					).flat());
					break;
			}
		}

		return lines;
	}
}

namespace Line {
	export const enum ColourType {
		COAST = "coast",
		AIRSPACE = "airspace",
		RUNWAY = "runway"
	}

	export type Colour = Line.ColourType | [red: number, green: number, blue: number];
}

export default Line;
