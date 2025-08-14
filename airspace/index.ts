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
			 * Use this beacon only for NUGRA 1H HON 1H
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
            Beacon.fromDMS("520707.18N", "0011236.45E", "LARPA", "Larpa", 244),
		],
		new Map([
			[360, {callsign: "LON_C_CTR", pronunciation: "London Control", frequency: 127.105}],
			[182, {callsign: "LON_S_CTR", pronunciation: "London Control", frequency: 129.43}],
		]),
		new Polygon([
				new Fix(50.668994, -0.373578),
				new Fix(50.669484, 0.500093),
				new Fix(50.755138, 0.750332),
				new Fix(50.979723, 1.040440),

				// extension
				new Fix(51.000000, 1.466675),
				new Fix(51.349485, 1.531906),
				Fix.fromDMS("512715.96N", "0013016.98E"),
				Fix.fromDMS("514053.03N", "0012633.13E"),
				new Fix(51.6849, 1.4213),
				// end extension
				new Fix(51.873206, 1.443844),
				new Fix(51.984880, 1.384964),

				// extension CLACTON CTA 3A
				new Fix(51.969759, 1.308231),
				new Fix(52.120104, 1.211243),
				new Fix(52.177300, 1.034088),
				new Fix(52.145657, 0.848351),
				// end extension CLACTON CTA 3A

				new Fix(52.207501, 0.806808),
				new Fix(52.186037, 0.546227),

				// extension CLACTON CTA 10C
				new Fix(52.1878, 0.2364),
				new Fix(52.288428, 0.161018),
				new Fix(52.291263, -0.030556),
				new Fix(52.307009, -0.104370),
				new Fix(52.399486, -0.191917),
				new Fix(52.397601, -0.569229),
				// end extension CLACTON CTA 10C

				// extension
				new Fix(52.248403, -0.427780),
				new Fix(52.114939, -0.721664),
				// end extension

				// extension
				new Fix(52.08, -0.6383),
				new Fix(52.0638, -0.6613),
				// end extension

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
			]
		),
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
