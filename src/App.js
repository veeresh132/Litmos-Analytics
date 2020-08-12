import React from 'react';
import './App.css';
import * as d3 from 'd3';
import width from 'd3';
import height from 'd3';
import margin from 'd3';
import { Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import litmos from './litmos2.png';
import feature1 from './feature3.png';
import $, { data } from 'jquery';
import 'semantic-ui-css/semantic.min.css';
import { Image, List } from 'semantic-ui-react';
import { isTemplateMiddleOrTemplateTail } from 'typescript';

function add(total, num) {
  return total + num;
}

function call_feature() {
  var search = document.getElementById("subdomain").value;
  var amount = document.getElementById("feature_input2").value;
  feature_input(search, amount);
}

function feature_input(feature, amount) {
  var settings = {
    "url": "https://litmos.aha.io/api/v1/ideas/related?q=" + feature + "&per_page=" + amount,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer cd6dcdd34754dae05f4cf0af5ac70006abaaec6db6f01873513c687982641042",
      "Cookie": "_aha_t=6854236199155201661"
    },
  };
  var new_list = [];
  $.ajax(settings).done(function (response) {
    //console.log(response);
    var tip = response.ideas;
    var pagination1 = response.pagination.total_records;
    var pagination2 = response.pagination.total_pages;
    var pagination3 = response.pagination.current_page;
    console.log(tip);
    console.log(tip.length);
    var voteCount;
    var newTime;
    var statTmp;
    for (var l = 0; l < tip.length; l++) {
      new_list.push(tip[l].name);
      voteCount = totalVotes(tip[l].reference_num);
      console.log(tip[l].reference_num + ": " + voteCount);
      newTime = tip[l].created_at.slice(0,10);
      statTmp = status(tip[l].workflow_status.name);
      addLi(tip[l].name, tip[l].reference_num, newTime, l, voteCount, statTmp, pagination1, pagination2, pagination3);
    }
    console.log(new_list);
    var review_value = document.querySelectorAll("#needsReview_list li").length;
    var consider_value = document.querySelectorAll("#futureConsideration_list li").length;
    var exists_value = document.querySelectorAll("#alreadyExists_list li").length;
    var shipped_value = document.querySelectorAll("#shipped_list li").length;
    var planned_value = document.querySelectorAll("#planned_list li").length;
    var notImplement_value = document.querySelectorAll("#willNotImplement_list li").length;
    var title_review = document.getElementById("review_title");
    var title_future = document.getElementById("future_title");
    var title_exists = document.getElementById("exists_title");
    var title_shipped = document.getElementById("shipped_title");
    var title_planned = document.getElementById("planned_title");
    var title_implement = document.getElementById("implement_title");
    title_review.textContent = "Needs Review : " + (review_value/(consider_value + exists_value + shipped_value + planned_value + notImplement_value + review_value) * 100).toFixed(2) + '%, ';
    title_future.textContent = "Future Consideration : " + (consider_value/(consider_value + exists_value + shipped_value + planned_value + notImplement_value + review_value) * 100).toFixed(2) + '%, ';
    title_exists.textContent = "Already Exists : " + (exists_value/(consider_value + exists_value + shipped_value + planned_value + notImplement_value + review_value) * 100).toFixed(2) + '%, ';
    title_shipped.textContent = "Shipped : " + (shipped_value/(consider_value + exists_value + shipped_value + planned_value + notImplement_value + review_value) * 100).toFixed(2) + '%, ';
    title_planned.textContent = "Planned : " + (planned_value/(consider_value + exists_value + shipped_value + planned_value + notImplement_value + review_value) * 100).toFixed(2) + '%, ';
    title_implement.textContent = "Will Not Implement : " + (notImplement_value/(consider_value + exists_value + shipped_value + planned_value + notImplement_value + review_value) * 100).toFixed(2) + '%, ';
  });
}

function totalVotes(lit_num) {
  var settings = {
    "url": "https://litmos.aha.io/api/v1/ideas/" + lit_num + "/endorsements",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer cd6dcdd34754dae05f4cf0af5ac70006abaaec6db6f01873513c687982641042",
      "Cookie": "_aha_t=6854236199155201661"
    },
  };
  
  $.ajax(settings).done(function (response) {
    return response.pagination.total_records;
  });
}

