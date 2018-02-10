
function between(n, min, max) {
    return min <= n && n <= max;
}

exports.overlapsBounds = function overlapsBounds(x, y, {left, top, width, height, right, bottom}) {
    if (right == undefined) right = left + width;
    if (bottom == undefined) bottom = top + height;
    return between(x, left, right) && between(y, top, bottom);
}
