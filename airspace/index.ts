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

			// STAR holding midpoints
			Beacon.fromDMS("510401.82N", "0002621.54E", "TIGER", "Tiger", 315),
			Beacon.fromDMS("515110.51N", "0005744.67W", "WCO", "Westcott", 188),
			Beacon.fromDMS("510325.98N", "0005552.98E", "ARNUN", "Arnun", 216),

			// STAR entries
			Beacon.fromDMS("504545.12N", "0011407.99W", "BEGTO", "Begto"),
			Beacon.fromDMS("505126.07N", "0004641.20E", "ROTNO", "Rotno"),
			Beacon.fromDMS("512658.00N", "0005531.99E", "TANET", "Tanet"),
			Beacon.fromDMS("515729.84N", "0010626.35W", "SOPIT", "Sopit"),
			/**
			 * TOBID: moved closer to sopit to fit within airspace.
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
		],
		new Map([
			[180, {callsign: "London Control", pronunciation: "London Control", frequency: 129.425}],
			[270, {callsign: "London Control", pronunciation: "London Control", frequency: 126.075}],
			[360, {callsign: "London Control", pronunciation: "London Control", frequency: 127.1}],
			[90, {callsign: "Amsterdam Radar", pronunciation: "Amsterdam Radar", frequency: 134.375}],
		]),
		new Polygon([
				new Fix(50.672965, -0.369415),
				new Fix(50.672965, 0.502625),
				new Fix(50.754704, 0.748444),
				new Fix(50.979182, 1.040955),
				new Fix(51.647850, 1.416550),
				new Fix(51.871828, 1.443329),
				new Fix(51.985726, 1.383591),
				new Fix(51.931988, 1.118546),
				new Fix(51.973038, 0.965424),
				new Fix(52.212656, 0.806808),
				new Fix(52.191193, 0.547943),
				new Fix(52.186142, -0.366154),
				new Fix(52.052174, -0.581074),
				new Fix(52.068533, -0.622101),
				new Fix(51.951671, -1.196823),
				new Fix(51.731387, -1.018295),
				new Fix(51.562025, -1.200256),
				new Fix(51.587310, -1.438179),
				new Fix(51.424260, -1.489677),
				new Fix(51.385924, -1.146698),
				new Fix(51.051539, -1.224461),
				new Fix(51.066320, -1.121120),
				new Fix(50.907688, -1.062927),
				new Fix(50.821879, -1.284542),
				new Fix(50.814504, -0.873585),
				new Fix(50.775767, -0.829811),
				new Fix(50.777938, -0.486145),
			]
		),
	)
);

new EGLL(atc);
new EGKK(atc);
new EGSS(atc);

atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {arrivals: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {departures: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true}),
]);
atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {departures: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {arrivals: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true}),
]);
atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {arrivals: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {departures: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true}),
	new RunwayConfiguration(23, atc.runway("lln"), {arrivals: true, departures: true}),
]);
atc.runway([
	new RunwayConfiguration(0, atc.runway("lls"), {departures: true}),
	new RunwayConfiguration(0, atc.runway("lln"), {arrivals: true}),
	new RunwayConfiguration(8, atc.runway("kks"), {arrivals: true, departures: true}),
	new RunwayConfiguration(23, atc.runway("lls"), {arrivals: true, departures: true}),
]);

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
