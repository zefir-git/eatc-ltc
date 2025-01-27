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
			+ this.colour + "\n"
			+ this.toString();
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
