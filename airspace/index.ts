import fs from "node:fs/promises";
import Generator from "../src/Generator.js";
import Airspace from "../src/Airspace.js";
import Fix from "../src/Fix.js";
import Beacon from "../src/Beacon.js";
import Polygon from "../src/Polygon.js";
import AircraftTypes from "./AircraftTypes.js";
import EGLL from "./EGLL.js";
import EGKK from "./EGKK.js";
import EGMC from "./EGMC.js";
import EGSS from "./EGSS.js";
import EGGW from "./EGGW.js";
import EGLC from "./EGLC.js";
import AirspaceLines from "./lines/AirspaceLines.js";
import RunwayConfigs from "./RunwayConfigs.js";

const gen = Generator.getInstance();

gen.airspace(
	new Airspace(
		50,
		4,
		36,
		2000,
		{altitude: {ft: 10000, kts: 250}},
		{nm: 4, kts: 160},
		19000,
		20000,
		22000,
		5000,
		6000,
		false,
		false,
		2,
		3,
		true,
		true,
		{
			approach: "London Control",
			departure: "London Control",
		},
		gen.fix("LON", "512914N", "0002800W"),
		0,
		[
			// Default beacon
			Beacon.from("LON", "London", gen.fix("LON")),

			// Manoeuvring/misc beacons
			Beacon.fromDMS("510102N", "0000658E", "MAY", "Mayfield", {left: 87}),

			// Missed approach holding
			Beacon.fromDMS("511910N", "0002219W", "EPM", "Epsom", {left: 271}),
			Beacon.fromDMS("513723N", "0003107W", "CHT", "Chiltern", {left: 290}),
			Beacon.fromDMS("515341N", "0001509W", "LUT", "Luton", 254),
			Beacon.fromDMS("513016N", "0000403E", "LCY", "London City", 272),
			Beacon.fromDMS("513434N", "0004201E", "SND", "Southend", {left: 53}),

			// STAR holding endpoints
			Beacon.fromDMS("513845.69N", "0000906.13E", "LAM", "Lambourne", {left: 263}),
			Beacon.fromDMS("511951.15N", "0000205.32E", "BIG", "Biggin", 302),
			Beacon.fromDMS("511818.17N", "0002649.86W", "OCK", "Ockham", 328),
			Beacon.fromDMS("514334.19N", "0003259.10W", "BNN", "Bovingdon", 116),
			Beacon.fromDMS("505643.99N", "0001542.25E", "TIMBA", "Timba", 308),
			Beacon.fromDMS("505905.88N", "0001130.30W", "WILLO", "Willo", {left: 283}),
			Beacon.fromDMS("520050.20N", "0000309.52W", "LOREL", "Lorel", {left: 187}),
			Beacon.fromDMS("520058.00N", "0003558.49E", "ABBOT", "Abbot", 265),
			Beacon.fromDMS("521812.97N", "0001352.54W", "ZAGZO", "Zagzo", 149),
			Beacon.fromDMS("514408.65N", "0012536.00E", "JACKO", "Jacko", {left: 264}),
			Beacon.fromDMS("510958.44N", "0011704.26E", "GODLU", "Godlu", 309),

			// STAR holding midpoints
			Beacon.fromDMS("510401.82N", "0002621.54E", "TIGER", "Tiger", 315),
			Beacon.fromDMS("515110.51N", "0005744.67W", "WEZKO", "Wezko", 188),
			Beacon.fromDMS("510325.98N", "0005552.98E", "ARNUN", "Arnun", 216),
			Beacon.fromDMS("512603.83N", "0002056.10W", "VATON", "Vaton", {left: 25}),
			Beacon.fromDMS("520614.46N", "0002917.16E", "ROPMU", "Ropmu", 97),
			Beacon.fromDMS("514253.48N", "0010633.89E", "GEGMU", "Gegmu", 263),

			// STAR entries
			Beacon.fromDMS("504545.12N", "0011407.99W", "BEGTO", "Begto"),
			Beacon.fromDMS("505126.07N", "0004641.20E", "ROTNO", "Rotno"),
			Beacon.fromDMS("512658.00N", "0005531.99E", "TANET", "Tanet"),
			Beacon.fromDMS("515729.84N", "0010626.35W", "SOPIT", "Sopit"),
			/**
			 * TOBID: moved closer to SOPIT to fit within airspace.
			 * Use this beacon only for NUGRA 2H HON 2H
			 */
			Beacon.from("TOBID", "Tobid",
				gen.fix("SOPIT", "515729.84N", "0010626.35W")
				   .destination(319, 10)
			),
			Beacon.fromDMS("514451.32N", "0013642.58E", "LOGAN", "Logan", {left: 289}),
			Beacon.fromDMS("510019.03N", "0005904.06W", "HAZEL", "Hazel"),
			Beacon.fromDMS("512036.17N", "0013358.89W", "SIRIC", "Siric"),
			Beacon.fromDMS("512920.30N", "0013643.00E", "TEBRA", "Tebra"),
			Beacon.fromDMS("504027.90N", "0004746.38E", "AMDUT", "Amdut", 312),
			Beacon.fromDMS("503948.10N", "0012013.93W", "ELDER", "Elder"),
			Beacon.fromDMS("503931.38N", "0010257.16W", "DISVO", "Disvo"),
			Beacon.fromDMS("504839.92N", "0004517.69W", "TELTU", "Teltu"),
			Beacon.fromDMS("514617.00N", "0012140.87W", "KIDLI", "Kidli"),
			Beacon.fromDMS("503828.94N", "0011029.05W", "ABSAV", "Absav"),
			Beacon.fromDMS("505118.79N", "0004524.25W", "GWC", "Goodwood", {left: 175}),
			Beacon.fromDMS("515947.21N", "0010313.34W", "FINMA", "Finma"),
			Beacon.fromDMS("503242.00N", "0004512.00E", "BANVA", "Banva"),
			Beacon.fromDMS("515051.34N", "0010019.40W", "SILVA", "Silva"),
			Beacon.fromDMS("504912.00N", "0005618.05W", "AVANT", "Avant"),
			Beacon.fromDMS("504723.71N", "0002530.03E", "UNDUG", "Undug", 319),
			Beacon.fromDMS("504645.67N", "0012800.00E", "SOVAT", "Sovat"),
			/**
			 * KONAN: moved closer to GODLU to fit within airspace.
			 * Use this beacon only for KONAN 1C.
			 */
			Beacon.from("KONAN", "Konan",
				gen.fix("GODLU", "510958.44N", "0011704.26E")
				   .destination(94, 20)
			),
			Beacon.fromDMS("520748.00N", "0010043.20W", "TIXEX", "Tixex"),
			Beacon.fromDMS("504338.76N", "0005839.48W", "BIDVA", "Bidva"),
			Beacon.fromDMS("505718.90N", "0012042.20W", "SAM", "Southampton"),
			Beacon.fromDMS("503546.32N", "0005545.48E", "SOXUX", "Soxux"),
            Beacon.fromDMS("520707.18N", "0011236.45E", "LAPRA", "Lapra", 244),
		],
		new Map([
			[360, {callsign: "LON_C_CTR", pronunciation: "London Control", frequency: 127.105}],
			[182, {callsign: "LON_S_CTR", pronunciation: "London Control", frequency: 129.43}],
		]),
		new Polygon([
            // LTMA 21 (A)
            Fix.fromDMS("504626N", "0002908W"),
            Fix.fromDMS("504626N", "0004942W"),

            // LTMA 13 (A)
            Fix.fromDMS("504848N", "0005214W"),
            Fix.fromDMS("504928N", "0011714W"),
            Fix.fromDMS("505435N", "0010335W"),
            Fix.fromDMS("510420N", "0010657W"),
            Fix.fromDMS("510329N", "0011312W"),

            // LTMA 11 (A)
            Fix.fromDMS("511956N", "0010918W"),
            Fix.fromDMS("512348N", "0010822W"),

            // LTMA 23 (A)
            Fix.fromDMS("512435N", "0011444W"),
            Fix.fromDMS("512619N", "0012850W"),
            Fix.fromDMS("513607N", "0012547W"),

            // LTMA 10 (A)
            Fix.fromDMS("513423N", "0011138W"),

            // LTMA 19 (A)
            Fix.fromDMS("514420N", "0010041W"),
            Fix.fromDMS("515745N", "0011126W"),
            Fix.fromDMS("515745N", "0011126W"),

            // extension…
            new Fix(52.0653, -0.6576),
            new Fix(52.1233, -0.5606),

            // DAVENTRY CTA 25 (C)
            Fix.fromDMS("521118N", "0003323W"),
            Fix.fromDMS("521332N", "0002806W"),
            Fix.fromDMS("521658N", "0002741W"),

            // DAVENTRY CTA 21 (C)
            Fix.fromDMS("522632N", "0003702W"),
            Fix.fromDMS("522627N", "0001416W"),
            Fix.fromDMS("521855N", "0000659W"),

            // CLACTON CTA 10 (C)
            Fix.fromDMS("521832N", "0000507W"),
            Fix.fromDMS("521802N", "0000240W"),
            Fix.fromDMS("521712N", "0000935E"),
            Fix.fromDMS("521105N", "0001412E"),

            // LTMA 18 (A)
            Fix.fromDMS("521104N", "0003242E"),
            Fix.fromDMS("521221N", "0004819E"),

            // CLACTON CTA 3 (A)
            Fix.fromDMS("520839N", "0005047E"),
            Fix.fromDMS("521032N", "0010200E"),
            Fix.fromDMS("520707N", "0011236E"),
            Fix.fromDMS("515808N", "0011829E"),

            // LTMA 8 (A)
            Fix.fromDMS("515904N", "0012302E"),
            Fix.fromDMS("515222N", "0012635E"),
            Fix.fromDMS("513905N", "0012500E"),

            // CLACTON CTA 7 (A)
            Fix.fromDMS("513024N", "0013733E"),
            Fix.fromDMS("512708N", "0013826E"),
            Fix.fromDMS("512053N", "0013611E"),

            // WORTHING CTA 1 (A)
            Fix.fromDMS("512053N", "0013611E"),
            Fix.fromDMS("511826N", "0013519E"),
            Fix.fromDMS("511929N", "0013040E"),
            Fix.fromDMS("511422N", "0013004E"),
            Fix.fromDMS("510600N", "0014138E"),
            Fix.fromDMS("510354N", "0014545E"),
            Fix.fromDMS("510000N", "0012800E"),
            Fix.fromDMS("505842N", "0010227E"),

            // LTMA 8 (A)
            Fix.fromDMS("505842N", "0010227E"),
            Fix.fromDMS("504507N", "0004500E"),
            Fix.fromDMS("504000N", "0003000E"),
            Fix.fromDMS("504000N", "0002220W"),
        ]),
	)
);

await new EGLL().init();
await new EGKK().init();
await new EGSS().init();
await new EGGW().init();
await new EGLC().init();
await new EGMC().init();

new RunwayConfigs().init();
AircraftTypes.init();

await new AirspaceLines().withCoastline();

const project = JSON.parse(await fs.readFile("./package.json", "utf8"));

const file = process.env.NODE_ENV === "development" ? "TEST.txt" : "LTCC.txt";
await fs.writeFile(file, gen.generate(`
#
# London Terminal Control for EndlessATC
# Version: ${project.version}
# ${project.repository.url}
# eatc+ltc@zefir.pro
#
# !! THIS FILE IS GENERATED !! Please do not make modifications here.
#
# Copyright © ${new Date().getFullYear()} ${project.author}.
# This file is part of ${project.name}.
# This custom airspace is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option) any
# later version.
#
# This file is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
# details.
#
# You should have received a copy of the GNU General Public License along with
# this file. If not, see <https://www.gnu.org/licenses/>.
#`));
console.log(`Generated ${file}`);
