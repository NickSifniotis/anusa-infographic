var chart = new Highcharts.Chart({
  chart: {
    renderTo: 'container',
    type: 'column'
  },
  credits: {enabled: false},
  title: null,
  xAxis: {categories: ['Before', 'After']},
  yAxis: {
    min: 0,
    title: {text: 'Total cost of education $'},
  },
  legend: {
    align: 'right',
    x: -70,
    verticalAlign: 'top',
    y: -10,
    floating: true,
    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
    borderColor: '#CCC',
    borderWidth: 1,
    shadow: false
  },
  tooltip: {enabled: false},
  plotOptions: {
    column: {
      stacking: 'normal',
    }
  },
  series: [{
    name: 'Unpaid debt',
    data: [0, 0]
  }, {
    name: 'Interest',
    data: [0, 0]
  }, {
    name: 'Fees',
    data: [0, 0]
  }],
  colors: ['#f15c80', '#7cb5ec', '#434348'],
});

function updateChart(interest, fees, remaining) {
  // update chart data but don't redraw
  chart.series[0].setData(remaining, false);
  chart.series[1].setData(interest, false);
  chart.series[2].setData(fees, false);
}

function updateTable(paid, interest, years, debt) {
  $('#OldPaidBox')[0].innerHTML = "$ " + paid[0].toFixed(0);
  $('#NewPaidBox')[0].innerHTML = "$ " + paid[1].toFixed(0);
  $('#OldInterestBox')[0].innerHTML = "$ " + interest[0].toFixed(0);
  $('#NewInterestBox')[0].innerHTML = "$ " + interest[1].toFixed(0);
  $('#NewYearsBox')[0].innerHTML = years[0];
  $('#OldYearsBox')[0].innerHTML = years[1];
  $('#OldUnpaidBox')[0].innerHTML = "$ " + debt[0].toFixed(0);
  $('#NewUnpaidBox')[0].innerHTML = "$ " + debt[1].toFixed(0);
}

/* Setup Selector */
var DegreeBandSelector = $('#DegreeBandSelector');
DegreeBandSelector.change(function () {
    updateAll();
    chart.redraw();
});

/*    Setup Sliders    */
var sliderOptions = {
  tooltip: "hide",
  orientation: "horizontal",
  handle: "round",
  selection: "none"
};

function updateUnchanged(elementID) {
    // calls updateAll() then redraw chart if HTML is unchanged after timeout
    updateAll();
    var curHTML = $(elementID)[0].innerHTML;
    setTimeout(function () {
      var newHTML = $(elementID)[0].innerHTML;
      if (newHTML == curHTML) {
        chart.redraw();
      }
    }, 100);
}


// DegreeLength
function updateDegreeLength (ev) {
  $('#DegreeLengthBox')[0].innerHTML = ev.value;
  updateUnchanged('#DegreeLengthBox');
}
var DegreeLengthSlider = $('#DegreeLengthSlider').slider(sliderOptions);
DegreeLengthSlider.on('slide', updateDegreeLength);
DegreeLengthSlider.on('slideStop', updateDegreeLength);


// SalaryIncrease
function updateSalaryIncrease (ev) {
  $('#SalaryIncreaseBox')[0].innerHTML = ev.value.toFixed(1) + " %";
  updateUnchanged('#SalaryIncreaseBox');
}
var SalaryIncreaseSlider = $('#SalaryIncreaseSlider').slider(sliderOptions);
SalaryIncreaseSlider.on('slide', updateSalaryIncrease);
SalaryIncreaseSlider.on('slideStop', updateSalaryIncrease);


/*
   Create the degree selector drop down.
   
   The Model() contains both the degree program 'bands' and the lists of
   degree programs that correspond to those bands.
*/
function initialiseDegreeList() {
   var model = Model();
   var dropdown = document.getElementById ("DegreeBandSelector");
   
   var degree_program_tuples = [];
   for (var i = 0; i < model.DegreeBands.length; i ++) {
      var offset = i * 100;
      
      for (var j = 0; j < model.DegreePrograms[i].length; j ++) {
         degree_program_tuples.push ([model.DegreePrograms[i][j], offset]);
         offset ++;
      }
   }
   
   degree_program_tuples.sort (function (a, b) { return (a[0] > b[0]) - (a[0] < b[0]); });
   
   for (var i = 0; i < degree_program_tuples.length; i ++) {
      var option = document.createElement ("option");
      option.text = degree_program_tuples[i][0];
      option.value = degree_program_tuples[i][1];
      
      dropdown.add (option);
   }
}


