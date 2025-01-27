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

	/**
	 * Find intersection point
	 * @param fix
	 * @param bearing Bearing from the fix in decimal degrees.
	 */
	public intersection(fix: Fix, bearing: number): Fix | null {
		let closestIntersection: Fix | null = null;
		let minDistance = Infinity;

		for (let i = 0; i < this.vertices.length - 1; ++i) {
			const p1 = this.vertices[i]!;
			const p2 = this.vertices[i + 1]! ?? this.vertices[0]!;

			const intersection = this.calculateGreatCircleIntersection(fix, bearing, p1, p2);

			if (intersection !== null && this.isPointOnEdge(intersection, p1, p2)) {
				const distance = intersection.distance(fix);
				if (distance < minDistance) {
					minDistance = distance;
					closestIntersection = intersection;
				}
			}
		}

		return closestIntersection;
	}

	private calculateGreatCircleIntersection(fix: Fix, bearing: number, p1: Fix, p2: Fix): Fix | null {
		const φ1 = Fix.degToRad(fix.latitude);
		const λ1 = Fix.degToRad(fix.longitude);
		const θ = Fix.degToRad(bearing);

		const φ2 = Fix.degToRad(p1.latitude);
		const λ2 = Fix.degToRad(p1.longitude);
		const φ3 = Fix.degToRad(p2.latitude);
		const λ3 = Fix.degToRad(p2.longitude);

		// vectors
		const n1 = [
			Math.sin(λ1) * Math.cos(θ) - Math.cos(λ1) * Math.tan(φ1) * Math.sin(θ),
			Math.cos(λ1) * Math.cos(θ) + Math.sin(λ1) * Math.tan(φ1) * Math.sin(θ),
			-Math.sin(θ)
		] as const;

		const n2 = [
			Math.sin(φ2) * Math.cos(λ2) - Math.sin(φ3) * Math.cos(λ3),
			Math.sin(φ2) * Math.sin(λ2) - Math.sin(φ3) * Math.sin(λ3),
			Math.cos(φ2) - Math.cos(φ3)
		] as const;
		
		// cross product
		const x = [
			n1[1] * n2[2] - n1[2] * n2[1],
			n1[2] * n2[0] - n1[0] * n2[2],
			n1[0] * n2[1] - n1[1] * n2[0]
		] as const;

		const φI = Math.atan2(x[2], Math.sqrt(x[0] ** 2 + x[1] ** 2));
		const λI = Math.atan2(x[1], x[0]);

		return new Fix(Fix.radToDeg(φI), Fix.radToDeg(λI));
	}

	private isPointOnEdge(intersection: Fix, p1: Fix, p2: Fix): boolean {
		const distanceP1P2 = p1.distance(p2);
		const distanceP1I = p1.distance(intersection);
		const distanceP2I = p2.distance(intersection);

		const tolerance = 1e-6;
		return Math.abs(distanceP1I + distanceP2I - distanceP1P2) < tolerance;
	}
}
