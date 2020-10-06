    
    /**
     * TODO: Set up connection to mongoDB
     */

    const mongodb = require('mongodb')
    const mongoClient = mongodb.MongoClient

    const conUrl = 'mongodb://127.0.0.1:27017'
    const dbName = 'task-manager'

    
    mongoClient.connect(conUrl, {useNewUrlParser: true}, (error, client) => {
        if (error) {
            return console.log("Cant connect to the database")
        }

        /**
         * TODO: Refers to the database and its collections
         */
        const db = client.db(dbName)

        // ! Inserting data to 'users' Collection
        // db.collection('users').insertMany([
        //     {
        //         name: "Muzammil",
        //         age: 20,
        //         jobs: "mobile developer"
        //     },
        //     {
        //         name: 'Khazwah',
        //         age: 25,
        //         jobs: 'Dev Ops Engineer'
        //     },
        //     {
        //         name: "Abduh",
        //         age: 21,
        //         jobs: "QA Engineer"
        //     }
        // ], (error) => {
        //     if (error) {
        //         console.log('unable to insert a documents');
        //     }
        // })

        // ! Inserting data to 'task' collections
        // db.collection('task').insertMany([
        //     {
        //         desc: 'Write a paragraph',
        //         completed: false 
        //     },
        //     {
        //         desc: 'Sing a song',
        //         completed: true 
        //     },
        //     {
        //         desc: 'Push to git repository',
        //         completed: true 
        //     }
        // ], (error) => {
        //     if (error) {
        //         console.log('unable to insert a documents');
        //     }
        // })

        
        //! Find one data in collection
        // db.collection('task').findOne({ _id: new mongodb.ObjectID('5f717d460094de1ab47ceb2e')}, (e, data) => {
        //     console.log(data);
        // })  

        //! Find many data in collection
        // db.collection('task').find({ completed: true }).toArray((e, data) => {
        //     console.log(data);
        // })

        //! Update one data in collection
    //         db.collection('users').updateOne({
    //             _id: new mongodb.ObjectID('5f717d460094de1ab47ceb2b')
    //         },{
    //             //! Provide $set to edit or update any fields
    //             $set: {
    //                 name: 'Inzana Khabir',
    //                 age: 25,
    //                 jobs: 'Front-end Engineer'
    //             }
    //         }).then((result) => { //? THIS IS A PROMISES EITHER RUNNING OR FAILED
    //             console.log(result);
    //         }).catch((e) => {
    //             console.log(e);
    //         })
    // 
        
        //! Update Many datas in collection
            // db.collection('task').updateMany({
            //     completed: true
            // }, {
            //     $set: {
            //         completed: false
            //     }
            // }).then((res) => {
            //     console.log(res);
            // }).catch((e) => {
            //     console.log(e);
            // })

        //! Delete One data in collection
            // db.collection('users').deleteOne({
            //     _id: mongodb.ObjectID('5f717d460094de1ab47ceb2b')
            // }).then((res) => {
            //     console.log(res);
            // }).catch((e) => {
            //     console.log(e);
            // })



    })