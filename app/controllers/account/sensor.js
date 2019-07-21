import Controller from '@ember/controller';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {measurement} from '../../helpers/measurement';

export default class extends Controller {
  @service intl;

  queryParams = [
    {
      field: {
        type: 'string',
      },
    },
  ];

  @computed('model.values.@each', 'field')
  get sensorData() {
    let mapFunc;
    if (this.get('field')) {
      mapFunc = (reading) => [
        Math.round(reading.get('timestamp').getTime()),
        Number.parseInt(reading.get(`value.${this.get('field')}`)),
      ];
    } else {
      mapFunc = (reading) => [
        Math.round(reading.get('timestamp').getTime()),
        Number.parseInt(reading.get('value')),
      ];
    }
    return this.get('model.values').map(mapFunc).sort((a, b) => a[0] - b[0]);
  }

  @computed('model.name', 'model.unitName', 'field')
  get chartOptions() {
    const name = this.get('field') ? this.intl.t(`obd.${this.get('field')}`) : this.get('model.name');
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
          }, {
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
