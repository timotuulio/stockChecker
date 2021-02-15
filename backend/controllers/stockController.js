// Controller for items for when api calls are used for items

const fs = require('fs');
const csv = require('csv-parser')
const xssFilters = require('xss-filters');

/*function getDataInRange(start, end) {
    rangeArray = []
    console.log(start)
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (row) => {
            //console.log(row);
            //console.log(Object.keys(row));
            //console.log(Object.values(row));
            var rowDate = row.Date.split("/")
            rowDate = new Date(rowDate[2], rowDate[0]-1, rowDate[1])
            if (rowDate >= start && rowDate <= end) {
                rangeArray.push(row)
                console.log("length is: ", rangeArray.length)
            }
        })
        .on('end', () => {
            console.log("File processed")
            return rangeArray
        });

    /*console.log(rangeArray.length)
    rangeArray.forEach((item, i) => {
        console.log("length is: ", item)
    });
    console.log("---------------")
    return rangeArray
}*/

module.exports = {
    async longestUpTrend(req, res) {
        const date = req.body;
        var start = xssFilters.inHTMLData(date.start)
        start = start.split(".")
        start = new Date(start[2], start[1]-1, start[0])
        var end = xssFilters.inHTMLData(date.end)
        end = end.split(".")
        end = new Date(end[2], end[0]-1, end[1])
        try {
            rangeArray = await getDataInRange(start, end)
        } catch(err) {
            console.log("something")
        }

        var longestRange = []
        var helpRange = []
        var helpVal = 0
        rangeArray.forEach((item, i) => {
            console.log(item)
            itemVal = item[" Close/Last"]
            itemVal = parseFloat(itemVal.slice(2))
            if (helpRange.length == 0) {
                helpRange.push(item)
                helpVal = itemVal
            }
            else if (itemVal < helpVal) {
                helpRange.push(item)
                helpVal = itemVal
                if (longestRange.length < helpRange.length) {
                    longestRange = helpRange
                }
            }
            else {
                helpRange = []
            }
        });

        resValue = 'File processed. The longest upward trend is: ' + longestRange.length
        //console.log(start.toDateString(), " | ", end.toDateString())
        res.send(resValue)
    },
    highestChange(req, res) {
        const date = req.body;
        var start = xssFilters.inHTMLData(date.start)
        start = start.split(".")
        start = new Date(start[2], start[1]-1, start[0])
        var end = xssFilters.inHTMLData(date.end)
        end = end.split(".")
        end = new Date(end[2], end[0]-1, end[1])
        rangeArray = []


        fs.createReadStream('data.csv')
            .pipe(csv())
            .on('data', (row) => {
                //console.log(row);
                //console.log(Object.keys(row));
                //console.log(Object.values(row));
                var rowDate = row.Date.split("/")
                rowDate = new Date(rowDate[2], rowDate[0]-1, rowDate[1])
                if (rowDate >= start && rowDate <= end) {
                  rangeArray.push(row)
                }
            })
            .on('end', () => {
                var hiVol = 0
                var volDate = ""
                var priceChange = 0
                var priceDate = ""
                rangeArray.forEach((item, i) => {
                    var low = parseFloat(item[" Low"].split("$")[1])
                    var high = parseFloat(item[" High"].split("$")[1])
                    var vol = parseFloat(item[" Volume"])
                    var date = item["Date"]
                    if(vol > hiVol) {
                        hiVol = vol
                        volDate = date
                    }

                    if ((high - low) > priceChange) {
                        priceChange = high - vol
                        priceDate = date
                    }
                });
                resValue = 'File processed. The highest volume was on: ' + volDate + "\n and the biggest change in price was on: " + priceDate
                //console.log(start.toDateString(), " | ", end.toDateString())
                res.send(resValue)
            });
    }

    /*,

    async updateItem(req, res) {

        if (authToken(req.headers.authorization)) {
            const itemUpdateInfo = req.body;
            console.log(itemUpdateInfo);

            var updatedItem = await Item.findById(req.params.id).exec()
                .catch(function(error) {
                    return 'Error occured'
                });

            for (const [key, value] of Object.entries(itemUpdateInfo)) {
                updatedItem[key] = xssFilters.inHTMLData(value);
            }

            updatedItem.save();

            console.log(updatedItem);
            res.send(updatedItem);

        } else {
            console.log("Authentication failed")
            // Check format of this
            res.send("Not authorized")
        }
    }*/
}
