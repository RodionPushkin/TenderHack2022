<template>
  <div class="container">
    <h1 class="m">Предиктивная <span>система анализа</span> котировочных сессий</h1>
    <search @searchinput="(e)=>{search(e)}"></search>
    <div class="card">
      <div>
        <p class="name">Название:</p>
        <p class="price">Цена:</p>
        <p class="price">Процентное падение НМЦК:</p>
      </div>
      <div>
        <p class="place">Регион:</p>
        <p class="date">Дата:</p>
        <p class="count">Количество участников:</p>
      </div>
    </div>
    <div class="chart-wrapper">
      <linechart v-if="showchart" ref="chart" :datasets="chartdata.datasets" :labels="chartdata.labels"
                 :options="chartdata.options" class="linechart"></linechart>
    </div>
    <div class="chart-wrapper">
      <linechart v-if="showchart" ref="chart2" :datasets="chartdata.datasets2" :labels="chartdata.labels"
                 :options="chartdata.options" class="linechart"></linechart>
    </div>
    <div class="chart-wrapper">
      <linechart v-if="showchart" ref="chart3" :datasets="chartdata.datasets3" :labels="chartdata.labels"
                 :options="chartdata.options" class="linechart"></linechart>
    </div>
  </div>
</template>
<script>
import Textinput from "@/components/textinput.component";
import Checkbox from "@/components/checkbox.component";
import Fileinput from "@/components/fileinput.component";
import linechart from "@/components/linechart.component";
import barchart from "@/components/barchart.component";
import search from "@/components/search.component";
import api from "@/api";