function addLi(result, ref_num, time, num, voteCount, statusImp, page1, page2, page3) {
  var ul = document.getElementById("official_feature_list");
  var li = document.createElement("li");
  var review_status = document.getElementById("needsReview_list");
  var future_status = document.getElementById("futureConsideration_list");
  var exists_status = document.getElementById("alreadyExists_list");
  var shipped_status = document.getElementById("shipped_list");
  var planned_status = document.getElementById("planned_list");
  var notImpl_status = document.getElementById("willNotImplement_list");
  var li_status = document.createElement("li");
  /** 
  var str = ref_num;
  var temp5 = str.link('https://litmos.aha.io/ideas/ideas/' + ref_num);
  */
  var temp5 = document.createElement('a');
  var linkText = document.createTextNode(ref_num);
  var page_count = document.getElementById("record_page");
  page_count.innerHTML = "Total Records: " + page1 + ", Total Pages: " + page2 + ", Current Page: " + page3;
  temp5.appendChild(linkText);
  temp5.title = ref_num;
  temp5.href = "https://litmos.aha.io/ideas/ideas/" + ref_num;
  li.appendChild(document.createTextNode(result + ' (' + ref_num + ', Created at: ' + time + ', Vote Count: ' + voteCount + ') : ' + temp5));
  li_status.appendChild(document.createTextNode(result + ' (' + ref_num + ', Created at: ' + time + ', Vote Count: ' + voteCount + ') : ' + temp5));
  li.setAttribute("id", "element" + num); // added line
  if (statusImp === 1) {
    li.setAttribute("class", "text-primary");
    li_status.setAttribute("id", "status" + num); // added line
    review_status.append(li_status);
  } else if (statusImp === 2) {
    li.setAttribute("class", "text-secondary");
    li_status.setAttribute("id", "status" + num); // added line
    future_status.append(li_status);
  } else if (statusImp === 3) {
    li.setAttribute("class", "text-success");
    li_status.setAttribute("id", "status" + num); // added line
    exists_status.append(li_status);
  } else if (statusImp === 4) {
    li.setAttribute("class", "text-danger");
    li_status.setAttribute("id", "status" + num); // added line
    shipped_status.append(li_status);
  } else if (statusImp === 5) {
    li.setAttribute("class", "text-warning");
    li_status.setAttribute("id", "status" + num); // added line
    planned_status.append(li_status);
  } else {
    li.setAttribute("class", "text-info");
    li_status.setAttribute("id", "status" + num); // added line
    notImpl_status.append(li_status);
  }
  ul.appendChild(li);
}

function status(statusInfo) {
  if (statusInfo === "Needs review") {
    return 1;
  } else if (statusInfo === "Future consideration") {
    return 2;
  } else if (statusInfo === "Already Exists") {
    return 3;
  } else if (statusInfo === "Shipped") {
    return 4;
  } else if (statusInfo === "Planned") {
    return 5;
  } else {
    return 6;
  }
}

function pie_chart_v0(id_div, data, domain) {
  // set the dimensions and margins of the graph
  var width = 650;
  var height = 450;
  var margin = 40;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'my_dataviz'
  var svg = d3.select(id_div)
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Create dummy data
  //var data = {a: 9, b: 20, c:30, d:8, e:12, f:3, g:7, h:14}

  // set the color scale
  var color = d3.scaleOrdinal()
  .domain(domain)
  .range(d3.schemeDark2);

  // Compute the position of each group on the pie:
  var pie = d3.pie()
  .sort(null) // Do not sort group by size
  .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(data))

  // The arc generator
  var arc = d3.arc()
  .innerRadius(radius * 0.5)         // This is the size of the donut hole
  .outerRadius(radius * 0.8)

  // Another arc that won't be drawn. Just for labels positioning
  var outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9)
  

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
  .selectAll('allSlices')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)

  // Add the polylines between chart and labels:
  svg
  .selectAll('allPolylines')
  .data(data_ready)
  .enter()
  .append('polyline')
  .attr("stroke", "black")
  .style("fill", "none")
  .attr("stroke-width", 1)
  .attr('points', function(d) {
    var posA = arc.centroid(d) // line insertion in the slice
    var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
    var posC = outerArc.centroid(d); // Label position = almost the same as posB
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
    return [posA, posB, posC]
  })

  // Add the polylines between chart and labels:
  svg
  .selectAll('allLabels')
  .data(data_ready)
  .enter()
  .append('text')
  .text( function(d) { return d.data.key + ': ' + domain[d.data.key] })
    //return d.data.key } )
  .attr('transform', function(d) {
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
  })
  .style('text-anchor', function(d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midangle < Math.PI ? 'start' : 'end')
  })

}