/*
   Function updated to reflect the model that ANUSA's Education Officer asked for. 
*/
function getGUIData() {
  return {
    'DegreeBand': parseInt($('#DegreeBandSelector').val()),
    'DegreeLength': DegreeLengthSlider.data('slider').getValue(),
    'SalaryIncrease': (SalaryIncreaseSlider.data('slider').getValue() / 100.0) + 1
  };
}

function updateAll() {
  // Compute costs and update tables and chart data
  // Note: you will need to call chart.redraw() afterwards
  var gui_data = getGUIData();
  var model = Model();
  
  var increase = model.IncreaseRate;
  var inflation = model.InflationRate;
  var interest = model.IndexationRate;
  var startingSalary = model.StartingSalary;
  
  var years = gui_data.DegreeLength;
  var salaryIncrease = gui_data.SalaryIncrease;
  var degree = gui_data.DegreeBand;
  var oldDebt = 0.0;    // running debt under old system
  var newDebt = 0.0;    // running debt under new system

  var oldAnnualFees;
  var newContribution;
  var internationalFees;

  /**
     Calculate fees per semester (today's dollars)
     Degrees fall into different price bands. At the time of writing, there
     are only three bands. Degree program IDs are therefore grouped into the
     following bands:
        0 -  99: the cheapest degree
      100 - 199: the next cheapest degree
      200 - 299: the most expensive degree

      However, the system is written to accept more degree cost bands in future.
   **/
   
  oldAnnualFees = model.DegreeBands[Math.floor (degree / 100)];      // there's something to be said for this piece of code right here
  newAnnualFees = oldAnnualFees * increase;

  var oldFees = years * oldAnnualFees;    // total fees paid under old system (today's dollars)
  var newFees = years * newAnnualFees;    // total fees paid under new system (today's dollars)


  /* Stage 1 - Studying */
  
  var inflationInflator = 1;
  for (var i = 0; i < years; i++) {
    // old system
    oldDebt *= inflation
    oldDebt += oldAnnualFees * inflationInflator;

    // new system
    newDebt *= interest;
    newDebt += newAnnualFees * inflationInflator;
    
    inflationInflator *= inflation;
  }


  /* Stage 2 - Working */
  var repaymentRate;
  var inflationFactor;

  var oldPaid = 0.0;    // how much is paid under old system (today's dollars)
  var oldYears = years;
  var income = startingSalary * inflationInflator;  // Income adjusted for inflation
  
  /* old system */
  inflationFactor = inflationInflator
  while (true) {
    // calculate repayment
    if (income < 51309 * inflationFactor) {
      repaymentRate = 0.000;
    } else if (income < 57153 * inflationFactor) {
      repaymentRate = 0.040;
    } else if (income < 62997 * inflationFactor) {
      repaymentRate = 0.045;
    } else if (income < 66308 * inflationFactor) {
      repaymentRate = 0.050;
    } else if (income < 71277 * inflationFactor) {
      repaymentRate = 0.055;
    } else if (income < 77194 * inflationFactor) {
      repaymentRate = 0.060;
    } else if (income < 81256 * inflationFactor) {
      repaymentRate = 0.065;
    } else if (income < 89421 * inflationFactor) {
      repaymentRate = 0.070;
    } else if (income < 95287 * inflationFactor) {
      repaymentRate = 0.075;
    } else {
      repaymentRate = 0.080;
    }

    if (oldYears >= 50+years) {  // debt for life
      break;
    }

    oldDebt *= inflation;   // debt indexed by inflation

    // debt repayments
    if (income*repaymentRate >= oldDebt) {   // finish paying off loan
      oldPaid += oldDebt/inflationFactor;
      oldDebt = 0.0;
      break;
    } else {
      oldDebt -= income * repaymentRate;
      oldPaid += income * repaymentRate / inflationFactor;
    }

    income *= salaryIncrease;
    inflationFactor *= inflation
    oldYears ++;
  }
  oldDebt /= inflationFactor;       // remaining debt in today's dollars
  oldDebt *= inflation;

  var newPaid = 0.0;    // how much is paid under new system (today's dollars)
  var newYears = years;
  var income = startingSalary * inflationInflator;  // Income adjusted for inflation
  var new_bracket = 50638 * Math.pow(inflation, -2);

  /* new system */
  inflationFactor = inflationInflator;
  while (true) {
    // calculate repayment
    if (income < new_bracket * inflationFactor) {
      repaymentRate = 0.000;
    } else if (income < 51309 * inflationFactor) {
      repaymentRate = 0.020;
    } else if (income < 57153 * inflationFactor) {
      repaymentRate = 0.040;
    } else if (income < 62997 * inflationFactor) {
      repaymentRate = 0.045;
    } else if (income < 66308 * inflationFactor) {
      repaymentRate = 0.050;
    } else if (income < 71277 * inflationFactor) {
      repaymentRate = 0.055;
    } else if (income < 77194 * inflationFactor) {
      repaymentRate = 0.060;
    } else if (income < 81256 * inflationFactor) {
      repaymentRate = 0.065;
    } else if (income < 89421 * inflationFactor) {
      repaymentRate = 0.070;
    } else if (income < 95287 * inflationFactor) {
      repaymentRate = 0.075;
    } else {
      repaymentRate = 0.080;
    }

    if (newYears >= 50+years) {  // debt for life
      break;
    }

    newDebt *= interest;    // debt indexed by the bond rate

    // debt repayments
    if (income * repaymentRate > newDebt) {   // finish paying off loan
      newPaid += newDebt/inflationFactor;
      newDebt = 0.0;
      break;
    } else {
      newDebt -= income*repaymentRate;
      newPaid += income*repaymentRate/inflationFactor;
    }
    
    income *= salaryIncrease;
    inflationFactor *= inflation;
    newYears ++;
  }
  newDebt /= inflationFactor;       // remaining debt in today's dollars
  newDebt *= inflation;

  var oldInterest=0;
  var newInterest = newPaid - newFees;
  if (newInterest < 0) {
    newInterest = 0;
  }

  var oldPaidFees = oldFees;
  if (oldPaid < oldFees) {
    oldPaidFees = oldPaid;
  }

  var newPaidFees = newFees;
  if (newPaid < newFees) {
    newPaidFees = newPaid;
  }

  updateTable([oldPaid + oldDebt, newPaid + newDebt], [oldInterest, newInterest], [newYears - years, oldYears - years], [oldDebt, newDebt]);
  updateChart([oldInterest, newInterest], [oldPaidFees, newPaidFees], [oldDebt, newDebt]);
}


