import Generator from "../../src/Generator.js";
import Fix from "../../src/Fix.js";
import Line from "../../src/Line.js";
import Circle from "../../src/Circle.js";
import fs from "node:fs/promises";
import {Area} from "../../src/Area.js";
import Polygon from "../../src/Polygon.js";

export default class AirspaceLines {
	protected readonly gen = Generator.getInstance();
	public constructor() {
		/**
		 * EGLL Vectoring Area (Heathrow Director)
		 */
		this.gen.line(new Line([
			this.gen.beacon("BNN"),
			this.gen.beacon("BNN")
				.bearingIntersection(
					115, this.gen.beacon("LAM"), 270
				),
			this.gen.beacon("LAM"),
			this.gen.runway("lc").position
				.destination(
					this.gen.runway("lc").heading,
					this.gen.runway("lc").length * Fix.FT / Fix.NMI / 2
				),
			this.gen.beacon("BIG"),
			this.gen.beacon("OCK"),
			this.gen.beacon("OCK")
				.destination(270, 18),
			this.gen.beacon("OCK")
				.destination(270, 18)
				.destination(337, 7),
			this.gen.beacon("OCK")
				.destination(270, 18)
				.destination(337, 7)
				.destination(360, 7.5),
			this.gen.beacon("BNN"),
		]));

		// London CTR TMZ
		const LondonCTRTMZ = new Line([
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
			);

		this.gen.area(
			new Area<Polygon>(
				null,
				2500,
				new Fix(51.4431, -0.47),
				LondonCTRTMZ,
				LondonCTRTMZ.vertices.length
			)
		);
		this.gen.line(LondonCTRTMZ);

		this.gen.line(new Line([
			new Fix(51.353130, -0.713382),
			new Fix(51.393422, -0.919590),
			new Fix(51.568854, -0.921907),
			new Fix(51.5854, -0.8835),
			new Fix(51.589976, -0.818310),
			new Fix(51.611514, -0.768185),
			new Fix(51.6459, -0.7401),
		], [0x30, 0x30, 0x30]));

		// London City CTA (D)
		this.gen.line(
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
		const LondonCityCTRD = new Line([
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
		]));

		this.gen.area(new Area<Polygon>(
			"LC",
			2500,
			new Fix(51.555, 0.025),
			LondonCityCTRD,
			LondonCityCTRD.vertices.length
		));
		this.gen.line(LondonCityCTRD);

		// Gatwick CTA (D)
		this.gen.line(
			new Line([
				Fix.fromDMS("510100N", "0000458E"),
				Fix.fromDMS("510100N", "0002545W"),
			], Line.ColourType.AIRSPACE)
				.join(new Circle(
					Fix.fromDMS("510853N", "0001125W"),
					12 * Fix.NMI,
					72
				).arc(
					Fix.fromDMS("510100N", "0002545W"),
					Fix.fromDMS("511124N", "0003003W")
				))
				.append(Fix.fromDMS("511618N", "0000533E"))
				.join(new Circle(
					Fix.fromDMS("510853N", "0001125W"),
					13 * Fix.NMI,
					72
				).arc(
					Fix.fromDMS("511618N", "0000533E"),
					Fix.fromDMS("510100N", "0000458E")
				))
				.append(Fix.fromDMS("510100N", "0000458E"))
		);

		// Gatwick CTR (D)
		const GatwickCTRD = new Line([
			Fix.fromDMS("511258N", "0001129W"),
			Fix.fromDMS("511200N", "0000341E")
		], [0x30, 0x30, 0x30])
			.join(new Circle(
				Fix.fromDMS("510853N", "0001125W"),
				10 * Fix.NMI,
				72
			).arc(
				Fix.fromDMS("511200N", "0000341E"),
				Fix.fromDMS("510550N", "0000342E"),
			))
			.append(Fix.fromDMS("510240N", "0001923W"))
			.join(new Circle(
				Fix.fromDMS("510853N", "0001125W"),
				8 * Fix.NMI,
				72
			).arc(
				Fix.fromDMS("510240N", "0001923W"),
				Fix.fromDMS("511118N", "0002332W")
			))
			.append(Fix.fromDMS("511258N", "0001129W"));

		this.gen.area(new Area(
			"KK",
			2500,
			new Fix(51.13, -.214),
			GatwickCTRD,
			GatwickCTRD.vertices.length
		));
		this.gen.line(GatwickCTRD);

		// Luton CTR (D)
		const LutonCTRD = new Line([
			new Fix(51.846596, -0.160847),
			new Fix(51.813497, -0.248909),
			new Fix(51.756153, -0.586567),
			new Fix(51.820607, -0.615406),
			new Fix(51.841505, -0.494041),
			new Fix(51.960558, -0.359802),
			new Fix(51.980440, -0.241013),
		], [0x30, 0x30, 0x30]).join(Circle.from(
				new Fix(51.980440, -0.241013),
				this.gen.runway("gw").position.destination(this.gen.runway("gw").reverseLocalizer, 7 + 1/3),
				new Fix(51.846596, -0.160847),
				75
			).cutoff(f => f.latitude <= 51.980440 && f.latitude >= 51.846596 && f.longitude >= -0.241013)
										  .append(new Fix(51.846596, -0.160847))
		);
		this.gen.area(new Area(
			"GW",
			3500,
			new Fix(51.855, -0.39),
			LutonCTRD,
			LutonCTRD.vertices.length
		));
		this.gen.line(LutonCTRD);

		// Luton CTA 1 (D)
		this.gen.line(new Line([
			new Fix(51.846596, -0.160847),
			new Fix(51.854867, -0.007210),
			new Fix(51.865521, -0.001287),
			new Fix(52.021365, 0.004292),
			new Fix(51.980440, -0.241013),
		], [0x30, 0x30, 0x30]));

		// Luton CTA 2 (D)
		this.gen.line(new Line([
			new Fix(51.756153, -0.586567),
			new Fix(51.741380, -0.672226),
			new Fix(51.805961, -0.701408),
			new Fix(51.820607, -0.615406),
		], [0x30, 0x30, 0x30]));

		// Luton CTA 3 (D)
		this.gen.line(new Line([
			new Fix(51.805961, -0.701408),
			new Fix(51.864620, -0.727158),
			new Fix(51.879352, -0.641670),
			new Fix(51.820607, -0.615406),
		], [0x30, 0x30, 0x30]));

		// Luton CTA 4 (D)
		this.gen.line(new Line([
			new Fix(51.805961, -0.701408),
			new Fix(51.786533, -0.813332),
			new Fix(51.848929, -0.826035),
			new Fix(51.864620, -0.727158),
		], [0x30, 0x30, 0x30]));

		// Luton CTA 5 (D)
		this.gen.line(new Line([
			new Fix(51.960558, -0.359802),
			new Fix(52.007287, -0.472069),
			new Fix(51.883326, -0.618324),
			new Fix(51.918809, -0.406752),
		], [0x30, 0x30, 0x30]));

		// Luton CTA 6 (D)
		this.gen.line(new Line([
			new Fix(51.883326, -0.618324),
			new Fix(51.879352, -0.641670),
			new Fix(51.916321, -0.729733),
			new Fix(52.054417, -0.578971),
			new Fix(52.007287, -0.472069),
		], [0x30, 0x30, 0x30]));

		// Luton CTA 7 (D)
		this.gen.line(new Line([
			new Fix(52.007287, -0.472069),
			new Fix(52.096646, -0.280151),
			new Fix(51.990536, -0.177069),
		], [0x30, 0x30, 0x30]));

		// Luton CTA 8 (D)
		this.gen.line(new Line([
			new Fix(51.864620, -0.727158),
			new Fix(51.916321, -0.729733),
		], [0x30, 0x30, 0x30]));

		// Luton CTA 9 (D)
		this.gen.line(new Line([
			new Fix(51.958654, -0.683041),
			new Fix(51.898741, -0.834618),
			new Fix(51.848929, -0.826035),
		], [0x30, 0x30, 0x30]));

		// Stansted CTR (D)
		const StanstedCTRD = new Line([
			new Fix(51.867270, 0.022402),
			new Fix(51.867270, 0.022402).destination(44, 12.4),
		], [0x30, 0x30, 0x30]).join(Circle.from(
				new Fix(51.867270, 0.022402).destination(44, 12.4),
				this.gen.runway("ss").position.destination(this.gen.runway("ss").reverseLocalizer, 7.3),
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
			this.gen.runway("ss").reverse().position.destination(this.gen.runway("ss").heading, 7.4),
			new Fix(51.758544, 0.217581),
			75
		).cutoff(f => f.latitude <= 51.867270 && f.longitude <= 0.217581)
					   .append(new Fix(51.867270, 0.022402)));
		this.gen.area(new Area(
			"SS",
			3500,
			new Fix(51.8697, 0.2598),
			StanstedCTRD,
			StanstedCTRD.vertices.length
		));
		this.gen.line(StanstedCTRD);

		// Stansted CTA 1 (D)
		this.gen.line(new Line([
			new Fix(51.867270, 0.022402).destination(44, 12.4),
			new Fix(52.083831, 0.361691),
		], [0x30, 0x30, 0x30]).join(
			Circle.from(
				new Fix(52.083831, 0.361691),
				this.gen.runway("ss").position.destination(this.gen.runway("ss").reverseLocalizer, 13),
				new Fix(51.973884, 0.556526),
				75
			).cutoff(f => f.latitude <= 52.083831 && f.latitude >= 51.973884 && f.longitude >= 0.361691)
		).join(new Line([
			new Fix(51.973884, 0.556526),
			new Fix(51.758544, 0.217581).destination(44, 12.4),
		])));

		// Stansted CTA 2 (D)
		this.gen.line(new Line([
			new Fix(51.758384, 0.217323),
			new Fix(51.690596, 0.109091),
		], [0x30, 0x30, 0x30]).join(
			Circle.from(
				new Fix(51.769115, -0.056992),
				this.gen.runway("ss").reverse().position.destination(this.gen.runway("ss").heading, 12.3),
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
		this.gen.line(Circle.from(
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
		this.gen.line(new Line([
			new Fix(52.021365, 0.004292),
			new Fix(52.083831, 0.361691),
		], [0x30, 0x30, 0x30]))

		// Southend CTR 1 (D)
		const SouthendCTR1 = new Line([
			Fix.fromDMS("513445N", "0002903E"),
			Fix.fromDMS("514206N", "0004521E"),
			Fix.fromDMS("513417N", "0005000E"),
			Fix.fromDMS("513151N", "0005000E"),
			Fix.fromDMS("512719N", "0003955E"),
			Fix.fromDMS("512701N", "0003630E"),
		], [0x30, 0x30, 0x30]).join(
			new Circle(
				Fix.fromDMS("513357N", "0004100E"),
				7.5 * Fix.NMI,
				50
			).cutoff(f =>
				f.longitude <= Fix.fromDMS("512701N", "0003630E").longitude
				&& f.latitude <= Fix.fromDMS("513445N", "0002903E").latitude
			).append(Fix.fromDMS("513445N", "0002903E"))
		);
		this.gen.area(new Area(
			"MC",
			3500,
			new Fix(51.625, 0.6356),
			SouthendCTR1,
			SouthendCTR1.vertices.length
		));
		this.gen.line(SouthendCTR1);

		// Southend CTR 2 (D)
		// 514206N 0004521E - 514312N 0004748E - 514138N 0005222E - 513618N 0005532E - 513417N 0005000E - 514206N 0004521E
		const SouthendCTR2 = new Line([
			Fix.fromDMS("514206N", "0004521E"),
			Fix.fromDMS("514312N", "0004748E"),
			Fix.fromDMS("514138N", "0005222E"),
			Fix.fromDMS("513618N", "0005532E"),
			Fix.fromDMS("513417N", "0005000E"),
		], [0x30, 0x30, 0x30]);
		this.gen.area(new Area(
			"MC",
			4500,
			new Fix(51.7, 0.795),
			SouthendCTR2,
			SouthendCTR2.vertices.length
		));
		this.gen.line(SouthendCTR2);

		// Southend CTR 3 (D)
		// 514138N 0005222E - 514057N 0005420E thence clockwise by the arc of a circle radius 10 NM centred on 513428N 0004207E to 513528N 0005805E - 513151N 0005000E - 513417N 0005000E - 513618N 0005532E - 514138N 0005222E
		const SouthendCTR3 = new Line([
			Fix.fromDMS("514138N", "0005222E"),
			Fix.fromDMS("514057N", "0005420E"),
		], [0x30, 0x30, 0x30]).join(
			new Circle(
				Fix.fromDMS("513428N", "0004207E"),
				10 * Fix.NMI,
				50
			).cutoff(f =>
				f.latitude <= Fix.fromDMS("514057N", "0005420E").latitude
				&& f.longitude >= Fix.fromDMS("514057N", "0005420E").longitude
				&& f.longitude <= Fix.fromDMS("513528N", "0005805E").longitude
				&& f.latitude >= Fix.fromDMS("513528N", "0005805E").latitude
			)
		).join(new Line([
			Fix.fromDMS("513528N", "0005805E"),
			Fix.fromDMS("513151N", "0005000E"),
		]));
		this.gen.area(new Area(
			"MC",
			5500,
			new Fix(51.58, 0.8527),
			SouthendCTR3.join(new Line([
				Fix.fromDMS("513417N", "0005000E"),
				Fix.fromDMS("513618N", "0005532E"),
				Fix.fromDMS("514138N", "0005222E")
			])),
			SouthendCTR3.vertices.length + 3
		));
		this.gen.line(SouthendCTR3);

		// Southend CTA 1 (D)
		this.gen.line(new Line([
			Fix.fromDMS("513437N", "0002440E"),
			Fix.fromDMS("514333N", "0004429E"),
			Fix.fromDMS("514206N", "0004521E"),
		], [0x30, 0x30, 0x30]));
		this.gen.line(new Line([
			Fix.fromDMS("513151N", "0005000E"),
			Fix.fromDMS("513000N", "0005000E"),
			Fix.fromDMS("512528N", "0003956E"),
			Fix.fromDMS("512446N", "0003202E"),
			Fix.fromDMS("512757N", "0002721E"),
			Fix.fromDMS("513146N", "0002401E"),
			Fix.fromDMS("513437N", "0002440E"),
		], [0x30, 0x30, 0x30]));

		// Southend CTA 2 (D)
		this.gen.line(new Line([
			Fix.fromDMS("514333N", "0004429E"),
			Fix.fromDMS("514420N", "0004614E"),
			Fix.fromDMS("514440N", "0005036E"),
			Fix.fromDMS("514431N", "0005038E"),
			Fix.fromDMS("514138N", "0005222E"),
		], [0x30, 0x30, 0x30]));

		// Southend CTA 3 (D)
		this.gen.line(new Line([
			Fix.fromDMS("514440N", "0005036E"),
			Fix.fromDMS("514446N", "0005158E"),
		], [0x30, 0x30, 0x30]).join(new Circle(
			Fix.fromDMS("513428N", "0004207E"),
			12 * Fix.NMI,
			50
		).cutoff(f =>
			f.longitude >= Fix.fromDMS("514446N", "0005158E").longitude
			&& f.latitude >= Fix.fromDMS("513504N", "0010120E").latitude
		)).join(new Line([
			Fix.fromDMS("513504N", "0010120E"),
			Fix.fromDMS("513000N", "0005000E"),
		])));

		// Southend CTA 4 (D)
		this.gen.line(new Line([
			Fix.fromDMS("513437N", "0002440E"),
			Fix.fromDMS("513943N", "0002551E"),
			Fix.fromDMS("514353N", "0003508E"),
			Fix.fromDMS("514435N", "0004406E"),
			Fix.fromDMS("514401N", "0004412E"),
			Fix.fromDMS("514333N", "0004429E"),
		], [0x30, 0x30, 0x30]));

		// Southend CTA 5 (D)
		this.gen.line(new Line([
			Fix.fromDMS("514435N", "0004406E"),
			Fix.fromDMS("514506N", "0004514E"),
			Fix.fromDMS("514530N", "0005026E"),
			Fix.fromDMS("514440N", "0005036E"),
		], [0x30, 0x30, 0x30]));

		// Southend CTA 6 (D)
		this.gen.line(new Line([
			Fix.fromDMS("514530N", "0005026E"),
			Fix.fromDMS("514551N", "0005510E"),
		], [0x30, 0x30, 0x30]).join(new Circle(
			Fix.fromDMS("513428N", "0004207E"),
			14 * Fix.NMI,
			50
		).cutoff(f =>
			f.longitude >= Fix.fromDMS("514551N", "0005510E").longitude
			&& f.latitude >= Fix.fromDMS("513653N", "0010414E").latitude
		)).join(new Line([
			Fix.fromDMS("513653N", "0010414E"),
			Fix.fromDMS("513535N", "0010117E"),
		])));

		// Southend CTA 7 (D)
		this.gen.line(new Line([
			Fix.fromDMS("513000N", "0005000E"),
			Fix.fromDMS("512120N", "0005000E"),
			Fix.fromDMS("512046N", "0003338E"),
			Fix.fromDMS("512757N", "0002721E"),
		], [0x30, 0x30, 0x30]));

		// Southend CTA 8 (D)
		this.gen.line(new Line([
			Fix.fromDMS("512829N", "0005000E"),
			Fix.fromDMS("512555N", "0005625E"),
			Fix.fromDMS("512124N", "0005144E"),
			Fix.fromDMS("512120N", "0005000E"),
		], [0x30, 0x30, 0x30]));

		// Southend CTA 9 (D)
		this.gen.line(new Line([
			Fix.fromDMS("514506N", "0004514E"),
			Fix.fromDMS("514716N", "0005005E"),
			Fix.fromDMS("514530N", "0005026E"),
		], [0x30, 0x30, 0x30]));

		// Southend CTA 10 (D)
		this.gen.line(new Line([
			Fix.fromDMS("514716N", "0005005E"),
			Fix.fromDMS("515032N", "0005922E"),
			Fix.fromDMS("515158N", "0011450E"),
			Fix.fromDMS("514921N", "0012014E"),
			Fix.fromDMS("514212N", "0012127E"),
			Fix.fromDMS("513836N", "0011744E"),
			Fix.fromDMS("513751N", "0010627E"),
			Fix.fromDMS("513653N", "0010414E"),
		], [0x30, 0x30, 0x30]));

		// LTMA 23 (A) / LTMA 11 (A)
		this.gen.line(new Line([
			new Fix(51.569281, -1.195107),
			new Fix(51.406274, -1.246605),
		], [0x30, 0x30, 0x30]));

		// LTC boundary
		this.gen.line(new Line([
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

	public async withCoastline() {
		// Great Britain coastline
		this.gen.line(
			...Line.fromGeoJSON(
				JSON.parse(await fs.readFile("./coastline/gb.geojson", "utf8")),
				Line.ColourType.COAST
			)
				// ignore islands etc. north of 52.5, west of -2
				   .filter(line => !line.vertices.every(fix => fix.latitude > 52.5 || fix.longitude < -2))
		);
	}
}
