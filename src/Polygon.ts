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

	public static intersection(a: Fix, b: Fix, c: Fix, d: Fix): Fix | null {
		const P1 = a.cartesian();
		const P2 = b.cartesian();
		const P3 = c.cartesian();
		const P4 = d.cartesian();

		const n1 = [
			P1[1] * P2[2] - P1[2] * P2[1],
			P1[2] * P2[0] - P1[0] * P2[2],
			P1[0] * P2[1] - P1[1] * P2[0]
		] as const;

		const n2 = [
			P3[1] * P4[2] - P3[2] * P4[1],
			P3[2] * P4[0] - P3[0] * P4[2],
			P3[0] * P4[1] - P3[1] * P4[0]
		] as const;

		const l = [
			n1[1] * n2[2] - n1[2] * n2[1],
			n1[2] * n2[0] - n1[0] * n2[2],
			n1[0] * n2[1] - n1[1] * n2[0]
		] as const;

		// normalise l
		const lNorm = Math.sqrt(l[0] ** 2 + l[1] ** 2 + l[2] ** 2);

		const i1 = [
			l[0] / lNorm,
			l[1] / lNorm,
			l[2] / lNorm
		] as const;

		const i2 = [
			-i1[0],
			-i1[1],
			-i1[2]
		] as const;

		const fix1 = Fix.fromCartesian(i1);
		const fix2 = Fix.fromCartesian(i2);
		const ϵ = 1e-4;

		if (
			Math.abs(fix1.distance(a) + fix1.distance(b) - a.distance(b)) <= ϵ
			&& Math.abs(fix1.distance(c) + fix1.distance(d) - c.distance(d)) <= ϵ
		) return fix1;
		if (
			Math.abs(fix2.distance(a) + fix2.distance(b) - a.distance(b)) <= ϵ
			&& Math.abs(fix2.distance(c) + fix2.distance(d) - c.distance(d)) <= ϵ
		) return fix2;
		return null;
	}

	public intersection(origin: Fix, bearing: number, nth = 0) {
		const intersections: Fix[] = [];
		for (let i = 0; i < this.vertices.length; ++i) {
			const a = this.vertices[i]!;
			const b = this.vertices[i + 1] ?? this.vertices[0]!;
			const d = origin.destination(bearing, Math.max(a.distance(origin), b.distance(origin)) / Fix.NMI);
			const intersection = Polygon.intersection(a, b, origin, d);
			if (intersection !== null)
				intersections.push(intersection);
		}
		if (intersections.length === 0) return null;
		// return the farthest intersection
		return intersections.sort((a, b) => a.distance(origin) - b.distance(origin)).at(nth)!;
	}
}