function listCalls(page_num) {
  var initial = document.getElementById("controls");
  //document.getElementById("controls").style.display = "none";
    var settings = {
    "url": "https://litmos.aha.io/api/v1/ideas/?page=" + page_num,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer cd6dcdd34754dae05f4cf0af5ac70006abaaec6db6f01873513c687982641042",
      "Cookie": "_aha_t=6854236199155201661"
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    var newObj = response.pagination.current_page[2];
    console.log(newObj);
    var temp = (response.ideas);
    var data = {};
    //console.log(temp.description.body);
    var categories = ["api" ,"assessments", "certificates", "compliance", "courses", "emails", "external training", "gamification", "ilt", "integrations", "learning paths", "litmos features", "mobile", "modules", "people", "reports", "teams", "user interface", "dashboard", "search", "boost", "brands", "compitencies", "custom fields", "ecommerce", "litmos assign", "video assessments"];
    var temp1;
    var alternate = 0;
    var counted = [];
    var track = [];
    var pre = 0;
    var tracknames = [];
    var trackCat = [];
    var trackPercent = [];
    var trackAll = {};
    for (var j = 0; j < categories.length; j++) {
      var count = 0;
      for (var i = 0; i < temp.length; i++) {
        if (tracknames.length <= 29) {
          tracknames.push(temp[i].reference_num);
          pre += 1;
        }
        temp1 = temp[i].name.toLowerCase();
        if (temp1.includes(categories[j])) {
          trackCat.push(categories[j]);
          count += 1;
        }
      }
      if (count === 0) {
        alternate += 1;
        data["other"] = alternate;
      } else {
        data[categories[j]] = count;
        counted.push(count);
      }
    }
    counted.push(alternate);
    //console.log(counted.reduce(add));
    //for 
    console.log(data);
    var status_update = document.getElementById("record_page0");
    status_update.innerHTML = "Total Records: " + response.pagination.total_records + ", Total Pages: " + response.pagination.total_pages + ", Current Page: " + response.pagination.current_page;
    console.log(tracknames);
    var total_count = counted.reduce(add);
    categories.push("other");
    var initial_output = '';
    for (var star = 0; star < categories.length; star++) {
      if (data[categories[star]] != null) {
        //var temp_output = categories[star] + ': ' + ((data[categories[star]]/total_count) * 100).toFixed(2) + '%, ';
        initial_output += categories[star] + ': ' + ((data[categories[star]]/total_count) * 100).toFixed(2) + '%, ';
        trackAll[categories[star]] = ((data[categories[star]]/total_count) * 100).toFixed(2) + '%, ';
      }
    } 
    console.log(trackAll);
    pie_chart_v0("#my_dataviz", data, trackAll);
    document.getElementById("stats_info").innerHTML = initial_output;
  });
}

function clearList() {
  var iter = document.getElementById('feature_input2').value;
  for (var g = 0; g < 200; g++) {
    if (document.getElementById("element" + g) != null) {
      document.getElementById("element" + g).style.display='none';
      document.getElementById("element" + g).setAttribute("id", "element");
      document.getElementById("status" + g).style.display='none';
      document.getElementById("status" + g).setAttribute("id", "status");
    }
  }
  var title_review = document.getElementById("review_title");
  var title_future = document.getElementById("future_title");
  var title_exists = document.getElementById("exists_title");
  var title_shipped = document.getElementById("shipped_title");
  var title_planned = document.getElementById("planned_title");
  var title_implement = document.getElementById("implement_title");
  title_review.textContent = "Needs Review " ;
  title_future.textContent = "Future Consideration " ;
  title_exists.textContent = "Already Exists ";
  title_shipped.textContent = "Shipped " ;
  title_planned.textContent = "Planned ";
  title_implement.textContent = "Will Not Implement "; 
}

