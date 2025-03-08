import React, { useContext } from "react";
import { WhishListContext } from "../../Context/WhishListContext";
import { MdDelete } from "react-icons/md";

export default function WhishList() {
  let { wishList, deleteWishList } = useContext(WhishListContext);

  return (
    <div className="container p-10">
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {wishList.length === 0 ? (
          <h1 className="text-main text-xl font-bold">
            No WhishList...........
          </h1>
        ) : (
          wishList.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 ">
              <img src={item.imageCover} alt={item.title} />
              <h2 className=" text-center text-lg font-bold">{item.title.split(" ").slice(0, 2).join(" ")}</h2>
              <button
                className="bg-main mt-2 w-full flex justify-center items-center  hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteWishList(item.id)}
              >
                <MdDelete  />
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}