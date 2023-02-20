async function fn() {
    const stuData = await axios({
        url: '/dashboard',
    })
    console.log(stuData);

    // 综合信息栏
    initOv(stuData)
}

function initOv(data) {
    const obj = data.data.overview
    for (const k in obj) {
        document.querySelector(`[name="${k}"]`).innerHTML = obj[k]
    }
}

fn()