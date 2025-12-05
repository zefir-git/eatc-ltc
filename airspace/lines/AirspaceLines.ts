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
        this.gen.area(new Area(
            "KK",
            2500,
            new Fix(51.0650, 0.0100),
            new Line([
                Fix.fromDMS("510100N", "0000458E"),
                Fix.fromDMS("510100N", "0002545W"),
            ])
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
                .append(Fix.fromDMS("510100N", "0000458E")),
        ));

		// Gatwick CTR (D)
		this.gen.line(new Line([
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
            .append(Fix.fromDMS("511258N", "0001129W")));

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

        // London TMA 1 (A)
        this.aipLine(`LONDON TMA 1

513451N 0005516W -
513515N 0004901W -
513632N 0004606W -
514226N 0004110W -
514409N 0004005W -
514830N 0001506W -
515102N 0000030W -
515146N 0000006W -
515155N 0000120E thence anti-clockwise by the arc of a circle radius 8 NM centred on 515306N 0001406E to
514508N 0001309E -
514556N 0002309E -
513908N 0001416E -
513430N 0002136E -
512046N 0003338E -
511621N 0003054E -
511217N 0002018E -
510002N 0001541E -
505900N 0001333E -
505541N 0001007W -
505832N 0003428W -
510832N 0004055W -
511014N 0003325W -
512035N 0003959W -
512103N 0004236W thence clockwise by the arc of a circle radius 12 NM centred on 512812N 0002713W to
512112N 0004247W -
512108N 0004300W -
512335N 0005516W -
513451N 0005516W

Upper limit: FL195

Lower limit: 2500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 3

520608N 0001350E -
520606N 0002550E -
520226N 0004040E -
514401N 0004412E -
513417N 0005000E -
512120N 0005000E -
510906N 0004618E -
510051N 0002141E -
510426N 0001721E -
511217N 0002018E -
511621N 0003054E -
512046N 0003338E -
513430N 0002136E -
513908N 0001416E -
514556N 0002309E -
514508N 0001309E thence clockwise by the arc of a circle radius 8 NM centred on 515306N 0001406E to
515155N 0000120E -
515146N 0000006W -
515102N 0000030W -
514830N 0001506W -
514409N 0004005W -
514226N 0004110W -
513632N 0004606W -
513515N 0004901W -
514021N 0004916W -
514542N 0005550W -
515021N 0002931W -
515743N 0002145W -
520300N 0000907E -
520608N 0001350E

Upper limit: FL195

Lower limit: 3500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 4

512430N 0010000W -
513433N 0010000W -
513451N 0005516W -
512335N 0005516W -
512108N 0004300W -
512112N 0004247W thence anti-clockwise by the arc of a circle radius 12 NM centred on 512812N 0002713W to
512103N 0004236W -
512035N 0003959W -
511014N 0003325W -
510832N 0004055W -
505832N 0003428W -
505739N 0004104W -
505728N 0004224W -
510652N 0004829W -
511035N 0005054W -
511705N 0005508W -
512430N 0010000W

Upper limit: FL195

Lower limit: 3500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 5

513451N 0005516W -
514457N 0010000W -
514542N 0005550W -
514021N 0004916W -
513515N 0004901W -
513451N 0005516W

Upper limit: FL195

Lower limit: 4500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 6

520606N 0001712W -
520608N 0001350E -
520300N 0000907E -
515743N 0002145W -
520038N 0002832W -
520606N 0001712W

Upper limit: FL195

Lower limit: 4500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 7

514401N 0004412E -
520226N 0004040E -
520045N 0004724E -
514431N 0005038E -
513618N 0005532E -
513417N 0005000E -
514401N 0004412E

Upper limit: FL195

Lower limit: 4500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 8

520045N 0004724E -
515548N 0010705E -
515904N 0012302E -
515222N 0012635E -
513905N 0012500E -
512247N 0011549E -
505842N 0010227E -
504507N 0004500E -
504000N 0003000E following the line of latitude to -
504000N 0002220W -
505500N 0003814W following the line of latitude to -
505500N 0002256W -
505429N 0002115W -
505157N 0000418W -
510906N 0004618E -
512120N 0005000E -
512829N 0005000E -
513417N 0005000E -
513618N 0005532E -
514431N 0005038E -
520045N 0004724E

Upper limit: FL195

Lower limit: 5500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 9

521104N 0002159W -
521104N 0000528E -
520606N 0002550E -
520606N 0001712W -
521104N 0002159W

Upper limit: FL195

Lower limit: 5500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 10

514457N 0010000W -
513451N 0005516W -
513433N 0010000W -
513302N 0010000W -
513423N 0011138W -
514457N 0010000W

Upper limit: FL195

Lower limit: 5500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 11

513423N 0011138W -
513302N 0010000W -
512430N 0010000W -
511705N 0005508W thence anti-clockwise by the arc of a circle radius 4.7168 NM centred on 511256N 0005136W to
511535N 0005748W -
511956N 0010918W -
512348N 0010822W -
512435N 0011444W -
513423N 0011138W

Upper limit: FL195

Lower limit: 4500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 13

511956N 0010918W -
511535N 0005748W thence clockwise by the arc of a circle radius 4.7168 NM centred on 511256N 0005136W to
511705N 0005508W -
510652N 0004829W -
510602N 0005439W -
505616N 0005119W -
505512N 0005908W -
505119N 0005457W -
504848N 0005214W -
504928N 0011714W -
505435N 0010335W -
510420N 0010657W -
510329N 0011312W -
511956N 0010918W

Upper limit: FL195

Lower limit: 5500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 14

505739N 0004104W -
505832N 0003428W -
505500N 0002256W -
505500N 0003814W -
505739N 0004104W

Upper limit: FL195

Lower limit: 5000 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 16

520548N 0002701E -
520713N 0005149E -
520024N 0004848E -
520548N 0002701E

Upper limit: FL195

Lower limit: 5500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 17

520024N 0004848E -
520713N 0005149E -
515806N 0005800E -
520024N 0004848E

Upper limit: FL195

Lower limit: FL75

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 18

520548N 0002701E -
521104N 0000528E -
521104N 0003242E -
521221N 0004819E -
520713N 0005149E -
520548N 0002701E

Upper limit: FL195

Lower limit: FL75

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 19

515745N 0011126W -
520421N 0003712W -
520316N 0003441W -
521126N 0002220W -
520606N 0001712W -
520038N 0002832W -
515743N 0002145W -
515021N 0002931W -
514457N 0010000W -
514420N 0010041W -
515745N 0011126W

Upper limit: FL195

Lower limit: 5500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 20

510426N 0001721E -
510051N 0002141E -
505157N 0000418W -
505429N 0002115W -
505832N 0003428W -
505541N 0001007W -
505900N 0001333E -
510002N 0001541E -
510426N 0001721E

Upper limit: FL195

Lower limit: 4500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 21

505739N 0004104W -
504626N 0002908W -
504626N 0004942W -
504848N 0005214W -
505119N 0005457W -
505512N 0005908W -
505616N 0005119W -
505728N 0004224W -
505739N 0004104W

Upper limit: FL195

Lower limit: FL65

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 23

513607N 0012547W -
513423N 0011138W -
512435N 0011444W -
512619N 0012850W -
513607N 0012547W

Upper limit: FL195

Lower limit: 5500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        this.aipLine(`LONDON TMA 24

510652N 0004829W -
505728N 0004224W -
505616N 0005119W -
510602N 0005439W -
510652N 0004829W

Upper limit: FL195

Lower limit: 4500 FT ALT

Class: A`, [0x14, 0x14, 0x14]);

        // DAVENTRY CTA 5 (A)
        this.gen.line(new Line([
            Fix.fromDMS("521222N", "0005608W"),
            Fix.fromDMS("520843N", "0010339W"),
            Fix.fromDMS("520428N", "0012245W"),
            Fix.fromDMS("515745N", "0011126W"),
            Fix.fromDMS("520421N", "0003712W"),
            Fix.fromDMS("521222N", "0005608W"),
        ], [0x22, 0x22, 0x22]));

        // DAVENTRY CTA 13 (A)
        this.gen.line(new Line([
            Fix.fromDMS("523406N", "0011224W"),
            Fix.fromDMS("521118N", "0003323W"),
            Fix.fromDMS("521002N", "0002427W"),
            Fix.fromDMS("520316N", "0003441W"),
            Fix.fromDMS("521403N", "0010009W"),
            Fix.fromDMS("523406N", "0011224W"),
        ], [0x22, 0x22, 0x22]));

        // DAVENTRY CTA 25 (C)
        this.gen.line(new Line([
            Fix.fromDMS("521658N", "0002741W"),
            Fix.fromDMS("521126N", "0002220W"),
            Fix.fromDMS("521002N", "0002427W"),
            Fix.fromDMS("521118N", "0003323W"),
            Fix.fromDMS("521332N", "0002806W"),
            Fix.fromDMS("521658N", "0002741W"),
        ], [0x22, 0x22, 0x22]));

        // DAVENTRY CTA 21 (C)
        this.gen.line(new Line([
            Fix.fromDMS("522632N", "0003702W"),
            Fix.fromDMS("522627N", "0001416W"),
            Fix.fromDMS("521855N", "0000659W"),
            Fix.fromDMS("521832N", "0000507W"),
            Fix.fromDMS("521126N", "0002220W"),
            Fix.fromDMS("521658N", "0002741W"),
            Fix.fromDMS("522632N", "0003702W"),
        ], [0x22, 0x22, 0x22]));

        // CLACTON CTA 10 (C)
        this.gen.line(new Line([
            Fix.fromDMS("521832N", "0000507W"),
            Fix.fromDMS("521802N", "0000240W"),
            Fix.fromDMS("521712N", "0000935E"),
            Fix.fromDMS("521105N", "0001412E"),
            Fix.fromDMS("521104N", "0000528E"),
            Fix.fromDMS("521104N", "0002159W"),
            Fix.fromDMS("521126N", "0002220W"),
            //Fix.fromDMS("521832N", "0000507W"),
        ], [0x22, 0x22, 0x22]));

        // CLACTON CTA 3 (A)
        this.gen.line(new Line([
            Fix.fromDMS("521032N", "0010200E"),
            Fix.fromDMS("520707N", "0011236E"),
            Fix.fromDMS("515808N", "0011829E"),
            Fix.fromDMS("515548N", "0010705E"),
            Fix.fromDMS("515806N", "0005800E"),
            Fix.fromDMS("520839N", "0005047E"),
            Fix.fromDMS("521032N", "0010200E"),
        ], [0x22, 0x22, 0x22]));

		// WORTHING CTA 1 (A)
		this.gen.line(new Line([
            Fix.fromDMS("512247N", "0011549E"),
            Fix.fromDMS("512130N", "0012140E"),
            Fix.fromDMS("512106N", "0013052E"),
            Fix.fromDMS("512053N", "0013611E"),
            Fix.fromDMS("511826N", "0013519E"),
            Fix.fromDMS("511929N", "0013040E"),
            Fix.fromDMS("511422N", "0013004E"),
            Fix.fromDMS("510600N", "0014138E"),
            Fix.fromDMS("510354N", "0014545E"),
            Fix.fromDMS("510000N", "0012800E"),
            Fix.fromDMS("505842N", "0010227E"),
            Fix.fromDMS("512247N", "0011549E"),
        ], [0x22, 0x22, 0x22]));

		// CLACTON CTA 7 (A)
		this.gen.line(new Line([
            Fix.fromDMS("515222N", "0012635E"),
            Fix.fromDMS("515220N", "0021737E"),
            Fix.fromDMS("513000N", "0020000E"),
            Fix.fromDMS("512922N", "0020000E"),
            Fix.fromDMS("513024N", "0013733E"),
            Fix.fromDMS("512708N", "0013826E"),
            Fix.fromDMS("512053N", "0013611E"),
            Fix.fromDMS("512106N", "0013052E"),
            Fix.fromDMS("512130N", "0012140E"),
            Fix.fromDMS("512247N", "0011549E"),
            Fix.fromDMS("513905N", "0012500E"),
            Fix.fromDMS("515222N", "0012635E"),
        ], [0x22, 0x22, 0x22]));
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

    private aipLine(aip: string, colour?: Line.Colour) {
        this.gen.line(AirspaceLines.fromAIP(aip, colour));
    }

    private static fromAIP(aip: string, colour?: Line.Colour): Line {
        const lines = aip.split("\n").map(l => l.trim());
        let lineObj: Line | null = null;
        let lastFix: Fix | null = null;

        for (let i = 0; i < lines.length; ++i) {
            const line = lines[i]!;

            const dmsMatch = line.match(/^(\d{6}[NS]) (\d{6,}[EW])/);
            if (!dmsMatch) continue;

            const fix = Fix.fromDMS(dmsMatch[1]!, dmsMatch[2]!);
            if (!lineObj) lineObj = new Line([fix], colour);
            else lineObj = lineObj.append(fix);
            lastFix = fix;

            const arcMatch = line.match(/thence (clockwise|anti-clockwise) by the arc of a circle radius (\d(?:\.\d+)+) NM centred on (\d{6}[NS]) (\d{6,}[EW]) to/);
            if (arcMatch) {
                if (!lastFix) throw new Error("Arc found without a previous fix");

                const direction = arcMatch[1]!;
                const radius = Number.parseFloat(arcMatch[2]!) * Fix.NMI;
                const center = Fix.fromDMS(arcMatch[3]!, arcMatch[4]!);

                const destLine = lines[++i]!;
                const destMatch = destLine.match(/^(\d{6}[NS]) (\d{6,}[EW])(?:\s*-\s*)?$/);
                if (!destMatch) throw new Error("Expected destination after arc");
                const dest = Fix.fromDMS(destMatch[1]!, destMatch[2]!);

                const circle = new Circle(center, radius, 50);
                if (direction === "clockwise") {
                    lineObj = lineObj!.join(circle.arc(lastFix, dest));
                } else {
                    lineObj = lineObj!.join(circle.arcACW(lastFix, dest));
                }

                lineObj.append(dest);
                lastFix = dest;
                continue;
            }

            void 0;
        }

        if (!lineObj) throw new Error("No line generated from AIP");
        return lineObj;
    }
}
