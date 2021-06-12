/** This function can sort data by date of this format 'dd/MM/YYYY' **/

const sortData = (array, order) => {
    let productResult = array;
    for (let i = 1; i < productResult.length; i++) {
    
        for (let j = i - 1; j > -1; j--) {
            let previousDate = productResult[j].releaseDate.split('/')[0];
            let previousMonth = productResult[j].releaseDate.split('/')[1];
            let previousYear = productResult[j].releaseDate.split('/')[2];
    
            let currentDate = productResult[j + 1].releaseDate.split('/')[0];
            let currentMonth = productResult[j + 1].releaseDate.split('/')[1];
            let currentYear = productResult[j + 1].releaseDate.split('/')[2];
    
            if (order === 'asc') {
                if ((currentYear < previousYear)) {
                    [productResult[j + 1], productResult[j]] = [productResult[j], productResult[j + 1]];
                } else if (currentYear === previousYear && currentMonth < previousMonth) {
                    [productResult[j + 1], productResult[j]] = [productResult[j], productResult[j + 1]];
                } else if (currentMonth === previousMonth && currentYear === previousYear && currentDate < previousDate) {
                    [productResult[j + 1], productResult[j]] = [productResult[j], productResult[j + 1]];
                }
            } else {
                if ((currentYear > previousYear)) {
                    [productResult[j + 1], productResult[j]] = [productResult[j], productResult[j + 1]];
                } else if (currentYear === previousYear && currentMonth > previousMonth) {
                    [productResult[j + 1], productResult[j]] = [productResult[j], productResult[j + 1]];
                } else if (currentMonth === previousMonth && currentYear === previousYear && currentDate > previousDate) {
                    [productResult[j + 1], productResult[j]] = [productResult[j], productResult[j + 1]];
                }
            }
    
        }
    }

    return productResult;
}

module.exports = sortData;