import Polygon from "./Polygon.js";
import Fix from "./Fix.js";

export class Area<T extends Polygon | {radius: number, position: Fix}> {
    public constructor(
        /**
         * Name of the area. Set to `null` to allow aircraft inbound the main
         * airport to enter the area below the minimum altitude.
         */
        public readonly name: string | null,
        /**
         * Minimum allowed altitude in feet.
         */
        public readonly altitude: number,
        /**
         * Label position
         */
        public readonly labelPosition: Fix,
        /**
         * Area shape
         */
        public readonly shape: T,
        /**
         * Draw partially only.
         * For polygon: the number of lines from the end of the polygon to make
         * invisible.
         * For circle: the start and end angle of the visible arc.
         *
         * Omit to draw fully.
         */
        public readonly draw?: T extends Polygon ? number : [start: number, end: number]
    ) {

    }

    public toString(): string {
        return [
            this.name === null ? null : `name = ${this.name}`,
            `altitude = ${this.altitude}`,
            `shape = ${Array.isArray(this.shape) ? "circle" : "polygon"}`,
            `labelpos = ${this.labelPosition.toString()}`,
            this.shape instanceof Polygon
                ? [
                    `points =`,
                    this.shape.toString(),
                    this.draw === undefined ? null : `draw = ${this.draw}`
                ].filter(l => l !== null).join("\n")
                : [
                    `radius = ${this.shape.radius}`,
                    `position = ${this.shape.position.toString()}`,
                    this.draw === undefined ? null : `drawDegrees = ${(this.draw as number[]).join(", ")}`
                ].filter(l => l !== null).join("\n")
        ].filter(l => l !== null).join("\n");
    }
}
