import Generator from "../../src/Generator.js";
import Fix from "../../src/Fix.js";
import Line from "../../src/Line.js";
import Circle from "../../src/Circle.js";
import fs from "node:fs/promises";

export default class AirspaceLines {
	public constructor(
		private readonly atc: Generator
	) {
		/**
		 * EGLL Vectoring Area (Heathrow Director)
		 */
		this.atc.line(new Line([
			this.atc.beacon("BNN"),
			this.atc.beacon("BNN").bearingIntersection(115, this.atc.beacon("LAM"), 270),
			this.atc.beacon("LAM"),
			this.atc.runway("lc").position.destination(this.atc.runway("lc").heading, this.atc.runway("lc").length * Fix.FT / Fix.NMI / 2),
			this.atc.beacon("BIG"),
			this.atc.beacon("OCK"),
			this.atc.beacon("OCK").destination(270, 18),
			this.atc.beacon("OCK")
				.destination(270, 18)
				.destination(337, 7),
			this.atc.beacon("OCK")
				.destination(270, 18)
				.destination(337, 7)
				.destination(360, 7.5),
			this.atc.beacon("BNN"),
		]);

		// London CTR TMZ
		this.atc.line(
			new Line([
				new Fix(51.606291, -0.693555),
				new Fix(51.606291, -0.217152),
			])
				.join(Circle.from(
						new Fix(51.606291, -0.217152),
						new Fix(51.581710, -0.187025),
						new Fix(51.336537, -0.214834),
						75
					).cutoff(f => f.latitude <= 51.606291 && f.longitude >= -.217152)
				)
				.join((new Line([
						new Fix(51.336537, -0.214834),
						new Fix(51.336537, -0.631714),
						new Fix(51.353130, -0.713382),
					]))
				)
				.join(Circle.from(
						new Fix(51.353130, -0.713382),
						new Fix(51.468232, -0.773377),
						new Fix(51.606291, -0.693555),
						75
					).cutoff(f => f.latitude <= 51.606291 && f.latitude >= 51.353130 && f.longitude <= -0.693555)
							.append(new Fix(51.606291, -0.693555))
				)
		);

		// London City CTA (D)
		this.atc.line(
			new Line([
				new Fix(51.599147, -0.208225),
				new Fix(51.587176, 0.172005),
			]).join(
				Circle.from(
					new Fix(51.587176, 0.172005),
					new Fix(51.497843, 0.230026),
					new Fix(51.419764, 0.159473),
					75
				).cutoff(f => f.latitude <= 51.587176 && f.longitude >= 0.1594)
					  .append(new Fix(51.419764, 0.159473))
			).join(
				new Line([
					new Fix(51.419764, 0.159473),
					new Fix(51.429063, -0.139818),
				])
			)
		);

		// London City CTR (D)
		this.atc.line(
			new Line([
				new Fix(51.581710, -0.187025),
				new Fix(51.571735, 0.139732),
			]).join(
				Circle.from(
					new Fix(51.571735, 0.139732),
					new Fix(51.502545, 0.189857),
					new Fix(51.437531, 0.131149),
					75
				)
					  .cutoff(f => f.latitude <= 51.571735 && f.longitude >= 0.131149)
			).join(new Line([
				new Fix(51.437531, 0.131149),
				new Fix(51.445449, -0.134926),
			]))
		);
	}

	public async coastline() {
		// Great Britain coastline
		this.atc.line(
			...Line.fromGeoJSON(
				JSON.parse(await fs.readFile("./coastline/gb.geojson", "utf8")),
				Line.ColourType.COAST
			)
		);
	}
}
