export function isValid(cartItems){
    if (!cartItems || cartItems.length === 0) {
        return false;
    }
    
    const restaurantId = cartItems[0]?.food?.restaurant?._id;
    if (!restaurantId) {
        return false;
    }

    for(let item of cartItems){
        if(item?.food?.restaurant?._id !== restaurantId){
            return false;
        }
    }
    return true;
}