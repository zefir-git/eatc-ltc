import Fix from "./Fix.js";

/**
 * A basic polygon made from straight lines connecting fixes.
 */
export default class Polygon {
	protected _vertices: Fix[];
	/**
	 * Create new polygon. Last vertex is automatically connected to first vertex.
	 * @param vertices The vertices of the polygon.
	 */
	public constructor(
		vertices: Iterable<Fix>
	) {
		this._vertices = [...vertices];
	}

	public get vertices(): ReadonlyArray<Fix> {
		return this._vertices;
	}

	public toString(): string {
		return this.vertices.map(vertex => "\t" + vertex.toString()).join("\n");
	}
}