var countGlobal = 1;


function App() {
  return (
    <body onLoad={ listCalls(countGlobal) }>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://litmos.aha.io/products/LIT/ideas_overview">Litmos Aha! Page</Nav.Link>
        </Nav>
        <img src={litmos} style={{height:'40px', width:'200px', marginRight:'190px'}}/>
        <Form inline>
          <FormControl type="text" placeholder="Search for Idea Topics" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
      <div className="App">
        <h1 style={{textAlign: 'left', marginTop:'40px', marginLeft:'80px', fontSize:'40px'}}> Litmos Aha! Analytics</h1>
        <p className="lead" style={{textAlign:'left', marginLeft:'80px', width:'700px', fontSize:'15px'}}> Welcome to the Litmos Aha! Analytics webpage: a site that provides live analytics on Aha! ideas for Litmos. The data is drawn from Aha!'s REST API and is updated upon request. 
        </p>
      </div>
      <div>
        <h2 id="categories_div" style={{marginLeft:'80px', marginTop:'20px'}}> Categories Chart </h2>
        <p className="lead" style={{textAlign:'left', marginLeft:'80px', width:'700px', fontSize:'15px'}}>View analytics on all the different categories.</p>
      </div>
      <p id="record_page0" style={{marginTop:'10px',marginLeft:'80px', width:'650px'}}></p>
      <div>
        <Modal.Dialog style={{marginLeft:'80px'}}>
          <Modal.Header>
            <Modal.Title>Ideas Chart Analytics</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p id="stats_info" style={{width:'400px'}}></p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
        <div>
          <button id="next_page_chart" className="btn btn-primary" onClick={() => { countGlobal -= 1;  listCalls(countGlobal)}} style={{marginLeft: '80px', width:'120px', height:'40px', marginTop:'8px'}}>Back</button>
          <button id="next_page_chart1" className="btn btn-primary" onClick={() => { countGlobal += 1; listCalls(countGlobal)}} style={{marginLeft: '10px', width:'120px', height:'40px', marginTop:'8px'}}>Next Page</button>
          <button id="next_page_chart2" className="btn btn-primary" onClick={() => { window.location.reload() }} style={{marginLeft: '80px', width:'120px', height:'40px', marginTop:'8px'}}>Clear</button>
        </div>
        <div id="my_dataviz" style={{marginLeft:'40px'}}></div>
      </div>
      <h2 style={{marginLeft:'80px', marginTop:'20px'}}> Ideas Search Feature </h2>
      <div className="optionMenu">
        <p className="lead" style={{textAlign:'left', marginLeft:'80px', width:'700px', fontSize:'15px', marginTop:'15px'}}> For each text field below, simply enter your desired input and the list will be updated. </p>
      </div>
      <div>
        <figure class="figure">
          <img src={feature1} style={{height:'300px', width:'360px', marginLeft:'80px', marginTop:'15px'}}/>
          <figcaption class="figure-caption" style={{marginLeft:'60px'}}>Example for generating your desired ideas for a particular feature.</figcaption>
        </figure>
      </div>
      <h3 id="feature_temp" style={{marginLeft:'80px', marginTop: '25px'}}>
        Find Ideas For A Particular Feature
      </h3>
      <div>
        <p id="feature_desc" className="lead" style={{marginTop:'15px', marginLeft:'80px', fontSize:'15px'}}> Generate a list of all the desired ideas</p>
        <a href="#" class="badge badge-primary" style={{marginLeft:'80px'}}>Needs Review</a>
        <a href="#" class="badge badge-secondary" style={{marginLeft:'8px'}}>Future Consideration</a>
        <a href="#" class="badge badge-success" style={{marginLeft:'8px'}}>Already Exists</a>
        <a href="#" class="badge badge-danger" style={{marginLeft:'8px'}}>Shipped</a>
        <a href="#" class="badge badge-warning" style={{marginLeft:'8px'}}>Planned</a>
        <a href="#" class="badge badge-info" style={{marginLeft:'8px'}}>Will Not Implement</a>
      </div>
      <Accordion id="status_list" style={{marginLeft:'80px', marginTop:'10px', width:'730px', display:'none'}}>
        <Card class="bg-primary">
          <Card.Header>
            <Accordion.Toggle id="review_title" as={Button} variant="link" eventKey="0">
              Needs Review 
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ul id="needsReview_list" style={{marginTop:'5px', width:'650px'}} divided verticalAlign='middle'></ul> 
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card class="bg-secondary">
          <Card.Header>
            <Accordion.Toggle id="future_title" as={Button} variant="link" eventKey="1">
              Future Consideration
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ul id="futureConsideration_list" style={{marginTop:'5px', width:'650px'}} divided verticalAlign='middle'></ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card class="bg-success">
          <Card.Header>
            <Accordion.Toggle id="exists_title" as={Button} variant="link" eventKey="2">
              Already Exists
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <ul id="alreadyExists_list" style={{marginTop:'5px', width:'650px'}} divided verticalAlign='middle'></ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card class="bg-danger">
          <Card.Header>
            <Accordion.Toggle id="shipped_title" as={Button} variant="link" eventKey="3">
              Shipped
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <ul id="shipped_list" style={{marginTop:'5px', width:'650px'}} divided verticalAlign='middle'></ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card class="bg-warning">
          <Card.Header>
            <Accordion.Toggle id="planned_title" as={Button} variant="link" eventKey="4">
              Planned
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              <ul id="planned_list" style={{marginTop:'5px', width:'650px'}} divided verticalAlign='middle'></ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card class="bg-info">
          <Card.Header>
            <Accordion.Toggle id="implement_title" as={Button} variant="link" eventKey="5">
              Will Not Implement
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="5">
            <Card.Body>
              <ul id="willNotImplement_list" style={{marginTop:'5px', width:'650px'}} divided verticalAlign='middle'></ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <div>
        <button className="btn btn-primary" onClick={() => { document.getElementById('page_nav').style.display='none'; document.getElementById('record_page').style.display='none'; document.getElementById('status_list').style.display='none'; clearList(); window.location.reload() }} style={{marginLeft:'80px',marginTop:'15px', display:'inline-block'}}> Clear </button>
      </div>
      <div id="feature_inputs">
        <input type="text" className="form-control" placeholder="Search Feature" id="subdomain" style={{width:'300px', marginLeft:'80px', display:'inline-block', marginTop:'18px'}}/>
        <input id="feature_input2" type="text" className="form-control" placeholder="# of Ideas (200 max)" style={{width:'180px', marginLeft:'20px', display:'inline-block', marginTop:'18px'}}/>
        <input id="feature_input3" type="text" className="form-control" placeholder="Time Period (ex: 2020-07-30)" id="product-key" style={{width:'300px', marginLeft:'40px', display:'inline-block', marginTop:'18px'}}/>  
      </div>
      <button id="submit_btn0" className="btn btn-primary" onClick={() => { document.getElementById('page_nav').style.display='inline-block'; call_feature(); document.getElementById('status_list').style.display='inline-block' }} style={{marginLeft: '80px', width:'160px', height:'40px', marginTop:'8px'}}>Generate</button>
      <script src="https://d3js.org/d3.v4.js"></script>
      <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
      <p id="record_page" style={{marginTop:'30px',marginLeft:'80px', width:'650px'}}></p>
      <ul id="official_feature_list" style={{marginTop:'5px', marginBottom:'50px',marginLeft:'60px', width:'650px'}} divided verticalAlign='middle'>
      </ul>  
      <nav aria-label="Page navigation example" id="page_nav" style={{marginLeft:'80px', display:'none'}}>
        <ul class="pagination">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" >Next</a>
          </li>
        </ul>
      </nav>
    </body>
  );
}

export default App;
