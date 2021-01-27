import { std } from 'mathjs/'
import { SERVER_STATUS } from '../lib/constants';

export class ClusterCityStatus {
  constructor(data) {
    this.setData(data);
  }

  setData(data) {
    this._data = data;
  }

  getData() {
    return this._data ? this._data : [];
  }

  get isAlive() {
    return this.getData().reduce((isAlive, { alive }) => isAlive || alive, false);
  }
  get times() {
    return this.getData().reduce((acc, timeInfo) => {
      const { alive, time } = timeInfo;
      if (alive) return [...acc, time];
      return acc;
    }, []);
  }
  get max() {
    return Math.max(...this.times).toFixed(0);
  }
  get min() {
    return Math.min(...this.times).toFixed(0);
  }
  get mean() {
    const times = this.times;
    const length = times.length;
    // if (!length) console.log("asdsad",this._data)
    if (!length) return 0;

    const sum = times.reduce((acc, current) => acc + current, 0);
    const mean = sum / length;
    return Number(mean.toFixed(0));
  }
  get stddev() {
    const times = this.times;
    if (times.length) return std(times).toFixed(0);
    return 0;
  }

  get status() {
    if (!this._data) return SERVER_STATUS.NOT_CHECKED;
    if (!this.isAlive) return SERVER_STATUS.UNAVAILABLE;
    if (this.stddev < 25) return SERVER_STATUS.AVAILABLE;
    return SERVER_STATUS.UNSTABLE;
  }
}

