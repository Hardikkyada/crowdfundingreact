

const initialState = {
    transaction:[]
}

export default (state = initialState,action)=>{
    switch(action.type){
        case "SETDATA":
            console.log("reducer",action.data);
            return{
                ...state,
                transaction:action.data
            }

        case "ADDDATA":
            console.log("4",action.data);
            return{
                ...state,
                transaction:[action.data,...state.transaction]
            }
    }
    return state
}