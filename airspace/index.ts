import fs from "node:fs/promises";
import Generator from "../src/Generator.js";
import Airspace from "../src/Airspace.js";
import Fix from "../src/Fix.js";
import Beacon from "../src/Beacon.js";
import Polygon from "../src/Polygon.js";
import RunwayConfiguration from "../src/RunwayConfiguration.js";
import EGLL from "./EGLL.js";
import EGKK from "./EGKK.js";
import EGSS from "./EGSS.js";
import EGGW from "./EGGW.js";
import EGLC from "./EGLC.js";
import Aircraft from "../src/Aircraft.js";

const atc = new Generator();

atc.airspace(
	new Airspace(
		50,
		5,
		36,
		1300,
		{altitude: {ft: 10000, kts: 250}},
		{nm: 4, kts: 160},
		19000,
		20000,
		22000,
		3000,
		6000,
		false,
		false,
		2,
		4,
		true,
		true,
		{
			approach: "London Control",
			departure: "London Control",
		},
		atc.fix("LON", "512914N", "0002800W"),
		0,
		[
			// Default beacon
			Beacon.from("LON", "London", atc.fix("LON")),

			// Manoeuvring/misc beacons
			Beacon.fromDMS("510102N", "0000658E", "MAY", "Mayfield", {left: 87}),
			Beacon.fromDMS("515923N", "0000343E", "BKY", "Barkway"),

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

			// STAR holding midpoints or shortcuts
			Beacon.fromDMS("510401.82N", "0002621.54E", "TIGER", "Tiger", 315),
			Beacon.fromDMS("515110.51N", "0005744.67W", "WCO", "Westcott", 188),
			Beacon.fromDMS("510325.98N", "0005552.98E", "ARNUN", "Arnun", 216),
			Beacon.fromDMS("512603.83N", "0002056.10W", "VATON", "Vaton", {left: 25}),
			Beacon.fromDMS("520614.46N", "0002917.16E", "ROPMU", "Ropmu", 97),
			Beacon.fromDMS("512829.01N", "0005513.72E", "RAVSA", "Ravsa"),

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
				atc.fix("SOPIT", "515729.84N", "0010626.35W")
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
			Beacon.fromDMS("514459.05N", "0000624.25W", "BPK", "Brookmans Park"),
			Beacon.fromDMS("503242.00N", "0004512.00E", "BANVA", "Banva"),
			Beacon.fromDMS("515051.34N", "0010019.40W", "SILVA", "Silva"),
			Beacon.fromDMS("504912.00N", "0005618.05W", "AVANT", "Avant"),
			Beacon.fromDMS("511814.41N", "0003550.19E", "DET", "Detling"),
			Beacon.fromDMS("504723.71N", "0002530.03E", "UNDUG", "Undug", 319),
			Beacon.fromDMS("504645.67N", "0012800.00E", "SOVAT", "Sovat"),
			/**
			 * KONAN: moved closer to GODLU to fit within airspace.
			 * Use this beacon only for KONAN 1C.
			 */
			Beacon.from("KONAN", "Konan",
				atc.fix("GODLU", "510958.44N", "0011704.26E")
				   .destination(94, 20)
			),
			Beacon.fromDMS("520748.00N", "0010043.20W", "TIXEX", "Tixex"),
			Beacon.fromDMS("504338.76N", "0005839.48W", "BIDVA", "Bidva"),
			Beacon.fromDMS("505718.90N", "0012042.20W", "SAM", "Southampton"),
			Beacon.fromDMS("503546.32N", "0005545.48E", "SOXUX", "Soxux"),
		],
		new Map([
			[180, {callsign: "London Control", pronunciation: "London Control", frequency: 129.425}],
			[270, {callsign: "London Control", pronunciation: "London Control", frequency: 126.075}],
			[360, {callsign: "London Control", pronunciation: "London Control", frequency: 127.1}],
			[90, {callsign: "Amsterdam Radar", pronunciation: "Amsterdam Radar", frequency: 134.375}],
		]),
		new Polygon([
				new Fix(50.668994, -0.373578),
				new Fix(50.669484, 0.500093),
				new Fix(50.755138, 0.750332),
				new Fix(50.979723, 1.040440),

				// extension WORTHING CTA 1A
				new Fix(51.000000, 1.466675),
				new Fix(51.349485, 1.531906),
				new Fix(51.357633, 1.362991),
				new Fix(51.379067, 1.264114),
				// end extension WORTHING CTA 1A

				new Fix(51.649981, 1.416721),
				new Fix(51.873206, 1.443844),
				new Fix(51.984880, 1.384964),
				new Fix(51.930718, 1.118546),
				new Fix(51.970183, 0.964737),
				new Fix(52.207501, 0.806808),
				new Fix(52.186037, 0.546227),

				// extension CLACTON CTA 10C
				new Fix(52.186458, 0.237236),
				new Fix(52.288428, 0.161018),
				new Fix(52.310893, -0.086174),
				new Fix(52.399486, -0.191917),
				new Fix(52.397601, -0.569229),
				// end extension CLACTON CTA 10C

				//new Fix(52.191404, -0.371819),
				//new Fix(52.054417, -0.578971),
				// extension
				new Fix(52.248403, -0.427780),
				new Fix(52.114939, -0.721664),
				// end extension

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
			]
		),
	)
);

