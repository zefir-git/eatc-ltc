import Line from "./Line.js";
import Fix from "./Fix.js";

export default class Circle extends Line {
	public constructor(
		public readonly centre: Fix,
		public readonly radius: number,
		public readonly precision: number,
		colour?: Line.Colour | [red: number, green: number, blue: number]
	) {
		const vertices: Fix[] = [];

		const φc = Fix.degToRad(centre.latitude);
		const λc = Fix.degToRad(centre.longitude);

		for (let i = 0; i < precision; ++i) {
			const θ = (2 * Math.PI / precision) * i;

			const φ = Math.asin(
				Math.sin(φc) * Math.cos(radius / Fix.R)
				+ Math.cos(φc) * Math.sin(radius / Fix.R) * Math.cos(θ)
			);

			const λ = λc + Math.atan2(
				Math.sin(θ) * Math.sin(radius / Fix.R) * Math.cos(φc),
				Math.cos(radius / Fix.R) - Math.sin(φc) * Math.sin(φ)
			);

			vertices.push(new Fix(Fix.radToDeg(φ), Fix.radToDeg(λ)));
		}
		vertices.push(vertices[0]!);

		super(vertices, colour);
	}

	public cutoff(filter: (fix: Fix, i: number, circle: Circle) => boolean): Line {
		return new Line(this.vertices.filter((fix, i) => filter(fix, i, this)), this.colour);
	}

	public static from(a: Fix, b: Fix, c: Fix, precision: number, colour?: Line.Colour | [red: number, green: number, blue: number]): Circle {
		const [xₐ, yₐ, zₐ] = a.cartesian();
		const [xᵦ, yᵦ, zᵦ] = b.cartesian();
		const [x𝚌, y𝚌, z𝚌] = c.cartesian();

		const a⃗ = [xₐ - x𝚌, yₐ - y𝚌, zₐ - z𝚌] as const;
		const b⃗ = [xᵦ - x𝚌, yᵦ - y𝚌, zᵦ - z𝚌] as const;

		const a2 = (xᵦ - x𝚌) ** 2 + (yᵦ - y𝚌) ** 2 + (zᵦ - z𝚌) ** 2;
		const b2 = (xₐ - x𝚌) ** 2 + (yₐ - y𝚌) ** 2 + (zₐ - z𝚌) ** 2;
		const c2 = (xₐ - xᵦ) ** 2 + (yₐ - yᵦ) ** 2 + (zₐ - zᵦ) ** 2;

		const crossProduct = [
			a⃗[1] * b⃗[2] - a⃗[2] * b⃗[1],
			a⃗[2] * b⃗[0] - a⃗[0] * b⃗[2],
			a⃗[0] * b⃗[1] - a⃗[1] * b⃗[0],
		] as const;

		const area = crossProduct[0] ** 2 + crossProduct[1] ** 2 + crossProduct[2] ** 2;
		const S = 0.5 * Math.sqrt(area);
		if (S === 0)
			throw new Error("The points are collinear.");

		const U = [
			(a2 * (b2 + c2 - a2) * xₐ + b2 * (c2 + a2 - b2) * xᵦ + c2 * (a2 + b2 - c2) * x𝚌) / (16 * S * S),
			(a2 * (b2 + c2 - a2) * yₐ + b2 * (c2 + a2 - b2) * yᵦ + c2 * (a2 + b2 - c2) * y𝚌) / (16 * S * S),
			(a2 * (b2 + c2 - a2) * zₐ + b2 * (c2 + a2 - b2) * zᵦ + c2 * (a2 + b2 - c2) * z𝚌) / (16 * S * S),
		] as const;

		const U_norm = Math.sqrt(U[0] ** 2 + U[1] ** 2 + U[2] ** 2);
		const xᵤ = U[0] / U_norm;
		const yᵤ = U[1] / U_norm;
		const zᵤ = U[2] / U_norm;

		const φᶜ = Fix.radToDeg(Math.asin(zᵤ));
		const λᶜ = Fix.radToDeg(Math.atan2(yᵤ, xᵤ));
		const circumcentre = new Fix(φᶜ, λᶜ);

		const radius = circumcentre.distance(a);

		return new Circle(circumcentre, radius, precision, colour);
	}
}
