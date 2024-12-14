
const APIFeatures = (query, queryString)=> {
    return {
        query,
        queryString,
        filter(){
            let {page, sort,limit,fields, ...filterCriteria} = this.queryString;
                let queryStr = JSON.stringify(filterCriteria);
                queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
                this.query = this.query.find(JSON.parse(queryStr))
            return this;
        },
        sorting(){
            if(this.queryString.sort){
                const sortBy = this.queryString.sort.split(',').join(' ')
                this.query = this.query.sort(sortBy)
            }
            else{
                this.query = this.query.sort('-createdAt')
            }
            return this;
        },
        limitFields(){
            if(this.queryString.fields){
                const fields = this.queryString.fields.split(',').join(' ')
                this.query = this.query.select(fields)
            }else{
                this.query = this.query.select('-__v')
            }
            return this;
        },
        paginate(){
           let page  = this.queryString.page * 1 || 1;
           let limit = this.queryString.limit * 1 || 25;
            const skip = (page -1) * limit;
            this.query =this.query.skip(skip).limit(limit);
            return this;
        }

    }
}


// same using class constructor


// class APIFeatures {
//     constructor(query, queryString) {
//         this.query = query;
//         this.queryString = queryString;
//     }
//     filter(){
//         let {page, sort,limit,fields, ...filterCriteria} = this.queryString;
//        let queryStr = JSON.stringify(filterCriteria);
//        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
//        this.query = this.query.find(JSON.parse(queryStr))
//         return this;
//     }

//     sorting(){
//         if(this.queryString.sort){
//             const sortBy = this.queryString.sort.split(',').join(' ')
//             this.query = this.query.sort(sortBy)
//         }
//         else{
//             this.query = this.query.sort('-createdAt')
//         }
//         return this;
//     }

//     limitFields(){
//         if(this.queryString.fields){
//             const fields = this.queryString.fields.split(',').join(' ')
//             this.query = this.query.select(fields)
//         }else{
//             this.query = this.query.select('-__v')
//         }
//         return this;
//     }

//     paginate(){
//        let page  = this.queryString.page * 1 || 1;
//        let limit = this.queryString.limit * 1 || 25;
//         const skip = (page -1) * limit;
//         this.query =this.query.skip(skip).limit(limit);
//         return this;
//     }
// }
module.exports = APIFeatures