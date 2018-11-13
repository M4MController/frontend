import Controller from '@ember/controller';
import {computed} from '@ember-decorators/object';
import {map} from '@ember-decorators/object/computed';

export default class extends Controller {
  @map('model.values')
  dataUnsorted(reading) {
    return [Math.round(new Date(reading.get('timestamp')).getTime()), reading.get('value')];
  }

  @computed('model.name')
  get chartOptions() {
    return {
      rangeSelector: {
        selected: 1,
      },
      yAxis: {
        title: {
          text: this.get('model.unitName'),
        },
      },
    };
  }

  @computed('model.name', 'data')
  get content() {
    return [
      {
        name: this.get('model.name'),
        data: this.get('dataUnsorted').sort((a, b) => b[0] < a[0]),
        tooltip: {
          valueDecimals: 2,
        },
      }];
  }

  theme = {
    colors: ['#567ba7'],
    chart: {
      backgroundColor: null,
      style: {
        fontFamily: 'Dosis, sans-serif',
      },
    },
    tooltip: {
      borderWidth: 0,
      backgroundColor: 'rgba(219,219,216,0.8)',
      shadow: false,
    },
    legend: {
      itemStyle: {
        fontWeight: 'bold',
        fontSize: '13px',
      },
    },
    xAxis: {
      gridLineWidth: 1,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yAxis: {
      minorTickInterval: 'auto',
      title: {
        style: {
          textTransform: 'uppercase',
        },
      },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    plotOptions: {
      candlestick: {
        lineColor: '#404048',
      },
    },

    // General
    background2: '#F0F0EA',

  };
}
