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
		], [0x30, 0x30, 0x30]));

		// London CTR (D)
		this.aipArea(
            null,
            2500,
            new Fix(51.3819, -0.2989),
            "513611N 0004133W - 513611N 0001253W thence clockwise by the arc of a circle radius 12 NM centred on 512812N 0002713W to 512013N 0001255W - 512013N 0003800W - 512103N 0004236W thence clockwise by the arc of a circle radius 12 NM centred on 512812N 0002713W to 513611N 0004133W",
		);

		// London/City CTR (D)
        this.aipLine(
            "513445N 0001108W - 513409N 0000826E thence clockwise by the arc of a circle radius 5 NM centred on 513019N 0000319E to 512610N 0000747E - 512640N 0000811W thence anti-clockwise by the arc of a circle radius 12 NM centred on 512812N 0002713W to 513445N 0001108W",
            [0x30, 0x30, 0x30],
        );

        this.aipArea(
            "LC",
            2500,
            new Fix(51.555, 0.025),
            "LONDON/CITY CTA\n" +
            "513547N 0001221W -\n" +
            "513505N 0001022E thence clockwise by the arc of a circle radius 6.5 NM centred on 513019N 0000319E to\n" +
            "512507N 0000932E -\n" +
            "512541N 0000828W thence anti-clockwise by the arc of a circle radius 12 NM centred on 512812N 0002713W to\n" +
            // "512640N 0000811W -\n" +
            // "512610N 0000747E thence anti-clockwise by the arc of a circle radius 5 NM centred on 513019N 0000319E to\n" +
            // "513409N 0000826E -\n" +
            // "513445N 0001108W thence anti-clockwise by the arc of a circle radius 12 NM centred on 512812N 0002713W to -\n" +
            "513547N 0001221W\n" +
            "Upper limit: 2500 FT ALT\n" +
            "Lower limit: 1500 FT ALT\n" +
            "Class: D\n",
        );

		// Gatwick CTA (D)
        this.aipArea(
            "KK",
            2500,
            new Fix(51.0650, 0.0100),
            `LONDON GATWICK CTA

510100N 0000458E -
510100N 0002545W thence clockwise by the arc of a circle radius 12 NM centred on 510853N 0001125W to
511124N 0003003W -
511618N 0000533E thence clockwise by the arc of a circle radius 13 NM centred on 510853N 0001125W to -
510100N 0000458E

but excluding the Gatwick CTR.

Upper limit: 2500 FT ALT

Lower limit: 1500 FT ALT

Class: D`
        );

		// Gatwick CTR (D)
		this.aipLine(
            "LONDON GATWICK CTR\n" +
            "\n" +
            "511258N 0001129W - 511200N 0000341E thence clockwise by the arc of a circle radius 10 NM centred on 510853N 0001125W to 510550N 0000342E - 510240N 0001923W thence clockwise by the arc of a circle radius 8 NM centred on 510853N 0001125W to 511118N 0002332W - 511258N 0001129W",
            [0x30, 0x30, 0x30]
        );

		// Stansted CTR (D)
		const stanstedCTR = AirspaceLines.fromAIP(
            "515416N 0002653E - 514508N 0001309E thence clockwise by the arc of a circle radius 8 NM centred on 515306N 0001406E to 515155N 0000120E - 520104N 0001503E thence clockwise by the arc of a circle radius 8 NM centred on 515306N 0001406E to 515416N 0002653E",
            [0x30, 0x30, 0x30]
        );
		this.gen.area(new Area(
			"SS",
			3500,
			new Fix(51.8697, 0.2598),
			stanstedCTR,
			stanstedCTR.vertices.length
		));
		this.gen.line(stanstedCTR);

		// Stansted CTA 1 (D)
        const stanstedCTA1 = AirspaceLines.fromAIP(`LONDON STANSTED CTA 1

515416N 0002653E thence anti-clockwise by the arc of a circle radius 8 NM centred on 515306N 0001406E to
520104N 0001503E -
520517N 0002124E thence clockwise by the arc of a circle radius 13 NM centred on 515306N 0001406E to
515828N 0003314E -
515416N 0002653E

Upper limit: 3500 FT ALT

Lower limit: 1500 FT ALT

Class: D`, [0x30, 0x30, 0x30]).rotate(18);
        this.gen.area(new Area(
            "SS",
            3500,
            new Fix(51.9774, 0.4648),
            stanstedCTA1,
            22
        ));
        this.gen.line(stanstedCTA1);

		// Stansted CTA 2 (D)
        const stanstedCTA2 = AirspaceLines.fromAIP(`LONDON STANSTED CTA 2

514508N 0001309E -
514055N 0000652E thence clockwise by the arc of a circle radius 13 NM centred on 515306N 0001406E to
514550N 0000316W -
515146N 0000006W -
515155N 0000120E thence anti-clockwise by the arc of a circle radius 8 NM centred on 515306N 0001406E to -
514508N 0001309E

Upper limit: 2500 FT ALT

Lower limit: 1500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "SS",
            2500,
            new Fix(51.7500, 0.0500),
            stanstedCTA2,
            20
        ));
        this.gen.line(stanstedCTA2);

        // Stansted CTA 3 (D)
        this.aipArea(
            "SS",
            3500,
            new Fix(51.8250, 0.3700),
            `LONDON STANSTED CTA 3

515828N 0003314E thence clockwise by the arc of a circle radius 13 NM centred on 515306N 0001406E to
515349N 0003503E -
514556N 0002309E -
514508N 0001309E -
515828N 0003314E

Upper limit: 3500 FT ALT

Lower limit: 2500 FT ALT

Class: D`,
            2
        );

        // Stansted CTA 4 (D)
        this.aipArea(
            "SS",
            3500,
            new Fix(51.9470, 0.0597),
            `LONDON STANSTED CTA 4

520300N 0000907E -
520517N 0002124E -
515155N 0000120E -
515146N 0000006W -
520127N 0000000E -
520300N 0000907E

Upper limit: 3500 FT ALT

Lower limit: 2500 FT ALT

Class: D`,
            3,
            2
        );

        // Luton CTR (D)
        const lutonCTR = AirspaceLines.fromAIP(
            "515244N 0003828W - 515511N 0002426W - 515743N 0002145W - 515857N 0001434W thence clockwise by the arc of a circle radius 8 NM centred on 515229N 0002206W to 515042N 0000931W - 514830N 0001506W - 514503N 0003457W - 515244N 0003828W",
            [0x30, 0x30, 0x30],
        ).rotate(2);
        this.gen.area(new Area(
            "GW",
            3500,
            new Fix(51.8705, -0.2700),
            lutonCTR,
            lutonCTR.vertices.length - 1
        ));
        this.gen.line(lutonCTR);

        // Luton CTA 1 (D)
        this.aipArea(
            "GW",
            3500,
            new Fix(51.8948, -0.0694),
            `LONDON LUTON CTA 1

515857N 0001434W -
/* Added manually for better rendering */ 515935N 0001056W -
520127N 0000000E -
515146N 0000006W -
515102N 0000030W -
514830N 0001506W -
515042N 0000931W thence anti-clockwise by the arc of a circle radius 8 NM centred on 515229N 0002206W to -
515857N 0001434W

Upper limit: 3500 FT ALT

Lower limit: 2500 FT ALT

Class: D`,
            19,
            -1
        );

        // Luton CTA 2 (D)
        const lutonCTA2 = AirspaceLines.fromAIP(`LONDON LUTON CTA 2

514810N 0004155W -
514905N 0003647W -
514503N 0003457W -
514409N 0004005W -
514810N 0004155W

Upper limit: 3500 FT ALT

Lower limit: 2500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "GW",
            3500,
            new Fix(51.7800, -0.6565),
            lutonCTA2.rotate(2),
            3
        ));
        this.gen.line(lutonCTA2);

        // Luton CTA 3 (D)
        this.aipArea(
            "GW",
            5500,
            new Fix(51.8616, -0.6944),
            `LONDON LUTON CTA 3

514810N 0004155W -
515150N 0004336W -
515244N 0003828W -
514905N 0003647W -
514810N 0004155W

Upper limit: 5500 FT ALT

Lower limit: 2500 FT ALT

Class: D`,
            1000
        );

        // Luton CTA 4 (D)
        const lutonCTA4 = AirspaceLines.fromAIP(`LONDON LUTON CTA 4

515150N 0004336W -
514810N 0004155W -
514659N 0004838W -
515048N 0004926W -
515150N 0004336W

Upper limit: 5500 FT ALT

Lower limit: 3500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "GW",
            5500,
            new Fix(51.8490, -0.7729),
            lutonCTA4.rotate(-1),
            3
        ));
        this.gen.line(lutonCTA4);

        // Luton CTA 5 (D)
        const lutonCTA5 = AirspaceLines.fromAIP(`LONDON LUTON CTA 5

520038N 0002832W -
515743N 0002145W -
515021N 0002931W -
514905N 0003647W -
515244N 0003828W -
515258N 0003709W -
520038N 0002832W`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "GW",
            5500,
            new Fix(51.9375, -0.5350),
            lutonCTA5,
            lutonCTA5.vertices.length
        ));
        this.gen.line(lutonCTA5);

        // Luton CTA 6 (D)
        this.aipArea(
            "GW",
            5500,
            new Fix(51.9801, -0.5983),
            `LONDON LUTON CTA 6

520316N 0003441W -
520038N 0002832W -
515258N 0003709W -
515244N 0003828W -
515503N 0004353W -
/* Added manually for better rendering */ 515749N 0004048W -
520316N 0003441W

Upper limit: 5500 FT ALT

Lower limit: 4500 FT ALT

Class: D`,
            5,
            1
        );

        // Luton CTA 7 (D)
        const lutonCTA7 = AirspaceLines.fromAIP(`LONDON LUTON CTA 7

520606N 0001712W -
515935N 0001056W -
515743N 0002145W -
520038N 0002832W -
520606N 0001712W

Upper limit: 4500 FT ALT

Lower limit: 3500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "GW",
            4500,
            new Fix(52.0481, -0.3477),
            lutonCTA7.rotate(1),
            3
        ));
        this.gen.line(lutonCTA7);

        // Luton CTA 8 (D)
        const lutonCTA8 = AirspaceLines.fromAIP(`LONDON LUTON CTA 8

515150N 0004336W -
515244N 0003828W -
515503N 0004353W -
515150N 0004336W

Upper limit: 5500 FT ALT

Lower limit: 3500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "GW",
            5500,
            new Fix(51.9000, -0.7147),
            lutonCTA8,
            lutonCTA8.vertices.length
        ));
        this.gen.line(lutonCTA8);

        // Luton CTA 9 (D)
        const lutonCTA9 = AirspaceLines.fromAIP(`LONDON LUTON CTA 9

515150N 0004336W -
515503N 0004353W -
515749N 0004048W -
515356N 0005006W -
515048N 0004926W -
515150N 0004336W

Upper limit: 5500 FT ALT

Lower limit: 4500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "GW",
            5500,
            new Fix(51.8932, -0.8083),
            lutonCTA9.rotate(3),
            4
        ));
        this.gen.line(lutonCTA9);

		// Southend CTR 1 (D)
        const southendCTR1 = AirspaceLines.fromAIP(
            "513445N 0002903E - 514206N 0004521E - 513417N 0005000E - 513151N 0005000E - 512719N 0003955E - 512701N 0003630E thence clockwise by the arc of a circle radius 7.5 NM centred on 513357N 0004100E to 513445N 0002903E",
            [0x30, 0x30, 0x30],
        );
        this.gen.area(new Area(
            "MC",
            3500,
            new Fix(51.625, 0.6356),
            southendCTR1,
            southendCTR1.vertices.length
        ));
        this.gen.line(southendCTR1);

		// Southend CTR 2 (D)
        const southendCTR2 = AirspaceLines.fromAIP(
            "514206N 0004521E - 514312N 0004748E - 514138N 0005222E - 513618N 0005532E - 513417N 0005000E - 514206N 0004521E",
            [0x30, 0x30, 0x30],
        );
        this.gen.area(new Area(
            "MC",
            4500,
            new Fix(51.7, 0.795),
            southendCTR2,
            southendCTR2.vertices.length
        ));
        this.gen.line(southendCTR2);

		// Southend CTR 3 (D)
        const southendCTR3 = AirspaceLines.fromAIP(
            "514138N 0005222E - 514057N 0005420E thence clockwise by the arc of a circle radius 10 NM centred on 513428N 0004207E to 513528N 0005805E - 513151N 0005000E - 513417N 0005000E - 513618N 0005532E - 514138N 0005222E",
            [0x30, 0x30, 0x30],
        );
        this.gen.area(new Area(
            "MC",
            5500,
            new Fix(51.58, 0.8527),
            southendCTR3,
            southendCTR3.vertices.length
        ));
        this.gen.line(southendCTR3);

        // Southend CTA 1 (D)
        this.aipArea(
            "MC",
            3500,
            new Fix(51.5504, 0.4266),
            `SOUTHEND CTA 1

513437N 0002440E -
514333N 0004429E -
514206N 0004521E -
513445N 0002903E thence anti-clockwise by the arc of a circle radius 7.5 NM centred on 513357N 0004100E to
512701N 0003630E -
512719N 0003955E -
513151N 0005000E -
513000N 0005000E -
512528N 0003956E -
512446N 0003202E -
512757N 0002721E -
513146N 0002401E -
513437N 0002440E

Upper limit: 3500 FT ALT

Lower limit: 1500 FT ALT

Class: D`,
            27,
            2
        );

        // Southend CTA 2 (D)
        const southendCTA2 = AirspaceLines.fromAIP(`SOUTHEND CTA 2

514333N 0004429E -
514420N 0004614E -
514440N 0005036E -
514431N 0005038E -
514138N 0005222E -
514312N 0004748E -
514206N 0004521E -
514333N 0004429E

Upper limit: 4500 FT ALT

Lower limit: 1500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "MC",
            4500,
            new Fix(51.7600, 0.7834),
            southendCTA2,
            southendCTA2.vertices.length
        ));
        this.gen.line(southendCTA2);

        // Southend CTA 3 (D)
        const southendCTA3 = AirspaceLines.fromAIP(`SOUTHEND CTA 3

514440N 0005036E -
514446N 0005158E thence clockwise by the arc of a circle radius 12 NM centred on 513428N 0004207E to
513504N 0010120E -
513000N 0005000E -
513151N 0005000E -
513528N 0005805E thence anti-clockwise by the arc of a circle radius 10 NM centred on 513428N 0004207E to
514057N 0005420E -
514138N 0005222E -
514431N 0005038E -
514440N 0005036E

Upper limit: 5500 FT ALT

Lower limit: 1500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "MC",
            5500,
            new Fix(51.6894, 0.9707),
            southendCTA3.rotate(-19),
            southendCTA3.vertices.length - 3
        ));
        this.gen.line(southendCTA3);

        // Southend CTA 4 (D)
        const southendCTA4 = AirspaceLines.fromAIP(`SOUTHEND CTA 4

513437N 0002440E -
513943N 0002551E -
514353N 0003508E -
514435N 0004406E -
514401N 0004412E -
514333N 0004429E -
513437N 0002440E

Upper limit: 3500 FT ALT

Lower limit: 2500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "MC",
            3500,
            new Fix(51.6863, 0.5278),
            southendCTA4,
            4
        ));
        this.gen.line(southendCTA4);

        // Southend CTA 5 (D)
        this.aipArea(
            "MC",
            4500,
            new Fix(0, 0),
            `SOUTHEND CTA 5

514435N 0004406E -
514506N 0004514E -
514530N 0005026E -
514440N 0005036E -
514420N 0004614E -
514333N 0004429E -
514401N 0004412E -
514435N 0004406E

Upper limit: 4500 FT ALT

Lower limit: 2500 FT ALT

Class: D`,
            7
        );

        // Southend CTA 6 (D)
        const southendCTA6 = AirspaceLines.fromAIP(`SOUTHEND CTA 6

514530N 0005026E -
514551N 0005510E thence clockwise by the arc of a circle radius 14 NM centred on 513428N 0004207E to
513653N 0010414E -
513535N 0010117E thence anti-clockwise by the arc of a circle radius 12 NM centred on 513428N 0004207E to
514446N 0005158E -
514440N 0005036E -
514530N 0005026E

Upper limit: 5500 FT ALT

Lower limit: 2500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "MC",
            5500,
            new Fix(0, 0),
            southendCTA6.rotate(-20),
            southendCTA6.vertices.length - 1
        ));
        this.gen.line(southendCTA6);

        // Southend CTA 7 (D)
        const southendCTA7 = AirspaceLines.fromAIP(`SOUTHEND CTA 7

512757N 0002721E -
512446N 0003202E -
512528N 0003956E -
513000N 0005000E -
512120N 0005000E -
512046N 0003338E -
512757N 0002721E

Upper limit: 3500 FT ALT

Lower limit: 2500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "MC",
            3500,
            new Fix(51.4082, 0.6700),
            southendCTA7.rotate(-4),
            5
        ));
        this.gen.line(southendCTA7);

        // Southend CTA 8 (D)
        this.aipArea(
            "MC",
            5500,
            new Fix(51.4398, 0.8618),
            `SOUTHEND CTA 8

512829N 0005000E -
512555N 0005625E -
512124N 0005144E -
512120N 0005000E -
512829N 0005000E

Upper limit: 5500 FT ALT

Lower limit: 3500 FT ALT

Class: D`,
            2
        );

        // Southend CTA 9 (D)
        const southendCTA9 = AirspaceLines.fromAIP(`SOUTHEND CTA 9

514506N 0004514E -
514716N 0005005E -
514530N 0005026E -
514506N 0004514E

Upper limit: 4500 FT ALT

Lower limit: 3500 FT ALT

Class: D`, [0x30, 0x30, 0x30]);
        this.gen.area(new Area(
            "MC",
            4500,
            new Fix(0, 0),
            southendCTA9.rotate(0),
            3
        ));
        this.gen.line(southendCTA9);

        // Southend CTA 10 (D)
        this.aipArea(
            "MC",
            5500,
            new Fix(51.7542, 1.1529),
            `SOUTHEND CTA 10

514716N 0005005E -
515032N 0005922E -
515158N 0011450E -
514921N 0012014E -
514212N 0012127E -
513836N 0011744E -
513751N 0010627E -
513653N 0010414E thence anti-clockwise by the arc of a circle radius 14 NM centred on 513428N 0004207E to
514551N 0005510E -
514530N 0005026E -
514716N 0005005E

Upper limit: 5500 FT ALT

Lower limit: 3500 FT ALT

Class: D`,
            22,
        );

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

    private aipArea(name: string | null, altitude: number, labelPosition: Fix, aip: string, draw?: number, rotate = 0) {
        this.gen.area(new Area<Polygon>(
            name,
            altitude,
            labelPosition,
            AirspaceLines.fromAIP(aip).rotate(rotate),
            draw
        ));
    }

    private static fromAIP(aip: string, colour?: Line.Colour): Line {
        const normalized = aip.replaceAll("\n", " ").trim();
        let lineObj: Line | null = null;
        let lastFix: Fix | null = null;

        const instructionRegex = /thence (?:anti-)?clockwise by the arc of a circle radius \d+(?:\.\d+)? NM centred on \d{6}[NS] \d{6,}[EW] to (?:- )?\d{6}[NS] \d{6,}[EW]|\d{6}[NS] \d{6,}[EW]/g;
        const matches = normalized.matchAll(instructionRegex);

        for (const match of matches) {
            const instr = match[0]!;

            const arcMatch = instr.match(
                /^thence ((?:anti-)?clockwise) by the arc of a circle radius (\d+(?:\.\d+)?) NM centred on (\d{6}[NS]) (\d{6,}[EW]) to (?:- )?(\d{6}[NS]) (\d{6,}[EW])$/
            );
            if (arcMatch) {
                if (!lastFix) throw new Error("Arc found without a previous fix");

                const direction = arcMatch[1]!;
                const radius = Number.parseFloat(arcMatch[2]!) * Fix.NMI;
                const center = Fix.fromDMS(arcMatch[3]!, arcMatch[4]!);
                const dest = Fix.fromDMS(arcMatch[5]!, arcMatch[6]!);

                const circle = new Circle(center, radius, Math.ceil(radius / 185));
                if (direction === "clockwise") lineObj = lineObj!.join(circle.arc(lastFix, dest));
                else lineObj = lineObj!.join(circle.arcACW(lastFix, dest));

                lineObj.append(dest);
                lastFix = dest;
                continue;
            }

            const fixMatch = instr.match(/^(\d{6}[NS]) (\d{6,}[EW])$/);
            if (fixMatch) {
                const fix = Fix.fromDMS(fixMatch[1]!, fixMatch[2]!);
                if (!lineObj) lineObj = new Line([fix], colour);
                else lineObj = lineObj!.append(fix);
                lastFix = fix;
            }
        }

        if (!lineObj) throw new Error("No line generated from AIP");
        return lineObj;
    }
}
