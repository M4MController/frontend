import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';
import {set, getProperties, get, computed, getWithDefault} from '@ember/object';
import {setDefaultHighChartOptions} from 'ember-highcharts/utils/option-loader';
import {getSeriesMap, getSeriesChanges} from 'ember-highcharts/utils/chart-data';
import {observes} from '@ember-decorators/object';

export default class extends EmberHighChartsComponent {
  layoutName = 'ember-highcharts/templates/components/high-charts';

  didReceiveAttrs(...args) {
    // eslint-disable-next-line max-len
    // https://github.com/ahmadsoe/ember-highcharts/blob/633bb3db408cc7fb5612d8f35d9144bea0f64b1e/addon/components/high-charts.js#L51

    // super.didReceiveAttrs(...args);
    // return;
    let {content, chart, mode} = getProperties(this, 'content', 'chart', 'mode');

    if (!content || !chart) {
      return;
    }

    let isStockChart = mode === 'StockChart';

    // create maps to make series data easier to work with
    let contentSeriesMap = getSeriesMap(content);
    let chartSeriesMap = getSeriesMap(chart.series);

    // remove and update current series
    let chartSeriesToRemove = [];

    chart.series.forEach((series) => {
      if (isStockChart && series.name.match(/^Navigator/)) {
        return;
      }

      let contentSeries = contentSeriesMap[series.name];

      if (!contentSeries) {
        return chartSeriesToRemove.push(series);
      }

      series.update(contentSeries, false);
    });

    chartSeriesToRemove.forEach((series) => series.remove(false));

    // add new series
    content.forEach((contentSeries) => {
      if (!chartSeriesMap.hasOwnProperty(contentSeries.name)) {
        chart.addSeries(contentSeries, false);
      }
    });

    return chart.redraw();
  }
}
