//Enables pich movement for the camera
AFRAME.components[
  "look-controls"
].Component.prototype.onTouchMove = function (t) {
  var PI_2 = Math.PI / 2,
    deltaX,
    deltaY,
    canvas = this.el.sceneEl.canvas,
    yawObject  = this.yawObject,
    pitchObject = this.pitchObject,
    direction;

  this.touchStarted && this.data.touchEnabled && (
    (direction = this.data.reverseTouchDrag ? 1 : -1),
    (deltaY = (2 * Math.PI * (t.touches[0].pageX - this.touchStart.x)) / canvas.clientWidth),
    (deltaX = (2 * Math.PI * (t.touches[0].pageY - this.touchStart.y)) / canvas.clientHeight),
    (pitchObject.rotation.x += 0.3 * deltaX * direction),
    (yawObject.rotation.y += 0.5 * deltaY * direction),
    (pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x))),
    (this.touchStart = { x: t.touches[0].pageX, y: t.touches[0].pageY })
  );
}