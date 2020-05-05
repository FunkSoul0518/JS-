//變數
var hit = document.querySelector('.click')
var content = document.querySelector('.content')
var contentList = document.querySelector('.contentblock')
var bmiData = JSON.parse(localStorage.getItem('bmidata')) || []
var height = document.getElementById('height')
var weight = document.getElementById('weight')
var btnVary = document.getElementById('bmi_result')
var btnState = document.getElementById('status')
var list = []

// 事件監聽

hit.addEventListener('click', fingerHit, false)
content.addEventListener('click', deData)
updateMenu(bmiData)

// 涵式

// 點擊事件
function fingerHit(e) {
  var tall = parseInt(height.value) / 100
  var kg = parseInt(weight.value)
  var BMI = (kg / (tall * tall)).toFixed(2)
  // console.log(bmi)

  var state = ''
  var color = ''
  if (BMI < 15) {
    state = '體重嚴重不足'
    color = 'gray'
  } else if (BMI >= 15 && BMI < 16) {
    state = '體重過輕'
    color = 'pink'
  } else if (BMI >= 16 && BMI < 18.5) {
    state = '體重稍輕'
    color = 'lightpink'
  } else if (BMI >= 18.5 && BMI < 25) {
    state = '健康體重'
    color = 'green'
  } else if (BMI >= 30 && BMI < 35) {
    state = '中等肥胖'
    color = 'orange'
  } else if (BMI >= 35 && BMI < 40) {
    state = '嚴重肥胖'
    color = 'darkred'
  } else {
    state = '非常嚴重肥胖'
    color = 'red'
  }

  if (weight.value == '' || height.value == '') {
    alert('請輸入身高體重!!')
    return false
  }

  var list = {
    bmi: BMI,
    weight: kg,
    height: tall,
    state: state,
    color: color,
  }

  bmiData.push(list)

  localStorage.setItem('bmidata', JSON.stringify(bmiData))

  //更新頁面
  updateMenu(bmiData)
  //執行換按鈕工作
  refreshBtn(bmiData)
}

//更新頁面
function updateMenu(bmiData) {
  var str = ''
  var len = bmiData.length
  for (var i = 0; i < len; i++) {
    str += `<li class="${bmiData[i].color}"><a href="#" data-in="${i}">刪除</a>
    ${bmiData[i].state}
    BMI  : ${bmiData[i].bmi}
    身高 : ${bmiData[i].height}公尺
    體重 : ${bmiData[i].weight}公斤
    </li>`
  }
  contentList.innerHTML = str
  localStorage.setItem('bmidata', JSON.stringify(bmiData))
}

//右側按鈕更新

function refreshBtn(bmiData) {
  hit.setAttribute('class', 'btn_hide')
  var str = ''
  var len = bmiData.length
  for (var i = 0; i < len; i++) {
    str += `<div class="${bmiData[i].color} btnChange">
    <p class="${bmiData[i].color}">${bmiData[i].state}</p>
    <a href="#" class="reset">重置</a>
  </div>`

    btnVary.innerHTML = str
  }

  //按鈕重置
  var reset_btn = document.querySelector('.reset')
  reset_btn.addEventListener('click', resetBtn)

  function resetBtn() {
    hit.setAttribute('class', 'click')
    var btn = document.querySelector('.btnChange')
    btn.setAttribute('class', 'change_Hide')
    weight.value = ''
    height.value = ''
  }
}

//刪除資料
function deData(e) {
  if (e.target.nodeName !== 'A') {
    return
  }
  var del = e.target.dataset.in
  bmiData.splice(del, 1)
  localStorage.setItem('bmidata', JSON.stringify(bmiData))
  updateMenu(bmiData)
}
