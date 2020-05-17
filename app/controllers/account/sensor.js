import Controller from '@ember/controller';
import {action} from '@ember/object';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {measurement} from '../../helpers/measurement';
import {IS_LITE_MODE} from '../../constants';

function compact(array) {
  let index = -1;
  const length = array == null ? 0 : array.length;
  let resIndex = 0;
  const result = [];

  while (++index < length) {
    const value = array[index];
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
  get sensorData() {
    let mapFunc;
    if (this.get('field')) {
      mapFunc = (reading) => {
        const isSign = Boolean(reading.get('sign') && reading.get('signer'));

        return {
          x: Math.round(reading.get('timestamp').getTime()),
          y: Number.parseInt(reading.get(`value.${this.get('field')}`)),
          color: isSign ? 'red' : '#567ba7',
        };
      };
    } else {
      mapFunc = (reading) => {
        const isSign = Boolean(reading.get('sign') && reading.get('signer'));

        return {
          x: Math.round(reading.get('timestamp').getTime()),
          y: Number.parseInt(reading.get('value')),
          color: isSign ? 'red' : '#567ba7',
        };
      };
    }

    return compact(this.get('model.values').map(mapFunc)).sort((a, b) => a.x - b.x);
  }

  @computed('model.name', 'model.unitName', 'field')
  get chartOptions() {
    const name = this.get('field') ? this.intl.t(`obd.${this.get('field')}`) : this.get('model.name');
    const unitName = this.get('model.unitName');

    return {
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            radius: 4.2,
          },
          turboThreshold: 0,
        },
      },
      rangeSelector: {
        buttonTheme: {
          width: 80,
        },
        buttons: [
          {
            type: 'hour',
            text: 'Час',
          }, {
            type: 'day',
            text: 'День',
          }, {
            type: 'month',
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
        borderColor: '#567ba7',
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
  get content() {
    return [
      {
        name: this.get('model.name'),
        data: this.get('sensorData'),
        color: '#567ba7',
      },
    ];
  }

  get isGraphVisible() {
    return IS_LITE_MODE;
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

  @action
  async onChangeCompany(event) {
    const sensor = this.get('model.sensor');
    sensor.set('company', event.target.value && this.get('model.companies').findBy('id', event.target.value));
    await sensor.save();
  }
}
