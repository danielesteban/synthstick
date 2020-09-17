class Visualizer {
  constructor({ analyser, dom }) {
    this.analyser = analyser;
    const canvas = document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 92;
    canvas.style.verticalAlign = 'middle';
    dom.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = '#111';
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#393';
    this.animate = this.animate.bind(this);
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);
    const { analyser, canvas, ctx } = this;
   
    analyser.getByteTimeDomainData(analyser.buffer); 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const len = analyser.buffer.length;
    const sliceWidth = canvas.width * 1.0 / len;

    ctx.beginPath();
    for (let i = 0, x = 0; i < len; i += 1, x += sliceWidth) {
      const v = analyser.buffer[i] / 128.0;
      const y = v * canvas.height / 2;
      if(i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
  }
}

export default Visualizer;
