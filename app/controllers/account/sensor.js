import Controller from '@ember/controller';
import {computed} from '@ember-decorators/object';
import {measurement} from '../../helpers/measurement';

export default class extends Controller {
  @computed('model.values.@each')
  get sensorData() {
    return this.get('model.values').map((reading) =>
      [Math.round(new Date(reading.get('timestamp')).getTime()), reading.get('value')],
    ).sort((a, b) => a[0] - b[0]);
  }

  @computed('model.name', 'model.unitName')
  get chartOptions() {
    const name = this.get('model.name');
    const unitName = this.get('model.unitName');
    return {
      rangeSelector: {
        buttonTheme: {
          width: 80,
        },
        selected: 2,
        buttons: [
          {
            type: 'hour',
            text: 'Час',
          }, {
            type: 'day',
            text: 'День',
          }, {
            type: 'month',
            count: 1,
            text: 'Месяц',
          }, {
            type: 'ytd',
            text: 'Этот год',
          },{
            type: 'year',
            text: 'Год',
          }, {
            type: 'all',
            text: 'Все данные',
          },
        ],
      },
      scrollbar: {
        trackBackgroundColor: '#f9f9f9',
        trackBorderWidth: 0,
        trackBorderRadius: 7,
      },
      tooltip: {
        animation: true,
        formatter: function() {
          return `
          <i>${new Date(this.x).toLocaleString()}</i>
          <br/>
          <span style="fill:#7cb5ec; padding-right: 8px;">●</span>
          <b>${name}:</b> ${measurement([this.y, unitName])}`;
        },
        valueDecimals: 2,
      },
      yAxis: {
        title: {
          text: this.get('model.unitName'),
        },
      },
    };
  }

  @computed('model.name', 'model.unitName', 'sensorData')
  get content() {
    return [
      {
        name: this.get('model.name'),
        data: this.get('sensorData'),
      }];
  }

  theme = {
    colors: ['#567ba7'],
    chart: {
      backgroundColor: null,
      style: {
        fontFamily: 'Dosis, sans-serif',
      },
      zoomType: 'x',
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
