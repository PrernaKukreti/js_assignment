const readline = require('readline');//introducing readline module
var file=require('fs');//introducing file system module
var myfile='../csv/Indicators.csv';//introducing csv file externally
var rl = readline.createInterface({
input: file.createReadStream(myfile),//input file given
});
var mapMaleCount = {"AFG":0,"ARM":0,"AZE":0,"BHR":0,"BGD":0,"BTN":0,"BRN":0,"KHM":0,"CHN":0,"GEO":0,"HKG":0,"IND":0,"IDN":0,"IRN":0,"IRQ":0,
                  "ISR":0,"JPN":0,"JOR":0,"KAZ":0,"KWT":0,"KGZ":0,"LAO":0,"LBN":0,"MAC":0,"MYS":0,"MDV":0,"MNG":0,"MMR":0,"NPL":0,	"PRK":0,
                  	"OMN":0	,"PAK":0,	"PHL":0,"QAT":0,"SAU":0,"SGP":0,"KOR":0,"LKA":0	,"SYR":0,"TWN":0,"TJK":0,"THA":0,"TUR":0,	"TKM":0,"ARE":0,
                    	"UZB":0,"VNM":0,"YEM":0}

var mapFemaleCount = {"AFG":0,"ARM":0,"AZE":0,"BHR":0,"BGD":0,"BTN":0,"BRN":0,"KHM":0,"CHN":0,"GEO":0,"HKG":0,"IND":0,"IDN":0,"IRN":0,"IRQ":0,
                                        "ISR":0,"JPN":0,"JOR":0,"KAZ":0,"KWT":0,"KGZ":0,"LAO":0,"LBN":0,"MAC":0,"MYS":0,"MDV":0,"MNG":0,"MMR":0,"NPL":0,	"PRK":0,
                                        	"OMN":0	,"PAK":0,	"PHL":0,"QAT":0,"SAU":0,"SGP":0,"KOR":0,"LKA":0	,"SYR":0,"TWN":0,"TJK":0,"THA":0,"TUR":0,	"TKM":0,"ARE":0,
                                          	"UZB":0,"VNM":0,"YEM":0}

var country_code=[ "AFG","ARM","AZE","BHR","BGD","BTN","BRN","KHM","CHN","GEO","HKG","IND","IDN","IRN","IRQ",
                  "ISR","JPN","JOR","KAZ","KWT","KGZ","LAO","LBN","MAC","MYS","MDV","MNG","MMR","NPL",	"PRK",
                  	"OMN"	,"PAK",	"PHL","QAT","SAU","SGP","KOR","LKA"	,"SYR","TWN","TJK","THA","TUR",	"TKM","ARE",
                    	"UZB","VNM","YEM"];
var indicator_code=["SP.DYN.LE00.FE.IN","SP.DYN.LE00.MA.IN","sp.dyn.le00.fe.in","sp.dyn.le00.ma.in"];
var count=0;
var array = [];
var firstrow=[];
var final=[];
function myvalues(countrycode, maleAvg, femaleAvg) {
    this.countryCode = countrycode;
    this.male = maleAvg;
    this.female = femaleAvg;
}//final json object
var counter=0;
rl.on('line',function (abc)//reading of file started
{
var i=0;
var j=0
var k=0;

  if(count==0)
  {
    var header=abc.split(',');//splitting of header
  }
  else
    {
      var first_row=abc.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);//splitting of first row

       for(i=0;i<country_code.length;i++)//checking for asian Countries
       {
        for(j=0;j<first_row.length;j++)
          {
            if(country_code[i]==first_row[j])
              {
                  count++;

                 for(k=0;k<indicator_code.length;k++)//checking for indicator code
                  {
                     for(var ind=0;ind<first_row.length;ind++)
                     {
                        if(indicator_code[k]==first_row[ind])
                           {
                             if(indicator_code[k]== "SP.DYN.LE00.MA.IN" || indicator_code[k] == "sp.dyn.le00.ma.in")//checking for male
                             {
                               mapMaleCount[first_row[1]] = (parseFloat(mapMaleCount[first_row[1]]) + parseFloat(first_row[5]))/count;
                             }
                             else
                             {
                               mapFemaleCount[first_row[1]] = (parseFloat(mapFemaleCount[first_row[1]]) + parseFloat(first_row[5]))/count;//checking for female

                             }
                             }

                             }
                     }

             }
    }
}
count=0;
}
count++;//next row
}
);
rl.on('close',function () {//reading of file stopped
  for(var key in  mapMaleCount)
  {
    var json=new myvalues(key,mapMaleCount[key],mapFemaleCount[key]);
    final.push(json);//final array
     }
 file.writeFile('../json/jsonstacked.json',JSON.stringify(final),'utf-8');//json file final conversion
})
