const mongoose=require("mongoose");
const{Schema}=require("mongoose");

main().then((console.log("Connection Successfull"))).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemos');

}

const userSchema=new Schema({
    username:String,
    email:String,
})

const postSchema=new Schema({
    content:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
})
const User=mongoose.model("User",userSchema);
const Post=mongoose.model("Post",postSchema);

const addData=async()=>{
    // let user1=new User({
    //     username:"rahul kumar",
    // })
    // let post1=new Post({
    //     content:"Hello User1",
    //     likes:10,
    // })
    // post1.user=user1;
    // await user1.save();
    // await post1.save();
    let user=await User.findOne({username:'rahul kumar'});
     let post2=new Post({
        content:"Hello User2",
        likes:101,
     })
     post2.user=user;
    //  await user1.save();
     await post2.save();
    //  console.log("Data Added");
}

addData();
