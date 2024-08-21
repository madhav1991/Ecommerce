import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  productData: [],
}


export const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers:{
    addToCart: (state, action)=>{
      const item = state.productData.find((item)=> item.id === action.payload.id)
      if(item){
        // same item
        item.quantity += action.payload.quantity
      }else{
        // new item
        state.productData.push(action.payload)
      }
    },

    deleteFromCart: (state, action)=>{
      state.productData = state.productData.filter((item)=> item.id !== action.payload)
    },

    resetCart: (state)=>{
      state.productData = []
    },
    
    incrementQuantity: (state, action)=>{
      const item = state.productData.find((item)=> item.id === action.payload.id);
      if(item){
        item.quantity ++;
      }
    }, 
    decrementQantity: (state, action)=>{
      const item = state.productData.find((item)=> item.id === action.payload.id)
      if(item.quantity === 1){
        item.quantity =1
      }else{
        item.quantity--;
      }
    },
  }
}
)

export const
 {addToCart, 
  deleteFromCart, 
  resetCart,
  incrementQuantity, 
  addUser,
  removeUser,
  decrementQantity} = threadsSlice.actions;