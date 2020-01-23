import Controller from '@ember/controller';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {measurement} from '../../helpers/measurement';

function compact(array) {
  var index = -1,
    length = array == null ? 0 : array.length,
    resIndex = 0,
    result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

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
  get sensorDataSign() {
    let mapFunc;
    if (this.get('field')) {
      mapFunc = (reading) => {
        const isSign = Boolean(reading.get('sign') && reading.get('signer'));

        return isSign && [
          Math.round(reading.get('timestamp').getTime()),
          Number.parseInt(reading.get(`value.${this.get('field')}`))
        ];
      };
    } else {
      mapFunc = (reading) => [
        Math.round(reading.get('timestamp').getTime()),
        Number.parseInt(reading.get('value'))
      ];
    }
    return compact(this.get('model.values').map(mapFunc)).sort((a, b) => a[0] - b[0]);
  }

  @computed('model.values.@each', 'field')
  get sensorDataNoSign() {
    let mapFunc;
    if (this.get('field')) {
      mapFunc = (reading) => {
        const isSign = Boolean(reading.get('sign') && reading.get('signer'));

        return !isSign && [
          Math.round(reading.get('timestamp').getTime()),
          Number.parseInt(reading.get(`value.${this.get('field')}`))
        ];
      };
    } else {
      mapFunc = (reading) => [
        Math.round(reading.get('timestamp').getTime()),
        Number.parseInt(reading.get('value'))
      ];
    }
    return compact(this.get('model.values').map(mapFunc)).sort((a, b) => a[0] - b[0]);
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
  get contentAll() {
    return [
      {
        name: this.get('model.name'),
        data: this.get('sensorDataSign'),
        color: '#567ba7'
      },
      {
        name: this.get('model.name'),
        data: this.get('sensorDataNoSign'),
        color: '#ff0000',
      }
    ];
  }

  @computed('model.name', 'model.unitName', 'sensorData')
  get content() {
    return [
      {
        name: this.get('model.name'),
        data: this.get('sensorDataSign'),
        color: '#567ba7'
      }
    ];
  }

  theme = {
    colors: ['#567ba7', '#ff0000'],
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
