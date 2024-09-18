// export default function SideBar() {
//   return (
//     <nav className="bg-[#211636] shadow-lg h-screen top-0 left-0 min-w-[300px] py-6 px-4 font-[sans-serif] flex flex-col overflow-auto no-scrollbar">
//       <h6 className="text-lg text-white inline-block m-auto">Filters</h6>
//       <hr className="border-gray-500 mt-5" />
//       <div className="my-8 flex-1">
//         <ul className="mt-6 space-y-6">
          
//         </ul>
//       </div>
//     </nav>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, setCheckBox, setMinMaxPrice } from "../slices/bookSlice";

const Sidebar = () => {
  
  // const {genre, author, publisher} = useSelector((state) => state.book.categories);
  const categories = useSelector((state) => state.book.categories);
  const checked = useSelector((state) => state.book.checked);
  const minMax = useSelector((state) => state.book.priceRange);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories('genre'));
    dispatch(fetchCategories('author'));
    dispatch(fetchCategories('publisher'));
  },[]);

  
  // const [minMax, setMinMax] = useState({ min: '', max: '' });

  const handleCheckboxChange = (category, value) => {
    dispatch(setCheckBox({category, value}));
  };

  const handleMinMaxChange = (e) => {
    const { name, value } = e.target;
    // setMinMax({ ...minMax, [name]: value });
    dispatch(setMinMaxPrice({name, value}));
  };

  // Sample checkbox options
  // const categories = ["Hotel", "Apartment", "Hostel"];
  // const types = ["Luxury", "Budget", "Standard"];
  // const locations = ["New York", "Paris", "Tokyo"];

  const Dropdown = ({ label, options, category }) => (
    <div>
      <button className="text-white w-full text-left">{label}</button>
      <div className="pl-4 mt-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={option}
              checked={checked[category] == option}
              onChange={() => handleCheckboxChange(category, option)}
            />
            <span className="text-white">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <nav className="bg-[#211636] shadow-lg h-screen top-0 left-0 min-w-[300px] py-6 px-4 font-[sans-serif] flex flex-col overflow-auto no-scrollbar">
      <h6 className="text-lg text-white inline-block m-auto">Filters</h6>
      <hr className="border-gray-500 mt-5" />
      <div className="my-8 flex-1">
        <ul className="mt-6 space-y-6">
          <li>
            <Dropdown label="Category" options={categories.genre} category="genre" />
          </li>
          <li>
            <Dropdown label="Author" options={categories.author} category="author" />
          </li>
          <li>
            <Dropdown label="Publisher" options={categories.publisher} category="publisher" />
          </li>
          <li>
            <div>
              <h6 className="text-white mb-2">Price Range</h6>
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="min"
                  placeholder="Min"
                  value={minMax.min}
                  onChange={handleMinMaxChange}
                  className="w-full px-2 py-1 rounded"
                />
                <input
                  type="number"
                  name="max"
                  placeholder="Max"
                  value={minMax.max}
                  onChange={handleMinMaxChange}
                  className="w-full px-2 py-1 rounded"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
