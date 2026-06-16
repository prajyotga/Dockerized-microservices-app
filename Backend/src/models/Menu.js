const mongoose=require("mongoose");

const menuSchema =mongoose.Schema({

   restaurant_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Restaurant",
    require:true,
   },
   name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
})

module.exports=mongoose.model("Menu",menuSchema);