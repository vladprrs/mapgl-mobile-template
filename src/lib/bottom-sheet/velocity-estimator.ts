export interface VelocitySample {
  time: number; // ms
  value: number; // position in percent (or pixels depending on caller convention)
}

export class VelocityEstimator {
  private samples: VelocitySample[] = [];
  private readonly maxSamples: number;

  constructor(maxSamples: number = 8) {
    this.maxSamples = Math.max(2, maxSamples);
  }

  reset() {
    this.samples = [];
  }

  addSample(value: number, time: number = performance.now()) {
    this.samples.push({ value, time });
    if (this.samples.length > this.maxSamples) {
      this.samples.shift();
    }
  }

  getVelocity(): number {
    if (this.samples.length < 2) return 0;
    // Use the last two to three intervals for a more recent velocity estimate
    const n = this.samples.length;
    const recent = this.samples.slice(Math.max(0, n - 3));
    const first = recent[0];
    const last = recent[recent.length - 1];
    const dt = Math.max(1, last.time - first.time); // ms
    const dv = last.value - first.value;
    return dv / dt; // value per ms
  }
}


