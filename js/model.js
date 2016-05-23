/**

   Nick Sifniotis 22/05/2016
   
   The fixed data model, as provided by ANUSA in email dated 16th May 2016.
   
   Degrees, degree bands, increase in tuition, inflation, interest rates
   and median graduate starting salary are all fixed in this model.
   
   Length of degree program and annual increase in salary are variable
   and read off the user interface controls.
   
   This function simply collates all of the data and returns it to the
   main calculation function in a neat little package.
**/

function Model () {
   return {
      'DegreeBands': [6256, 8917, 10440],
      'DegreePrograms': [
                           ["Humanities", "Behavioural Science", "Social studies", "Foreign Languages", "Visual and Performing Arts", "Education and Nursing"],
                           ["Computing", "Built Environment", "Health", "Engineering", "Surveying", "Agriculture", "Mathematics", "Statistics", "Science"],
                           ["Accounting", "Administration", "Economics", "Commerce", "Law", "Dentistry", "Medicine", "Veterinary Science"]
                        ],
      'IncreaseRate': 1.3,
      'InflationRate': 1.013,
      'IndexationRate': 1.021,
      'StartingSalary': 59420,
   }
}

function Language() {
   return {
      'Title': "The cost of a university degree before/after deregulation",
      'InfoBlurb': "<p>ANUSA's blurb goes here.</p><p>Lots and lots of text! Yay</p>",
      'ModelExplain': "This is where the text explaining the model goes. Note that interest is 2.1%, inflation is 1.3% and the starting salary is 59,420. The increase to the cost of tuition is anticipated to be at least 30%.",
      'Fields':    [
                     { 'Name': "Subject area",
                       'ID': "DegreeBand",
                       'HelpText': ""},
                       
                     { 'Name': "Degree length",
                       'ID': "DegreeLength",
                       'HelpText': "Choose here the number of years it takes to complete the degree. A typical university degree takes 3 to 4 years."},
                       
                     { 'Name': "Annual raises as percentage", 
                       'ID': "SalaryIncrease",
                       'HelpText': "Choose here an annual raise given as a percentage. For instance, if you begin earning $50000 in the year 2020 and this annual raise percentage is 5%, then your salary in 2021 is $52500, in 2022 is $55125, and so on."},
                       
                     { 'Name': "Interest rate",
                       'ID': "InterestRate",
                       'HelpText': "The indexation rate applied to HECS/HELP loans in 2015 was 2.1%. <a href=\"https://www.ato.gov.au/rates/help-and-financial-supplement-indexation-rates/\">Source</a>."},
                       
                     { 'Name': "Inflation rate",
                       'ID': "InflationRate", 
                       'HelpText': "The change in the Consumer Price Index in March 2016 was 1.3%. <a href=\"http://www.rba.gov.au/inflation/measures-cpi.html\">Source</a>."},
                     
                     { 'Name': "Starting salary",
                       'ID': "StartingSalary", 
                       'HelpText': "The starting salary is set at $59,420, the median grad starting salary in 2014 <a href=\"https://unistats.anu.edu.au/surveys/gds/2014_ANU_Destinations.pdf\">(source)</a>."},
                     
                     { 'Name': "Increases to tuition costs",
                       'ID': "IncreaseRate", 
                       'HelpText': "The rate of increase in tuition fees used in this model is 30%. This is based on modelling by larger universities when 20% cut first announced in 2014 Budget. It’s the most conservative estimated increase. <a href=\"http://www.businessinsider.com.au/the-cost-of-getting-a-university-degree-in-australia-is-about-to-change-heres-what-you-need-to-know-2014-6\">(source)</a>." },
                       
                     { 'Name': "Years to repay loan after graduation",
                       'ID': "YearsTaken",
                       'HelpText': "This number is the number of years that it takes after graduation to repay the loan.  If this number is 50, then there is still debt remaining 50 years after graduation." },
                       
                     { 'Name': "Remaining debt upon retirement",
                       'ID': "RemainingDebt",
                       'HelpText': "This model assumes that the student retires 50 years after graduating from university. This number reflects the amount of debt remaining on the loan in today's dollars when the student retires.  It is shown in red in the graph." },
                       
                     { 'Name': "Interest paid",
                       'ID': "InterestPaid",
                       'HelpText': "<p>This number represents the total amount of interest paid for the education in today's dollars. This number is shown in blue in the graph.</p><p>If there is debt remaining more than 50 years after graduation, the interest that accrues on that debt is not shown here.</p>"},
                       
                     { 'Name': "Total cost of education",
                       'ID': "TotalPaid",
                       'HelpText': "<p>This number represents the total amount paid for the education including both tuition fees and interest. This number is the sum of the black and blue portions of the graph. If the student retires with debt still remaining on the loan, then the debt remaining is not included in the total cost of the education.</p><p>This number is the cost in today's dollars. This means that dollar sums for loan payments in future years are readjusted with inflation so that they make sense in 2014 dollars. For instance, if the inflation rate is 2%, a loan payment of $1000 in the year 2024 translates to $1000 * (1.02)^(-10) or $820.34 in today's dollars.</p>" }
                   ],
      'Footer': "(c) Nick Sifniotis 2016. All rights reserved."
   }
}
