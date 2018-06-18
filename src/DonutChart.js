export default class DonutChart {
 constructor(selector) {
   let size = {
        width: 200,
        height: 200
    }
      
    this.colors = ['#83889C', '#D77373', '#e1c6b9','#836880']

    this.svg = d3
        .select(selector)
        .append("svg")
        .attr("width", size.width)
        .attr("height", size.height)
        .append("g")
        .attr("transform", "translate(" + size.width / 2 + "," + size.height / 2 + ")");

    const radius = Math.min(size.width, size.height) * 0.35;

    this.arc = d3.arc()
        .innerRadius(radius)
        .outerRadius(radius - 30)

    this.pie = d3.pie()
        .sort(null) // from max to min
        .value(function(d) { 
            return d.val; 
        });

  }

  update(data) {

    this.g = this.svg.selectAll(".arc")
            .data(this.pie(data))
            .enter().append("g")
            //.attr("class", "arc");

    this.g.append("path")
        //.attr("d", arc)
        .style("fill", (d, i) => { 
            return this.colors[i]; })
        .transition().delay(function(d,i) {
            return i * 500; }).duration(500)
        .attrTween('d', (d) => {
            var i = d3.interpolate(d.startAngle, d.endAngle);
            return (t) => {
            d.endAngle = i(t); 
            return this.arc(d)
        }
    });

    this.g.append("text")
        .attr("transform", (d) => { return "translate(" + this.arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text((d) => {
        return d.value; });
  }
}