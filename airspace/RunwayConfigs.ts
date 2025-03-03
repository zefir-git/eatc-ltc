import Generator from "../src/Generator.js";
import RunwayConfiguration from "../src/RunwayConfiguration.js";

export default class RunwayConfigs {
    private readonly gen = Generator.getInstance();
    
    public init() {
        this.allWesterly();
        this.allEasterly();
        this.egkkSecondary();
    }

    /**
     * All Airports — Westerly Operations
     */
    private allWesterly() {
        this.gen.runway([
            new RunwayConfiguration(0, this.gen.runway("lls"), {arrivals: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {departures: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true}),
        ]);
        this.gen.runway([
            new RunwayConfiguration(0, this.gen.runway("lls"), {departures: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {arrivals: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true}),
        ]);
        this.gen.runway([
            new RunwayConfiguration(0, this.gen.runway("lls"), {arrivals: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {departures: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true}),
            new RunwayConfiguration(23, this.gen.runway("lln"), {arrivals: true, departures: true}),
        ]);
        this.gen.runway([
            new RunwayConfiguration(0, this.gen.runway("lls"), {departures: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {arrivals: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true}),
            new RunwayConfiguration(23, this.gen.runway("lls"), {arrivals: true, departures: true}),
        ]);
    }

    /**
     * All Airports — Easterly Operations
     */
    private allEasterly() {
        this.gen.runway([
            new RunwayConfiguration(0, this.gen.runway("lls"), {departures: true, reverse: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {arrivals: true, reverse: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true, reverse: true}),
        ]);

        this.gen.runway([
            new RunwayConfiguration(0, this.gen.runway("lls"), {departures: true, reverse: true}),
            new RunwayConfiguration(0, this.gen.runway("lln"), {arrivals: true, reverse: true}),
            new RunwayConfiguration(8, this.gen.runway("kks"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(12, this.gen.runway("ss"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(18, this.gen.runway("gw"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(24, this.gen.runway("lc"), {arrivals: true, departures: true, reverse: true}),
            new RunwayConfiguration(23, this.gen.runway("lls"), {arrivals: true, departures: true, reverse: true}),
        ]);
    }

    /**
     * EGKK — Secondary Runway (26R/08L)
     */
    private egkkSecondary() {
        for (const scores of this.gen.configurations) {
            if (!scores.some(s => s.runway.id === "kks"))
                continue;
            const score: RunwayConfiguration[] = [];
            for (const config of scores) {
                if (config.runway.id === "kks")
                    score.push(new RunwayConfiguration(
                        config.score,
                        this.gen.runway("kkn"),
                        {
                            reverse: config.reverse,
                            arrivals: config.arrivals,
                            departures: config.departures,
                            intersection: config.intersection,
                            backtrack: config.backtrack,
                            noSid: config.noSid,
                            offsetHeading: config.offsetHeading,
                        },
                    ));
                else score.push(config);
            }
            this.gen.runway(score);
        }
    }
}
