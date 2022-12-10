<template>
  <div class="container">
    <h1 class="m">Предиктивная <span>система анализа</span> котировочных сессий</h1>
    <search @searchinput="(e)=>{search(e)}"></search>
    <linechart class="linechart" :datasets="chartdata.datasets" :labels="chartdata.labels" :options="chartdata.options"></linechart>
  </div>
</template>
<script>
import Textinput from "@/components/textinput.component";
import Checkbox from "@/components/checkbox.component";
import Fileinput from "@/components/fileinput.component";
import linechart from "@/components/linechart.component";
import barchart from "@/components/barchart.component";
import search from "@/components/search.component";

export default {
  name: "home",
  components: {Fileinput, Checkbox, Textinput, linechart, barchart,search},
  data() {
    return {
      chartdata: {
        delayed: false,
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
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
  },
  methods: {
    search(data){
      console.log(data)
    },
    copy(){
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
  .linechart{
    height: 350px;
  }
}
</style>
