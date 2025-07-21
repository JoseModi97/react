const KICKSTARTER_DATA_URL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json';

Promise.all([d3.json(KICKSTARTER_DATA_URL)])
  .then(([kickstarterData]) => {
    const data = kickstarterData;

    const svg = d3.select('#treemap');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const treemap = d3.treemap().size([width, height]).padding(1);

    const root = d3.hierarchy(data).sum((d) => d.value);

    treemap(root);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

    const cell = svg
      .selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

    cell
      .append('rect')
      .attr('class', 'tile')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('data-name', (d) => d.data.name)
      .attr('data-category', (d) => d.data.category)
      .attr('data-value', (d) => d.data.value)
      .attr('fill', (d) => color(d.data.category))
      .on('mouseover', (event, d) => {
        tooltip.style('opacity', 0.9);
        tooltip
          .html(
            `Name: ${d.data.name}<br>Category: ${d.data.category}<br>Value: ${d.data.value}`
          )
          .attr('data-value', d.data.value)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    cell
      .append('text')
      .selectAll('tspan')
      .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
      .enter()
      .append('tspan')
      .attr('x', 4)
      .attr('y', (d, i) => 13 + i * 10)
      .text((d) => d)
      .attr('font-size', '10px')
      .attr('fill', 'white');

    const legend = d3.select('#legend');
    const legendWidth = +legend.attr('width');
    const LEGEND_RECT_SIZE = 15;
    const LEGEND_H_SPACING = 150;
    const LEGEND_V_SPACING = 10;
    const LEGEND_TEXT_X_OFFSET = 3;
    const LEGEND_TEXT_Y_OFFSET = -2;
    const categories = root.leaves().map((nodes) => nodes.data.category).filter((category, index, self) => self.indexOf(category) === index);

    const legendElems = legend
      .append('g')
      .attr('transform', 'translate(60, 0)')
      .selectAll('g')
      .data(categories)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${(i % 3) * LEGEND_H_SPACING}, ${Math.floor(i / 3) * LEGEND_RECT_SIZE + LEGEND_V_SPACING * Math.floor(i / 3)})`);

    legendElems
      .append('rect')
      .attr('class', 'legend-item')
      .attr('width', LEGEND_RECT_SIZE)
      .attr('height', LEGEND_RECT_SIZE)
      .attr('fill', (d) => color(d));

    legendElems
      .append('text')
      .attr('x', LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
      .attr('y', LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
      .text((d) => d);
  })
  .catch((err) => console.log(err));
