import { Button, Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";

const AddressCard = ({ handleSelectAddress, item, showButton }) => {
  const handleSelect = () => {
    // Ensure we're working with a properly formatted address object
    const addressId = item._id ? item._id.toString() : item.toString();
    
    console.log("Selected address:", item);
    console.log("Using address ID:", addressId);
    
    // Pass the ID string to the handler
    handleSelectAddress(addressId);
  };
  
  return (
    <Card className="flex space-x-5 w-64 p-5">
      <HomeIcon />

      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg text-white">Home</h1>
        <p>
          {item.streetAddress}, {item.postalCode}, {item.state}, {item.country || "India"}
          {/* {`${address?.streetAddress} ${address?.city} ${address?.state} ${address?.zipCode}`} */}
        </p>

        {showButton && (
          <Button
            onClick={handleSelect}
            variant="outlined"
            className="w-full"
          >
            select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
