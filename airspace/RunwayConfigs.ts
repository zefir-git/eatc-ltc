import Generator from "../src/Generator.js";
import RunwayConfiguration from "../src/RunwayConfiguration.js";

export default class RunwayConfigs {
    private readonly gen = Generator.getInstance();
    private readonly westerly: RunwayConfiguration[][] = [[new RunwayConfiguration(0, this.gen.runway("lls"),
        {arrivals: true}),
        new RunwayConfiguration(0, this.gen.runway("lln"), {departures: true}),
        new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true}),
        new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true}),
        new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true}),
        new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true})],
        [new RunwayConfiguration(0, this.gen.runway("lls"), {departures: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {arrivals: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true})],
        [new RunwayConfiguration(0, this.gen.runway("lls"), {arrivals: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {departures: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true}),
            new RunwayConfiguration(23, this.gen.runway("lln"), {arrivals: true, departures: true})],
        [new RunwayConfiguration(0, this.gen.runway("lls"), {departures: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {arrivals: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true}),
            new RunwayConfiguration(23, this.gen.runway("lls"), {arrivals: true, departures: true})]];
    private readonly easterly: RunwayConfiguration[][] = [[new RunwayConfiguration(0, this.gen.runway("lls"),
        {departures: true, reverse: true}),
        new RunwayConfiguration(0, this.gen.runway("lln"), {arrivals: true, reverse: true}),
        new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true, reverse: true}),
        new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true, reverse: true}),
        new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true, reverse: true}),
        new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true, reverse: true})],
        [new RunwayConfiguration(0, this.gen.runway("lls"), {departures: true, reverse: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {arrivals: true, reverse: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(23, this.gen.runway("lls"), {arrivals: true, departures: true, reverse: true})]];

    public init() {
        this.allWesterly();
        this.allEasterly();
        this.westerlyOpposing();
        this.easterlyOpposing();
        this.egkkSecondary();
    }

    /**
     * All Airports — Westerly Operations
     */
    private allWesterly() {
        for (const runwayConfig of this.westerly) this.gen.runway(runwayConfig);
    }

    /**
     * All Airports — Easterly Operations
     */
    private allEasterly() {
        for (const runwayConfig of this.easterly) this.gen.runway(runwayConfig);
    }

    /**
     * Westerly Operations With Some Airports Easterly
     */
    private westerlyOpposing() {
        this.westerlyEgkkEasterly();
        this.westerlyEglcEasterly();
        this.westerlyEgkkEglcEasterly();
    }

    /**
     * Westerly Operations — EGKK Easterly
     */
    private westerlyEgkkEasterly() {
        for (const scores of this.westerly) {
            if (!scores.some(s => s.runway.id === "kks" && !s.reverse)) continue;
            this.gen.runway(scores.map(
                config => config.runway.id !== "kks" || config.reverse ? config : new RunwayConfiguration(config.score,
                    config.runway, {
                        reverse: true,
                        arrivals: config.arrivals,
                        departures: config.departures,
                        intersection: config.intersection,
                        backtrack: config.backtrack,
                        noSid: config.noSid,
                        offsetHeading: config.offsetHeading,
                    })));
        }
    }

    /**
     * Westerly Operations — EGLC Easterly
     */
    private westerlyEglcEasterly() {
        for (const scores of this.westerly) {
            if (!scores.some(s => s.runway.id === "lc" && !s.reverse)) continue;
            this.gen.runway(scores.map(
                config => config.runway.id !== "lc" || config.reverse ? config : new RunwayConfiguration(config.score,
                    config.runway, {
                        reverse: true,
                        arrivals: config.arrivals,
                        departures: config.departures,
                        intersection: config.intersection,
                        backtrack: config.backtrack,
                        noSid: config.noSid,
                        offsetHeading: config.offsetHeading,
                    })));
        }
    }

    /**
     * Westerly Operations — EGKK & EGLC Easterly
     */
    private westerlyEgkkEglcEasterly() {
        for (const scores of this.westerly) {
            if (!scores.some(s => (s.runway.id === "kks" || s.runway.id === "lc") && !s.reverse)) continue;
            this.gen.runway(scores.map(
                config => (config.runway.id !== "kks" && config.runway.id !== "lc") || config.reverse
                    ? config
                    : new RunwayConfiguration(config.score, config.runway, {
                        reverse: true,
                        arrivals: config.arrivals,
                        departures: config.departures,
                        intersection: config.intersection,
                        backtrack: config.backtrack,
                        noSid: config.noSid,
                        offsetHeading: config.offsetHeading,
                    })));
        }
    }

    /**
     * Easterly Operations With Some Airports Westerly
     */
    private easterlyOpposing() {
        this.easterlyEgkkWesterly();
        this.easterlyEglcWesterly();
        this.easterlyEgkkEglcWesterly();
    }

    /**
     * Easterly Operations — EGKK Westerly
     */
    private easterlyEgkkWesterly() {
        for (const scores of this.easterly) {
            if (!scores.some(s => s.runway.id === "kks" && s.reverse)) continue;
            this.gen.runway(scores.map(
                config => config.runway.id !== "kks" || !config.reverse ? config : new RunwayConfiguration(config.score,
                    config.runway, {
                        reverse: false,
                        arrivals: config.arrivals,
                        departures: config.departures,
                        intersection: config.intersection,
                        backtrack: config.backtrack,
                        noSid: config.noSid,
                        offsetHeading: config.offsetHeading,
                    })));
        }
    }

    /**
     * Easterly Operations — EGLC Westerly
     */
    private easterlyEglcWesterly() {
        for (const scores of this.easterly) {
            if (!scores.some(s => s.runway.id === "lc" && s.reverse)) continue;
            this.gen.runway(scores.map(
                config => config.runway.id !== "lc" || !config.reverse ? config : new RunwayConfiguration(config.score,
                    config.runway, {
                        reverse: false,
                        arrivals: config.arrivals,
                        departures: config.departures,
                        intersection: config.intersection,
                        backtrack: config.backtrack,
                        noSid: config.noSid,
                        offsetHeading: config.offsetHeading,
                    })));
        }
    }

    /**
     * Easterly Operations — EGKK & EGLC Westerly
     */
    private easterlyEgkkEglcWesterly() {
        for (const scores of this.easterly) {
            if (!scores.some(s => (s.runway.id === "kks" || s.runway.id === "lc") && s.reverse)) continue;
            this.gen.runway(scores.map(
                config => (config.runway.id !== "kks" && config.runway.id !== "lc") || !config.reverse
                    ? config
                    : new RunwayConfiguration(config.score, config.runway, {
                        reverse: false,
                        arrivals: config.arrivals,
                        departures: config.departures,
                        intersection: config.intersection,
                        backtrack: config.backtrack,
                        noSid: config.noSid,
                        offsetHeading: config.offsetHeading,
                    })));
        }
    }

    /**
     * EGKK — Secondary Runway (26R/08L)
     */
    private egkkSecondary() {
        for (const scores of this.gen.configurations) {
            if (!scores.some(s => s.runway.id === "kks")) continue;
            this.gen.runway(scores.map(
                config => config.runway.id !== "kks" ? config : new RunwayConfiguration(config.score,
                    this.gen.runway("kkn"), {
                        reverse: config.reverse,
                        arrivals: config.arrivals,
                        departures: config.departures,
                        intersection: config.intersection,
                        backtrack: config.backtrack,
                        noSid: config.noSid,
                        offsetHeading: config.offsetHeading,
                    })));
        }
    }
}
