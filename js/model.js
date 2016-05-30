/**

   Nick Sifniotis 22/05/2016
   
   The fixed data model, as provided by ANUSA in email dated 16th May 2016.
   
   Degrees, degree bands, increase in tuition, inflation, interest rates
   and median graduate starting salary are all fixed in this model.
   
   Length of degree program and annual increase in salary are variable
   and read off the user interface controls.
   
   This function simply collates all of the data and returns it to the
   main calculation function in a neat little package.
   
   
   This file also stores the language packs - for the moment.
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
      'InfoBlurb': "<p>The Federal Government has released an options paper called ‘<a href=\"https://docs.education.gov.au/documents/driving-innovation-fairness-and-excellence-australian-education\" target=\"_newTab\">Driving Innovation, Fairness and Excellence in Australian Higher Education</a>’. One of the floated options is a 20% cut in funding to the higher education sector with the shortfall to be covered by an increase in students’ tuition fees. This was first included in the Federal Government’s 2014 Budget and is estimated to lead to a 30% increase in tuition fees for students.</p><p>This infographic (created by ANU student <a href=\"http://www.github.com/NickSifniotis\" target=\"_anotherNewTab\">Nick Sifniotis</a>) models the effect that a 30% increase in tuition fees will have on student debt.</p>",
      'Before': "Before",
      'After': "After",
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
                       
                     { 'Name': "Indexation rate",
                       'ID': "InterestRate",
                       'HelpText': "There is no interest charged on HELP debts. Your accumulated HELP debt is subject to indexation, which is applied on 1 June each year to maintain its real value by adjusting it in line with changes in the cost of living (as measured by the Consumer Price Index (CPI) figure released in March)."},
                       
                     { 'Name': "Inflation rate",
                       'ID': "InflationRate", 
                       'HelpText': "The change in the Consumer Price Index in March 2016 was 1.3%. <a href=\"http://www.rba.gov.au/inflation/measures-cpi.html\">Source</a>."},
                     
                     { 'Name': "Starting salary",
                       'ID': "StartingSalary", 
                       'HelpText': "The starting salary is set at $59,420, the average graduate starting salary in 2014 <a href=\"https://unistats.anu.edu.au/surveys/gds/2014_ANU_Destinations.pdf\">(source)</a>."},
                     
                     { 'Name': "Increases to tuition costs",
                       'ID': "IncreaseRate", 
                       'HelpText': "The rate of increase in tuition fees used in this model is 30%. This is based on modelling by larger universities when 20% cut first announced in 2014 Budget. It’s the most conservative estimated increase. <a href=\"http://www.businessinsider.com.au/the-cost-of-getting-a-university-degree-in-australia-is-about-to-change-heres-what-you-need-to-know-2014-6\">(source)</a>." },
                       
                     { 'Name': "Years to repay loan after graduation",
                       'ID': "YearsTaken",
                       'HelpText': "This number is the number of years that it takes after graduation to repay the loan.  If this number is 50, then there is still debt remaining 50 years after graduation." },
                       
                     { 'Name': "Remaining debt upon retirement",
                       'ID': "RemainingDebt",
                       'HelpText': "This model assumes that the student retires 50 years after graduating from university. This number reflects the amount of debt remaining on the loan in today's dollars when the student retires.  It is shown in orange in the graph." },
                       
                     { 'Name': "Total cost of education",
                       'ID': "TotalPaid",
                       'HelpText': "<p>This number represents the total amount paid for the education, with debt indexed at 2.1% after it is 11 months old. This number is represented by the blue portion of the graph. If the student retires with debt still remaining on the loan, then the debt remaining is represented by the orange portion of the graph.</p>" }
                   ]
   }
}
