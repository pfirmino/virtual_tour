//Enables pich movement for the camera
AFRAME.components[
  "look-controls"
].Component.prototype.onTouchMove = function (t) {
  var PI_2 = Math.PI / 2,
    e,
    o = this.el.sceneEl.canvas,
    i = this.yawObject,
    j = this.pitchObject;
  this.touchStarted &&
    this.data.touchEnabled &&
    ((e =
      (2 * Math.PI * (t.touches[0].pageX - this.touchStart.x)) /
      o.clientWidth),
      (f =
        (2 * Math.PI * (t.touches[0].pageY - this.touchStart.y)) /
        o.clientHeight),
      (j.rotation.x += 0.3 * f),
      (i.rotation.y += 0.5 * e),
      (j.rotation.x = Math.max(-PI_2, Math.min(PI_2, j.rotation.x))),
      (this.touchStart = {
        x: t.touches[0].pageX,
        y: t.touches[0].pageY
      }));
};