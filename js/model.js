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
                       
                     { 'Name': "Years Taken",
                       'ID': "YearsTaken",
                       'HelpText': "This number is the number of years that it takes after graduation to repay the loan.  If this number is 50, then there is still debt remaining 50 years after graduation." },
                   ],
   }
}
