const area = {
    square : length => length ** 2,
    circle: radius => Math.PI * radius ** 2,
    rectangle: (width, height) => width * height,
    FAV_FOOD:['burger','subway']
}

module.exports = area;