/*
   Event handler for help modal dialog box
*/
$('#HelpModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var recipient = button.data('field')
  var modal = $(this)

  var target_field = 0;
  var language = Language().Fields;
  for (var i = 0; i < language.length; i ++)
     if (language[i].ID == recipient)
        target_field = language[i];
        
  if (target_field == 0) {
     modal.find('.modal-title').text("Error");
     modal.find('.modal-body').html("Unable to locate language resource '" + recipient + "'");
  } else {
     modal.find('.modal-title').text(target_field.Name);
     modal.find('.modal-body').html(target_field.HelpText);
  }
})


function initialiseGUI() {
   var language_pack = Language();
   
   $("#title")[0].innerHTML = language_pack.Title;
   $("#header")[0].innerHTML = language_pack.Title;
   $("#info_blurb")[0].innerHTML = language_pack.InfoBlurb;
   $("#model_explain")[0].innerHTML = language_pack.ModelExplain;
   $("#footer")[0].innerHTML = language_pack.Footer;
   
   var fields = language_pack.Fields;
   for (var i = 0; i < fields.length; i ++) {
      var field = $("#" + fields[i].ID);
      if (field.length > 0)
         field[0].innerHTML = fields[i].Name;
   }
   
   initialiseDegreeList();
}



initialiseGUI();
updateAll();
chart.redraw();
