import Fix from "./Fix.js";

/**
 * A basic polygon made from straight lines connecting fixes.
 */
export default class Polygon {
	/**
	 * Create new polygon. Last vertex is automatically connected to first vertex.
	 * @param vertices The vertices of the polygon.
	 */
	public constructor(
		public readonly vertices: ReadonlyArray<Fix>
	) {}

	public toString(): string {
		return this.vertices.map(vertex => "\t" + vertex.toString()).join("\n");
	}
}
