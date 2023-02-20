async function fn() {
    const stuData = await axios({
        url: '/dashboard',
    })
    console.log(stuData);

    // 综合信息栏
    initOv(stuData)
    // 全学科薪资走势图 - 曲线图
    initLine(stuData)
}

// 综合信息栏
function initOv(data) {
    const obj = data.data.overview
    for (const k in obj) {
        document.querySelector(`[name="${k}"]`).innerHTML = obj[k]
    }
}

// 全学科薪资走势图 - 曲线图
function initLine(data) {
    const myChart = echarts.init(document.querySelector('#line'));
    const option = {
        title: {
            text: '2023全学克薪资走势',
            top: 6,
            left: 5
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.data.year.map(x => {
                return x.month
            })
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis'
        },

        yAxis: {
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                data: data.data.year.map(item => {
                    return item.salary
                }),
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: '#4c99ee',
                    width: 6
                },
                symbolSize: 12,
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#9ad0ff' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                areaStyle: {}
            }
        ]
    };
    myChart.setOption(option);

}

fn()