let PI = Math.PI
let PI2 = Math.PI * 2
let svg = SVG('svg-container').size(window.innerWidth, window.innerHeight)
let nShapes = 400

noise.seed(Math.random());

let drawGroup = svg.group()
drawGroup.center(window.innerWidth * 0.5, window.innerHeight * 0.5)

let rays = []

for (let i = 0; i < nShapes; i++) {
    let rndAngle = noise.simplex2(i, 1)
    rndAngle *= rndAngle * 2.5
    let a = rndAngle * PI
    let length = 50 + Math.random() * 300
    let width = 0.05 + (1 - (length / 350)) * 0.4

    rays.push({
        a,
        length,
        width
    })
}

rays = rays.sort(function(a, b) {
    return a.length < b.length
 })


for (let i = 0; i < nShapes; i++) {
    let a = rays[i].a
    let length = rays[i].length
    let width = rays[i].width

    let p1 = {
        x: 0,
        y: 0
    }
    let p2 = {
        x: Math.cos(a) * length,
        y: Math.sin(a) * length
    }
    let p3 = {
        x: Math.cos(a + width) * length,
        y: Math.sin(a + width) * length
    }

    let gradient = svg.gradient('linear', function(stop) {
        stop.at(0, '#333')
        stop.at(0.5, '#c9c')
        stop.at(1, '#fff')
    })

    var gradientAngle = angleToPoints(a)

    gradient.attr({
        x1: gradientAngle.x1,
        y1: gradientAngle.y1,
        x2: gradientAngle.x2,
        y2: gradientAngle.y2,
    })

    let ray = drawGroup.polygon(`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`).fill(gradient)

    let circleWidth = Math.sqrt((p3.x - p2.x) * (p3.x - p2.x) + (p3.y - p2.y) * (p3.y - p2.y))
    let circle = drawGroup.circle(circleWidth).fill('#dad')
    circle.center((p2.x + p3.x) / 2, (p2.y + p3.y) / 2)
    //circle.opacity(0.5)
}


function angleToPoints(rad) {
    rad += Math.PI

	var segment = Math.floor(rad / Math.PI * 2) + 2
	var diagonal =  (1/2 * segment + 1/4) * Math.PI
	var op = Math.cos(Math.abs(diagonal - rad)) * Math.sqrt(2)
	var x = op * Math.cos(rad)
	var y = op * Math.sin(rad)

	return {
		x1: x < 0 ? 1 : 0,
		y1: y < 0 ? 1 : 0,
		x2: x >= 0 ? x : x + 1,
		y2: y >= 0 ? y : y + 1
	}
}
