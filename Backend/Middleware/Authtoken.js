
// import jwt from 'jsonwebtoken';

// export const Authtoken = (req,res,next)=>{
//     try{
//         const token = req.cookies?.token || req.header

//         console.log("token        - ",token)
//         if(!token){
//             return res.status(200).json({
//                 message : "Please Login...!",
//                 error : true,
//                 success : false
//             })
//         }

//         jwt.verify(token, process.env.secretKey, function(err, decoded) {
//             console.log(err)
//             console.log("decoded",decoded)
            
//             if(err){
//                 console.log("error auth", err)
//             }

//             req.userId = decoded?._id
//             next()
//         });

//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             data : [],
//             error : true,
//             success : false
//         })
//     }
// }



import jwt from 'jsonwebtoken';

export const Authtoken = (req,res,next)=>{
    try{
        const token = req.cookies?.token || req.header

        console.log("token        - ",token)
        if(!token){
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.secretKey, function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded)
            
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id
            next()
        });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}
