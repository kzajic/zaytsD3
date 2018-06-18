export default class progressBar {
 constructor(selector) {
    let size = {
          width: 200,
          height: 200
      };
      
    let color_progress = '#4ecdc4';
    let color_background = '#c7f465';
    let color_label = '#556370';

    this.svg = d3
          .select(selector)
          .append("svg")
          .attr("width", size.width)
          .attr("height", size.height)
          .append("g")
          .attr("transform", "translate(" + size.width / 2 + "," + size.height / 2 + ")");

    const radius = Math.min(size.width, size.height) * 0.35;
    const tau_end = 1.8 * Math.PI;
    const tau_start = 0.2 * Math.PI;
    this.tau_start = tau_start;

    this.arc = d3.arc()
        .startAngle(tau_start)
        .innerRadius(radius - 30)
        .outerRadius(radius);

    this.backgroundArc = this.svg.append("path")
          .datum({endAngle: tau_end})
          .attr('transform', `rotate(180)`)
          .attr('fill', color_background)
          .attr('d', this.arc);

    this.progressArc = this.svg.append("path")
          .datum({endAngle: tau_start})
          .attr('transform', `rotate(180)`)
          .attr('fill', color_progress);

    this.progressLabel = this.svg.append("text")
        .attr('class', 'progress-label')
        .attr('transform', `translate(0,${size.height * 0.2})`)
        .text('0')
        .attr('fill',color_label)
        .attr('font-family','Open Sans')
        .attr('text-anchor','middle')
        .attr('font-size', '22px');
    
    this.percentSign = this.svg.append("text")
        .attr('font-size', '12px' )
        .attr('transform', `translate(0,${size.height * 0.3})`)
        .text('%')
        .attr('fill',color_label)
        .attr('font-family','Open Sans')
        .attr('text-anchor','middle');
  }

  update(progress) {
    const transitionDuration = 1500
    const arcTween = (newAngle) => {
        return (d) => {
            var interpolate = d3.interpolate(d.endAngle, newAngle + this.tau_start);
            return (t) => {
                d.endAngle = interpolate(t);
            return this.arc(d);
            };
        };
    };

    this.progressArc
        .transition()
        .duration(transitionDuration)
        .attrTween('d', arcTween(progress / 100 * 1.6 * Math.PI));
          
    this.progressLabel.transition().duration(transitionDuration).tween('bla',  () => {
        return (t) => {
            this.progressLabel.text(Math.round(progress * t));
        };
    });
  }
}