import fs from "node:fs/promises";
import path from "node:path";

interface Airline {
    cs: string;
    frequency: number;
    aircraft: Set<string>;
    pronunciation?: string;
    direction: Set<"n" | "e" | "s" | "w">;
}

function parseAirlines(airlines: string): Airline[] {
    return airlines
        .trim()
        .split("\n")
        .map(line => {
            const [cs, frequency, type, pronunciation, direction] = line.trim().split(/,\s*/);
            return {
                cs: cs!,
                frequency: Number.parseFloat(frequency!),
                aircraft: new Set(type!.split("/")),
                pronunciation: pronunciation!,
                direction: new Set<"n" | "e" | "s" | "w">(direction!.split("") as any),
            };
        })
        .filter(a => a.frequency !== 0);
}

const directionOrder = {n: 0, e: 1, s: 2, w: 3};

function stringifyAirlines(airlines: Airline[]): string {
    return airlines
        .sort((a, b) => a.cs.localeCompare(b.cs))
        .sort((a, b) => b.frequency - a.frequency)
        .map(a => "\t" + [a.cs,
            a.frequency.toFixed(2),
            Array.from(a.aircraft).sort((a, b) => a.localeCompare(b)).join("/"),
            a.pronunciation,
            Array.from(a.direction).sort((a, b) => directionOrder[a] - directionOrder[b]).join("")].join(", "))
        .join("\n") + "\n";
}

function groupAirlines(airlines: Airline[]): Airline[] {
    const used = new Set<number>();
    const result: Airline[] = [];

    function markUsed(indices: Iterable<number>) {
        for (const index of indices) used.add(index);
    }

    function group(airlines: Airline[]): Airline {
        return {
            cs: airlines[0]!.cs,
            frequency: airlines.reduce((sum, airline) => sum + airline.frequency, 0),
            aircraft: airlines.reduce((set, airline) => set.union(airline.aircraft), new Set<string>()),
            pronunciation: airlines[0]!.pronunciation,
            direction: airlines.reduce((set, airline) => set.union(airline.direction),
                new Set<"n" | "e" | "s" | "w">()),
        };
    }

    for (let i = 0; i < airlines.length; ++i) {
        const airline = airlines[i]!;
        if (used.has(i) || airline.direction.size !== 1 || airline.aircraft.size !== 1) continue;

        // find matching callsign, frequency, and direction
        const matching = new Map(airlines
            .map((aln, index) => [index, aln] as const)
            .filter(([_, aln]) => aln.direction.size === 1
                && aln.aircraft.size === 1
                && airline.cs === aln.cs
                && airline.frequency === aln.frequency
                && airline.direction.has(aln.direction.values().next().value!)));

        if (matching.size > 1) {
            markUsed(matching.keys());
            result.push(group(Array.from(matching.values())));
        }
    }

    for (let i = 0; i < airlines.length; ++i) {
        const airline = airlines[i]!;
        if (used.has(i) || airline.direction.size !== 1 || airline.aircraft.size !== 1) continue;

        // find matching callsign, frequency, and type
        const matching = new Map(airlines
            .map((aln, index) => [index, aln] as const)
            .filter(([_, aln]) => aln.direction.size === 1
                && aln.aircraft.size === 1
                && airline.cs === aln.cs
                && airline.frequency === aln.frequency
                && airline.aircraft.has(aln.aircraft.values().next().value!)));

        if (matching.size > 1) {
            markUsed(matching.keys());
            result.push(group(Array.from(matching.values())));
        }
    }

    for (let i = 0; i < airlines.length; ++i) {
        if (used.has(i)) continue;
        result.push(airlines[i]!);
    }

    return result;
}

const files = (await fs.readdir("airlines")).filter(file => path.extname(file) === ".txt");
for (const file of files) {
    const airlines = parseAirlines(await fs.readFile(path.join("airlines", file), "utf8"));
    const grouped = groupAirlines(airlines);
    await fs.writeFile(path.join("airlines", file), stringifyAirlines(grouped));
}
