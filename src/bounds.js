
function between(n, min, max) {
    return n >= min && n <= max;
}

exports.overlapsBounds = function overlapsBounds(x, y, {left, top, right, bottom}) {
    return between(x, left, right) && between(y, top, bottom);
}
