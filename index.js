const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    let start = new Date();
    let end = new Date(start);
    end.setDate(end.getDate() + 7);

    let startDate = new Date(start).toISOString().slice(0, 10);
    let endDate = new Date(end).toISOString().slice(0, 10);

    // Returns an array of dates between the two dates
    Date.prototype.addDays = function(days)
    {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }
 
    const getDates = (startDate, stopDate) =>
    {
       var dateArray = new Array();
       var currentDate = startDate;
       while (currentDate <= stopDate) 
       {
           let day = {
               day:currentDate.toString().split(' ')[0].toLowerCase(),
               date:currentDate.toISOString().slice(0, 10)
           }
         dateArray.push(day)
         currentDate = currentDate.addDays(1);
       }
       return dateArray;
     }
 
    let dateArray = getDates(start, end); 
    let offDays = ['mon'];
    let days = {
         start: startDate,
         end:endDate,
         offDays:offDays,
         daysList:dateArray
    };
    
    let newDays = days.daysList.filter(val => !offDays.includes(val.day));
    days.newDays = newDays
    res.json(days)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})