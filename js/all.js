// 變數
var allData = []

var noReapeat

// AJAX

var xhr = new XMLHttpRequest()

xhr.open(
  'GET',
  'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',
  true
)

xhr.send(null)

// 轉換資料型態

xhr.onload = function () {
  if (xhr.status !== 200) {
    return
  }
  var jsonobj = JSON.parse(xhr.responseText)
  allData = jsonobj.result.records

  updateMenu()
}
// AJAX

// view階層

// 更新選單事件
function updateMenu() {
  // 抓出所有zone的資料
  var allDataZone = []
  for (var i = 0; i < allData.length; i++) {
    allDataZone.push(allData[i].Zone)
  }
  // 把重複的過濾掉

  noReapeat = Array.from(new Set(allDataZone))

  // 組字串
  var str = ''
  str = `<option value="">--請選擇行政區--</option>`

  for (var i = 0; i < noReapeat.length; i++) {
    str += `<option value="${noReapeat[i]}">${noReapeat[i]}</option>`
  }

  document.querySelector('.bar').innerHTML = str
}

// 更新選單事件

// 更新下方title事件

var option = document.querySelector('.bar')
var title = document.querySelector('.title')

option.addEventListener('change', updateTitle)

function updateTitle(e) {
  var select = e.target.value

  var titleStr = ''
  for (var i = 0; i < noReapeat.length; i++) {
    if (select == noReapeat[i]) {
      titleStr = noReapeat[i]
    }
  }

  title.innerHTML = titleStr
}
// 更新下方title事件

// 更新下方Content
var content = document.querySelector('.content')

// 選單上綁定第二個事件
option.addEventListener('change', updateContent)

function updateContent(e) {
  var select = e.target.value
  // 內容更新

  var contentStr = ''
  for (var i = 0; i < allData.length; i++) {
    if (select == allData[i].Zone) {
      contentStr += `
      <div class="content_block">
        <div class="pic d-flex justify-between bg-cover"
        style=background-image:url(${allData[i].Picture1})>
          <div class="Nametitle">${allData[i].Name}</div>
          <div class="Zonetitle">${allData[i].Zone}</div>
        </div>

        <ul>
          <li class="info d-flex align-center">
            <div class="infoIcon">
              <img src="images/icons_clock.png" alt="" />
            </div>
            <p>${allData[i].Opentime}</p>
          </li>

          <li class="info d-flex align-center">
            <div class="infoIcon">
              <img src="images/icons_pin.png" alt="" />
            </div>
            <p>${allData[i].Add}</p>
          </li>

          <li class="info2 d-flex align-center justify-between">
            <div class="box1 d-flex align-center">
              <div class="infoIcon">
                <img src="images/icons_phone.png" alt="" />
              </div>
              <p>${allData[i].Tel}</p>
            </div>
            <div class="box2 d-flex align-center">
              <div class="infoIcon">
                <img src="images/icons_tag.png" alt="" />
              </div>
              <p>${allData[i].Ticketinfo}</p>
            </div>
          </li>
        </ul>
      </div>
    `
    }
  }
  content.innerHTML = contentStr
}
// 更新下方Content
