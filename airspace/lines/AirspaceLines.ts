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
		);

		// London CTA 1 (D)
		this.atc.line(new Line([
			new Fix(51.846596, -0.160847),
			new Fix(51.854867, -0.007210),
			new Fix(51.865521, -0.001287),
			new Fix(52.021365, 0.004292),
			new Fix(51.980440, -0.241013),
		], [0x30, 0x30, 0x30]));

		// London CTA 2 (D)
		this.atc.line(new Line([
			new Fix(51.756153, -0.586567),
			new Fix(51.741380, -0.672226),
			new Fix(51.805961, -0.701408),
			new Fix(51.820607, -0.615406),
		], [0x30, 0x30, 0x30]));

		// London CTA 3 (D)
		this.atc.line(new Line([
			new Fix(51.805961, -0.701408),
			new Fix(51.864620, -0.727158),
			new Fix(51.879352, -0.641670),
			new Fix(51.820607, -0.615406),
		], [0x30, 0x30, 0x30]));

		// London CTA 4 (D)
		this.atc.line(new Line([
			new Fix(51.805961, -0.701408),
			new Fix(51.786533, -0.813332),
			new Fix(51.848929, -0.826035),
			new Fix(51.864620, -0.727158),
		], [0x30, 0x30, 0x30]));

		// London CTA 5 (D)
		this.atc.line(new Line([
			new Fix(51.960558, -0.359802),
			new Fix(52.007287, -0.472069),
			new Fix(51.883326, -0.618324),
			new Fix(51.918809, -0.406752),
		], [0x30, 0x30, 0x30]));

		// London CTA 6 (D)
		this.atc.line(new Line([
			new Fix(51.883326, -0.618324),
			new Fix(51.879352, -0.641670),
			new Fix(51.916321, -0.729733),
			new Fix(52.054417, -0.578971),
			new Fix(52.007287, -0.472069),
		], [0x30, 0x30, 0x30]));

		// London CTA 7 (D)
		this.atc.line(new Line([
			new Fix(52.007287, -0.472069),
			new Fix(52.096646, -0.280151),
			new Fix(51.990536, -0.177069),
		], [0x30, 0x30, 0x30]));

		// London CTA 8 (D)
		this.atc.line(new Line([
			new Fix(51.864620, -0.727158),
			new Fix(51.916321, -0.729733),
		], [0x30, 0x30, 0x30]));

		// London CTA 9 (D)
		this.atc.line(new Line([
			new Fix(51.958654, -0.683041),
			new Fix(51.898741, -0.834618),
			new Fix(51.848929, -0.826035),
		], [0x30, 0x30, 0x30]));

		// Stansted CTR (D)
		this.atc.line(new Line([
			new Fix(51.867270, 0.022402),
			new Fix(51.867270, 0.022402).destination(44, 12.4),
		], [0x30, 0x30, 0x30]).join(Circle.from(
				new Fix(51.867270, 0.022402).destination(44, 12.4),
				this.atc.runway("ss").position.destination(this.atc.runway("ss").reverseLocalizer, 7.3),
				new Fix(51.758544, 0.217581).destination(44, 12.4),
				75
			).cutoff(f =>
				f.latitude <= new Fix(51.867270, 0.022402).destination(44, 12.4).latitude
				&& f.latitude >= new Fix(51.758544, 0.217581).destination(44, 12.4).latitude
				&& f.longitude >= new Fix(51.867270, 0.022402).destination(44, 12.4).longitude)
		).join(new Line([
			new Fix(51.758544, 0.217581).destination(44, 12.4),
			new Fix(51.758544, 0.217581),
		])).join(Circle.from(
			new Fix(51.867270, 0.022402),
			this.atc.runway("ss").reverse().position.destination(this.atc.runway("ss").heading, 7.4),
			new Fix(51.758544, 0.217581),
			75
		).cutoff(f => f.latitude <= 51.867270 && f.longitude <= 0.217581)
					   .append(new Fix(51.867270, 0.022402))));

		// Stansted CTA 1 (D)
		this.atc.line(new Line([
			new Fix(51.867270, 0.022402).destination(44, 12.4),
			new Fix(52.083831, 0.361691),
		], [0x30, 0x30, 0x30]).join(
			Circle.from(
				new Fix(52.083831, 0.361691),
				this.atc.runway("ss").position.destination(this.atc.runway("ss").reverseLocalizer, 13),
				new Fix(51.973884, 0.556526),
				75
			).cutoff(f => f.latitude <= 52.083831 && f.latitude >= 51.973884 && f.longitude >= 0.361691)
		).join(new Line([
			new Fix(51.973884, 0.556526),
			new Fix(51.758544, 0.217581).destination(44, 12.4),
		])));

		// Stansted CTA 2 (D)
		this.atc.line(new Line([
			new Fix(51.758384, 0.217323),
			new Fix(51.690596, 0.109091),
		], [0x30, 0x30, 0x30]).join(
			Circle.from(
				new Fix(51.769115, -0.056992),
				this.atc.runway("ss").reverse().position.destination(this.atc.runway("ss").heading, 12.3),
				new Fix(51.690596, 0.109091),
				75
			).cutoff(f => f.latitude <= 51.769115 && f.longitude <= 0.109091)
		).join(new Line([
			new Fix(51.769115, -0.056992),
			new Fix(51.854867, -0.007210),
			new Fix(51.865521, -0.001287),
			new Fix(51.867270, 0.022402),
		], [0x30, 0x30, 0x30])));

		// Stansted CTA 3 (D)
		this.atc.line(Circle.from(
				new Fix(51.973884, 0.556526),
				new Fix(51.923097, 0.581589),
				new Fix(51.900223, 0.586395),
				75,
				[0x30, 0x30, 0x30]
			).cutoff(f => f.latitude <= 51.973884 && f.latitude >= 51.900223 && f.longitude >= 0.556526)
							.prepend(new Fix(51.973884, 0.556526)
							)
							.join(new Line([
								new Fix(51.900223, 0.586395),
								new Fix(51.900223, 0.586395).destination(225, 11.2),
								new Fix(51.758384, 0.217323),
							], [0x30, 0x30, 0x30]))
		);

		// Stansted CTA 4 (D)
		this.atc.line(new Line([
			new Fix(52.021365, 0.004292),
			new Fix(52.083831, 0.361691),
		], [0x30, 0x30, 0x30]))

		// LTMA 23 (A) / LTMA 11 (A)
		this.atc.line(new Line([
			new Fix(51.569281, -1.195107),
			new Fix(51.406274, -1.246605),
		], [0x30, 0x30, 0x30]));

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
