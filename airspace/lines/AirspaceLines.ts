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
			this.atc.beacon("BNN")
				.bearingIntersection(
					115, this.atc.beacon("LAM"), 270
				),
			this.atc.beacon("LAM"),
			this.atc.runway("lc").position
				.destination(
					this.atc.runway("lc").heading,
					this.atc.runway("lc").length * Fix.FT / Fix.NMI / 2
				),
			this.atc.beacon("BIG"),
			this.atc.beacon("OCK"),
			this.atc.beacon("OCK")
				.destination(270, 18),
			this.atc.beacon("OCK")
				.destination(270, 18)
				.destination(337, 7),
			this.atc.beacon("OCK")
				.destination(270, 18)
				.destination(337, 7)
				.destination(360, 7.5),
			this.atc.beacon("BNN"),
		]));

		// London CTR TMZ
		this.atc.line(
			new Line([
				new Fix(51.606291, -0.693555),
				new Fix(51.606291, -0.217152),
			], [0x30, 0x30, 0x30])
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
		this.atc.line(new Line([
			new Fix(51.353130, -0.713382),
			new Fix(51.393422, -0.919590),
			new Fix(51.568854, -0.921907),
			new Fix(51.5854, -0.8835),
			new Fix(51.589976, -0.818310),
			new Fix(51.611514, -0.768185),
			new Fix(51.6459, -0.7401),
		], [0x30, 0x30, 0x30]));

		// London City CTA (D)
		this.atc.line(
			new Line([
				new Fix(51.599147, -0.208225),
				new Fix(51.587176, 0.172005),
			], [0x30, 0x30, 0x30]).join(
				Circle.from(
					new Fix(51.587176, 0.172005),
					new Fix(51.497843, 0.230026),
					new Fix(51.419764, 0.159473),
					75
				).cutoff(f => f.latitude <= 51.587176 && f.longitude >= 0.1594)
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
			], [0x30, 0x30, 0x30]).join(
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

		// Gatwick CTA (D)
		this.atc.line(
			new Line([
				new Fix(51.188489, -0.489750),
				new Fix(51.269380, 0.099134),
			], [0x30, 0x30, 0x30]).join(
				Circle.from(
					new Fix(51.016131, 0.088921),
					new Fix(51.197418, 0.150375),
					new Fix(51.269648, 0.099220),
					75
				).cutoff(f => f.latitude <= 51.269648 && f.longitude >= 0.099220)
			).join(new Line([
				new Fix(51.016131, 0.088921),
				new Fix(51.016131, -0.418510),
			])).join(Circle.from(
				new Fix(51.188489, -0.489750),
				new Fix(51.128307, -0.496616),
				new Fix(51.016131, -0.418510),
				75
			).cutoff(f => f.latitude <= 51.188489 && f.longitude <= -0.418510))
		);

		// Gatwick CTR (D)
		this.atc.line(
			new Line([
				new Fix(51.186875, -0.382290),
				new Fix(51.214089, -0.183163),
				new Fix(51.197849, 0.068150),
			], [0x30, 0x30, 0x30]).join(Circle.from(
				new Fix(51.197849, 0.068150),
				new Fix(51.166697, 0.080509),
				new Fix(51.096030, 0.068493),
				75
			).cutoff(f => f.latitude <= 51.197849 && f.longitude >= 0.068493))
				.join(new Line([
					new Fix(51.096030, 0.068493),
					new Fix(51.043660, -0.312767),
				]))
				.join(Circle.from(
					new Fix(51.186875, -0.382290),
					new Fix(51.067075, -0.350361),
					new Fix(51.043660, -0.312767),
					75
				).cutoff(f => f.latitude <= 51.186875 && f.longitude <= -0.312767)
					.append(new Fix(51.186875, -0.382290))
				)
		);

		// Luton CTR (D)
		this.atc.line(
			new Line([
				new Fix(51.846596, -0.160847),
				new Fix(51.813497, -0.248909),
				new Fix(51.756153, -0.586567),
				new Fix(51.820607, -0.615406),
				new Fix(51.841505, -0.494041),
				new Fix(51.960558, -0.359802),
				new Fix(51.980440, -0.241013),
			], [0x30, 0x30, 0x30]).join(Circle.from(
				new Fix(51.980440, -0.241013),
				this.atc.runway("gw").position.destination(this.atc.runway("gw").reverseLocalizer, 7 + 1/3),
				new Fix(51.846596, -0.160847),
				75
			).cutoff(f => f.latitude <= 51.980440 && f.latitude >= 51.846596 && f.longitude >= -0.241013)
				.append(new Fix(51.846596, -0.160847))
			)
		)

		// LTC boundary
		this.atc.line(new Line([
				new Fix(50.668994, -0.373578),
				new Fix(50.669484, 0.500093),
				new Fix(50.755138, 0.750332),
				new Fix(50.979723, 1.040440),
				new Fix(51.649981, 1.416721),
				new Fix(51.873206, 1.443844),
				new Fix(51.984880, 1.384964),
				new Fix(51.930718, 1.118546),
				new Fix(51.970183, 0.964737),
				new Fix(52.207501, 0.806808),
				new Fix(52.186037, 0.546227),
				new Fix(52.191404, -0.371819),
				new Fix(52.054417, -0.578971),
				new Fix(52.071910, -0.619354),
				new Fix(51.960029, -1.190300),
				new Fix(51.735906, -1.014090),
				new Fix(51.569281, -1.195107),
				new Fix(51.597868, -1.432171),
				new Fix(51.434748, -1.482811),
				new Fix(51.392351, -1.142578),
				new Fix(51.055963, -1.222057),
				new Fix(51.068639, -1.118717),
				new Fix(50.908554, -1.063185),
				new Fix(50.823180, -1.285658),
				new Fix(50.813935, -0.873585),
				new Fix(50.773922, -0.830669),
				new Fix(50.775224, -0.487432),
			],
			[0x22, 0x22, 0x22]
		));
	}

	public async coastline() {
		// Great Britain coastline
		this.atc.line(
			...Line.fromGeoJSON(
				JSON.parse(await fs.readFile("./coastline/gb.geojson", "utf8")),
				Line.ColourType.COAST
			)
				// ignore islands etc. north of 52.5, west of -2
				   .filter(line => !line.vertices.every(fix => fix.latitude > 52.5 || fix.longitude < -2))
		);
	}
}