export default {
  name: "home",
  components: {Fileinput, Checkbox, Textinput, linechart, barchart, search},
  data() {
    return {
      showchart: false,
      info: {},
      chartdata: {
        delayed: false,
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'прошлые показатели',
            data: [0, 20, 20, 60, 60, 60, 120, 140, 180, 120, NaN, NaN, NaN],
            borderColor: "#FFFFFF",
            backgroundColor: "#FFFFFF",
            fill: false,
          }, {
            label: 'предсказано',
            data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 120, 10, 120, 130],
            borderDash: [5, 5],
            borderColor: "#6BD600",
            backgroundColor: "#6BD600",
            fill: false,
          }],
        datasets2: [
          {
            label: 'прошлые показатели',
            data: [0, 20, 20, 60, 60, 60, 120, 140, 180, 120, NaN, NaN, NaN],
            borderColor: "#FFFFFF",
            backgroundColor: "#FFFFFF",
            fill: false,
          }, {
            label: 'предсказано',
            data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 120, 10, 120, 130],
            borderDash: [5, 5],
            borderColor: "#6BD600",
            backgroundColor: "#6BD600",
            fill: false,
          }],
        datasets3: [
          {
            label: 'прошлые показатели',
            data: [0, 20, 20, 60, 60, 60, 120, 140, 180, 120, NaN, NaN, NaN],
            borderColor: "#FFFFFF",
            backgroundColor: "#FFFFFF",
            fill: false,
          }, {
            label: 'предсказано',
            data: [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 120, 10, 120, 130],
            borderDash: [5, 5],
            borderColor: "#6BD600",
            backgroundColor: "#6BD600",
            fill: false,
          }],
        options: {
          tension: 0.4,
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            onComplete: () => {
              this.chartdata.delayed = true;
            },
            delay: (ctx) => {
              let delay = 0;
              if (ctx.type == "data" && ctx.mode == "default" && !this.chartdata.delayed) {
                delay = ctx.dataIndex * 70 + ctx.datasetIndex * 40
              }
              return delay;
            }
          },
          interaction: {
            intersect: false,
          },
          // tooltips: {
          //   mode: 'index'
          // },
          scales: {
            x: {
              display: true,
              title: {
                display: true
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Цена'
              },
              suggestedMin: -10,
              suggestedMax: 200
            }
          }
        }
      }
    }
  },
  mounted() {
    if (this.$store.getters.ISFIRSTLOAD == true) {
      setTimeout(() => {
        this.showchart = true
      }, 4000)
    } else {
      this.showchart = true
    }
    setInterval(() => {
      for (let i = 0; i < 13; i++) {
        this.chartdata.datasets[0].data[i] = 0
        this.chartdata.datasets[1].data[i] = NaN
        this.chartdata.datasets2[0].data[i] = 0
        this.chartdata.datasets2[1].data[i] = NaN
        this.chartdata.datasets3[0].data[i] = 0
        this.chartdata.datasets3[1].data[i] = NaN
      }
      for (let i = 0; i < 13; i++) {
        let data = Math.floor(Math.random() * 1000)
        let data2 = Math.floor(Math.random() * 100)
        let data3 = Math.floor(Math.random() * 2000)
        this.chartdata.datasets[0].data[i] = data
        this.chartdata.datasets[1].data[i] = NaN
        this.chartdata.datasets2[0].data[i] = data2
        this.chartdata.datasets2[1].data[i] = NaN
        this.chartdata.datasets3[0].data[i] = data3
        this.chartdata.datasets3[1].data[i] = NaN
        if (i > 9) {
          this.chartdata.datasets[1].data[i] = data
          this.chartdata.datasets2[1].data[i] = data2
          this.chartdata.datasets3[1].data[i] = data3
        }
        if (i > 10) {
          this.chartdata.datasets[0].data[i] = NaN
          this.chartdata.datasets[1].data[i] = data
          this.chartdata.datasets2[0].data[i] = NaN
          this.chartdata.datasets2[1].data[i] = data2
          this.chartdata.datasets3[0].data[i] = NaN
          this.chartdata.datasets3[1].data[i] = data3
        }
      }
      if (this.$refs?.chart?.$refs.chart.chart) this.$refs?.chart?.$refs.chart.chart.update();
      if (this.$refs?.chart2?.$refs.chart.chart) this.$refs?.chart2?.$refs.chart.chart.update();
      if (this.$refs?.chart3?.$refs.chart.chart) this.$refs?.chart3?.$refs.chart.chart.update();
    }, 7000)
  },
  methods: {
    search(data) {
      console.log(data)
      let url = 'search'
      url += data.search != undefined ? `?search=${data.search['0']}` : ''
      url += data.filters.date != undefined ? `&date=${data.filters.date[0]}0${data.filters.date[1]}${data.filters.date[2]}` : ''
      url += data.filters.okpd != undefined ? `&okpd=${data.filters.okpd['0']}` : ''
      url += data.filters.kpgz != undefined ? `&kpgz=${data.filters.kpgz['0']}` : ''
      url += data.filters.region != undefined ? `&region=${data.filters.region['0']}` : ''
      url += data.filters.nmck != undefined ? `&nmck=${data.filters.nmck['0']}` : ''
      url += data.filters.inn != undefined ? `&inn=${data.filters.inn['0']}` : ''
      api.get(url).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    copy() {
      navigator.clipboard.writeText(this.$store.getters.PEERID)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  flex: 1 0 auto;
  height: 100%;
  display: flex;
  padding-top: 78px;
  @media screen and (max-width: 768px) {
    padding-top: 104px;
  }
  gap: 32px;
  flex-direction: column;

  h1 {
    color: var(--font-color2);
    user-select: none;

    span {
      color: var(--main-color);
    }
  }

  .chart-wrapper {
    .linechart {
      height: 350px;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      border-radius: var(--border-radius);
      .linechart {
        width: 1000px;
      }
    }
  }

  .card {
    width: 100%;
    display: flex;
    border-radius: var(--border-radius);
    background: var(--font-color);
    padding: 24px;
    flex-direction: column;
    color: var(--font-color4);
    font-weight: 500;
    font-size: 18px;
    gap: 32px;
    min-height: 200px;

    div {
      display: flex;
      align-items: center;
      gap: 32px;
      width: 100%;

      &:last-child {
        margin-top: auto;
      }

      .date {
        margin-right: auto;
      }

      .name {
        width: 50%;
      }

      .price {
        margin-left: auto;
      }
    }
  }
}
</style>
