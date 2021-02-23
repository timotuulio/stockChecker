// Controller for items for when api calls are used for items

const fs = require('fs');
const csv = require('csv-parser')
const xssFilters = require('xss-filters');

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

async function getDataInRange(start, end) {
    try {
        const ret = fs.createReadStream('data.csv')
            .pipe(csv())
        return new Promise(function(resolve,reject) {
            let rangeArray = []
            ret.on('data', (row) => {
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
                console.log("File processed")
                resolve(rangeArray)
            })
            .on('err', () => {
                reject()
            });
        })
    }
    catch(err) {
        console.log(err)
        return []
    }

    /*console.log(rangeArray.length)
    rangeArray.forEach((item, i) => {
        console.log("length is: ", item)
    });
    console.log("---------------")*/
}

module.exports = {
    async longestUpTrend(req, res) {
        console.log("Now we have longestUptrend call")
        console.log(req.params)
        console.log("----------------------------------")
        /*const date = req.body;
        //var start = xssFilters.inHTMLData(date.start)
        var start = xssFilters.inHTMLData(urlParams.get('start'))
        start = start.split(".")
        start = new Date(start[2], start[1]-1, start[0])
        //var end = xssFilters.inHTMLData(date.end)
        var end = xssFilters.inHTMLData(urlParams.get('e'))
        end = end.split(".")
        end = new Date(end[2], end[0]-1, end[1])*/
        var start = req.params.start
        start = start.split("_")
        start = new Date(start[2], start[1]-1, parseInt(start[0]) + 1)

        var end = req.params.end
        end = end.split("_")
        end = new Date(end[2], end[1]-1, parseInt(end[0]) + 1)

        const rangeArray = await getDataInRange(start, end)

        var longestRange = []
        var helpRange = []
        var helpVal = 0
        rangeArray.forEach((item, i) => {
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
    async highestChange(req, res) {
        console.log("Now we have highestChange call")
        /*const date = req.body;
        var start = xssFilters.inHTMLData(date.start)
        start = start.split(".")
        start = new Date(start[2], start[1]-1, start[0])
        var end = xssFilters.inHTMLData(date.end)
        end = end.split(".")
        end = new Date(end[2], end[0]-1, end[1])
        rangeArray = []*/

        var start = req.params.start
        start = start.split("_")
        start = new Date(start[2], start[1]-1, parseInt(start[0]) + 1)

        var end = req.params.end
        end = end.split("_")
        end = new Date(end[2], end[1]-1, parseInt(end[0]) + 1)

        const rangeArray = await getDataInRange(start, end)

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
                priceChange = high - low
                console.log("---->", priceChange)
                priceDate = date
            }
        });
        resValue = 'File processed. The highest volume was on: ' + volDate + "\n and the biggest change in price was on: " + priceDate
        //console.log(start.toDateString(), " | ", end.toDateString())
        res.send(resValue)


        /*fs.createReadStream('data.csv')
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
            });*/
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