new EGLL(atc);
new EGKK(atc);
new EGSS(atc);
new EGGW(atc);
new EGLC(atc);

atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {arrivals: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {departures: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true}),
	new RunwayConfiguration(12, atc.runway("ss"), {arrivals: true, departures: true}),
	new RunwayConfiguration(18, atc.runway("gw"), {arrivals: true, departures: true}),
	new RunwayConfiguration(24, atc.runway("lc"), {arrivals: true, departures: true}),
]);
atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {departures: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {arrivals: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true}),
	new RunwayConfiguration(12, atc.runway("ss"), {arrivals: true, departures: true}),
	new RunwayConfiguration(18, atc.runway("gw"), {arrivals: true, departures: true}),
	new RunwayConfiguration(24, atc.runway("lc"), {arrivals: true, departures: true}),
]);
atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {arrivals: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {departures: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true}),
	new RunwayConfiguration(12, atc.runway("ss"), {arrivals: true, departures: true}),
	new RunwayConfiguration(18, atc.runway("gw"), {arrivals: true, departures: true}),
	new RunwayConfiguration(24, atc.runway("lc"), {arrivals: true, departures: true}),
	new RunwayConfiguration(23, atc.runway("lln"), {arrivals: true, departures: true}),
]);
atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {departures: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {arrivals: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true}),
	new RunwayConfiguration(12, atc.runway("ss"), {arrivals: true, departures: true}),
	new RunwayConfiguration(18, atc.runway("gw"), {arrivals: true, departures: true}),
	new RunwayConfiguration(24, atc.runway("lc"), {arrivals: true, departures: true}),
	new RunwayConfiguration(23, atc.runway("lls"), {arrivals: true, departures: true}),
]);

atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {arrivals: true, reverse: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {departures: true, reverse: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(12, atc.runway("ss"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(18, atc.runway("gw"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(24, atc.runway("lc"), {arrivals: true, departures: true, reverse: true}),
]);
atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {departures: true, reverse: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {arrivals: true, reverse: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(12, atc.runway("ss"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(18, atc.runway("gw"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(24, atc.runway("lc"), {arrivals: true, departures: true, reverse: true}),
]);
atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {arrivals: true, reverse: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {departures: true, reverse: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(12, atc.runway("ss"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(18, atc.runway("gw"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(24, atc.runway("lc"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(23, atc.runway("lln"), {arrivals: true, departures: true, reverse: true}),
]);
atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {departures: true, reverse: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {arrivals: true, reverse: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(12, atc.runway("ss"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(18, atc.runway("gw"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(24, atc.runway("lc"), {arrivals: true, departures: true, reverse: true}),
	new RunwayConfiguration(23, atc.runway("lls"), {arrivals: true, departures: true, reverse: true}),
]);

atc.aircraft(new Aircraft(
	"D228",
	"Dornier",
	Aircraft.WTC.LIGHT,
	[105, 220],
	85,
	[0.8, 1.2],
	1000,
	1500,
	[20, 25],
	[2.5, 3.5],
	[2.9, 3.1]
));

atc.aircraft(new Aircraft(
	"GA6C",
	"Gulfstream",
	Aircraft.WTC.LOWER_MEDIUM,
	[160, 300],
	129,
	[1.2, 1.4],
	1400,
	3620,
	[25, 30],
	[3, 5],
	[2.9, 3.1]
));

const project = JSON.parse(await fs.readFile("./package.json", "utf8"));

console.log(atc.generate(`
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
