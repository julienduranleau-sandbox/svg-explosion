const PI = Math.PI
const PI2 = Math.PI * 2
const nShapes = 150
const amountOfRandom = 0.2

let svg = SVG('svg-container').size(window.innerWidth, window.innerHeight)

svg.rect(window.innerWidth, window.innerHeight).fill(svg.gradient('linear', function(stop) {
  stop.at(0, '#ccd1e5')
  stop.at(1, '#dab7b1')
}))

let drawGroup = svg.group()
drawGroup.center(window.innerWidth * 0.5, window.innerHeight * 0.5)

let rays = []

let burstAngle = Math.random() * PI2

for (let i = 0; i < nShapes; i++) {
  let a = null

  if (i < nShapes * (1 - amountOfRandom)) {
    a = burstAngle + (Math.exp(i/nShapes * 1.2))
  } else {
    a = Math.random() * PI2
  }

  let length = 50 + Math.random() * 700
  let startWidth = 3 + Math.random() * 10
  let endWidth = 10 + Math.random() * 20

  rays.push({
    a,
    length,
    startWidth,
    endWidth
  })
}

rays = rays.sort(function(a, b) {
  return a.length < b.length
})


for (let i = 0; i < nShapes; i++) {
  let a = rays[i].a
  let length = rays[i].length
  let startWidth = rays[i].startWidth
  let endWidth = rays[i].endWidth

  let p1 = {
    x: 0,
    y: -startWidth * 0.5
  }
  let p2 = {
    x: length,
    y: -endWidth * 0.5
  }
  let p3 = {
    x: length,
    y: endWidth * 0.5
  }
  let p4 = {
    x: 0,
    y: startWidth * 0.5
  }

  let gradient = svg.gradient('linear', function(stop) {
    stop.at(0, tinycolor('#d95d79').darken(Math.random() * 35 + 15).saturate(Math.random() * 50.0).toString())
    stop.at(0.7, tinycolor('#d95d79').saturate(Math.random()).toString())
    stop.at(1, tinycolor('#d2c4de').saturate(Math.random() * 25.0).toString())
  }).attr({
    x1: 0, y1: 0,
    x2: 1, y2: 0,
  })

  let gradientOverlay = svg.gradient('linear', function(stop) {
    let nSteps = 15
    let stepSize = 1 / nSteps
    for (let i = 0; i < nSteps; i++) {
      stop.at(i * stepSize, i%2 == 0 ? '#000' : '#fff')
    }
  }).attr({
    x1: 0, y1: 0,
    x2: 0, y2: 1,
  })

  let ray = drawGroup.polygon(`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`).fill(gradient)
  ray.rotate(a * 180 / PI, 0, 0)

  let rayOverlay = drawGroup.polygon(`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`).fill(gradientOverlay)
  rayOverlay.rotate(a * 180 / PI, 0, 0)
  rayOverlay.opacity(0.04)


  let circleWidth = Math.sqrt((p3.x - p2.x) * (p3.x - p2.x) + (p3.y - p2.y) * (p3.y - p2.y))
  let circle = drawGroup.circle(circleWidth).fill(tinycolor('#d4c6df').saturate((Math.random() - 0.5) * 0.2).toString())
  circle.center(Math.cos(a) * length, Math.sin(a) * length)

  let circleOverlay = drawGroup.circle(circleWidth).fill(gradientOverlay)
  circleOverlay.center(Math.cos(a) * length, Math.sin(a) * length)
  circleOverlay.rotate(a * 180 / PI)
  circleOverlay.opacity(0.04)
}
