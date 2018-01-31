var mongoose    = require("mongoose"),
    Campground  = require("./models/campgrounds"),
    Comment     = require("./models/comment");
    
var data = [
        {
            name: "Salmon Creek",
            price: "20.00",
            image: "https://c2.staticflickr.com/4/3041/2754517390_58fa6525b9_z.jpg",
            description: "Fluff it up a little and hypnotize it. Let's make a happy little mountain now. I spend a lot of time walking around in the woods and talking to trees, and squirrels, and little rabbits and stuff. You create the dream - then you bring it into your world. See. We take the corner of the brush and let it play back-and-forth. We might as well make some Almighty mountains today as well, what the heck. Talk to trees, look at the birds. Whatever it takes. Maybe we got a few little happy bushes here, just covered with snow. You have freedom here. The only guide is your heart. Clouds are free. They just float around the sky all day and have fun. We'll put some happy little leaves here and there. Paint anything you want on the canvas. Create your own world. Let all these things just sort of happen. Get away from those little Christmas tree things we used to make in school. Isn't it fantastic that you can change your mind and create all these happy things? In painting, you have unlimited power. You have the ability to move mountains. You can bend rivers. But when I get home, the only thing I have power over is the garbage. A happy cloud. Maybe there's a happy little waterfall happening over here. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things. This piece of canvas is your world. A beautiful little sunset. We must be quiet, soft and gentle. Now we'll take the almighty fan brush. No pressure. Just relax and watch it happen. All you have to learn here is how to have fun. It's a super day, so why not make a beautiful sky? You have to make those little noises or it won't work. We'll play with clouds today. With something so strong, a little bit can go a long way. You don't have to be crazy to do this but it does help. We'll paint one happy little tree right here. This is your world. With practice comes confidence. It looks so good, I might as well not stop. Tree trunks grow however makes them happy. Only God can make a tree - but you can paint one. Let's make some happy little clouds in our world. But we're not there yet, so we don't need to worry about it. I sincerely wish for you every possible joy life could bring. Now we can begin working on lots of happy little things."
        },
        {
            name: "Granite Hill",
            price: "9.48",
            image: "https://c1.staticflickr.com/9/8206/8265812638_8100a96382_z.jpg",
            description: "This is unplanned it really just happens. Even the worst thing we can do here is good. If we're going to have animals around we all have to be concerned about them and take care of them. Think about a cloud. Just float around and be there. Each highlight must have it's own private shadow. Maybe there's a happy little waterfall happening over here. In your world you have total and absolute power. Only God can make a tree - but you can paint one. I can't think of anything more rewarding than being able to express yourself to others through painting. I like to beat the brush. See how easy it is to create a little tree right in your world. We must be quiet, soft and gentle. We don't want to set these clouds on fire. At home you have unlimited time. Now then, let's play. Working it up and down, back and forth. We'll take a little bit of Van Dyke Brown. Pretend you're water. Just floating without any effort. Having a good day. Just take out whatever you don't want. It'll change your entire perspective. Even trees need a friend. We all need friends. You can't have light without dark. You can't know happiness unless you've known sorrow. You gotta think like a tree. And that's when it becomes fun - you don't have to spend your time thinking about what's happening - you just let it happen. Poor old tree. Be careful. You can always add more - but you can't take it away."
        },
        {
            name: "Daisy Mountain",
            price: "13.45",
            image: "https://c2.staticflickr.com/8/7616/16663866990_082fe86c9c_z.jpg",
            description: "We artists are a different breed of people. We're a happy bunch. Just make a decision and let it go. Life is too short to be alone, too precious. Share it with a friend. Don't be bashful drop me a line. I thought today we would do a happy little picture. All kinds of happy little splashes. Get away from those little Christmas tree things we used to make in school. Water's like me. It's laaazy ... Boy, it always looks for the easiest way to do things If you don't like it - change it. It's your world. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things. With something so strong, a little bit can go a long way. We start with a vision in our heart, and we put it on canvas. The very fact that you're aware of suffering is enough reason to be overjoyed that you're alive and can experience it. We'll have a super time. Trees grow however makes them happy. Everyone is going to see things differently - and that's the way it should be. See how easy it is to create a little tree right in your world. Let's put some happy little bushes on the other side now. Happy painting, God bless. Think about a cloud. Just float around and be there. Clouds are free. They just float around the sky all day and have fun. This is unplanned it really just happens. Trees get lonely too, so we'll give him a little friend. Maybe he has a little friend that lives right over here. It's hard to see things when you're too close. Take a step back and look. Steve wants reflections, so let's give him reflections. Just think about these things in your mind - then bring them into your world. There are no mistakes. You can fix anything that happens. Sometimes you learn more from your mistakes than you do from your masterpieces. Let all these things just sort of happen. I can't think of anything more rewarding than being able to express yourself to others through painting. You can spend all day playing with mountains. In your world you have total and absolute power."
        }
    ];
    
function seedDB(){
    Campground.remove({}, function(err){
        if(err) {
        console.log(err);
        } 
        console.log("Removed Campgrounds!");
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("Added a Campground");
                Comment.create(
                    {
                        text: "This place if great, but I wish is had internet",
                        author: "Homer"
                    }, function (err, comment){
                        if(err) {
                            console.log(err);
                        } else {
                        campground.comments.push(comment._id);
                        campground.save();
                        console.log("Created New Comment");
                        }
                    });
                }
            });
        });
    });
};

module.exports = seedDB;